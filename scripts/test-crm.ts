import { createSupportTicket } from '../src/lib/services/crmClient';

async function testCrm() {
  console.log('Iniciando prueba de conexión con CRM (Proyecto 7)...');
  try {
    const response = await createSupportTicket({
      asunto: 'Ticket de Prueba - Integración P03',
      descripcion: 'Este es un ticket de prueba generado para verificar la conexión entre Orders y CRM.',
      prioridad: 'baja',
      sistema_origen: 'pedidos',
      sistema_id: 'P03',
      cliente_nombre: 'Usuario Test',
      cliente_email: 'test@example.com',
      pedido_id_ref: 'test-order-12345',
      contexto: JSON.stringify({ note: 'Prueba de integración exitosa' }),
    });

    console.log('✅ Prueba EXITOSA. Respuesta del CRM:');
    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('❌ Error en la prueba de conexión:');
    console.error(error);
  }
}

testCrm();
