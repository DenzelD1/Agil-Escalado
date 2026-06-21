import type { ItemType } from '@/lib/schemas/orderSchemas';

export interface StockReservation {
  sku: string;
  cantidad: number;
  reserva_id: string;
}

export interface StockReserveResult {
  success: true;
  reservas: StockReservation[];
}

export interface StockReserveError {
  success: false;
  error: string;
  sku?: string;
  tipo: 'stock_insuficiente' | 'servicio_no_disponible' | 'reserva_fallida';
}

import { requestReservation, releaseReservationWithRetry, confirmReservation } from './inventoryClient';

// API pública

/**
 * Reserva automática de stock para todos los ítems de un pedido.
 *
 * Flujo:
 *  1. Para cada ítem, verifica la disponibilidad.
 *  2. Si hay stock suficiente, solicita la reserva.
 *  3. Si cualquier paso falla, hace rollback de todas las reservas anteriores.
 *
 * @param items - Array de ítems normalizados del pedido
 * @param token - JWT del usuario/agente para autorizar las reservas
 * @returns Resultado con las reservas creadas o detalle del error
 */
export async function reserveStock(
  items: ItemType[],
  token: string,
): Promise<StockReserveResult | StockReserveError> {
  const resultados = await Promise.allSettled(
    items.map(async (item) => {
      try {
        const reservaId = await requestReservation(item.sku, item.cantidad, token);
        return { success: true as const, reserva: { sku: item.sku, cantidad: item.cantidad, reserva_id: reservaId } };
      } catch (err) {
        return { success: false as const, sku: item.sku, err };
      }
    })
  );

  const reservasExitosas: StockReservation[] = [];
  let primerError: { sku: string; err: unknown } | null = null;

  for (const res of resultados) {
    if (res.status === 'fulfilled') {
      if (res.value.success) {
        reservasExitosas.push(res.value.reserva);
      } else if (!primerError) {
        primerError = { sku: res.value.sku, err: res.value.err };
      }
    }
  }

  if (primerError) {
    await rollbackReservations(reservasExitosas, token);
    
    const esErrorDeServicio = primerError.err instanceof Error && primerError.err.message.includes('no disponible');
    const is409 = primerError.err instanceof Error && primerError.err.message.includes('HTTP 409');

    return {
      success: false,
      error: primerError.err instanceof Error ? primerError.err.message : `Error inesperado reservando el SKU: ${primerError.sku}`,
      sku: primerError.sku,
      tipo: is409 ? 'stock_insuficiente' : (esErrorDeServicio ? 'servicio_no_disponible' : 'reserva_fallida')
    };
  }

  return { success: true, reservas: reservasExitosas };
}

/**
 * Libera todas las reservas del array (rollback completo).
 */
export async function rollbackReservations(
  reservas: StockReservation[],
  token: string,
): Promise<void> {
  if (reservas.length === 0) return;

  console.warn(
    `[StockService] Iniciando rollback de ${reservas.length} reserva(s)...`,
  );

  await Promise.allSettled(
    reservas.map((r) => releaseReservationWithRetry(r.reserva_id, token)),
  );

  console.warn('[StockService] Rollback completado.');
}

/**
 * Confirma todas las reservas del array (luego de un pago exitoso).
 */
export async function confirmReservations(
  reservas: StockReservation[],
  token: string,
): Promise<void> {
  if (reservas.length === 0) return;

  console.log(
    `[StockService] Iniciando confirmación de ${reservas.length} reserva(s)...`,
  );

  await Promise.allSettled(
    reservas.map((r) => confirmReservation(r.reserva_id, token)),
  );

  console.log('[StockService] Confirmación completada.');
}
