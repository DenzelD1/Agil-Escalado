import { loadEnvConfig } from '@next/env';
import { initiatePayment } from '../lib/services/paymentClient';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function main() {
  console.log('--- Iniciando Test Específico: Proyecto 4 (Pagos UCNPay) ---');
  
  // Imprimir variables que usará el cliente
  console.log('UCNPAY_URL configurada:', process.env.UCNPAY_URL || process.env.API_PAGOS_URL || 'http://localhost:4004 (Default)');
  
  try {
    const result = await initiatePayment('TEST-ORDER-999', 25000, {
      cliente: 'Prueba AgilEscalado',
      descripcion: 'Test de conexión P04'
    });

    if (result) {
      console.log('✅ Conexión con P04 Exitosa.');
      console.log('Detalles de la transacción:', JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Falló la conexión o iniciación del pago con P04.');
      console.log('Por favor revisa que el servidor de pagos esté corriendo en el puerto indicado o que las credenciales sean válidas.');
    }
  } catch (error) {
    console.error('Error catastrófico en el test de P04:', error);
  }
}

main().catch(console.error);
