async function run() {
  const urlMaintenance = 'https://agil-escalado.vercel.app/api/webhooks/maintenance';
  const urlPayment = 'https://agil-escalado.vercel.app/api/webhooks/payment';
  
  const payload = {
    orden_trabajo_id: 'OT-2026-003',
    tecnico_id: 'TEC-999',
    prioridad: 'alta',
    centro_costo: 'MANT-PISO1',
    exento_pago: true,
    items: [
      {
        sku: 'KIT-CUR-001',
        cantidad: 10,
        precio_unitario: 0,
        descuento: 0
      }
    ]
  };

  console.log('1. [P1 -> P3] Creando Pedido de Mantenimiento...');
  const resOrder = await fetch(urlMaintenance, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer simulacro_p01_token'
    },
    body: JSON.stringify(payload)
  });
  
  const orderData = await resOrder.json();
  console.log(orderData);

  if (!orderData.pedido_id) {
    console.error('❌ Fallo al crear el pedido.');
    return;
  }

  console.log('\n2. [P4 -> P3] Simulando Webhook de Pago (Forzado para Mantenimiento)...');
  const payloadPayment = {
    orderId: orderData.pedido_id,
    status: 'approved'
  };

  const resPayment = await fetch(urlPayment, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-private-key': process.env.API_PAGOS_KEY || 'grupo4-pago-key-2026'
    },
    body: JSON.stringify(payloadPayment)
  });

  const paymentData = await resPayment.json();
  console.log(paymentData);
}
run();
