import { prisma } from '@/lib/prisma';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { type OrderStatus } from '@/lib/machines/orderStateMachine';
import { dispatchExternalEvent } from '@/lib/services/externalEventDispatcher';

export interface ShipmentRequest {
  orderId: string;
  items: { sku: string; cantidad: number; descripcion?: string }[];
  direccion: {
    calle: string;
    numero: string;
    ciudad: string;
    region?: string;
    codigoPostal?: string;
    pais: string;
  };
  cliente: {
    nombre: string;
    email: string;
    telefono?: string;
  };
}

export interface ShipmentResult {
  success: boolean;
  trackingNumber?: string;
  courier?: string;
  estimatedDays?: number;
  error?: string;
}

const SIMULATED_COURIERS = ['Chilexpress', 'Starken', 'CorreosChile', 'BlueExpress'];
const SIMULATED_ESTIMATED_DAYS = [2, 3, 4, 5, 7];

function generateTrackingNumber(): string {
  const prefix = 'AGS';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const API_LOGISTICA_URL = () => {
  return process.env.API_LOGISTICA_URL || 'http://localhost:4002';
};

export async function createShipment(request: ShipmentRequest): Promise<ShipmentResult> {
  const logPrefix = `[LogisticsClient:${request.orderId}]`;
  console.log(`${logPrefix} Iniciando envío a logística (Proyecto 2)...`);

  try {
    const url = `${API_LOGISTICA_URL()}/api/v1/shipments`;
    const body = {
      orderId: request.orderId,
      items: request.items,
      address: request.direccion,
      customer: request.cliente,
    };

    console.log(`${logPrefix} POST ${url}`);

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`${logPrefix} Logística aceptó el pedido:`, data);
      return {
        success: true,
        trackingNumber: data.trackingNumber,
        courier: data.courier,
        estimatedDays: data.estimatedDays,
      };
    }

    console.warn(`${logPrefix} Logística respondió con HTTP ${res.status}, usando simulación local.`);
  } catch (err) {
    console.warn(`${logPrefix} No se pudo contactar a logística (${(err as Error).message}), usando simulación local.`);
  }

  const trackingNumber = generateTrackingNumber();
  const courier = pickRandom(SIMULATED_COURIERS);
  const estimatedDays = pickRandom(SIMULATED_ESTIMATED_DAYS);

  console.log(`${logPrefix} Envío simulado creado: tracking=${trackingNumber}, courier=${courier}, estimado=${estimatedDays}d`);

  return {
    success: true,
    trackingNumber,
    courier,
    estimatedDays,
  };
}

export async function dispatchToLogistics(
  orderId: string,
  request: ShipmentRequest,
): Promise<{
  success: boolean;
  newState?: string;
  shipment?: ShipmentResult;
  error?: string;
}> {
  const logPrefix = `[LogisticsClient:dispatch:${orderId}]`;
  console.log(`${logPrefix} Iniciando despacho a logística...`);

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return { success: false, error: `Pedido ${orderId} no encontrado` };
  }

  if (order.estado !== 'pagado') {
    return {
      success: false,
      error: `Pedido ${orderId} está en estado '${order.estado}', se requiere 'pagado' para despachar`,
    };
  }

  const shipment = await createShipment(request);
  if (!shipment.success) {
    return { success: false, error: shipment.error || 'Error creando el envío en logística' };
  }

  const transition = await getOrderStateTransition(
    order.estado as OrderStatus,
    { type: 'ENVIAR' },
    {
      orderId,
      publishToRedis: true,
      metadata: {
        trackingNumber: shipment.trackingNumber,
        courier: shipment.courier,
        estimatedDays: shipment.estimatedDays,
        source: 'payment_webhook_auto_dispatch',
      },
    },
  );

  if (!transition.success) {
    console.error(`${logPrefix} Error en transición de estado: ${transition.message}`);
    return { success: false, error: transition.message, shipment };
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      estado: transition.nextState,
    },
  });

  dispatchExternalEvent({
    source: 'orders',
    event_type: 'listo_para_despacho',
    payload: {
      order_id: orderId,
      customer_id: order.clienteId || 'desconocido',
    },
  }).catch(e => console.error(`${logPrefix} Error despachando evento listo_para_despacho`, e));

  console.log(`${logPrefix} Pedido despachado exitosamente: ${transition.message}`);

  return {
    success: true,
    newState: transition.nextState,
    shipment: {
      ...shipment,
      trackingNumber: shipment.trackingNumber,
    },
  };
}
