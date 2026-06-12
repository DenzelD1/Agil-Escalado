import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/middlewares/rateLimiter';
import { verifyJwt } from '@/lib/jwt';
import { safeNormalizeOrder } from '@/lib/normalizers/orderNormalizer';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { initialOrderState } from '@/lib/machines/orderStateMachine';
import { reserveStock, rollbackReservations } from '@/lib/services/stockService';
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
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const isAllowed = await checkRateLimit(ip);
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Demasiadas peticiones (Rate Limit excedido). Intente más tarde.' },
        { status: 429 }
      );
    }

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

    // Transicion: creado -> verificado (hay validacion)
    let stateTransition = await getOrderStateTransition(initialOrderState, {
      type: 'VALIDACION_EXITOSA',
    }, {
      orderId: normResult.data.id_pedido,
      publishToRedis: true,
    });

    const pedidoNormalizado = normResult.data;
    const agenteId =
      (body.agente_id as string) ??
      (body.agenteId as string) ??
      (body.agent_id as string);

    // --- Reserva automática de stock ---
    const stockResult = await reserveStock(pedidoNormalizado.items, token);

    if (!stockResult.success) {
      // Transicion: verificado -> rechazado (no hay stock suficiente)
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

    let pedidoPersistido;
    try {
      pedidoPersistido = await persistOrder(
        pedidoNormalizado,
        stateTransition.nextState,
        stockResult.reservas,
        agenteId,
      );
    } catch (dbError) {
      console.error('Error persistiendo pedido Call Center en DB:', dbError);
      
      if (stockResult.reservas.length > 0) {
        await rollbackReservations(stockResult.reservas, token);
      }

      return NextResponse.json(
        { error: 'Error interno guardando el pedido. Se ha liberado el inventario reservado.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        mensaje: 'Pedido recibido, normalizado y stock reservado',
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
    console.error('Error procesando pedido:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor procesando el pedido' },
      { status: 500 },
    );
  }
}
