import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/middlewares/rateLimiter';
import { verifyJwt } from '@/lib/jwt';
import { safeNormalizeOrder } from '@/lib/normalizers/orderNormalizer';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { initialOrderState } from '@/lib/machines/orderStateMachine';
import { reserveStock, rollbackReservations } from '@/lib/services/stockService';
import { persistOrder } from '@/lib/services/orderPersistence';
import { initiatePayment } from '@/lib/services/paymentClient';
import { dispatchExternalEvent } from '@/lib/services/externalEventDispatcher';
import { createSupportTicket } from '@/lib/services/crmClient';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const isAllowed = await checkRateLimit(ip);
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Demasiadas peticiones (Rate Limit excedido). Intente más tarde.' },
        { status: 429 }
      );
    }

    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No autorizado. Faltan credenciales.' },
        { status: 401 },
      );
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await verifyJwt(token);
    const usuarioId = decodedToken.sub;

    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 1024 * 1024) { // 1MB limit
      return NextResponse.json(
        { error: 'El tamaño de la petición excede el límite permitido de 1MB.' },
        { status: 413 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: 'Cuerpo de la petición inválido o malformado' },
        { status: 400 },
      );
    }

    // Normalización de datos
    const normResult = safeNormalizeOrder(body, 'web');

    if (!normResult.success) {
      // Transicion: creado -> rechazado (para validacion fallida)
      const stateTransition = await getOrderStateTransition(initialOrderState, {
        type: 'VALIDACION_FALLIDA',
        error: `Validación rechazada: ${normResult.errors.map((e) => e.mensaje).join('; ')}`,
      }, {
        publishToRedis: true,
      });

      return NextResponse.json(
        {
          error: 'Error de validación y normalización de datos',
          errores: normResult.errors,
          estado: stateTransition.nextState,
          transicion: stateTransition.message,
        },
        { status: 400 },
      );
    }

    // Transicion: creado -> verificado (para validacion exitosa)
    let stateTransition = await getOrderStateTransition(initialOrderState, {
      type: 'VALIDACION_EXITOSA',
    }, {
      orderId: normResult.data.id_pedido,
      publishToRedis: true,
    });

    const pedidoNormalizado = normResult.data;

    // Reserva automática de stock
    const stockResult = await reserveStock(pedidoNormalizado.items, token, pedidoNormalizado.id_pedido);

    if (!stockResult.success) {
      // Transicion: verificado -> rechazado (en caso de stock insuficiente)
      stateTransition = await getOrderStateTransition(stateTransition.nextState, {
        type: 'VALIDACION_FALLIDA',
        error: stockResult.error,
      }, {
        orderId: pedidoNormalizado.id_pedido,
        publishToRedis: true,
      });

      if (stockResult.tipo === 'stock_insuficiente') {
        createSupportTicket({
          asunto: 'Stock insuficiente para pedido',
          descripcion: stockResult.error,
          prioridad: 'alta',
          sistema_origen: 'pedidos',
          sistema_id: 'P03',
          pedido_id_ref: pedidoNormalizado.id_pedido,
        }).catch(e => console.error("Error creando ticket CRM por stock insuficiente", e));
      }

      const statusCode =
        stockResult.tipo === 'stock_insuficiente' ? 409 : 503;
      return NextResponse.json(
        {
          error: stockResult.error,
          sku: stockResult.sku,
          tipo: stockResult.tipo,
          estado: stateTransition.nextState,
          transicion: stateTransition.message,
        },
        { status: statusCode },
      );
    }

    let pedidoPersistido;
    try {
      pedidoPersistido = await persistOrder(
        pedidoNormalizado,
        stateTransition.nextState,
        stockResult.reservas,
      );
    } catch (dbError) {
      console.error('Error persistiendo pedido Web en DB:', dbError);
      
      if (stockResult.reservas.length > 0) {
        await rollbackReservations(stockResult.reservas, token);
      }

      return NextResponse.json(
        { error: 'Error interno guardando el pedido. Se ha liberado el inventario reservado.' },
        { status: 500 },
      );
    }

    // Notificar a Analítica (Proyecto 6)
    dispatchExternalEvent({
      source: 'orders',
      event_type: 'pedido_creado',
      payload: {
        order_id: pedidoPersistido.id,
        customer_id: pedidoNormalizado.cliente.email || 'desconocido',
        sales_channel: pedidoNormalizado.tipo_canal,
        total_amount: pedidoNormalizado.total,
        total_items: pedidoNormalizado.items.reduce((acc: number, item: any) => acc + item.cantidad, 0),
      }
    }).catch(e => console.error("Error despachando evento pedido_creado", e));

    // Iniciar pago (Proyecto 4)
    initiatePayment(pedidoPersistido.id, pedidoNormalizado.total, { cliente: pedidoNormalizado.cliente })
      .catch(e => console.error("Error iniciando pago", e));

    return NextResponse.json(
      {
        mensaje: 'Pedido Web recibido, normalizado y stock reservado',
        pedido: {
          ...pedidoNormalizado,
          estado: stateTransition.nextState,
        },
        pedido_id: pedidoPersistido.id,
        reservas: stockResult.reservas,
        estado: stateTransition.nextState,
        transicion: stateTransition.message,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error procesando pedido en web:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor procesando el pedido' },
      { status: 500 },
    );
  }
}
