// Usando fetch nativo de Node 22

async function simulateMaintenance() {
  const url = 'https://agil-escalado.vercel.app/api/webhooks/maintenance';
  const token = 'simulacro_p01_token';
  
  const payload = {
    orderId: 'MANT-2026-001',
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
        sku: 'FILTRO-HEPA-01',
        cantidad: 1,
        precio_unitario: 0,
        descuento: 0
      },
      {
        sku: 'BATERIA-RESPALDO-02',
        cantidad: 1,
        precio_unitario: 0,
        descuento: 0
      }
    ]
  };

  console.log(`\n=== INICIANDO SIMULACIÓN UAT - PASO 10 y 11 ===`);
  console.log(`[P1 -> P3] Enviando payload de repuestos a ${url}...`);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    console.log(`\n=== RESPUESTA DEL PROYECTO 3 ===`);
    console.log(`Status HTTP: ${response.status} ${response.statusText}`);
    console.log(`Payload devuelto:\n${JSON.stringify(data, null, 2)}`);
    
    if (response.status === 201) {
      console.log(`\n✅ ÉXITO: El pedido se generó y se reservó el inventario en P05.`);
    } else {
      console.log(`\n❌ ERROR: Ocurrió un problema en la validación o reserva.`);
    }

  } catch (error) {
    console.error(`\n❌ Falla de conexión. ¿Está corriendo el servidor en localhost:3000?\nError: ${error.message}`);
  }
}

simulateMaintenance();
