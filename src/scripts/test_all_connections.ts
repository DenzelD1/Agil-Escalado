import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const endpoints = [
  { id: 'P04', name: 'Pasarela UCNPay', url: 'http://localhost:4004/ucnpay/init' },
  { id: 'P05', name: 'Inventario Global', url: 'http://localhost:4000/api/inventory' },
  { id: 'P06', name: 'Notificaciones', url: 'https://ucn-agil-notificaciones.up.railway.app/notifications/send' },
  { id: 'P07', name: 'CRM y Clientes', url: 'https://pgti-proyecto-crm-backend.vercel.app/api/v1/tickets/externo' },
  { id: 'P09', name: 'Analítica BI', url: 'https://analisis-proyecto-ti.onrender.com/v1/events' },
  { id: 'P11', name: 'MochiCode Incidentes', url: 'https://proyecto11-mochicode.onrender.com/api/v1/alertas' },
];

async function main() {
  console.log('--- Iniciando Test de Conexiones Globales ---');
  
  for (const ep of endpoints) {
    try {
      // Usamos GET con un timeout corto para validar alcanzabilidad
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch(ep.url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      console.log(`[${ep.id}] ${ep.name} -> HTTP ${res.status} (${res.statusText})`);
    } catch (err: any) {
      console.log(`[${ep.id}] ${ep.name} -> ERROR DE RED: ${err.message}`);
    }
  }
  
  console.log('--- Test de Conexiones Finalizado ---');
}

main().catch(console.error);
