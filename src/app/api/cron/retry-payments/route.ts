import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';

const MAX_RETRIES = 3;

export async function GET(request: Request) {
  try {
    // Buscar pedidos en estado rechazado, que el rechazo contenga "pago", "rechazado", o no esté vacío, 
    // y no excedan el máximo de reintentos
    const failedOrders = await prisma.order.findMany({
      where: {
        estado: 'rechazado',
        intentosPago: {
          lt: MAX_RETRIES
        },
        motivoRechazo: {
          not: null
        }
      },
      take: 10 // Procesar en lotes de 10
    });

    const results = [];

    for (const order of failedOrders) {
      // Intentar pasarlo a verificado mediante el evento REINTENTAR
      const transition = getOrderStateTransition(order.estado as any, { type: 'REINTENTAR' });

      if (transition.success) {
        // Actualizar el estado de la orden para que el cronjob/webhook simule reintento
        await prisma.order.update({
          where: { id: order.id },
          data: {
            estado: transition.nextState,
            // Podríamos limpiar el motivo de rechazo si quisiéramos,
            // pero lo dejamos para tener un histórico hasta que pase o falle
          }
        });
        results.push({ orderId: order.id, status: 'Reintentado', nextState: transition.nextState });
        
        // Aquí en un sistema real, se dispararía el cobro de nuevo hacia la pasarela de pagos.
        console.log(`[Retry-Payment] Pedido ${order.id} reintentado (Intento ${order.intentosPago + 1}/${MAX_RETRIES})`);
      } else {
        results.push({ orderId: order.id, status: 'Error', message: transition.message });
      }
    }

    return NextResponse.json({
      success: true,
      processed: failedOrders.length,
      results
    });

  } catch (error) {
    console.error('Error reintentando pagos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
