import { prisma } from '../src/lib/prisma';

async function main() {
  const order = await prisma.order.findFirst({
    include: {
      cliente: true,
      direccionEnvio: true,
      items: true,
    },
  });

  if (!order) {
    console.log('No orders found');
    return;
  }

  const response = {
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
      calle: order.direccionEnvio.calle,
      numero: order.direccionEnvio.numero,
      ciudad: order.direccionEnvio.ciudad,
      region: order.direccionEnvio.region,
      pais: order.direccionEnvio.pais,
      codigo_postal: order.direccionEnvio.codigoPostal,
    },
    items: order.items.map((item: any) => ({
      sku: item.sku,
      cantidad: item.cantidad,
      precio_unitario: item.precioUnitario,
      descuento: item.descuento,
    })),
  };

  console.log(JSON.stringify(response, null, 2));
}

main().finally(() => prisma.$disconnect());
