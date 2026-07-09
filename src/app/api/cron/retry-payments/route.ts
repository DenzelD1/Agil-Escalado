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
        estado: 'ERROR' as any,
        intentosPago: {
          lt: MAX_RETRIES
        },
        motivoRechazo: {
          not: null
        }
      },
      take: 10 //Lo procesa en lotes de 10
    });

    const results = [];

    for (const order of failedOrders) {
      // Se intenta pasarlo a verificado a través del evento REINTENTAR
      const transition = await getOrderStateTransition(order.estado as any, { type: 'REINTENTAR' }, {
        orderId: order.id,
        publishToRedis: true,
      });

      if (transition.success) {
        // Actualizar el estado de la orden para que el cronjob/webhook simule el reintento
        await prisma.order.update({
          where: { id: order.id },
          data: {
            estado: transition.nextState as any,
          }
        });
        results.push({ orderId: order.id, status: 'Reintentado', nextState: transition.nextState });

        console.log(`[Retry-Payment] Pedido ${order.id} reintentado`);
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
    console.error('Error  al reintentar pagos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
