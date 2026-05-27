import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { safeNormalizeOrder } from '@/lib/normalizers/orderNormalizer';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { initialOrderState } from '@/lib/machines/orderStateMachine';
import { reserveStock } from '@/lib/services/stockService';

export async function POST(request: Request) {
  try {
    // --- Autenticación ---
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

    // --- Normalización de datos (Cliente, Dirección, SKU) ---
    const normResult = safeNormalizeOrder(body, 'web');

    if (!normResult.success) {
      // Transicion: creado -> rechazado (validacion fallida)
      const stateTransition = getOrderStateTransition(initialOrderState, {
        type: 'VALIDACION_FALLIDA',
        error: `Validación rechazada: ${normResult.errors.map((e) => e.mensaje).join('; ')}`,
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

    // Transicion: creado -> verificado (validacion exitosa)
    let stateTransition = getOrderStateTransition(initialOrderState, {
      type: 'VALIDACION_EXITOSA',
    });

    const pedidoNormalizado = normResult.data;

    // --- Reserva automática de stock ---
    const stockResult = await reserveStock(pedidoNormalizado.items, token);

    if (!stockResult.success) {
      // Transicion: verificado -> rechazado (stock insuficiente)
      stateTransition = getOrderStateTransition(stateTransition.nextState, {
        type: 'VALIDACION_FALLIDA',
        error: stockResult.error,
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

    return NextResponse.json(
      {
        mensaje: 'Pedido Web recibido, normalizado y stock reservado',
        pedido: {
          ...pedidoNormalizado,
          estado: stateTransition.nextState,
        },
        reservas: stockResult.reservas,
        estado: stateTransition.nextState,
        transicion: stateTransition.message,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error procesando pedido Web:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor procesando el pedido' },
      { status: 500 },
    );
  }
}
