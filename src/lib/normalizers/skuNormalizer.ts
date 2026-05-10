import { z } from 'zod';
import { ItemSchema, type ItemType } from '@/lib/schemas/orderSchemas';

/**
 * Aliases de campos de ítem/SKU por canal:
 *
 * | Alias entrante                        | Campo canónico  |
 * |---------------------------------------|----------------|
 * | sku, productoId, productId, product_id| sku             |
 * | cantidad, qty, quantity, count        | cantidad        |
 * | precio_unitario, price, unitPrice,    | precio_unitario |
 * |   unit_price, valor                   |                 |
 * | descuento, discount, desc             | descuento       |
 */

interface RawItem {
  // Aliases de SKU
  sku?: unknown;
  productoId?: unknown;
  productId?: unknown;
  product_id?: unknown;

  // Aliases de cantidad
  cantidad?: unknown;
  qty?: unknown;
  quantity?: unknown;
  count?: unknown;

  // Aliases de precio
  precio_unitario?: unknown;
  price?: unknown;
  unitPrice?: unknown;
  unit_price?: unknown;
  valor?: unknown;

  // Aliases de descuento
  descuento?: unknown;
  discount?: unknown;
  desc?: unknown;

  [key: string]: unknown;
}

/**
 * Resuelve y normaliza un único ítem crudo al esquema canónico.
 */
function resolveItem(raw: RawItem): Record<string, unknown> {
  return {
    sku: raw.sku ?? raw.productoId ?? raw.productId ?? raw.product_id,
    cantidad: raw.cantidad ?? raw.qty ?? raw.quantity ?? raw.count,
    precio_unitario:
      raw.precio_unitario ?? raw.price ?? raw.unitPrice ?? raw.unit_price ?? raw.valor,
    descuento: raw.descuento ?? raw.discount ?? raw.desc,
  };
}

/**
 * Normaliza un array de ítems crudos (de cualquier canal) a `ItemType[]`.
 * Lanza `z.ZodError` si algún ítem no es válido.
 *
 * @param rawItems - Array de ítems crudos del payload
 * @returns Array de `ItemType` normalizado y validado
 */
export function normalizeItems(rawItems: RawItem[]): ItemType[] {
  return rawItems.map((raw, index) => {
    try {
      return ItemSchema.parse(resolveItem(raw));
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Prefija los paths con el índice del array para localizar el error
        const prefixedIssues = error.issues.map((issue) => ({
          ...issue,
          path: [index, ...issue.path],
        }));
        throw new z.ZodError(prefixedIssues);
      }
      throw error;
    }
  });
}

/**
 * Versión segura (no lanza). Retorna el resultado o el error Zod.
 */
export function safeNormalizeItems(
  rawItems: RawItem[],
): { success: true; data: ItemType[] } | { success: false; error: z.ZodError } {
  try {
    const data = normalizeItems(rawItems);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error };
    }
    throw error;
  }
}
