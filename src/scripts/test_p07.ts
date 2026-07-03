import { createSupportTicket } from '../lib/services/crmClient';

async function main() {
  console.log('--- Iniciando Test Específico: Proyecto 7 (CRM y Clientes) ---');
  
  try {
    const payload = {
      asunto: 'Test de Integración P03 -> P07',
      descripcion: 'Este es un ticket de prueba generado automáticamente para validar la conexión entre Pedidos y CRM.',
      prioridad: 'baja' as const,
      sistema_origen: 'pedidos' as const,
      sistema_id: 'P03' as const,
      cliente_id: 9999, // Mock ID
      pedido_id_ref: 'ORDER-TEST-007'
    };

    console.log('Enviando payload para creación de ticket externo al CRM...');
    
    const result = await createSupportTicket(payload);

    if (result && result.ok) {
      console.log('✅ Conexión con P07 Exitosa.');
      console.log('Ticket creado en el CRM:', JSON.stringify(result.ticket, null, 2));
    } else {
      console.log('❌ Falló la conexión con P07 (Respuesta no OK).');
      console.log('Detalles:', JSON.stringify(result, null, 2));
    }
  } catch (error: any) {
    console.error('❌ Error en el test de P07:');
    console.error(error.message || error);
  }
}

main().catch(console.error);
