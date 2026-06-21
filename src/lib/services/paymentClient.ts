/**
 * Cliente para el sistema de Pagos (Proyecto 4).
 */

const PAGOS_URL = () => {
  const url = process.env.API_PAGOS_URL || 'http://localhost:4004';
  return url.replace(/\/+$/, '');
};

/**
 * Inicia el proceso de cobro de un pedido en el sistema de pagos externo.
 * No bloquea la ejecución principal; se dispara de manera asíncrona.
 * @param orderId UUID del pedido
 * @param amount Monto total a cobrar
 * @param metadata Datos adicionales del cliente
 */
export async function initiatePayment(
  orderId: string,
  amount: number,
  metadata?: Record<string, unknown>,
): Promise<void> {
  const url = `${PAGOS_URL()}/payments/init`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        monto: amount,
        metadata,
      }),
    });

    if (!res.ok) {
      console.warn(`[PaymentClient] Advertencia al iniciar pago (HTTP ${res.status})`);
    } else {
      console.log(`[PaymentClient] Solicitud de pago enviada para pedido: ${orderId}`);
    }
  } catch (err) {
    console.error(`[PaymentClient] Error de red contactando a Pagos:`, err);
    // Para no bloquear nuestra máquina de estados, tragamos el error y permitimos que el CRM o los retries asíncronos lo manejen después.
  }
}
