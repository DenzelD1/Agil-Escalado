import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { safeNormalizeOrder } from '@/lib/normalizers/orderNormalizer';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { initialOrderState } from '@/lib/machines/orderStateMachine';
import { reserveStock } from '@/lib/services/stockService';
import { persistOrder } from '@/lib/services/orderPersistence';

export async function POST(request: Request) {
  try {

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

    const body = await request.json();

    // Normalización de datos
    const normResult = safeNormalizeOrder(body, 'app');

    if (!normResult.success) {
      // Transicion: creado -> rechazado (en caso de que la validacion falle)
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

    // Transicion: creado -> verificado (en caso de que la validacion sea exitosa)
    let stateTransition = await getOrderStateTransition(initialOrderState, {
      type: 'VALIDACION_EXITOSA',
    }, {
      orderId: normResult.data.id_pedido,
      publishToRedis: true,
    });

    const pedidoNormalizado = normResult.data;

    // Reserva automática de stock
    const stockResult = await reserveStock(pedidoNormalizado.items, token);

    if (!stockResult.success) {
      // Transicion: verificado -> rechazado (en caso de stock insuficiente)
      stateTransition = await getOrderStateTransition(stateTransition.nextState, {
        type: 'VALIDACION_FALLIDA',
        error: stockResult.error,
      }, {
        orderId: pedidoNormalizado.id_pedido,
        publishToRedis: true,
      });

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

    // Persistencia en la BD
    const pedidoPersistido = await persistOrder(
      pedidoNormalizado,
      stateTransition.nextState,
      stockResult.reservas,
    );

    return NextResponse.json(
      {
        mensaje: 'Pedido en móvil recibido, normalizado y stock reservado',
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
    console.error('Error procesando pedido en móvil:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor procesando el pedido' },
      { status: 500 },
    );
  }
}
