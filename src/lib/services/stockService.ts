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

// Helpers internos

const INVENTARIO_URL = () => {
  const url = process.env.API_INVENTARIO_URL;
  if (!url) {
    throw new Error(
      'API_INVENTARIO_URL no está configurada en las variables de entorno',
    );
  }
  return url.replace(/\/+$/, '');
};

/**
 * Consulta la disponibilidad de un SKU en el servicio de inventario.
 */
async function checkAvailability(
  sku: string,
  cantidadRequerida: number,
): Promise<{ disponible: boolean; cantidadDisponible: number }> {
  const res = await fetch(`${INVENTARIO_URL()}/stock/${sku}`);

  if (!res.ok) {
    throw new Error(`Servicio de inventario no disponible (HTTP ${res.status})`);
  }

  const data = (await res.json()) as {
    disponible?: boolean;
    cantidad?: number;
  };

  return {
    disponible:
      (data.disponible ?? true) &&
      (data.cantidad ?? 0) >= cantidadRequerida,
    cantidadDisponible: data.cantidad ?? 0,
  };
}

/**
 * Solicita la reserva de un SKU en el servicio de inventario.
 * Devuelve el ID de reserva generado por el servicio externo.
 */
async function requestReservation(
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
 * Libera una reserva previa (rollback).
 * Se ejecuta en best-effort: si falla el rollback, se registra pero no se
 * relanza el error para no enmascarar la causa original.
 */
async function releaseReservation(
  reservaId: string,
  token: string,
): Promise<void> {
  try {
    await fetch(`${INVENTARIO_URL()}/stock/release`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reserva_id: reservaId }),
    });
  } catch (err) {
    console.error(
      `[StockService] Error al liberar reserva ${reservaId}:`,
      err,
    );
  }
}

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
  const reservasRealizadas: StockReservation[] = [];

  for (const item of items) {
    try {
      // --- 1. Verificar disponibilidad ---
      const { disponible, cantidadDisponible } = await checkAvailability(
        item.sku,
        item.cantidad,
      );

      if (!disponible) {
        await rollbackReservations(reservasRealizadas, token);
        return {
          success: false,
          error: `Stock insuficiente para SKU: ${item.sku}. Disponible: ${cantidadDisponible}, solicitado: ${item.cantidad}`,
          sku: item.sku,
          tipo: 'stock_insuficiente',
        };
      }

      // --- 2. Reservar ---
      const reservaId = await requestReservation(
        item.sku,
        item.cantidad,
        token,
      );

      reservasRealizadas.push({
        sku: item.sku,
        cantidad: item.cantidad,
        reserva_id: reservaId,
      });
    } catch (err) {
      console.error(
        `[StockService] Error al procesar SKU ${item.sku}:`,
        err,
      );

      await rollbackReservations(reservasRealizadas, token);

      const esErrorDeServicio =
        err instanceof Error &&
        err.message.includes('no disponible');

      return {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : `Error inesperado reservando el SKU: ${item.sku}`,
        sku: item.sku,
        tipo: esErrorDeServicio ? 'servicio_no_disponible' : 'reserva_fallida',
      };
    }
  }

  return { success: true, reservas: reservasRealizadas };
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
    reservas.map((r) => releaseReservation(r.reserva_id, token)),
  );

  console.warn('[StockService] Rollback completado.');
}
