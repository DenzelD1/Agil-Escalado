import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { type OrderStatus } from '@/lib/machines/orderStateMachine';
import { rollbackReservations, confirmReservations, type StockReservation as StockServiceReservation } from '@/lib/services/stockService';
import { SignJWT } from 'jose';
import { dispatchExternalEvent } from '@/lib/services/externalEventDispatcher';
import { createSupportTicket } from '@/lib/services/crmClient';

function validateUcnpayPrivateKey(request: Request) {
  const privateKey = request.headers.get('x-private-key');
  const expected = process.env.UCNPAY_PRIVATE_KEY || process.env.API_PAGOS_KEY;

  if (!privateKey || !expected || privateKey !== expected) {
    return NextResponse.json(
      { error: 'Clave privada de UCNPAY inválida o ausente' },
      { status: 401 }
    );
  }

  return null;
}

export async function POST(request: Request) {
  const validationResponse = validateUcnpayPrivateKey(request);
  if (validationResponse) return validationResponse;
  try {
    const body: any = await request.json();

    const orderId =
      body.orderId ||
      body.idOrden ||
      body.id_orden ||
      body.order_id ||
      body.id;

    let status = body.status;
    if (!status && body.event) {
      if (body.event === 'transaction.approved') {
        status = 'APROBADO';
      } else if (body.event === 'transaction.rejected') {
        status = 'RECHAZADO';
      }
    }

    const errorReason = body.reason || body.errorReason || body.error || body.motivo || body.statusReason;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: orderId / idOrden y status' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return NextResponse.json({ error: 'Pedido no encontrado' }, { status: 404 });
    }

    let eventType: 'PAGO_APROBADO' | 'PAGO_RECHAZADO' = 'PAGO_RECHAZADO';
    if (
      status === 'success' ||
      status === 'aprobado' ||
      status === 'APROBADO' ||
      status === 'approved'
    ) {
      eventType = 'PAGO_APROBADO';
    }

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
        const reservasParaRollback: StockServiceReservation[] = reservas.map((r: { sku: string; cantidad: number; reservaId: string }) => ({
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

      // Notificar a Analítica
      dispatchExternalEvent({
        source: 'orders',
        event_type: 'pago_fallido',
        payload: {
          order_id: orderId,
          customer_id: order.clienteId || 'desconocido',
        }
      }).catch(e => console.error("Error despachando evento pago_fallido", e));

      // Escalar al CRM
      createSupportTicket({
        asunto: 'Pago rechazado - Pedido',
        descripcion: errorReason || 'Pago rechazado por el proveedor',
        prioridad: 'alta',
        sistema_origen: 'pedidos',
        sistema_id: 'P03',
        pedido_id_ref: orderId,
        contexto: JSON.stringify({ status, reason: errorReason }),
      }).catch(e => console.error("Error escalando ticket CRM", e));

    } else {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          estado: transition.nextState,
          motivoRechazo: null
        }
      });

      // Lógica de confirmación de Stock
      const reservas = await prisma.stockReservation.findMany({
        where: { orderId }
      });

      if (reservas.length > 0) {
        if (!process.env.JWT_SECRET) {
          throw new Error('JWT_SECRET no configurado');
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ sub: 'system', role: 'system' })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('10m')
          .sign(secret);

        const reservasParaConfirmacion = reservas.map((r: { sku: string; cantidad: number; reservaId: string }) => ({
          sku: r.sku,
          cantidad: r.cantidad,
          reserva_id: r.reservaId
        }));
        await confirmReservations(reservasParaConfirmacion, token, orderId);
      }

      // Notificar a Analítica
      dispatchExternalEvent({
        source: 'orders',
        event_type: 'pedido_pagado',
        payload: {
          order_id: orderId,
          customer_id: order.clienteId || 'desconocido',
        }
      }).catch(e => console.error("Error despachando evento pedido_pagado", e));
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
