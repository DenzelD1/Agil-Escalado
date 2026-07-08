const { execSync } = require('child_process');
const { SignJWT } = require('jose');
const fs = require('fs');

const p4PrivateKey = "sk_f318ee81fdac4339a57d77d2601da4b0";
const p4ApiKey = "pagos_secret_p04";
const jwtSecret = "tu_secreto_seguro";
const crmApiKeyUsToThem = "pedidos_secret_p03";
const crmApiKeyThemToUs = "crm_secret_p07";
const p6ApiKey = "7KpQmXvRnB2sYwZ9eHtJdF5gCuA3LiN8";

async function generateToken() {
  const secret = new TextEncoder().encode(jwtSecret);
  return await new SignJWT({ sub: 'system', role: 'system' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(secret);
}

let logOutput = `=======================================\nRESULTADOS DE PRUEBAS DE INTEGRACIÓN\nFecha: ${new Date().toISOString()}\n=======================================\n\n`;

function log(text) {
  console.log(text);
  logOutput += text + "\n";
}

async function runTests() {
  log("---------------------------------------\n[TEST] P02 (Logística) - Pruebas Unitarias\n---------------------------------------");
  try {
    const out = execSync("npx vitest run tests/services/shipmentClient.test.ts", { encoding: "utf8" });
    log(out);
  } catch (e) {
    log(e.stdout + "\n" + e.stderr);
  }

  log("\n---------------------------------------\n[TEST] P04 (Pagos)\n---------------------------------------");
  try {
    const res = await fetch("https://proyectogestionti.onrender.com/api/ucnpay/init", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-private-key": p4PrivateKey },
      body: JSON.stringify({ idOrden: "TEST-123", monto: 1000, moneda: "CLP", nombreComercio: "Agil Escalado", returnUrl: "http://localhost:3000/checkout/result" })
    });
    log(`P04 Init Pago Status: ${res.status}`);
    log(JSON.stringify(await res.json().catch(()=>null), null, 2));

    const res2 = await fetch("http://localhost:3000/api/webhooks/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-private-key": p4PrivateKey, "x-api-key": p4ApiKey },
      body: JSON.stringify({ orderId: "TEST-WEBHOOK-999", status: "success" })
    });
    log(`P04 Webhook Status: ${res2.status}`);
  } catch (e) { log("Error P04: " + e.message); }

  log("\n---------------------------------------\n[TEST] P05 (Inventario)\n---------------------------------------");
  try {
    const token = await generateToken();
    const res = await fetch("https://proyectogestordeinventario-production.up.railway.app/api/v1/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ orderId: "TEST-P5-ORDER", sku: "MOCK-SKU", quantity: 1 })
    });
    log(`P05 Reserva Status: ${res.status}`);
    log(JSON.stringify(await res.json().catch(()=>null), null, 2));

    const res2 = await fetch("https://proyectogestordeinventario-production.up.railway.app/api/v1/release-reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ reservationId: 999999 })
    });
    log(`P05 Liberar Status: ${res2.status}`);
    log(await res2.text().catch(()=>null));
  } catch (e) { log("Error P05: " + e.message); }

  log("\n---------------------------------------\n[TEST] P06 (Notificaciones)\n---------------------------------------");
  try {
    const res = await fetch("https://ucn-agil-notificaciones.up.railway.app/notifications/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": p6ApiKey },
      body: JSON.stringify({ channel: "email", recipient: { email: "test@test.com" }, subject: "Test", body: { email: "Test" } })
    });
    log(`P06 Status: ${res.status}`);
    log(JSON.stringify(await res.json().catch(()=>null), null, 2));
  } catch (e) { log("Error P06: " + e.message); }

  log("\n---------------------------------------\n[TEST] P07 (CRM)\n---------------------------------------");
  try {
    const res = await fetch("https://pgti-proyecto-crm-backend.vercel.app/api/v1/tickets/externo", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": crmApiKeyUsToThem },
      body: JSON.stringify({ asunto: "Test", descripcion: "Prueba automática", prioridad: "baja", sistema_origen: "pedidos", sistema_id: "P03", cliente_nombre: "Test", cliente_email: "test@test.com" })
    });
    log(`P07 Crear Ticket Status: ${res.status}`);
    log(JSON.stringify(await res.json().catch(()=>null), null, 2));

    const res2 = await fetch("http://localhost:3000/api/orders/WEB-2026-0025", {
      method: "GET",
      headers: { "Content-Type": "application/json", "x-api-key": crmApiKeyThemToUs }
    });
    log(`P07 Consultar Pedido Status: ${res2.status}`);
  } catch (e) { log("Error P07: " + e.message); }

  log("\n---------------------------------------\n[TEST] P09 (Analítica)\n---------------------------------------");
  try {
    const token = await generateToken();
    const res = await fetch("https://analisis-proyecto-ti.onrender.com/v1/events", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ source: "orders", event_type: "test_connectivity", payload: { msg: "Test" } })
    });
    log(`P09 Status: ${res.status}`);
    log(await res.text().catch(()=>null));
  } catch (e) { log("Error P09: " + e.message); }

  log("\n---------------------------------------\n[TEST] P11 (Incidentes)\n---------------------------------------");
  try {
    const res = await fetch("https://ucn-incidentes-p11.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": "p3-incidents-token" },
      body: JSON.stringify({ sistema_id: "P03", creado_en: new Date().toISOString(), payload: { titulo: "Test", descripcion: "Test", prioridad: "baja" } })
    });
    log(`P11 Status: ${res.status}`);
  } catch (e) { log("Error P11: " + e.message); }

  log("\n---------------------------------------\n[TEST] P12 (Identidad)\n---------------------------------------");
  try {
    const res = await fetch("https://underarm-those-stardust.ngrok-free.dev/realms/sistema-centralizado/protocol/openid-connect/certs");
    log(`P12 Status: ${res.status}`);
    const data = await res.json().catch(()=>null);
    if (data && data.keys) {
      log(`Éxito: Se obtuvieron ${data.keys.length} llave(s).`);
    }
  } catch (e) { log("Error P12: " + e.message); }

  fs.writeFileSync('RESULTADOS_INTEGRACION.log', logOutput);
  fs.writeFileSync('RESULTADOS_INTEGRACION.md', `# Resultados de Integración\n\n\`\`\`text\n${logOutput}\n\`\`\``);
  log("\n¡Archivos guardados exitosamente!");
}

runTests();
