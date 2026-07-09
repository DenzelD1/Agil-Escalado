async function runE2E() {
  const urlOrder = 'https://agil-escalado.vercel.app/api/mobile';
  const urlPayment = 'https://agil-escalado.vercel.app/api/webhooks/payment';
  
  const payloadOrder = {
    customer_info: {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      phone: '+123456789'
    },
    shipping_details: {
      address: 'Calle Falsa 123',
      city: 'Santiago',
      country: 'Chile'
    },
    items: [
      {
        product_id: 'KIT-CUR-001',
        quantity: 10,
        unit_price: 100
      }
    ],
    metadata: {
      source: 'web'
    }
  };

  console.log('1. Creando pedido WEB...');
  const resOrder = await fetch(urlOrder, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payloadOrder)
  });
  
  const orderData = await resOrder.json();
  console.log(orderData);

  if (!orderData.pedido_id) {
    console.error('Fallo al crear el pedido.');
    return;
  }

  console.log('\n2. Simulando Pago Exitoso (UCNPAY)...');
  const payloadPayment = {
    orderId: orderData.pedido_id,
    status: 'approved'
  };

  const resPayment = await fetch(urlPayment, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-private-key': 'simulacro_p04_key'
    },
    body: JSON.stringify(payloadPayment)
  });

  const paymentData = await resPayment.json();
  console.log(paymentData);
}
runE2E();
