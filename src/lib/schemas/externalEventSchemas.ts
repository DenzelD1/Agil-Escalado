import { z } from 'zod';

// Tipos de Eventos Soportados
export const ExternalEventTypeSchema = z.enum([
  'pedido_creado',
  'stock_reservado',
  'pedido_pagado',
  'pago_fallido',
  'listo_para_despacho',
  'pedido_en_transito',
  'pedido_entregado',
  'stock_agotado',
]);

// Esquema de Payload Base (para 7 de los 8 eventos)
export const BasePayloadSchema = z.object({
  order_id: z.union([z.string(), z.number()]),
  customer_id: z.union([z.string(), z.number()]),
});

// Esquema de Payload para pedido_creado
export const PedidoCreadoPayloadSchema = BasePayloadSchema.extend({
  sales_channel: z.string().optional(),
  total_amount: z.number().optional(),
  total_items: z.number().int().optional(),
  lista_productos: z.array(z.any()).optional(),
  direccion_despacho: z.any().optional(),
});

// Eventos específicos usando Zod Discriminated Union
export const PedidoCreadoEventSchema = z.object({
  source: z.literal('orders'),
  event_type: z.literal('pedido_creado'),
  payload: PedidoCreadoPayloadSchema,
});

export const GenericExternalEventSchema = z.object({
  source: z.literal('orders'),
  event_type: z.enum([
    'stock_reservado',
    'pedido_pagado',
    'pago_fallido',
    'listo_para_despacho',
    'pedido_en_transito',
    'pedido_entregado',
    'stock_agotado',
  ]),
  payload: BasePayloadSchema,
});

export const ExternalEventSchema = z.discriminatedUnion('event_type', [
  PedidoCreadoEventSchema,
  GenericExternalEventSchema,
]);

// Tipos Inferidos para usar en TypeScript
export type ExternalEvent = z.infer<typeof ExternalEventSchema>;
export type ExternalEventType = z.infer<typeof ExternalEventTypeSchema>;
