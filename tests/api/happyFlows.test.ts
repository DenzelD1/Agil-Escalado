import { describe, it, expect, vi, beforeEach, beforeAll, afterEach, afterAll } from 'vitest';

const mockVerifyJwt = vi.fn();
const mockCheckRateLimit = vi.fn();
const mockReserveStock = vi.fn();
const mockRollbackReservations = vi.fn();
const mockPersistOrder = vi.fn();
const mockPublishOrderStateChange = vi.fn();

const mockPrisma = {
  order: {
    findUnique: vi.fn(),
    update: vi.fn(),
  },
  stockReservation: {
    findMany: vi.fn(),
    deleteMany: vi.fn(),
  },
  $disconnect: vi.fn(),
};

let createWebOrder: typeof import('@/app/api/web/route').POST;
let paymentWebhookPOST: typeof import('@/app/api/webhooks/payment/route').POST;

beforeAll(async () => {
  vi.doMock('@/lib/jwt', () => ({
    verifyJwt: mockVerifyJwt,
  }));

  vi.doMock('@/lib/middlewares/rateLimiter', () => ({
    checkRateLimit: mockCheckRateLimit,
  }));

  vi.doMock('@/lib/services/stockService', () => ({
    reserveStock: mockReserveStock,
    rollbackReservations: mockRollbackReservations,
  }));

  vi.doMock('@/lib/services/orderPersistence', () => ({
    persistOrder: mockPersistOrder,
  }));

  vi.doMock('@/lib/services/redisEventBus', () => ({
    publishOrderStateChange: mockPublishOrderStateChange,
  }));

  vi.doMock('@/lib/prisma', () => ({
    prisma: mockPrisma,
  }));

  const web = await import('@/app/api/web/route');
  createWebOrder = web.POST;

  const payment = await import('@/app/api/webhooks/payment/route');
  paymentWebhookPOST = payment.POST;
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetModules();
});

describe('Flujos felices con servicios externos mockeados', () => {
  beforeEach(() => {
    mockVerifyJwt.mockResolvedValue({ sub: 'test-user', role: 'user' });
    mockCheckRateLimit.mockResolvedValue(true);
    mockPublishOrderStateChange.mockResolvedValue(undefined);
  });

  it('crea un pedido web con stock reservado y persiste el pedido', async () => {
    mockReserveStock.mockResolvedValue({
      success: true,
      reservas: [{ sku: 'SKU-TEST-1', cantidad: 1, reserva_id: 'RSV-123' }],
    });
    mockPersistOrder.mockResolvedValue({ id: 'order-123' });

    const body = {
      cliente: { nombre: 'Juan Perez', email: 'juan@example.com' },
      direccion_envio: {
        calle: 'Calle Falsa',
        numero: '123',
        ciudad: 'Santiago',
        pais: 'CL',
      },
      items: [{ sku: 'SKU-TEST-1', cantidad: 1, precio_unitario: 100, descuento: 0 }],
    };

    const req = new Request('http://localhost/api/web', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer test-token',
      },
      body: JSON.stringify(body),
    });

    const res = await createWebOrder(req as unknown as Request);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json).toEqual(
      expect.objectContaining({
        pedido_id: 'order-123',
        estado: 'verificado',
        reservas: [{ sku: 'SKU-TEST-1', cantidad: 1, reserva_id: 'RSV-123' }],
      }),
    );

    expect(mockVerifyJwt).toHaveBeenCalledWith('test-token');
    expect(mockCheckRateLimit).toHaveBeenCalled();
    expect(mockReserveStock).toHaveBeenCalled();
    expect(mockPersistOrder).toHaveBeenCalled();
    expect(mockPublishOrderStateChange).toHaveBeenCalled();
  });

  it('procese un webhook de pago aprobado y actualiza el estado del pedido', async () => {
    const { prisma } = await import('@/lib/prisma');
    const mockOrder = {
      id: 'order-456',
      estado: 'verificado',
      tipoCanal: 'web',
      clienteId: 'client-1',
      direccionId: 'address-1',
      subtotal: 100,
      impuestos: 19,
      total: 119,
      agenteId: null,
      recibidoEn: new Date(),
    };

    // @ts-expect-error Mocked property
    prisma.order.findUnique.mockResolvedValue(mockOrder);
    // @ts-expect-error Mocked property
    prisma.order.update.mockResolvedValue({ ...mockOrder, estado: 'pagado' });

    const req = new Request('http://localhost/api/webhooks/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: 'order-456', status: 'success' }),
    });

    const res = await paymentWebhookPOST(req as unknown as Request);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual(expect.objectContaining({ success: true, newState: 'pagado' }));
    expect(prisma.order.findUnique).toHaveBeenCalledWith({ where: { id: 'order-456' } });
    expect(prisma.order.update).toHaveBeenCalledWith({ where: { id: 'order-456' }, data: { estado: 'pagado', motivoRechazo: null } });
  });
});
