import { loadEnvConfig } from '@next/env';
import { reportIncident } from '../lib/services/incidentReporterClient';

// Carga de variables de entorno desde .env y .env.local
const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function main() {
  console.log('--- Iniciando prueba de Integración con Proyecto 11 ---');

  const testPayload = {
    titulo: 'Alerta de prueba desde Proyecto 3',
    descripcion: 'Esta es una alerta de prueba para validar la normalización de payloads e integración fluida solicitada por el Grupo 11.',
    prioridad: 'alta' as const,
    // Metadatos internos extra para auditoría
    id_ticket_interno: `TEST-${Date.now()}`,
    estado_servidor: '500',
    agente_asignado: 'Autobot-P03',
  };

  try {
    console.log('Enviando payload:', JSON.stringify(testPayload, null, 2));
    await reportIncident(testPayload);
    console.log('--- Prueba de Integración finalizada exitosamente ---');
  } catch (error) {
    console.error('Error durante la prueba de integración:', error);
  }
}

main().catch(console.error);
