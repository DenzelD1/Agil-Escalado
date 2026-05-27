import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { safeNormalizeOrder } from '@/lib/normalizers/orderNormalizer';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { initialOrderState } from '@/lib/machines/orderStateMachine';
import { reserveStock } from '@/lib/services/stockService';
import { persistOrder } from '@/lib/services/orderPersistence';

/**
 * POST /api/callcenter
 *
 * Endpoint para ingesta de pedidos desde el canal Call Center.
 *
 * Diferencias respecto a web/app:
 *  - El email del cliente es OPCIONAL (el agente puede no tenerlo)
 *  - Se requiere el ID del agente que tomó el pedido (campo: agente_id)
 *  - La reserva de stock se realiza automáticamente al crear el pedido
 */
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

    // Solo agentes de call center (rol 'agent' o 'admin') pueden usar este endpoint
    if (decodedToken.role !== 'agent' && decodedToken.role !== 'admin') {
      return NextResponse.json(
        { error: 'Acceso denegado. Se requiere rol de agente.' },
        { status: 403 },
      );
    }

    const body = await request.json();

    // Validación específica de call center: agente_id es obligatorio
    if (!body.agente_id && !body.agenteId && !body.agent_id) {
      return NextResponse.json(
        {
          error: 'Error de validación',
          errores: [
            {
              campo: 'agente_id',
              mensaje:
                'El ID del agente es obligatorio para pedidos de call center',
            },
          ],
        },
        { status: 400 },
      );
    }

    // --- Normalización de datos (Cliente, Dirección, SKU) ---
    // El cliente de call center puede no tener email: se asigna uno temporal.
    const bodyConEmailFallback = {
      ...body,
      cliente: {
        ...((body.cliente as Record<string, unknown>) ?? {}),
        email:
          (body.cliente as Record<string, unknown>)?.email ??
          (body.cliente as Record<string, unknown>)?.mail ??
          // Fallback: email temporal basado en teléfono
          `callcenter+${Date.now()}@sinregistro.local`,
      },
    };

    const normResult = safeNormalizeOrder(bodyConEmailFallback, 'call_center');

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
    const agenteId =
      (body.agente_id as string) ??
      (body.agenteId as string) ??
      (body.agent_id as string);

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

    // --- Persistencia en base de datos ---
    const pedidoPersistido = await persistOrder(
      pedidoNormalizado,
      stateTransition.nextState,
      stockResult.reservas,
      agenteId,
    );

    return NextResponse.json(
      {
        mensaje: 'Pedido Call Center recibido, normalizado y stock reservado',
        pedido: {
          ...pedidoNormalizado,
          estado: stateTransition.nextState,
        },
        pedido_id: pedidoPersistido.id,
        agente_id: agenteId,
        reservas: stockResult.reservas,
        estado: stateTransition.nextState,
        transicion: stateTransition.message,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error procesando pedido Call Center:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor procesando el pedido' },
      { status: 500 },
    );
  }
}
