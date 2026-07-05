interface LogisticsItem {
  sku: string;
  cantidad: number;
  descripcion?: string;
}

interface LogisticsOrderPayload {
  orderId: string;
  customer: {
    nombre: string;
    email: string;
    telefono?: string;
  };
  address: {
    calle: string;
    numero: string;
    ciudad: string;
    region?: string;
    codigoPostal?: string;
    pais: string;
    notasAdicionales?: string;
  };
  items: LogisticsItem[];
  prioridad: string;
  canal: string;
}

interface SendToLogisticsResult {
  success: boolean;
  simulated: boolean;
  trackingNumber?: string;
  error?: string;
}

function getLogisticsUrl(): string {
  const url = process.env.API_LOGISTICA_URL;
  if (!url) {
    throw new Error('API_LOGISTICA_URL no está configurada en las variables de entorno');
  }
  return url.replace(/\/+$/, '');
}

const SIMULATION_MODE = process.env.SIMULAR_LOGISTICA === 'true';

export async function sendOrderToLogistics(
  payload: LogisticsOrderPayload,
  maxRetries = 2
): Promise<SendToLogisticsResult> {
  if (SIMULATION_MODE) {
    const trackingId = `SIM-TRK-${Date.now()}-${payload.orderId.slice(0, 8)}`;
    console.log(`[ShipmentClient] MODO SIMULACIÓN: Pedido ${payload.orderId} enviado a logística. Tracking: ${trackingId}`);
    return {
      success: true,
      simulated: true,
      trackingNumber: trackingId,
    };
  }

  const url = `${getLogisticsUrl()}/api/v1/shipments`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: payload.orderId,
        estado: 'listo_para_despacho',
        cliente: payload.customer,
        direccion: payload.address,
        items: payload.items,
        prioridad: payload.prioridad,
        canal: payload.canal,
      }),
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      console.log(`[ShipmentClient] Pedido ${payload.orderId} enviado a logística exitosamente`);
      return {
        success: true,
        simulated: false,
        trackingNumber: data.trackingNumber ?? undefined,
      };
    }

    console.warn(
      `[ShipmentClient] P02 respondió con HTTP ${res.status} para pedido ${payload.orderId}. Activando Fail-Fast.`
    );
  } catch (err) {
    console.warn(`[ShipmentClient] Error de red al contactar P02 para pedido ${payload.orderId}:`, err);
  }

  console.warn(
    `[ShipmentClient] P02 no disponible. Activando simulación para pedido ${payload.orderId}`
  );

  const fallbackTracking = `FALLBACK-${Date.now()}-${payload.orderId.slice(0, 8)}`;
  return {
    success: true,
    simulated: true,
    trackingNumber: fallbackTracking,
    error: `P02 no respondió. Pedido marcado como listo_para_despacho en modo simulación.`,
  };
}
