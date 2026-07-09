# Resultados de Integración

```text
=======================================
RESULTADOS DE PRUEBAS DE INTEGRACIÓN
Fecha: 2026-07-08T00:43:43.341Z
=======================================

---------------------------------------
[TEST] P02 (Logística) - Pruebas Unitarias
---------------------------------------

[1m[30m[46m RUN [49m[39m[22m [36mv4.1.10 [39m[90mC:/Users/Pablo/Documents/GitHub/Agil-Escalado[39m

[90mstdout[2m | tests/services/shipmentClient.test.ts[2m > [22m[2mshipmentClient[2m > [22m[2mdebería retornar éxito simulado cuando SIMULAR_LOGISTICA es true
[22m[39m[ShipmentClient] MODO SIMULACIÓN: Pedido ORD-12345 enviado a logística. Tracking: SIM-TRK-1783471431672-ORD-1234

[90mstdout[2m | tests/services/shipmentClient.test.ts[2m > [22m[2mshipmentClient[2m > [22m[2mdebería realizar una petición fetch exitosa si SIMULAR_LOGISTICA es false y la API responde OK
[22m[39m[ShipmentClient] Pedido ORD-12345 enviado a logística exitosamente

 [32m✓[39m tests/services/shipmentClient.test.ts [2m([22m[2m3 tests[22m[2m)[22m[33m 3079[2mms[22m[39m
     [33m[2m✓[22m[39m debería reintentar y hacer fallback a simulación si la API falla persistentemente [33m 3035[2mms[22m[39m

[2m Test Files [22m [1m[32m1 passed[39m[22m[90m (1)[39m
[2m      Tests [22m [1m[32m3 passed[39m[22m[90m (3)[39m
[2m   Start at [22m 20:43:50
[2m   Duration [22m 4.04s[2m (transform 125ms, setup 0ms, import 210ms, tests 3.08s, environment 0ms)[22m



---------------------------------------
[TEST] P04 (Pagos)
---------------------------------------
P04 Init Pago Status: 201
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cmFuc2FjdGlvbklkIjoiNDY1ZGI0NjAtYjI4ZS00OTllLWFjY2ItN2RhMzVmNWFmYmNhIiwiaWRPcmRlbiI6IlRFU1QtMTIzIiwibW9udG8iOjEwMDAsIm1vbmVkYSI6IkNMUCIsIm5vbWJyZUNvbWVyY2lvIjoiUHJveWVjdG8gcGVkaWRvcyIsInJldHVyblVybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9jaGVja291dC9yZXN1bHQiLCJpYXRBdCI6IjIwMjYtMDctMDhUMDA6NDM6NTYuMDQzWiIsImlhdCI6MTc4MzQ3MTQzNiwiZXhwIjoxNzgzNDcyMzM2fQ.R8kTC6JwbRa6qeAB1uk2nkvhTS7DeWVSHJ2Nze-twQY",
  "transactionUrl": "https://frontend-gestionti.onrender.com/checkout/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cmFuc2FjdGlvbklkIjoiNDY1ZGI0NjAtYjI4ZS00OTllLWFjY2ItN2RhMzVmNWFmYmNhIiwiaWRPcmRlbiI6IlRFU1QtMTIzIiwibW9udG8iOjEwMDAsIm1vbmVkYSI6IkNMUCIsIm5vbWJyZUNvbWVyY2lvIjoiUHJveWVjdG8gcGVkaWRvcyIsInJldHVyblVybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9jaGVja291dC9yZXN1bHQiLCJpYXRBdCI6IjIwMjYtMDctMDhUMDA6NDM6NTYuMDQzWiIsImlhdCI6MTc4MzQ3MTQzNiwiZXhwIjoxNzgzNDcyMzM2fQ.R8kTC6JwbRa6qeAB1uk2nkvhTS7DeWVSHJ2Nze-twQY",
  "transactionId": "465db460-b28e-499e-accb-7da35f5afbca",
  "tokenType": "Bearer",
  "expiresIn": "15m"
}
P04 Webhook Status: 500

---------------------------------------
[TEST] P05 (Inventario)
---------------------------------------
P05 Reserva Status: 422
{
  "success": false,
  "message": "Error de validación en los datos de entrada.",
  "errors": [
    {
      "field": "orderId",
      "message": "orderId debe ser un UUID v4 válido."
    }
  ]
}
P05 Liberar Status: 404
{"success":false,"message":"No se encontró una reserva con ID 999999.","error":"No se encontró una reserva con ID 999999."}

---------------------------------------
[TEST] P06 (Notificaciones)
---------------------------------------
P06 Status: 202
{
  "jobId": "e35c362a-6bff-4248-bcd6-df4f6b9584b3",
  "notificationId": "4502453b-ebe7-4b45-8195-05e62b4393c0",
  "message": "Notificación en cola"
}

---------------------------------------
[TEST] P07 (CRM)
---------------------------------------
P07 Crear Ticket Status: 201
{
  "ok": true,
  "ticket": {
    "id": "be81a857-754d-4ddc-9fdb-846334bef1f0",
    "asunto": "Test",
    "estado": "abierto",
    "prioridad": "baja",
    "canal": "email",
    "cliente_id": 16,
    "cliente_nombre": "Cliente 16",
    "agente_id": null,
    "fecha_vencimiento_sla": "2026-07-11T00:44:00.738Z",
    "pedido_id_ref": null,
    "suscripcion_id_ref": null,
    "pago_id_ref": null,
    "salud_ref": null,
    "descripcion": "Prueba automática",
    "resolucion": null,
    "creado_en": "2026-07-08T00:44:00.804Z",
    "actualizado_en": "2026-07-08T00:44:00.804Z"
  }
}
P07 Consultar Pedido Status: 500

---------------------------------------
[TEST] P09 (Analítica)
---------------------------------------
P09 Status: 202
{"status":"acknowledged","event_id":"962dfc93-cf32-4c14-9031-bdf38fc6e530"}

---------------------------------------
[TEST] P11 (Incidentes)
---------------------------------------
P11 Status: 404

---------------------------------------
[TEST] P12 (Identidad)
---------------------------------------
P12 Status: 200
Éxito: Se obtuvieron 2 llave(s).

```