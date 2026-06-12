import { getRedisClient } from '@/lib/services/redisEventBus';

const RATE_LIMIT_WINDOW_SECONDS = 60;
const MAX_REQUESTS_PER_WINDOW = 100;

export async function checkRateLimit(identifier: string): Promise<boolean> {
  try {
    const client = await getRedisClient();
    const key = `rate_limit:${identifier}`;

    // Incrementar el contador
    const currentCount = await client.incr(key);

    // Si es la primera petición, establecer la expiración de la ventana
    if (currentCount === 1) {
      await client.expire(key, RATE_LIMIT_WINDOW_SECONDS);
    }

    // Si supera el límite, devolver falso (bloquear)
    if (currentCount > MAX_REQUESTS_PER_WINDOW) {
      return false;
    }

    return true; // Permitir petición
  } catch (err) {
    console.error('[RateLimiter] Error conectando a Redis, permitiendo petición por fallback:', err);
    // En caso de fallo de Redis, fallamos "abierto" para no bloquear la operación
    return true;
  }
}
