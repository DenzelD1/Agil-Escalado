import { describe, it, expect, vi, beforeEach } from 'vitest';
import { publishOrderStateChange, closeRedisConnection } from '@/lib/services/redisEventBus';

const mockPublish = vi.fn();
const mockConnect = vi.fn();
const mockOn = vi.fn();
const mockDisconnect = vi.fn();

vi.mock('redis', () => ({
  createClient: vi.fn(() => ({
    publish: mockPublish,
    connect: mockConnect,
    disconnect: mockDisconnect,
    on: mockOn,
    isOpen: false,
  })),
}));

describe('Redis Event Bus', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    delete process.env.REDIS_ORDER_STATE_CHANNEL;
    process.env.REDIS_URL = 'redis://localhost:6379';
    mockConnect.mockResolvedValue(undefined);
    mockPublish.mockResolvedValue(1);
    mockDisconnect.mockResolvedValue(undefined);
  });

  it('debe publicar un evento de cambio de estado en Redis', async () => {
    process.env.REDIS_ORDER_STATE_CHANNEL = 'order:state_changes_test';

    const eventPayload = {
      orderId: 'test-order-123',
      previousState: 'creado' as const,
      nextState: 'verificado' as const,
      eventType: 'VALIDACION_EXITOSA' as const,
      message: "Pedido pasó de 'creado' a 'verificado'",
      timestamp: '2026-06-10T12:00:00.000Z',
      metadata: { source: 'test' },
    };

    await publishOrderStateChange(eventPayload);

    expect(mockConnect).toHaveBeenCalledTimes(1);
    expect(mockPublish).toHaveBeenCalledTimes(1);
    expect(mockPublish).toHaveBeenCalledWith(
      'order:state_changes_test',
      JSON.stringify(eventPayload),
    );
  });

  it('debe desconectar el cliente Redis correctamente', async () => {
    process.env.REDIS_ORDER_STATE_CHANNEL = 'order:state_changes_test';

    await publishOrderStateChange({
      orderId: 'test-order-123',
      previousState: 'creado',
      nextState: 'verificado',
      eventType: 'VALIDACION_EXITOSA',
      message: "Pedido pasó de 'creado' a 'verificado'",
      timestamp: '2026-06-10T12:00:00.000Z',
    });

    await closeRedisConnection();

    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});
