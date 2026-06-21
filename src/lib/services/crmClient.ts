/**
 * Cliente para el sistema CRM/Soporte (Proyecto 7).
 */

const CRM_URL = () => {
  const url = process.env.API_CRM_URL || 'http://localhost:4007';
  return url.replace(/\/+$/, '');
};

/**
 * Crea un ticket de soporte de manera asíncrona en el CRM.
 * Ideal para escalar pedidos con fallos graves (pagos rechazados o fallos de stock persistentes).
 * 
 * @param orderId UUID del pedido fallido
 * @param clienteId UUID del cliente afectado
 * @param issue Título o descripción corta del problema
 * @param details Objeto opcional con contexto técnico para los agentes
 */
export async function createSupportTicket(
  orderId: string,
  clienteId: string,
  issue: string,
  details?: Record<string, unknown>,
): Promise<void> {
  const url = `${CRM_URL()}/tickets`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pedido_id_ref: orderId,
        cliente_id: clienteId, // El MER dice Int, pero le pasamos nuestro identificador
        asunto: issue,
        estado: 'Abierto',
        prioridad: 'Alta',
        canal: 'App',
        // Pasamos details como parte del payload adicional por si su API lo procesa o lo mete a la Interaccion
        ...details
      }),
    });

    if (!res.ok) {
      console.warn(`[CRMClient] Advertencia al crear ticket (HTTP ${res.status})`);
    } else {
      console.log(`[CRMClient] Ticket escalado exitosamente para el pedido: ${orderId}`);
    }
  } catch (err) {
    console.error(`[CRMClient] Error de red contactando al CRM:`, err);
  }
}
