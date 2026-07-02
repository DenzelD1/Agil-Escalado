import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { rollbackReservations } from '@/lib/services/stockService';
import { sendNotification } from '@/lib/services/notificationClient';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    const { idOrden, status, event, transactionId, reason } = payload;

    if (!idOrden || !status) {
      return NextResponse.json({ error: "Faltan campos requeridos (idOrden, status)" }, { status: 400 });
    }

    const pedido = await prisma.order.findUnique({
      where: { id: idOrden },
      include: { cliente: true, items: true }
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

      return NextResponse.json({ message: "Pago procesado y pedido actualizado a 'pagado'" }, { status: 200 });
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