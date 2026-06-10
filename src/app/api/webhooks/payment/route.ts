import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { type OrderStatus } from '@/lib/machines/orderStateMachine';
import { rollbackReservations, type StockReservation as StockServiceReservation } from '@/lib/services/stockService';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    const { orderId, status, errorReason } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: orderId, status' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
    }

    // Determine the event based on status
    let eventType: 'PAGO_APROBADO' | 'PAGO_RECHAZADO' = 'PAGO_RECHAZADO';
    if (status === 'success' || status === 'aprobado') {
      eventType = 'PAGO_APROBADO';
    }

    // Attempt transition
    const transition = await getOrderStateTransition(order.estado as OrderStatus, { 
      type: eventType, 
      error: errorReason 
    }, {
      orderId,
      publishToRedis: true,
      metadata: {
        reason: errorReason,
        source: 'payment_webhook',
      },
    });

    if (!transition.success) {
      return NextResponse.json({ error: transition.message }, { status: 400 });
    }

    // Update order in DB
    if (eventType === 'PAGO_RECHAZADO') {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          estado: transition.nextState,
          motivoRechazo: errorReason || 'Pago rechazado por el proveedor',
          intentosPago: { increment: 1 }
        }
      });

      // Lógica de Rollback de Stock
      const reservas = await prisma.stockReservation.findMany({
        where: { orderId }
      });

      if (reservas.length > 0) {
        if (!process.env.JWT_SECRET) {
          throw new Error('JWT_SECRET no configurado');
        }
        // Generar un token de sistema para autorizar el rollback
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ sub: 'system', role: 'system' })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('10m')
          .sign(secret);

        // Llamar a la API de inventario para liberar
        const reservasParaRollback: StockServiceReservation[] = reservas.map(r => ({
          sku: r.sku,
          cantidad: r.cantidad,
          reserva_id: r.reservaId
        }));
        await rollbackReservations(reservasParaRollback, token);

        // Limpiar registros locales
        await prisma.stockReservation.deleteMany({
          where: { orderId }
        });
      }
    } else {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          estado: transition.nextState,
          motivoRechazo: null
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: transition.message,
      newState: transition.nextState
    });

  } catch (error) {
    console.error('Error procesando webhook de pago:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
