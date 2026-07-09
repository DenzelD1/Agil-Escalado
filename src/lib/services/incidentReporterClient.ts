import { type IncidentPayload, IncidentSchema } from '@/lib/schemas/incidentSchema';
import { SignJWT } from 'jose';

/**
 * Cliente de integración para el Proyecto 11 (Plataforma de Gestión de Incidentes Operacionales).
 * Identificador de nuestro sistema: P03
 */

function getIncidentApiUrl(): string {
  const url = process.env.INCIDENT_API_URL;
  if (!url) {
    throw new Error('No hay URL configurada para enviar alertas de incidentes (INCIDENT_API_URL)');
  }
  return url;
}

function getIncidentApiKey(): string {
  const key = process.env.INCIDENT_API_KEY;
  if (!key) {
    throw new Error('No hay API Key configurada para incidentes (INCIDENT_API_KEY)');
  }
  return key;
}

/**
 * (Opcional por si P11 lo exige en paralelo al x-api-key)
 * Genera un token JWT de sistema para autorizar la llamada.
 */
async function generateSystemToken(): Promise<string> {
  const secretString = process.env.JWT_SECRET || 'fallback_secret';
  const secret = new TextEncoder().encode(secretString);
  return new SignJWT({ sub: 'system', role: 'system' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(secret);
}

/**
 * Reporta un incidente a la plataforma del Proyecto 11.
 * Maneja reintentos con exponential backoff según la documentación técnica.
 * 
 * @param payload El detalle del incidente, requiere titulo, descripcion y prioridad.
 * @param maxRetries Número máximo de reintentos en caso de errores 429, 502, 503.
 */
export async function reportIncident(
  payload: IncidentPayload,
  maxRetries = 3
): Promise<void> {
  const url = getIncidentApiUrl();
  const apiKey = getIncidentApiKey();
  const jwtToken = await generateSystemToken();

  const incidentData = IncidentSchema.parse({
    sistema_id: "P03",
    creado_en: new Date().toISOString(),
    payload,
  });

  const body = JSON.stringify(incidentData);
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body,
      });

      if (res.ok) {
        console.log(`[IncidentReporter - P11] 🚀 Incidente reportado con éxito: "${payload.titulo}"`);
        return;
      }

      // El contrato indica reintentos para HTTP 503, 502 o 429
      if ([429, 502, 503].includes(res.status)) {
        console.warn(`[IncidentReporter - P11] Fallo temporal HTTP ${res.status}. Intento ${attempt + 1}/${maxRetries + 1}`);
      } else {
        const text = await res.text().catch(() => '');
        console.error(`[IncidentReporter - P11] Rechazo permanente (HTTP ${res.status}): ${text}`);
        return; // No reintentar para errores 400, 401, 403, 404, etc.
      }
    } catch (err) {
      console.warn(`[IncidentReporter - P11] Error de red al enviar alerta:`, err);
    }

    attempt++;
    if (attempt <= maxRetries) {
      // Exponential backoff: 1s, 2s, 4s...
      const delayMs = Math.pow(2, attempt - 1) * 1000;
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  console.error(`[IncidentReporter - P11] ❌ FALLO CATASTRÓFICO: No se pudo enviar el incidente tras ${maxRetries + 1} intentos.`);
}
