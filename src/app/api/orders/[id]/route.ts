import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit } from '@/lib/middlewares/rateLimiter';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const isAllowed = await checkRateLimit(ip);
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Demasiadas peticiones (Rate Limit excedido). Intente más tarde.' },
        { status: 429 }
      );
    }

    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No autorizado. Faltan credenciales.' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID de pedido requerido' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        cliente: true,
        direccion: true,
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido no encontrado' },
        { status: 404 }
      );
    }

    // Retornamos la información básica del pedido
    return NextResponse.json({
      id: order.id,
      estado: order.estado,
      prioridad: order.prioridad,
      subtotal: order.subtotal,
      impuestos: order.impuestos,
      total: order.total,
      fecha_creacion: order.recibidoEn,
      cliente: {
        nombre: order.cliente.nombre,
        email: order.cliente.email,
        telefono: order.cliente.telefono,
      },
      direccion_envio: {
        calle: order.direccion.calle,
        numero: order.direccion.numero,
        ciudad: order.direccion.ciudad,
        region: order.direccion.region,
        pais: order.direccion.pais,
        codigo_postal: order.direccion.codigoPostal,
      },
      items: order.items.map(item => ({
        sku: item.sku,
        cantidad: item.cantidad,
        precio_unitario: item.precioUnitario,
        descuento: item.descuento,
      })),
    });

  } catch (error) {
    console.error('Error obteniendo pedido:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al obtener el pedido' },
      { status: 500 }
    );
  }
}
