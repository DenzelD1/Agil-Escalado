import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    const orderNumber = await prisma.order.count({
      where: { recibidoEn: { lte: order.recibidoEn } }
    });

    return NextResponse.json({
      nombre_pedido: `Pedido ${orderNumber}`,
      id_pedido: order.id,
      id_canal: order.idCanal,
      canal: order.tipoCanal,
      estado: order.estado,
      prioridad: order.prioridad,
      subtotal: order.subtotal,
      impuestos: order.impuestos,
      total: order.total,
      fecha_creacion: order.recibidoEn,
      cliente: order.cliente ? {
        nombre: order.cliente.nombre,
        email: order.cliente.email,
        telefono: order.cliente.telefono,
      } : null,
      direccion_envio: order.direccionEnvio ? {
        calle: order.direccionEnvio.calle,
        numero: order.direccionEnvio.numero,
        ciudad: order.direccionEnvio.ciudad,
        region: order.direccionEnvio.region,
        pais: order.direccionEnvio.pais,
        codigo_postal: order.direccionEnvio.codigoPostal,
      } : null,
      items: order.items ? order.items.map(item => ({
        sku: item.sku,
        cantidad: item.cantidad,
        precio_unitario: item.precioUnitario,
        descuento: item.descuento,
      })) : [],
    });

  } catch (error) {
    console.error('Error obteniendo pedido externo:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al obtener el pedido' },
      { status: 500 }
    );
  }
}
