import { safeNormalizeOrder } from '@/lib/normalizers/orderNormalizer';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { initialOrderState } from '@/lib/machines/orderStateMachine';
import { reserveStock, rollbackReservations } from '@/lib/services/stockService';
import { persistOrder } from '@/lib/services/orderPersistence';
import { initiatePayment } from '@/lib/services/paymentClient';
import { dispatchExternalEvent } from '@/lib/services/externalEventDispatcher';
import { createSupportTicket } from '@/lib/services/crmClient';
import { reportIncident } from '@/lib/services/incidentReporterClient';
import { APP_CONSTANTS } from '@/lib/constants';

export async function processIncomingOrder(
  body: any,
  channel: 'web' | 'app' | 'call_center' | 'internal',
  token: string,
  agenteId?: string
) {
  // 1. Normalización de datos
  const normResult = safeNormalizeOrder(body, channel);

  if (!normResult.success) {
    // Transicion: creado -> rechazado (para validacion fallida)
    const stateTransition = await getOrderStateTransition(initialOrderState, {
      type: 'VALIDACION_FALLIDA',
      error: `Validación rechazada: ${normResult.errors.map((e) => e.mensaje).join('; ')}`,
    }, { publishToRedis: true });

    return {
      status: 400,
      body: {
        error: 'Error de validación y normalización de datos',
        errores: normResult.errors,
        estado: stateTransition.nextState,
        transicion: stateTransition.message,
      }
    };
  }

  // Transicion: creado -> verificado (para validacion exitosa)
  let stateTransition = await getOrderStateTransition(initialOrderState, {
    type: 'VALIDACION_EXITOSA',
  }, {
    orderId: normResult.data.id_pedido,
    publishToRedis: true,
  });

  const pedidoNormalizado = normResult.data;

  // 2. Reserva automática de stock
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
        prioridad: APP_CONSTANTS.DEFAULT_SUPPORT_PRIORITY,
        sistema_origen: APP_CONSTANTS.SYSTEM_NAME,
        sistema_id: APP_CONSTANTS.SYSTEM_ID,
        pedido_id_ref: pedidoNormalizado.id_pedido,
        cliente_nombre: pedidoNormalizado.cliente.nombre,
        cliente_email: pedidoNormalizado.cliente.email,
      }).catch(e => console.error("Error creando ticket CRM por stock insuficiente", e));
    }

    const statusCode = stockResult.tipo === 'stock_insuficiente' ? 409 : 503;
    return {
      status: statusCode,
      body: {
        error: stockResult.error,
        sku: stockResult.sku,
        tipo: stockResult.tipo,
        estado: stateTransition.nextState,
        transicion: stateTransition.message,
      }
    };
  }

  // 3. Persistencia en Base de Datos
  let pedidoPersistido;
  try {
    pedidoPersistido = await persistOrder(
      pedidoNormalizado,
      stateTransition.nextState,
      stockResult.reservas,
      agenteId
    );
  } catch (dbError) {
    console.error('Error persistiendo pedido en DB:', dbError);
    
    if (stockResult.reservas.length > 0) {
      await rollbackReservations(stockResult.reservas, token);
    }

    reportIncident({
      titulo: `Falla al persistir pedido en Base de Datos (${channel})`,
      descripcion: `Error: ${dbError instanceof Error ? dbError.message : String(dbError)}`,
      prioridad: APP_CONSTANTS.DEFAULT_SUPPORT_PRIORITY,
      sistema_origen: APP_CONSTANTS.SYSTEM_NAME,
    }).catch(e => console.error('Error reportando incidente', e));

    return {
      status: 500,
      body: { error: 'Error interno guardando el pedido. Se ha liberado el inventario reservado.' }
    };
  }

  // 4. Notificar a Analítica (Proyecto 9)
  dispatchExternalEvent({
    source: 'orders',
    event_type: 'pedido_creado',
    payload: {
      order_id: pedidoPersistido.id,
      customer_id: pedidoNormalizado.cliente.email || 'desconocido',
      sales_channel: pedidoNormalizado.tipo_canal,
      total_amount: pedidoNormalizado.total,
      total_items: pedidoNormalizado.items.reduce((acc: number, item: any) => acc + item.cantidad, 0),
      lista_productos: pedidoNormalizado.items,
      direccion_despacho: pedidoNormalizado.direccion_envio,
    }
  }).catch(e => console.error("Error despachando evento pedido_creado", e));

  // 5. Gestión Especial para Flujo Exento (Internal B2B)
  if (channel === 'internal' && (pedidoNormalizado.total === 0 || body.exento_pago === true)) {
    let finalTransition = await getOrderStateTransition(stateTransition.nextState, {
      type: 'EXENTO_DE_PAGO'
    }, {
      orderId: pedidoPersistido.id,
      publishToRedis: true,
      metadata: { method: 'internal_b2b', approvedBy: 'system' }
    });

    if (!finalTransition.success) {
      return {
        status: 400,
        body: { error: finalTransition.message }
      };
    }
    
    return {
      status: 201,
      body: {
        mensaje: 'Pedido Interno B2B procesado y liberado automáticamente',
        pedido: {
          ...pedidoNormalizado,
          estado: finalTransition.nextState,
        },
        pedido_id: pedidoPersistido.id,
        reservas: stockResult.reservas,
        estado: finalTransition.nextState,
        transicion: finalTransition.message,
      }
    };
  }

  // 6. Iniciar pago (P04) para flujos normales
  const paymentResult = await initiatePayment(
    pedidoPersistido.id,
    pedidoNormalizado.total,
    { cliente: pedidoNormalizado.cliente },
  );

  return {
    status: 201,
    body: {
      mensaje: `Pedido ${channel} recibido, normalizado y stock reservado`,
      pedido: {
        ...pedidoNormalizado,
        estado: stateTransition.nextState,
      },
      pedido_id: pedidoPersistido.id,
      reservas: stockResult.reservas,
      estado: stateTransition.nextState,
      transicion: stateTransition.message,
      pago: paymentResult
        ? {
            transactionUrl: paymentResult.transactionUrl,
            transactionId: paymentResult.transactionId,
          }
        : undefined,
    }
  };
}
