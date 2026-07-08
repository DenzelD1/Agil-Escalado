export type IntegrationStatus = 'healthy' | 'degraded' | 'down' | 'pending';

export interface IntegrationNode {
  id: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  lastPing?: string;
  endpoint: string;
}

export const INTEGRATIONS: IntegrationNode[] = [
  { id: 'P04', name: 'Pasarela UCNPay', description: 'Procesamiento de pagos (Proyecto 4)', status: 'pending', lastPing: '-', endpoint: process.env.API_PAGOS_URL ? `${process.env.API_PAGOS_URL}/ucnpay/init` : 'http://localhost:4004/ucnpay/init' },
  { id: 'P05', name: 'Inventario Global', description: 'Gestión de stock (Proyecto 5)', status: 'pending', lastPing: '-', endpoint: 'https://proyectogestordeinventario-production.up.railway.app/api/inventory' },
  { id: 'P06', name: 'Notificaciones', description: 'SMS y Emails (Proyecto 6)', status: 'pending', lastPing: '-', endpoint: 'https://ucn-agil-notificaciones.up.railway.app/notifications/send' },
  { id: 'P07', name: 'CRM y Clientes', description: 'Soporte y VIPs (Proyecto 7)', status: 'pending', lastPing: '-', endpoint: 'https://pgti-proyecto-crm-backend.vercel.app/api/v1/tickets/externo' },
  { id: 'P09', name: 'Analítica BI', description: 'Métricas de negocio (Proyecto 9)', status: 'pending', lastPing: '-', endpoint: 'https://analisis-proyecto-ti.onrender.com/v1/events' },
  { id: 'P11', name: 'MochiCode Incidentes', description: 'Gestión de incidentes (Proyecto 11)', status: 'pending', lastPing: '-', endpoint: 'https://proyecto11-mochicode.onrender.com/api/v1/alertas' },
];

export const DEFAULT_POLL_INTERVAL_MS = 5000;
