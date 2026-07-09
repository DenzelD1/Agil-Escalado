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

export async function getRedisClient(): Promise<RedisClientType> {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  redisClient = createClient({ 
    url: getRedisUrl(),
    socket: {
      connectTimeout: 5000,
      reconnectStrategy: (retries) => {
        if (retries > 3) {
          return new Error('Max retries reached for Redis connection');
        }
        return Math.min(retries * 50, 500); // Wait up to 500ms between retries
      }
    }
  });
  
  redisClient.on('error', (error: Error) => {
    console.error('[RedisEventBus] Redis client error:', error.message);
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
  if (redisClient) {
    try {
      await redisClient.disconnect();
    } finally {
      redisClient = null;
    }
  }
}

/**
 * Creates a dedicated Redis client for subscribing (since a client in SUBSCRIBE mode cannot issue other commands).
 * Note: The caller is responsible for disconnecting this client when done.
 */
export async function subscribeToOrderStateChanges(
  onMessage: (event: OrderStateChangeEvent) => void
): Promise<RedisClientType> {
  const subscriberClient = createClient({
    url: getRedisUrl(),
    socket: {
      connectTimeout: 5000,
      reconnectStrategy: (retries) => {
        if (retries > 3) {
          return new Error('Max retries reached for Redis connection');
        }
        return Math.min(retries * 50, 500);
      },
    },
  });

  subscriberClient.on('error', (error: Error) => {
    console.error('[RedisEventBus] Subscriber client error:', error.message);
  });

  await subscriberClient.connect();

  await subscriberClient.subscribe(getRedisChannel(), (message) => {
    try {
      const event = JSON.parse(message) as OrderStateChangeEvent;
      onMessage(event);
    } catch (err) {
      console.error('[RedisEventBus] Error parsing subscribed message:', err);
    }
  });

  return subscriberClient as RedisClientType;
}
