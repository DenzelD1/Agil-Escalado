const EVENTS_URL = 'https://analisis-proyecto-ti.onrender.com/v1/events';

async function test() {
  const event = {
    source: "orders",
    event_type: "pedido_creado",
    payload: {
      order_id: 1001,
      customer_id: 100,
      sales_channel: "web",
      total_amount: 50000.00,
      total_items: 2
    }
  };

  const res = await fetch(EVENTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'grupo3-dev-key-2026'
    },
    body: JSON.stringify(event)
  });

  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Body:", text);
}

test();
