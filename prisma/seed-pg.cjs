const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:55432/agil_escalado',
});

async function main() {
  // 1. Upsert client
  const clientResult = await pool.query(`
    INSERT INTO "Client" (id, nombre, email, telefono, "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, 'Cliente Web Demo', 'cliente.web@example.com', '+56912345678', NOW(), NOW())
    ON CONFLICT (email) DO UPDATE SET nombre = EXCLUDED.nombre
    RETURNING id
  `);
  const clientId = clientResult.rows[0].id;
  console.log('Cliente:', clientId);

  // 2. Create address
  const addrResult = await pool.query(`
    INSERT INTO "Address" (id, "clientId", calle, numero, ciudad, region, "codigoPostal", pais, "esDirectionPrincipal", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, $1, 'Avenida Principal', '1234', 'Santiago', 'Metropolitana', '7500000', 'Chile', true, NOW(), NOW())
    RETURNING id
  `, [clientId]);
  const addressId = addrResult.rows[0].id;
  console.log('Direccion:', addressId);

  // 3. Upsert order
  const orderResult = await pool.query(`
    INSERT INTO "Order" (id, "idCanal", "tipoCanal", "clienteId", "direccionId", subtotal, impuestos, total, estado, prioridad, notas, "recibidoEn", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, 'WEB-2026-0025', 'WEB', $1, $2, 150000, 28500, 178500, 'CONFIRMADO', 'MEDIA', 'Pedido de prueba para integracion con CRM', NOW(), NOW(), NOW())
    ON CONFLICT ("idCanal") DO UPDATE SET estado = 'CONFIRMADO'
    RETURNING id
  `, [clientId, addressId]);
  const orderId = orderResult.rows[0].id;
  console.log('Pedido:', orderId);

  // 4. Delete old items and insert new ones
  await pool.query(`DELETE FROM "Item" WHERE "orderId" = $1`, [orderId]);
  const items = [
    { sku: 'SKU-001', cantidad: 2, precioUnitario: 50000, descuento: 0, subtotal: 100000 },
    { sku: 'SKU-002', cantidad: 1, precioUnitario: 50000, descuento: 0, subtotal: 50000 },
  ];
  for (const item of items) {
    await pool.query(`
      INSERT INTO "Item" (id, "orderId", sku, cantidad, "precioUnitario", descuento, subtotal, "createdAt", "updatedAt")
      VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, NOW(), NOW())
    `, [orderId, item.sku, item.cantidad, item.precioUnitario, item.descuento, item.subtotal]);
  }
  console.log('Items:', items.length);

  // 5. Verify
  const verify = await pool.query(`
    SELECT o."idCanal", o.estado, c.nombre, COUNT(i.id) as item_count
    FROM "Order" o
    JOIN "Client" c ON c.id = o."clienteId"
    LEFT JOIN "Item" i ON i."orderId" = o.id
    WHERE o."idCanal" = 'WEB-2026-0025'
    GROUP BY o."idCanal", o.estado, c.nombre
  `);
  console.log('Verificacion:', JSON.stringify(verify.rows[0], null, 2));
  console.log('Seed completado exitosamente');
}

main()
  .catch((e) => { console.error('Error:', e); process.exit(1); })
  .finally(() => pool.end());
