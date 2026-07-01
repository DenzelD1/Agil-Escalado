import { describe, it, expect, beforeAll, vi } from 'vitest';
import { POST as initPOST } from '@/app/api/ucnpay/init/route';
import { GET as checkoutGET } from '@/app/api/ucnpay/checkout/[token]/route';
import { POST as paymentWebhookPOST } from '@/app/api/webhooks/payment/route';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    order: {
      findUnique: vi.fn(() => ({
        id: 'ORD-123',
        estado: 'verificado',
        clienteId: 'client-1',
        tipoCanal: 'web',
        subtotal: 15000,
        impuestos: 2850,
        total: 17850,
        agenteId: null,
        motivoRechazo: null,
        intentosPago: 0,
        idCanal: 'WEB-001',
        prioridad: 'media',
        direccionId: 'addr-1',
        recibidoEn: new Date(),
        updatedAt: new Date(),
        cliente: {
          id: 'client-1',
          nombre: 'Test',
          email: 'test@example.com',
          telefono: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        direccion: {
          id: 'addr-1',
          calle: 'Test',
          numero: '123',
          ciudad: 'SANTIAGO',
          region: null,
          codigoPostal: null,
          pais: 'CHILE',
          notasAdicionales: null,
          clienteId: 'client-1',
        },
        items: [
          { id: 'item-1', sku: 'PROD-A', cantidad: 1, precioUnitario: 15000, descuento: 0, orderId: 'ORD-123' },
        ],
        stockReservations: [],
      })),
      update: vi.fn(() => ({ id: 'ORD-123', estado: 'pagado' })),
    },
    stockReservation: {
      findMany: vi.fn(() => []),
      deleteMany: vi.fn(() => ({})),
    },
  },
}));

vi.mock('@/lib/machines/orderStateManager', () => ({
  getOrderStateTransition: vi.fn(() => ({
    success: true,
    nextState: 'pagado',
    message: 'Transición exitosa',
  })),
}));

vi.mock('@/lib/services/stockService', () => ({
  rollbackReservations: vi.fn(() => Promise.resolve()),
  confirmReservations: vi.fn(() => Promise.resolve()),
}));

vi.mock('@/lib/services/externalEventDispatcher', () => ({
  dispatchExternalEvent: vi.fn(() => Promise.resolve()),
}));

vi.mock('@/lib/services/crmClient', () => ({
  createSupportTicket: vi.fn(() => Promise.resolve()),
}));

vi.mock('@/lib/services/logisticsClient', () => ({
  dispatchToLogistics: vi.fn(() => Promise.resolve({
    success: true,
    newState: 'listo_para_despacho',
    shipment: { trackingNumber: 'AGS-TEST', courier: 'Test', estimatedDays: 3 },
  })),
  createShipment: vi.fn(() => Promise.resolve({
    success: true,
    trackingNumber: 'AGS-TEST',
    courier: 'Test',
    estimatedDays: 3,
  })),
}));

beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret-please-change';
  process.env.UCNPAY_PRIVATE_KEY = 'test-private-key';
});

describe('UCNPAY integration', () => {
  it('should initialize a checkout session with /api/ucnpay/init', async () => {
    const body = {
      idOrden: 'ORD-12345-230626',
      monto: 15000,
      moneda: 'CLP',
      nombreComercio: 'Mi Comercio',
      returnUrl: 'https://tu-url-de-checkout/para/retornar',
    };

    const req = new Request('http://localhost/api/ucnpay/init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-private-key': 'test-private-key',
      },
      body: JSON.stringify(body),
    });

    const res = await initPOST(req as unknown as Request);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json).toHaveProperty('token');
    expect(json).toHaveProperty('transactionUrl');
    expect(json.transactionUrl).toContain('/api/ucnpay/checkout/');
    expect(json.transactionId).toBeTruthy();
    expect(json.tokenType).toBe('Bearer');
    expect(json.expiresIn).toBe('15m');
  });

  it('should fetch checkout details from /api/ucnpay/checkout/:token', async () => {
    const initBody = {
      idOrden: 'ORD-54321-230626',
      monto: 20000,
      moneda: 'CLP',
      nombreComercio: 'Mi Comercio',
      returnUrl: 'https://frontend.com/retorno',
    };

    const initReq = new Request('http://localhost/api/ucnpay/init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-private-key': 'test-private-key',
      },
      body: JSON.stringify(initBody),
    });

    const initRes = await initPOST(initReq as unknown as Request);
    const initJson = await initRes.json();
    expect(initRes.status).toBe(201);
    expect(initJson.token).toBeTruthy();

    const checkoutReq = new Request(`http://localhost/api/ucnpay/checkout/${initJson.token}`, {
      method: 'GET',
    });

    const checkoutRes = await checkoutGET(checkoutReq as unknown as Request);
    const checkoutJson = await checkoutRes.json();

    expect(checkoutRes.status).toBe(200);
    expect(checkoutJson.token).toBe(initJson.token);
    expect(checkoutJson.comercio).toBe('Mi Comercio');
    expect(checkoutJson.montoTotal).toBe(20000);
    expect(checkoutJson.estado).toBe('PENDIENTE');
    expect(checkoutJson.urlRetorno).toBe('https://frontend.com/retorno');
  });

  it('should handle UCNPAY webhook approved event at /api/webhooks/payment', async () => {
    const req = new Request('http://localhost/api/webhooks/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-private-key': 'test-private-key',
      },
      body: JSON.stringify({
        event: 'transaction.approved',
        transactionId: 'trx_123',
        idOrden: 'ORD-123',
        operationType: 'CIT',
        status: 'APROBADO',
        monto: 15000,
        moneda: 'CLP',
        card: { brand: 'VISA', last4: '4242', expMonth: 12, expYear: 2028 },
        timestamp: '2026-06-24T18:00:00.000Z',
      }),
    });

    const res = await paymentWebhookPOST(req as unknown as Request);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json).toEqual(expect.objectContaining({ success: true }));
  });
});
