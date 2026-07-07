import { z } from 'zod';
import { type Canal, type OrderType, PrioridadSchema } from '@/lib/schemas/orderSchemas';
import { normalizeClient } from '@/lib/normalizers/clientNormalizer';
import { normalizeAddress } from '@/lib/normalizers/addressNormalizer';
import { normalizeItems } from '@/lib/normalizers/skuNormalizer';
import { initialOrderState } from '../machines/orderStateMachine';

/**
 * Errores de normalización estructurados para devolver en las respuestas HTTP.
 */
export interface NormalizationError {
  campo: string;
  mensaje: string;
  valor_recibido?: unknown;
}

/**
 * Resultado de una normalización exitosa.
 */
export interface NormalizedOrder extends OrderType {
  /** UUID generado en el momento de la normalización */
  id_pedido: string;
  /** Timestamp ISO 8601 de recepción del pedido */
  recibido_en: string;
}

/**
 * Convierte los issues de ZodError a nuestro formato de error interno.
 */
function mapZodErrors(error: z.ZodError): NormalizationError[] {
  return error.issues.map((issue) => ({
    campo: issue.path.join('.') || 'raíz',
    mensaje: issue.message,
    valor_recibido: 'received' in issue ? issue.received : undefined,
  }));
}

/**
 * Calcula el subtotal a partir de los ítems normalizados.
 * subtotal = Σ (precio_unitario * cantidad * (1 - descuento))
 */
function calcularSubtotal(items: ReturnType<typeof normalizeItems>): number {
  const raw = items.reduce((acc, item) => {
    const precioConDescuento = item.precio_unitario * (1 - item.descuento);
    return acc + precioConDescuento * item.cantidad;
  }, 0);
  return Math.round(raw * 100) / 100;
}

/**
 * Orquestador principal de normalización.
 *
 * Recibe el body crudo de cualquier canal y retorna un pedido canónico
 * enriquecido con ID interno y timestamp de recepción.
 *
 * Flujo:
 *  1. Normaliza cliente  (aliases por canal → ClientType)
 *  2. Normaliza dirección (aliases por canal → AddressType)
 *  3. Normaliza ítems/SKUs (aliases por canal → ItemType[])
 *  4. Calcula y valida totales
 *  5. Agrega metadatos (id_pedido, recibido_en, estado)
 *
 * @param body  - Payload crudo del request (cualquier canal)
 * @param canal - Canal de origen del pedido
 * @throws `z.ZodError` si la validación falla en algún sub-normalizer
 * @throws `Error`      si los totales no son coherentes (diferencia > 1%)
 */
export function normalizeOrder(
  body: Record<string, unknown>,
  canal: Canal,
): NormalizedOrder {
  // --- 1. Cliente ---
  const cliente = normalizeClient(body.cliente as Record<string, unknown>);

  // --- 2. Dirección de envío ---
  const rawAddress =
    body.direccion_envio ??
    body.shippingAddress ??
    body.shipping_address ??
    body.direccion;
  const direccion_envio = normalizeAddress(rawAddress as Record<string, unknown>);

  // --- 3. Ítems / SKUs ---
  const rawItems =
    body.items ?? body.lineas ?? body.products ?? body.productos;
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new z.ZodError([
      {
        code: z.ZodIssueCode.custom,
        path: ['items'],
        message: 'El pedido debe contener al menos un ítem (items, lineas o products)',
      },
    ]);
  }
  const items = normalizeItems(rawItems as Record<string, unknown>[]);

  // --- 4. Cálculo y validación de totales ---
  const IVA_RATE = 0.19; // 19 % IVA Chile — ajustable por env si es necesario
  const subtotal = calcularSubtotal(items);
  const impuestos = Math.round(subtotal * IVA_RATE * 100) / 100;
  const total = Math.round((subtotal + impuestos) * 100) / 100;

  // Si el cliente envía totales, validamos coherencia (tolerancia 1 %)
  if (typeof body.total === 'number') {
    const diff = Math.abs(body.total - total) / total;
    if (diff > 0.01) {
      throw new Error(
        `Inconsistencia en totales: calculado ${total}, recibido ${body.total}`,
      );
    }
  }

  // --- 5. ID de canal (referencia externa) ---
  const id_canal =
    (body.id_canal as string) ??
    (body.orderId as string) ??
    (body.order_id as string) ??
    (body.referencia as string) ??
    `${canal.toUpperCase()}-${Date.now()}`;

  // --- 6. Ensamblado del pedido canónico ---
  const id_pedido = crypto.randomUUID();
  const recibido_en = new Date().toISOString();

  // Extraer prioridad y validar o usar default
  const rawPrioridad = body.prioridad ?? body.priority ?? 'media';
  const parsedPrioridad = PrioridadSchema.safeParse(rawPrioridad);
  const prioridad = parsedPrioridad.success ? parsedPrioridad.data : 'media';

  return {
    id_pedido,
    recibido_en,
    id_canal,
    tipo_canal: canal,
    cliente,
    direccion_envio,
    items,
    subtotal,
    impuestos,
    total,
    estado: initialOrderState,
    prioridad,
  };
}

/**
 * Versión segura del orquestador. Nunca lanza — retorna éxito o lista de errores.
 */
export function safeNormalizeOrder(
  body: Record<string, unknown>,
  canal: 'web' | 'app' | 'call_center' | 'internal',
):
  | { success: true; data: NormalizedOrder }
  | { success: false; errors: NormalizationError[]; rawError?: unknown } {
  try {
    const data = normalizeOrder(body, canal);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: mapZodErrors(error) };
    }
    if (error instanceof Error) {
      return {
        success: false,
        errors: [{ campo: 'totales', mensaje: error.message }],
        rawError: error.message,
      };
    }
    return {
      success: false,
      errors: [{ campo: 'desconocido', mensaje: 'Error inesperado en la normalización' }],
      rawError: error,
    };
  }
}
