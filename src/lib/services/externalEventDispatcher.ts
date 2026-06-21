import { type ExternalEvent } from '@/lib/schemas/externalEventSchemas';
import { SignJWT } from 'jose';

/**
 * Retorna la URL del webhook de eventos TI configurada.
 * Puede ser la genérica de inventario, o una específica para eventos si se configura.
 */
function getEventsUrl(): string {
  const url = process.env.EXTERNAL_EVENTS_URL || process.env.API_INVENTARIO_URL;
  if (!url) {
    throw new Error('No hay URL configurada para enviar los eventos externos (EXTERNAL_EVENTS_URL o API_INVENTARIO_URL)');
  }
  return `${url.replace(/\/+$/, '')}/v1/events`;
}

/**
 * Genera un token JWT de sistema para autorizar la llamada al webhook.
 */
async function generateSystemToken(): Promise<string> {
  const secretString = process.env.JWT_SECRET;
  if (!secretString) {
    throw new Error('JWT_SECRET no configurado');
  }

  const secret = new TextEncoder().encode(secretString);
  return new SignJWT({ sub: 'system', role: 'system' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(secret);
}

/**
 * Despacha un evento hacia el sistema externo (Proyecto 6 - Analítica/Eventos) con reintentos automáticos.
 */
export async function dispatchExternalEvent(
  event: ExternalEvent,
  maxRetries = 3
): Promise<void> {
  const url = getEventsUrl();
  const token = await generateSystemToken();
  const payload = JSON.stringify(event);

  let attempt = 0;
  
  while (attempt <= maxRetries) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (res.ok) {
        return; // Éxito
      }
      
      console.warn(`[ExternalEventDispatcher] Fallo al enviar evento ${event.event_type} (HTTP ${res.status}). Intento ${attempt + 1}/${maxRetries + 1}`);
    } catch (err) {
      console.warn(`[ExternalEventDispatcher] Error de red al enviar evento ${event.event_type}:`, err);
    }

    attempt++;
    if (attempt <= maxRetries) {
      // Exponential backoff
      const delayMs = Math.pow(2, attempt - 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  console.error(`[ExternalEventDispatcher] FALLO CATASTRÓFICO: No se pudo enviar el evento ${event.event_type} tras ${maxRetries + 1} intentos.`);
}
