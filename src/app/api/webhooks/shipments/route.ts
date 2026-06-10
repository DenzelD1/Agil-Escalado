import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { type OrderStatus } from '@/lib/machines/orderStateMachine';

export async function POST(request: Request) {
  try {
    const { orderId, status, trackingNumber, timestamp } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: orderId, status' },
        { status: 400 },
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido no encontrado' },
        { status: 404 },
      );
    }

    const eventType = status === 'in_transit'
      ? ('EN_TRANSITO' as const)
      : status === 'delivered'
        ? ('ENTREGADO' as const)
        : null;

    if (!eventType) {
      return NextResponse.json(
        {
          error: `Estado de tracking no válido: ${status}. Valores esperados: in_transit, delivered`,
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
