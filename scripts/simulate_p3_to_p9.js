const { SignJWT } = require('jose');

const EVENTS_URL = 'https://analisis-proyecto-ti.onrender.com/v1/events';
const JWT_SECRET = 'tu_secreto_seguro';

async function generateSystemToken() {
  const secret = new TextEncoder().encode(JWT_SECRET);
  return new SignJWT({ sub: 'system', role: 'system' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(secret);
}

async function simulateP3toP9() {
  const token = await generateSystemToken();
  const orderId = '386b234f-bc40-450b-9785-906925b159db'; // El UUID del pedido de la prueba anterior
  
  const event = {
    source: 'orders',
    event_type: 'pedido_entregado',
    payload: {
      order_id: orderId,
      customer_id: 'clínica_mantenimiento_01'
    }
  };

  console.log('\n=== INICIANDO SIMULACIÓN UAT - PASO 15 y 16 ===');
  console.log('[P3 -> P9] Enviando evento de pedido entregado a BI...');
  console.log('URL:', EVENTS_URL);
  console.log('Payload:', JSON.stringify(event, null, 2));

  try {
    const res = await fetch(EVENTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(event),
    });

    console.log('\n=== RESPUESTA DEL PROYECTO 9 (BI) ===');
    console.log('Status HTTP:', res.status, res.statusText);
    const text = await res.text();
    console.log('Respuesta:', text);

    if (res.ok) {
      console.log('\n✅ ÉXITO: El evento pedido_entregado fue recibido por BI.');
    } else {
      console.error('\n❌ ERROR: BI rechazó el evento.');
    }
  } catch (error) {
    console.error('\n❌ Error de red:', error.message);
  }
}

simulateP3toP9();
