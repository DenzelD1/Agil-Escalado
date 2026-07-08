import crypto from 'crypto';

const skus = ['PROD-001', 'PROD-002', 'TEST-123', 'LOG-MOUSE-WL-002', 'DELL-INS-15-001'];

async function testFullFlow() {
  for (const sku of skus) {
    console.log(`\n--- Prueba: Reserva y Confirmación de SKU: ${sku} ---`);
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
          sku: sku, 
          quantity: 1
        })
      });
      
      const dataText = await res.text();
      let data;
      try { data = JSON.parse(dataText); } catch { data = dataText; }

      if (res.status >= 400) {
        console.log(`[Rechazado] Status: ${res.status}. Error:`, data.message || data);
        continue;
      }
      
      console.log(`[Éxito en Reserva] Status: ${res.status}. Data:`, data);

      const reservationId = data.data?.reservation?.reservationId || data.reservationId || data.data?.reservationId;
      if (!reservationId) {
        console.log("No se pudo extraer reservationId de la respuesta");
        continue;
      }

      console.log(`-> Confirmando reserva ${reservationId}...`);
      const confirmRes = await fetch('https://proyectogestordeinventario-production.up.railway.app/api/v1/external/payment-confirmed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer fake-token',
          'X-Api-Key': 'grupo3-dev-key-2026'
        },
        body: JSON.stringify({
          reservationId: isNaN(Number(reservationId)) ? reservationId : Number(reservationId),
          orderId
        })
      });

      const confirmData = await confirmRes.text();
      let parsedConfirm;
      try { parsedConfirm = JSON.parse(confirmData); } catch { parsedConfirm = confirmData; }
      
      console.log(`[Confirmación] Status: ${confirmRes.status}. Data:`, parsedConfirm);

    } catch (error) {
      console.error("Error general:", error);
    }
  }
}

testFullFlow();
