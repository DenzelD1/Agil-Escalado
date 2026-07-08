async function testPrescription() {
  console.log("Iniciando prueba de creación de pedido por prescripción (UAT Paso 10)...");
  
  const payload = {
    event_type: 'PrescriptionCreated',
    payload: {
      id_canal: 'PRESC-UAT-001',
      cliente: {
        nombre: 'Juan Pérez',
        email: 'juan.perez@example.com',
        telefono: '+56912345678'
      },
      direccion_envio: {
        calle: 'Av. Providencia',
        numero: '1234',
        ciudad: 'Santiago',
        region: 'Metropolitana',
        codigo_postal: '1234567',
        pais: 'Chile'
      },
      items: [
        {
          sku: 'KIT-DOMICILIARIO',
          cantidad: 1,
          precio_unitario: 0,
          descuento: 0
        }
      ]
    }
  };

  try {
    const res = await fetch('http://localhost:3000/api/webhooks/prescriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test_token_dummy',
        'x-api-key': 'crm_secret_p07'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log("Respuesta:");
    console.log(JSON.stringify(data, null, 2));

    if (data.estado === 'pendiente_preparacion') {
      console.log('✅ Prueba exitosa: el pedido saltó el pago y quedó en estado "pendiente_preparacion".');
    } else {
      console.log('❌ Prueba fallida: el estado no es el esperado.');
    }

  } catch (err) {
    console.error("Error en la petición:", err);
  }
}

testPrescription();
