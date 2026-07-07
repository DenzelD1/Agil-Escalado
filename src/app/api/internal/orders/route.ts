import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { safeNormalizeOrder } from '@/lib/normalizers/orderNormalizer';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { initialOrderState } from '@/lib/machines/orderStateMachine';
import { reserveStock, rollbackReservations } from '@/lib/services/stockService';
import { persistOrder } from '@/lib/services/orderPersistence';
import { dispatchExternalEvent } from '@/lib/services/externalEventDispatcher';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado. Faltan credenciales.' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    await verifyJwt(token); // Valida que el token sea correcto (por ejemplo emitido por P12)

    let body: any;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: 'Cuerpo de la petición inválido o malformado' }, { status: 400 });
    }

    // 1. Normalización
    const normResult = safeNormalizeOrder(body, 'internal');

    if (!normResult.success) {
      const stateTransition = await getOrderStateTransition(initialOrderState, {
        type: 'VALIDACION_FALLIDA',
        error: `Validación rechazada: ${normResult.errors.map((e) => e.mensaje).join('; ')}`,
      }, { publishToRedis: true });

      return NextResponse.json({
        error: 'Error de validación y normalización de datos',
        errores: normResult.errors,
        estado: stateTransition.nextState,
      }, { status: 400 });
    }

    let stateTransition = await getOrderStateTransition(initialOrderState, {
      type: 'VALIDACION_EXITOSA',
    }, {
      orderId: normResult.data.id_pedido,
      publishToRedis: true,
    });

    const pedidoNormalizado = normResult.data;

    // 2. Reserva de Stock (P05)
    const stockResult = await reserveStock(pedidoNormalizado.items, token, pedidoNormalizado.id_pedido);

    if (!stockResult.success) {
      stateTransition = await getOrderStateTransition(stateTransition.nextState, {
        type: 'VALIDACION_FALLIDA',
        error: stockResult.error,
      }, {
        orderId: pedidoNormalizado.id_pedido,
        publishToRedis: true,
      });

      return NextResponse.json({
        error: stockResult.error,
        estado: stateTransition.nextState,
      }, { status: 409 });
    }

    // 3. Exención de Pago (Avanza directo a listo_para_despacho)
    // Solo si el pedido es exento (por convención, si total es 0 o si viene un flag exento_pago)
    const isExento = body.exento_pago === true || pedidoNormalizado.total === 0;
    
    if (isExento) {
      stateTransition = await getOrderStateTransition(stateTransition.nextState, {
        type: 'EXENTO_DE_PAGO',
      }, {
        orderId: pedidoNormalizado.id_pedido,
        publishToRedis: true,
      });
    }

    // 4. Persistir Pedido
    let pedidoPersistido;
    try {
      pedidoPersistido = await persistOrder(
        pedidoNormalizado,
        stateTransition.nextState,
        stockResult.reservas,
      );
    } catch (dbError) {
      console.error('Error persistiendo pedido interno en DB:', dbError);
      if (stockResult.reservas.length > 0) {
        await rollbackReservations(stockResult.reservas, token);
      }
      return NextResponse.json({ error: 'Error guardando pedido' }, { status: 500 });
    }

    // 5. Notificar a Analítica (P09)
    dispatchExternalEvent({
      source: 'orders',
      event_type: 'pedido_creado',
      payload: {
        order_id: pedidoPersistido.id,
        customer_id: pedidoNormalizado.cliente.email || 'desconocido',
        sales_channel: 'internal',
        total_amount: pedidoNormalizado.total,
        total_items: pedidoNormalizado.items.reduce((acc: number, item: any) => acc + item.cantidad, 0),
      }
    }).catch(e => console.error(e));

    if (isExento) {
       dispatchExternalEvent({
          source: 'orders',
          event_type: 'listo_para_despacho',
          payload: {
            order_id: pedidoPersistido.id,
            customer_id: pedidoNormalizado.cliente.email || 'desconocido',
          }
       }).catch(e => console.error(e));
    }

    return NextResponse.json({
      mensaje: 'Pedido interno creado exitosamente',
      pedido_id: pedidoPersistido.id,
      estado: stateTransition.nextState,
      exento_pago: isExento
    }, { status: 201 });

  } catch (error) {
    console.error('Error procesando pedido interno:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
