import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { rollbackReservations } from '@/lib/services/stockService';
import { sendNotification } from '@/lib/services/notificationClient';
import { sendOrderToLogistics } from '@/lib/services/shipmentClient';
import { dispatchExternalEvent } from '@/lib/services/externalEventDispatcher';

import { z } from 'zod';

const PaymentWebhookSchema = z.object({
  idOrden: z.string().min(1, "idOrden es requerido"),
  status: z.enum(['APROBADO', 'RECHAZADO']).optional(),
  event: z.enum(['transaction.approved', 'transaction.rejected']).optional(),
  transactionId: z.string().optional(),
  reason: z.string().optional()
}).refine(data => data.status || data.event, {
  message: "Debe proveer status o event",
});

export async function POST(request: Request) {
  try {
    const rawPayload = await request.json();
    
    // Validación con Zod
    const validationResult = PaymentWebhookSchema.safeParse(rawPayload);
    if (!validationResult.success) {
      console.warn("[WebhookPago] Payload inválido:", validationResult.error.format());
      return NextResponse.json({ error: "Faltan campos requeridos o son inválidos", detalles: validationResult.error.format() }, { status: 400 });
    }

    const { idOrden, status, event, transactionId, reason } = validationResult.data;

    const pedido = await prisma.order.findUnique({
      where: { id: idOrden },
      include: { cliente: true, items: true, direccion: true }
    });

    if (!pedido) {
      return NextResponse.json({ error: "Pedido no encontrado en nuestra base de datos" }, { status: 404 });
    }

    // Procesar el pago APROBADO
    if (status === 'APROBADO' || event === 'transaction.approved') {
      await getOrderStateTransition(pedido.estado as any, { type: 'PAGO_APROBADO' }, { orderId: idOrden, publishToRedis: true });
      
      await prisma.order.update({
        where: { id: idOrden },
        data: { estado: 'pagado' }
      });

      // Se avisa al cliente que su pago funcionó usando la integración del Proy 6
      sendNotification({
        channel: "email",
        recipient: { email: pedido.cliente.email },
        subject: `Pago exitoso de tu pedido #${idOrden}`,
        body: { email: `<p>¡Tu pago ha sido aprobado! Pronto enviaremos tus productos.</p>` }
      }).catch(e => console.log("Aviso de pago falló (no critico):", e));

      // Enviar el pedido confirmado al Proyecto 2 (Logística) como listo_para_despacho
      const logisticaResult = await sendOrderToLogistics({
        orderId: idOrden,
        customer: {
          nombre: pedido.cliente.nombre,
          email: pedido.cliente.email,
          telefono: pedido.cliente.telefono ?? undefined,
        },
        address: {
          calle: pedido.direccion?.calle ?? '',
          numero: pedido.direccion?.numero ?? '',
          ciudad: pedido.direccion?.ciudad ?? '',
          region: pedido.direccion?.region ?? undefined,
          codigoPostal: pedido.direccion?.codigoPostal ?? undefined,
          pais: pedido.direccion?.pais ?? 'CHILE',
          notasAdicionales: pedido.direccion?.notasAdicionales ?? undefined,
        },
        items: pedido.items.map(item => ({
          sku: item.sku,
          cantidad: item.cantidad,
        })),
        prioridad: pedido.prioridad,
        canal: pedido.tipoCanal,
      });

      if (logisticaResult.simulated) {
        console.warn(`[WebhookPago] Simulando envío a logística para pedido ${idOrden}: ${logisticaResult.error}`);
      }

      // Transicionar a listo_para_despacho
      await getOrderStateTransition('pagado' as any, { type: 'ENVIAR' }, { orderId: idOrden, publishToRedis: true });

      await prisma.order.update({
        where: { id: idOrden },
        data: { estado: 'listo_para_despacho' }
      });

      // [PROYECTO 9 - ANALÍTICA] Evento listo_para_despacho
      dispatchExternalEvent({
        source: 'orders',
        event_type: 'listo_para_despacho',
        payload: {
          order_id: idOrden,
          customer_id: pedido.cliente.email,
        }
      }).catch(e => console.error("Error despachando evento listo_para_despacho", e));

      return NextResponse.json({
        message: "Pago procesado, pedido actualizado a 'pagado' y enviado a logística",
        logistica: {
          success: logisticaResult.success,
          simulated: logisticaResult.simulated,
          trackingNumber: logisticaResult.trackingNumber,
        }
      }, { status: 200 });
    }

    // Procesar el pago RECHAZADO
    if (status === 'RECHAZADO' || event === 'transaction.rejected') {
      await getOrderStateTransition(pedido.estado as any, { type: 'PAGO_RECHAZADO', error: reason || 'Pago rechazado por la pasarela' }, { orderId: idOrden, publishToRedis: true });
      
      await prisma.order.update({
        where: { id: idOrden },
        data: { estado: 'rechazado' }
      });

      // CRÍTICO: Liberar el stock reservado porque la compra se cayó
      const reservasParaLiberar = pedido.items.map(item => ({
        sku: item.sku,
        cantidad: item.cantidad,
        reserva_id: `rollback-${idOrden}`
      }));
      await rollbackReservations(reservasParaLiberar, 'sistema-webhook').catch(e => console.error("Error liberando stock", e));

      return NextResponse.json({ message: "Pago rechazado, pedido cancelado y stock liberado" }, { status: 200 });
    }

    return NextResponse.json({ error: "Estado de transacción desconocido" }, { status: 400 });

  } catch (error) {
    console.error("Error crítico en el webhook de pagos:", error);
    return NextResponse.json({ error: "Error interno procesando el webhook" }, { status: 500 });
  }
}