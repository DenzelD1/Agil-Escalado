/**
 * Cliente para el sistema CRM/Soporte (Proyecto 7).
 *
 * Documentación de integración: guia-integracion-pedidos(1).md
 *
 * POST /api/v1/tickets/externo
 * Headers: Content-Type, x-api-key
 */

const CRM_BASE_URL = () => {
  const url = process.env.API_CRM_URL || 'https://pgti-proyecto-crm-backend.vercel.app';
  return url.replace(/\/+$/, '');
};

const CRM_API_KEY = () => {
  return process.env.CRM_API_KEY || 'pedidos_secret_p03';
};

export interface CreateTicketPayload {
  asunto: string;
  descripcion?: string;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  sistema_origen: 'pedidos';
  sistema_id: 'P03';
  cliente_id?: number;
  pedido_id_ref?: string;
  suscripcion_id_ref?: string;
  contexto?: string;
}

export interface TicketResponse {
  ok: boolean;
  ticket: {
    id: string;
    asunto: string;
    estado: string;
    prioridad: string;
    canal: string;
    cliente_id: number | null;
    agente_id: string | null;
    fecha_vencimiento_sla: string;
    pedido_id_ref: string | null;
    suscripcion_id_ref: string | null;
    creado_en: string;
    actualizado_en: string;
  };
}

export async function createSupportTicket(
  payload: CreateTicketPayload,
): Promise<TicketResponse> {
  const url = `${CRM_BASE_URL()}/api/v1/tickets/externo`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CRM_API_KEY(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(
      `[CRMClient] Error al crear ticket (HTTP ${response.status}): ${errorBody}`,
    );
  }

  return response.json();
}
