import { prisma } from "@/lib/prisma";
import type { NormalizedOrder } from "@/lib/normalizers/orderNormalizer";
import type { StockReservation } from "@/lib/services/stockService";

// ---------------------------------------------------------------------------
// Tipos de retorno
// ---------------------------------------------------------------------------

export interface PersistedOrder {
  id: string;
  idCanal: string;
  tipoCanal: string;
  estado: string;
  prioridad: string;
  subtotal: number;
  impuestos: number;
  total: number;
  agenteId: string | null;
  recibidoEn: Date;
  cliente: {
    id: string;
    nombre: string;
    email: string;
    telefono: string | null;
  };
  direccion: {
    id: string;
    calle: string;
    numero: string;
    ciudad: string;
    region: string | null;
    codigoPostal: string | null;
    pais: string;
  };
  items: {
    id: string;
    sku: string;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
  }[];
  stockReservations: {
    id: string;
    sku: string;
    cantidad: number;
    reservaId: string;
  }[];
}

// ---------------------------------------------------------------------------
// Servicio de persistencia de pedidos
// ---------------------------------------------------------------------------

/**
 * Persiste un pedido normalizado en la base de datos.
 *
 * Flujo dentro de una transacción:
 *  1. Upsert del cliente (por email único)
 *  2. Creación de la dirección de envío (vinculada al cliente)
 *  3. Creación del pedido con ítems y reservas de stock
 *
 * @param order    - Pedido normalizado proveniente del orquestador
 * @param estado   - Estado final del pedido (ej. "verificado")
 * @param reservas - Reservas de stock realizadas (puede estar vacío)
 * @param agenteId - ID del agente de call center (opcional)
 */
export async function persistOrder(
  order: NormalizedOrder,
  estado: string,
  reservas: StockReservation[] = [],
  agenteId?: string,
): Promise<PersistedOrder> {
  return prisma.$transaction(async (tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0]) => {
    // --- 1. Upsert del cliente por email ---
    const cliente = await tx.client.upsert({
      where: { email: order.cliente.email },
      update: {
        nombre: order.cliente.nombre,
        telefono: order.cliente.telefono ?? null,
      },
      create: {
        nombre: order.cliente.nombre,
        email: order.cliente.email,
        telefono: order.cliente.telefono ?? null,
      },
    });

    // --- 2. Crear dirección de envío ---
    const direccion = await tx.address.create({
      data: {
        calle: order.direccion_envio.calle,
        numero: order.direccion_envio.numero,
        ciudad: order.direccion_envio.ciudad,
        region: order.direccion_envio.region ?? null,
        codigoPostal: order.direccion_envio.codigo_postal ?? null,
        pais: order.direccion_envio.pais,
        notasAdicionales: order.direccion_envio.notas_adicionales ?? null,
        clienteId: cliente.id,
      },
    });

    // --- 3. Crear pedido con ítems y reservas ---
    const pedido = await tx.order.create({
      data: {
        id: order.id_pedido,
        idCanal: order.id_canal,
        tipoCanal: order.tipo_canal,
        estado,
        prioridad: order.prioridad,
        subtotal: order.subtotal,
        impuestos: order.impuestos,
        total: order.total,
        agenteId: agenteId ?? null,
        clienteId: cliente.id,
        direccionId: direccion.id,
        items: {
          create: order.items.map((item) => ({
            sku: item.sku,
            cantidad: item.cantidad,
            precioUnitario: item.precio_unitario,
            descuento: item.descuento,
          })),
        },
        stockReservations: {
          create: reservas.map((r) => ({
            sku: r.sku,
            cantidad: r.cantidad,
            reservaId: r.reserva_id,
          })),
        },
      },
      include: {
        cliente: true,
        direccion: true,
        items: true,
        stockReservations: true,
      },
    });

    return pedido;
  });
}
