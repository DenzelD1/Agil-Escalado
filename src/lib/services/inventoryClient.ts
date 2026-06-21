const INVENTARIO_URL = () => {
  const url = process.env.API_INVENTARIO_URL;
  if (!url) {
    throw new Error('API_INVENTARIO_URL no está configurada en las variables de entorno');
  }
  return url.replace(/\/+$/, '');
};

/**
 * Consulta la ubicación óptima para reservar stock usando suggest-source.
 */
export async function suggestSource(sku: string, quantity: number, token: string): Promise<string> {
  const url = `${INVENTARIO_URL()}/stock/suggest-source/${sku}?quantity=${quantity}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`Fallo al consultar suggest-source para ${sku} (HTTP ${res.status})`);
  }
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0 || !data[0].location?.id) {
    throw new Error(`No hay ubicación sugerida con stock para ${sku}`);
  }
  return data[0].location.id;
}

/**
 * Solicita la reserva de un SKU en el servicio de inventario.
 */
export async function requestReservation(
  orderId: string,
  sku: string,
  locationId: string,
  cantidad: number,
  token: string,
): Promise<string> {
  const res = await fetch(`${INVENTARIO_URL()}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderId, sku, locationId, quantity: cantidad }),
  });

  if (!res.ok) {
    throw new Error(`Hay un fallo al reservar SKU ${sku} (HTTP ${res.status})`);
  }

  const result = await res.json();
  const reservationId = result.data?.reservationId ?? result.reservationId;
  return String(reservationId ?? `RSV-${sku}-${Date.now()}`);
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
        body: JSON.stringify({ reservationId: isNaN(Number(reservaId)) ? reservaId : Number(reservaId) }),
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
  orderId: string,
  token: string,
): Promise<void> {
  const apiKey = process.env.EXTERNAL_API_KEY || '';
  const res = await fetch(`${INVENTARIO_URL()}/external/payment-confirmed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Api-Key': apiKey,
    },
    body: JSON.stringify({ 
      reservationId: isNaN(Number(reservaId)) ? reservaId : Number(reservaId),
      orderId 
    }),
  });

  if (!res.ok) {
    throw new Error(`[InventoryClient] Fallo al confirmar reserva ${reservaId} (HTTP ${res.status})`);
  }
}
