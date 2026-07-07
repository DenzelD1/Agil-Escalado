import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { type OrderStatus } from '@/lib/machines/orderStateMachine';
import { dispatchExternalEvent } from '@/lib/services/externalEventDispatcher';
import { sendNotification } from '@/lib/services/notificationClient';

import { z } from 'zod';

const ShipmentWebhookSchema = z.object({
  orderId: z.string().min(1, "orderId es requerido"),
  status: z.enum(['ready_for_dispatch', 'in_transit', 'delivered']),
  trackingNumber: z.string().optional(),
  timestamp: z.string().optional(), // ISO date string
});

export async function POST(request: Request) {
  try {
    const rawPayload = await request.json();
    
    // Validación con Zod
    const validationResult = ShipmentWebhookSchema.safeParse(rawPayload);
    if (!validationResult.success) {
      console.warn("[WebhookLogistica] Payload inválido:", validationResult.error.format());
      return NextResponse.json({ error: "Faltan campos requeridos o son inválidos", detalles: validationResult.error.format() }, { status: 400 });
    }

    const { orderId, status, trackingNumber, timestamp } = validationResult.data;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { cliente: true }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido no encontrado' },
        { status: 404 },
      );
    }

    const eventType = status === 'ready_for_dispatch'
      ? ('ENVIAR' as const)
      : status === 'in_transit'
        ? ('EN_TRANSITO' as const)
        : status === 'delivered'
          ? ('ENTREGADO' as const)
          : null;

    if (!eventType) {
      return NextResponse.json(
        {
          error: `Estado de tracking no válido: ${status}. Valores esperados: ready_for_dispatch, in_transit, delivered`,
        },
        { status: 400 },
      );
    }

    const transition = await getOrderStateTransition(
      order.estado as OrderStatus,
      { type: eventType, trackingNumber },
      {
        orderId,
        publishToRedis: true,
        metadata: {
          trackingNumber: trackingNumber ?? undefined,
          source: 'shipping_webhook',
        },
      },
    );

    if (!transition.success) {
      return NextResponse.json(
        { error: transition.message },
        { status: 400 },
      );
    }

    const updateData: Record<string, unknown> = {
      estado: transition.nextState,
      ...(timestamp ? { updatedAt: new Date(timestamp) } : {}),
    };

    await prisma.order.update({
      where: { id: orderId },
      data: updateData as Parameters<typeof prisma.order.update>[0]['data'],
    });

    if (eventType === 'ENVIAR') {
      // [PROYECTO 9 - ANALÍTICA] Evento listo_para_despacho
      dispatchExternalEvent({
        source: 'orders',
        event_type: 'listo_para_despacho',
        payload: {
          order_id: orderId,
          customer_id: order.clienteId || 'desconocido',
        }
      }).catch(e => console.error("Error despachando evento listo_para_despacho", e));

      // [PROYECTO 6 - NOTIFICACIONES] Avisar al cliente
      if (order.cliente?.email) {
        sendNotification({
          channel: 'email',
          recipient: { email: order.cliente.email },
          subject: 'Tu pedido está siendo preparado',
          body: { email: `Tu pedido ${orderId} está en estado: Listo para despacho.` }
        }).catch(e => console.error(e));
      }

    } else if (eventType === 'EN_TRANSITO') {
      // [PROYECTO 9 - ANALÍTICA] Evento pedido_en_transito
      dispatchExternalEvent({
        source: 'orders',
        event_type: 'pedido_en_transito',
        payload: {
          order_id: orderId,
          customer_id: order.clienteId || 'desconocido',
        }
      }).catch(e => console.error("Error despachando evento pedido_en_transito", e));

      // [PROYECTO 6 - NOTIFICACIONES] Avisar al cliente
      if (order.cliente?.email) {
        sendNotification({
          channel: 'email',
          recipient: { email: order.cliente.email },
          subject: 'Tu pedido va en camino',
          body: { email: `Tu pedido ${orderId} ha salido hacia tu domicilio.` }
        }).catch(e => console.error(e));
      }

    } else if (eventType === 'ENTREGADO') {
      // [PROYECTO 9 - ANALÍTICA] Evento pedido_entregado
      dispatchExternalEvent({
        source: 'orders',
        event_type: 'pedido_entregado',
        payload: {
          order_id: orderId,
          customer_id: order.clienteId || 'desconocido',
        }
      }).catch(e => console.error("Error despachando evento pedido_entregado", e));

      // [PROYECTO 6 - NOTIFICACIONES] Avisar al cliente
      if (order.cliente?.email) {
        sendNotification({
          channel: 'email',
          recipient: { email: order.cliente.email },
          subject: 'Tu pedido ha sido entregado',
          body: { email: `Tu pedido ${orderId} fue entregado con éxito.` }
        }).catch(e => console.error(e));
      }
    }

    return NextResponse.json({
      success: true,
      message: transition.message,
      newState: transition.nextState,
      ...(trackingNumber ? { trackingNumber } : {}),
    });
  } catch (error) {
    console.error('Error procesando webhook de envío:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}
