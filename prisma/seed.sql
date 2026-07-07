-- Seed data for agil_escalado

-- Insert client
INSERT INTO "Client" (id, nombre, email, telefono, "createdAt", "updatedAt")
VALUES (gen_random_uuid()::text, 'Cliente Web Demo', 'cliente.web@example.com', '+56912345678', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Get client id
WITH client_data AS (
  SELECT id FROM "Client" WHERE email = 'cliente.web@example.com'
),
address_data AS (
  INSERT INTO "Address" (id, "clientId", calle, numero, ciudad, region, "codigoPostal", pais, "esDirectionPrincipal", "createdAt", "updatedAt")
  SELECT gen_random_uuid()::text, client_data.id, 'Avenida Principal', '1234', 'Santiago', 'Metropolitana', '7500000', 'Chile', true, NOW(), NOW()
  FROM client_data
  RETURNING id
),
order_data AS (
  INSERT INTO "Order" (id, "idCanal", "tipoCanal", "clienteId", "direccionId", subtotal, impuestos, total, estado, prioridad, notas, "recibidoEn", "createdAt", "updatedAt")
  SELECT gen_random_uuid()::text, 'WEB-2026-0025', 'WEB', client_data.id, address_data.id, 150000, 28500, 178500, 'CONFIRMADO', 'MEDIA', 'Pedido de prueba para integracion con CRM', NOW(), NOW(), NOW()
  FROM client_data, address_data
  ON CONFLICT ("idCanal") DO NOTHING
  RETURNING id
)
INSERT INTO "Item" (id, "orderId", sku, cantidad, "precioUnitario", descuento, subtotal, "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, order_data.id, sku, cantidad, precio, descuento, subtotal, NOW(), NOW()
FROM order_data, (VALUES
  ('SKU-001', 2, 50000, 0, 100000),
  ('SKU-002', 1, 50000, 0, 50000)
) AS items(sku, cantidad, precio, descuento, subtotal);

SELECT 'Seed completed successfully' AS result;
