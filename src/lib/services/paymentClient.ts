/**
 * Cliente para el sistema de Pagos UCNPAY.
 */

export interface InitiatePaymentResult {
  transactionUrl?: string;
  transactionId?: string;
  token?: string;
}

function UCNPAY_URL() {
  const url = process.env.UCNPAY_URL || process.env.API_PAGOS_URL || 'http://localhost:4004';
  return url.replace(/\/+$/, '');
}

function UCNPAY_PRIVATE_KEY(): string | undefined {
  return process.env.UCNPAY_PRIVATE_KEY || process.env.API_PAGOS_KEY;
}

function getReturnUrl() {
  return (
    process.env.UCNPAY_RETURN_URL ||
    process.env.BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'http://localhost:3000'
  );
}

/**
 * Inicia el proceso de cobro de un pedido en UCNPAY.
 * Retorna información de la transacción para que el frontend pueda redirigir al checkout.
 */
export async function initiatePayment(
  orderId: string,
  amount: number,
  metadata?: Record<string, unknown>,
): Promise<InitiatePaymentResult | null> {
  const url = `${UCNPAY_URL()}/ucnpay/init`;
  const privateKey = UCNPAY_PRIVATE_KEY();

  if (!privateKey) {
    console.warn('[PaymentClient] No se encontró UCNPAY_PRIVATE_KEY en las variables de entorno');
    return null;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-private-key': privateKey,
      },
      body: JSON.stringify({
        idOrden: orderId,
        monto: amount,
        moneda: 'CLP',
        nombreComercio: process.env.UCNPAY_MERCHANT_NAME || 'Agil Escalado',
        returnUrl: `${getReturnUrl()}/checkout/result`,
      }),
    });

    const responseBody = await res.json().catch(() => null);

    if (!res.ok) {
      console.warn(
        `[PaymentClient] UCNPAY init falló para pedido ${orderId} (HTTP ${res.status})`,
        responseBody,
      );
      return null;
    }

    console.log(`[PaymentClient] Pago UCNPAY iniciado para pedido ${orderId}`);
    return {
      transactionUrl: responseBody?.transactionUrl,
      transactionId: responseBody?.transactionId,
      token: responseBody?.token,
    };
  } catch (err) {
    console.error('[PaymentClient] Error de red contactando a UCNPAY:', err);
    return null;
  }
}
