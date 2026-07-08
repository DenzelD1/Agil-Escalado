import crypto from 'crypto';

async function testReservation(name, quantity) {
  console.log(`\n--- Prueba: ${name} (Cantidad: ${quantity}) ---`);
  try {
    const orderId = crypto.randomUUID();
    const res = await fetch('https://proyectogestordeinventario-production.up.railway.app/api/v1/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer fake-token'
      },
      body: JSON.stringify({
        orderId,
        sku: 'PROD-001', 
        quantity: quantity
      })
    });
    
    console.log("Status Code:", res.status);
    const data = await res.text();
    try {
      console.log("Response Body:", JSON.parse(data));
    } catch {
      console.log("Response Body (Raw):", data);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

async function runAll() {
  await testReservation("Reserva Normal Externa", 1);
}

runAll();
