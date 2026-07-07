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

    // El middleware se encarga de la validación de JWT o de la API Key.
    // Si la request llega aquí, es que está autorizada.

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID de pedido requerido' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { id },
          { idCanal: id }
        ]
      },
      include: {
        cliente: true,
        direccionEnvio: true,
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
      id_canal: order.idCanal,
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
        calle: order.direccionEnvio.calle,
        numero: order.direccionEnvio.numero,
        ciudad: order.direccionEnvio.ciudad,
        region: order.direccionEnvio.region,
        pais: order.direccionEnvio.pais,
        codigo_postal: order.direccionEnvio.codigoPostal,
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
