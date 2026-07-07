import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:55432/agil_escalado",
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const client = await prisma.client.upsert({
    where: { email: "cliente.web@example.com" },
    update: {},
    create: {
      nombre: "Cliente Web Demo",
      email: "cliente.web@example.com",
      telefono: "+56912345678",
    },
  });

  const address = await prisma.address.create({
    data: {
      clientId: client.id,
      calle: "Avenida Principal",
      numero: "1234",
      ciudad: "Santiago",
      region: "Metropolitana",
      codigoPostal: "7500000",
      pais: "Chile",
      esDirectionPrincipal: true,
    },
  });

  const order = await prisma.order.upsert({
    where: { idCanal: "WEB-2026-0025" },
    update: {},
    create: {
      idCanal: "WEB-2026-0025",
      tipoCanal: "WEB",
      clienteId: client.id,
      direccionId: address.id,
      subtotal: 150000,
      impuestos: 28500,
      total: 178500,
      estado: "CONFIRMADO",
      prioridad: "MEDIA",
      notas: "Pedido de prueba para integración con CRM",
      items: {
        create: [
          {
            sku: "SKU-001",
            cantidad: 2,
            precioUnitario: 50000,
            descuento: 0,
            subtotal: 100000,
          },
          {
            sku: "SKU-002",
            cantidad: 1,
            precioUnitario: 50000,
            descuento: 0,
            subtotal: 50000,
          },
        ],
      },
    },
    include: { items: true },
  });

  console.log("Seed completado exitosamente:");
  console.log(`  Cliente: ${client.nombre} (${client.id})`);
  console.log(`  Pedido: ${order.idCanal} (${order.id})`);
  console.log(`  Items: ${order.items.length}`);
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
