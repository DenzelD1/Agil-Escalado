async function testPayment() {
  const url = 'https://proyectogestordeinventario-production.up.railway.app/api/v1/external/payment-confirmed';
  const apiKey = 'grupo5-dev-key-2026';
  
  const payload = {
    reservationId: 23,
    orderId: '386b234f-bc40-450b-9785-906925b159db'
  };

  console.log('[P3 -> P5] Enviando confirmacion de pago a ' + url + '...');
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey
      },
      body: JSON.stringify(payload)
    });
    
    const text = await response.text();
    console.log('\n=== RESPUESTA DEL PROYECTO 5 ===');
    console.log('Status HTTP: ' + response.status + ' ' + response.statusText);
    console.log('Respuesta:\n' + text);
  } catch (error) {
    console.error('\n❌ Error: ' + error.message);
  }
}
testPayment();
