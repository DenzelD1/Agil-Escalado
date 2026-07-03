import { sendNotification } from '../lib/services/notificationClient';

async function main() {
  console.log('--- Iniciando Test Específico: Proyecto 6 (Notificaciones) ---');
  
  try {
    const payload = {
      channel: 'email' as const,
      recipient: {
        email: 'test@agilescalado.com',
      },
      subject: 'Prueba de Conexión P06',
      body: {
        email: 'Hola, esta es una notificación de prueba desde el Proyecto 3 (ÁgilEscalado) para verificar nuestra integración con su API.',
      },
    };

    console.log('Enviando payload al servicio de notificaciones...');
    
    const result = await sendNotification(payload);

    if (result.success) {
      console.log('✅ Conexión con P06 Exitosa.');
      console.log('Respuesta del servidor:', JSON.stringify(result.data, null, 2));
    } else {
      console.log('❌ Falló la conexión o la operación con P06.');
      console.log('Detalles del error:', result.error?.message || result.error);
    }
  } catch (error) {
    console.error('Error en el test de P06:', error);
  }
}

main().catch(console.error);
