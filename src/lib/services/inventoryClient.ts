const INVENTARIO_URL = () => {
  const url = process.env.API_INVENTARIO_URL;
  if (!url) {
    throw new Error('API_INVENTARIO_URL no está configurada en las variables de entorno');
  }
  return url.replace(/\/+$/, '');
};

/**
 * Solicita la reserva de un SKU en el servicio de inventario.
 */
export async function requestReservation(
  sku: string,
  cantidad: number,
  token: string,
): Promise<string> {
  const res = await fetch(`${INVENTARIO_URL()}/stock/reserve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sku, cantidad }),
  });

  if (!res.ok) {
    throw new Error(`Hay un fallo al reservar SKU ${sku} (HTTP ${res.status})`);
  }

  const data = (await res.json()) as { reserva_id?: string; id?: string };
  return data.reserva_id ?? data.id ?? `RSV-${sku}-${Date.now()}`;
}

/**
 * Libera una reserva previa (rollback) con reintentos y exponential backoff.
 */
export async function releaseReservationWithRetry(
  reservaId: string,
  token: string,
  maxRetries = 3
): Promise<void> {
  let attempt = 0;
  
  while (attempt <= maxRetries) {
    try {
      const res = await fetch(`${INVENTARIO_URL()}/reservations/release-reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reserva_id: reservaId }),
      });

      if (res.ok) {
        return; // Success!
      }
      
      console.warn(`[InventoryClient] Fallo al liberar reserva ${reservaId} (HTTP ${res.status}). Intento ${attempt + 1}/${maxRetries + 1}`);
    } catch (err) {
      console.warn(`[InventoryClient] Error de red al liberar reserva ${reservaId}:`, err);
    }

    attempt++;
    if (attempt <= maxRetries) {
      // Exponential backoff: 1s, 2s, 4s
      const delayMs = Math.pow(2, attempt - 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  console.error(`[InventoryClient] CATASTRÓFICO: No se pudo liberar la reserva ${reservaId} tras ${maxRetries + 1} intentos.`);
}

/**
 * Confirma una reserva previa (luego de un pago exitoso).
 */
export async function confirmReservation(
  reservaId: string,
  token: string,
): Promise<void> {
  const res = await fetch(`${INVENTARIO_URL()}/reservations/payment-confirmed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reserva_id: reservaId }),
  });

  if (!res.ok) {
    throw new Error(`[InventoryClient] Fallo al confirmar reserva ${reservaId} (HTTP ${res.status})`);
  }
}
