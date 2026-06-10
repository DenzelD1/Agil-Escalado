import { createClient, type RedisClientType } from 'redis';
import type { OrderStateEvent, OrderStatus } from '@/lib/machines/orderStateMachine';

export interface OrderStateChangeEvent {
  orderId?: string;
  previousState: OrderStatus;
  nextState: OrderStatus;
  eventType: OrderStateEvent['type'];
  message: string;
  timestamp: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

let redisClient: RedisClientType | null = null;

function getRedisUrl(): string {
  return process.env.REDIS_URL ?? 'redis://localhost:6379';
}

function getRedisChannel(): string {
  return process.env.REDIS_ORDER_STATE_CHANNEL ?? 'order:state_changes';
}

async function getRedisClient(): Promise<RedisClientType> {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  redisClient = createClient({ url: getRedisUrl() });
  redisClient.on('error', (error) => {
    console.error('[RedisEventBus] Redis client error:', error);
  });

  await redisClient.connect();
  return redisClient;
}

export async function publishOrderStateChange(
  event: OrderStateChangeEvent,
): Promise<void> {
  const client = await getRedisClient();
  const payload = JSON.stringify(event);

  await client.publish(getRedisChannel(), payload);
}

export async function closeRedisConnection(): Promise<void> {
  if (!redisClient) {
    return;
  }

  try {
    await redisClient.disconnect();
  } finally {
    redisClient = null;
  }
}
