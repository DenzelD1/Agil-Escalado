const urlMaintenance = 'https://agil-escalado.vercel.app/api/webhooks/maintenance';
const urlPayment = 'https://agil-escalado.vercel.app/api/webhooks/payment';

async function run() {
  console.log('\n=== INICIANDO SIMULACIÓN UAT - PASO 10 y 11 ===');
  console.log('[P1 -> P3] Enviando payload de repuestos a ' + urlMaintenance + '...');
  
  try {
    const resOrder = await fetch(urlMaintenance, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer simulacro_p01_token'
      },
      body: JSON.stringify({
        orderId: 'MANT-2026-005',
        cliente: {
          nombre: 'Clínica Privada (Mantenimiento)',
          email: 'contacto@clinicaprivada.cl',
          telefono: '+56987654321'
        },
        direccion_envio: {
          calle: 'Av. Vitacura',
          numero: '5950',
          ciudad: 'Santiago',
          region: 'Metropolitana',
          codigo_postal: '7630000',
          pais: 'Chile',
          notas_adicionales: 'Entregar al Jefe de Mantenimiento de Equipos'
        },
        items: [
          {
            sku: 'KIT-CUR-001',
            cantidad: 10,
            precio_unitario: 0,
            descuento: 0
          }
        ]
      })
    });
    
    const orderData = await resOrder.json();
    console.log('\n=== RESPUESTA DEL PROYECTO 3 (Creación de Pedido) ===');
    console.log('Status HTTP: ' + resOrder.status);
    console.log('Payload devuelto:\n' + JSON.stringify(orderData, null, 2));

    if (!orderData.pedido_id) {
      console.error('\n❌ ERROR: Ocurrió un problema en la validación o reserva.');
      return;
    }

    console.log('\n=== INICIANDO SIMULACIÓN UAT - PASO 12 (Confirmación de Pago) ===');
    console.log('[P4 -> P3] Enviando pago aprobado a ' + urlPayment + '...');
    const resPayment = await fetch(urlPayment, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-private-key': 'grupo4-pago-key-2026'
      },
      body: JSON.stringify({
        orderId: orderData.pedido_id,
        status: 'approved'
      })
    });

    const paymentData = await resPayment.json();
    console.log('\n=== RESPUESTA DEL PROYECTO 3 (Webhook Pagos) ===');
    console.log('Status HTTP: ' + resPayment.status);
    console.log('Payload devuelto:\n' + JSON.stringify(paymentData, null, 2));

  } catch (error) {
    console.error('Error general de ejecución:', error);
  }
}
run();
