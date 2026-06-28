import { SignJWT } from 'jose';

const EVENTS_URL = 'https://analisis-proyecto-ti.onrender.com/v1/events';
const JWT_SECRET = 'tu_secreto_seguro'; // Usar el mismo que en .env.local

async function generateSystemToken(): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  return new SignJWT({ sub: 'system', role: 'system' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(secret);
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function dispatchExternalEvent(event: any, token: string) {
  try {
    const res = await fetch(EVENTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });

    if (res.ok) {
      console.log(`✅ Evento ${event.event_type} enviado con éxito (Orden: ${event.payload.order_id})`);
    } else {
      const text = await res.text();
      console.warn(`❌ Fallo al enviar evento ${event.event_type} (HTTP ${res.status}): ${text}`);
    }
  } catch (err) {
    console.error(`🚨 Error de red al enviar evento ${event.event_type}:`, err);
  }
}

async function runFlow(orderId: number, customerId: number) {
  const token = await generateSystemToken();
  console.log(`\n--- Iniciando flujo para Orden ${orderId} ---`);

  const basePayload = {
    order_id: orderId,
    customer_id: customerId,
  };

  // 1. Pedido Creado
  await dispatchExternalEvent({
    source: 'orders',
    event_type: 'pedido_creado',
    payload: {
      ...basePayload,
      sales_channel: 'web',
      total_amount: Math.floor(Math.random() * 50000) + 10000,
      total_items: Math.floor(Math.random() * 5) + 1,
    }
  }, token);
  await sleep(1000);

  // 2. Stock Reservado
  await dispatchExternalEvent({
    source: 'orders',
    event_type: 'stock_reservado',
    payload: basePayload
  }, token);
  await sleep(1000);

  // 3. Pedido Pagado
  await dispatchExternalEvent({
    source: 'orders',
    event_type: 'pedido_pagado',
    payload: basePayload
  }, token);
  await sleep(1000);

  // 4. Listo para Despacho
  await dispatchExternalEvent({
    source: 'orders',
    event_type: 'listo_para_despacho',
    payload: basePayload
  }, token);
  await sleep(1000);

  // 5. Pedido en Tránsito
  await dispatchExternalEvent({
    source: 'orders',
    event_type: 'pedido_en_transito',
    payload: basePayload
  }, token);
  await sleep(2000);

  // 6. Pedido Entregado
  await dispatchExternalEvent({
    source: 'orders',
    event_type: 'pedido_entregado',
    payload: basePayload
  }, token);
}

async function main() {
  const baseOrderId = Math.floor(Math.random() * 10000);
  
  // Enviar 3 pedidos exitosos
  for (let i = 0; i < 3; i++) {
    await runFlow(baseOrderId + i, 100 + i);
  }

  // Enviar 1 pedido fallido (Stock agotado)
  const failedToken = await generateSystemToken();
  const failedOrderId = baseOrderId + 100;
  console.log(`\n--- Iniciando flujo fallido para Orden ${failedOrderId} ---`);
  
  await dispatchExternalEvent({
    source: 'orders',
    event_type: 'pedido_creado',
    payload: {
      order_id: failedOrderId,
      customer_id: 999,
      sales_channel: 'mobile',
      total_amount: 15000,
      total_items: 1,
    }
  }, failedToken);
  await sleep(1000);

  await dispatchExternalEvent({
    source: 'orders',
    event_type: 'stock_agotado',
    payload: {
      order_id: failedOrderId,
      customer_id: 999,
    }
  }, failedToken);

  console.log('\n¡Proceso de simulación de eventos finalizado!');
}

main().catch(console.error);
