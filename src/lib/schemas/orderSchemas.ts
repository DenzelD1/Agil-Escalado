import { z } from 'zod';

// ---------------------------------------------------------------------------
// Canal de venta
// ---------------------------------------------------------------------------
export const CanalSchema = z.enum(['web', 'app', 'call_center']);
export type Canal = z.infer<typeof CanalSchema>;

export const PrioridadSchema = z.enum(['alta', 'media', 'baja']);
export type Prioridad = z.infer<typeof PrioridadSchema>;

export const OrderStatusSchema = z.enum([
  'creado',
  'verificado',
  'pagado',
  'listo_para_despacho',
  'entregado',
  'rechazado',
  'cancelado',
]);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

// ---------------------------------------------------------------------------
// Cliente
// Transforma: email → lowercase, nombre/telefono → trim
// ---------------------------------------------------------------------------
export const ClientSchema = z.object({
  /** Identificador opcional proveniente del sistema de autenticación */
  id: z.string().trim().optional(),
  /** Nombre completo del cliente */
  nombre: z.string().trim().min(1, 'El nombre del cliente es requerido'),
  /** Email normalizado a minúsculas */
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('El email del cliente no es válido'),
  /** Teléfono: se conservan solo dígitos y el prefijo '+' */
  telefono: z
    .string()
    .trim()
    .transform((val) => val.replace(/[^+\d]/g, ''))
    .optional(),
});

export type ClientType = z.infer<typeof ClientSchema>;

// ---------------------------------------------------------------------------
// Dirección de envío
// Transforma: todos los campos → trim; region/ciudad → uppercase
// ---------------------------------------------------------------------------
export const AddressSchema = z.object({
  calle: z.string().trim().min(1, 'La calle es requerida'),
  numero: z.string().trim().min(1, 'El número de calle es requerido'),
  ciudad: z
    .string()
    .trim()
    .min(1, 'La ciudad es requerida')
    .transform((val) => val.toUpperCase()),
  region: z
    .string()
    .trim()
    .transform((val) => val.toUpperCase())
    .optional(),
  codigo_postal: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, '').toUpperCase())
    .optional(),
  pais: z
    .string()
    .trim()
    .default('Chile')
    .transform((val) => val.toUpperCase()),
  notas_adicionales: z.string().trim().optional(),
});

export type AddressType = z.infer<typeof AddressSchema>;

// ---------------------------------------------------------------------------
// Ítem del pedido (SKU)
// Transforma: sku → UPPERCASE + trim; precios → 2 decimales
// ---------------------------------------------------------------------------
export const ItemSchema = z.object({
  /** Código de producto normalizado a UPPERCASE */
  sku: z
    .string()
    .trim()
    .min(1, 'El SKU es requerido')
    .transform((val) => val.toUpperCase().replace(/\s+/g, '-')),
  cantidad: z
    .number({ error: 'La cantidad debe ser un número' })
    .int('La cantidad debe ser un entero')
    .positive('La cantidad debe ser mayor a 0'),
  precio_unitario: z
    .number({ error: 'El precio debe ser un número' })
    .min(0, 'El precio no puede ser negativo')
    .transform((val) => Math.round(val * 100) / 100),
  descuento: z
    .number()
    .min(0, 'El descuento no puede ser negativo')
    .max(1, 'El descuento se expresa como fracción (0–1)')
    .default(0),
});

export type ItemType = z.infer<typeof ItemSchema>;

// ---------------------------------------------------------------------------
// Pedido canónico completo
// ---------------------------------------------------------------------------
export const OrderSchema = z.object({
  /** ID proveniente del canal (referencia externa) */
  id_canal: z.string().trim().min(1, 'El ID del canal es requerido'),
  tipo_canal: CanalSchema,
  cliente: ClientSchema,
  direccion_envio: AddressSchema,
  items: z
    .array(ItemSchema)
    .min(1, 'El pedido debe contener al menos un ítem'),
  subtotal: z
    .number()
    .min(0, 'El subtotal no puede ser negativo')
    .transform((val) => Math.round(val * 100) / 100),
  impuestos: z
    .number()
    .min(0, 'Los impuestos no pueden ser negativos')
    .transform((val) => Math.round(val * 100) / 100),
  total: z
    .number()
    .min(0, 'El total no puede ser negativo')
    .transform((val) => Math.round(val * 100) / 100),
  /** Estado inicial siempre es "creado"; se sobreescribe en normalización */
  estado: OrderStatusSchema.default('creado'),
  prioridad: PrioridadSchema.default('media'),
});

export type OrderType = z.infer<typeof OrderSchema>;
