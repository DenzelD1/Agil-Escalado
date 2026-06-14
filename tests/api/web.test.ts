import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';
import { SignJWT } from 'jose';
import http from 'node:http';
import { POST as createWebOrder } from '@/app/api/web/route';
import { POST as paymentWebhookPOST } from '@/app/api/webhooks/payment/route';
import { prisma } from '@/lib/prisma';

const mockPublish = vi.fn();
const mockConnect = vi.fn();
const mockOn = vi.fn();
const mockDisconnect = vi.fn();
const mockIncr = vi.fn();
const mockExpire = vi.fn();

vi.mock('redis', () => ({
  createClient: vi.fn(() => ({
    publish: mockPublish,
    connect: mockConnect,
    disconnect: mockDisconnect,
    on: mockOn,
    isOpen: false,
    incr: mockIncr,
    expire: mockExpire,
  })),
}));

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'test-secret-please-change';
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.REDIS_URL = 'redis://localhost:6379';
  process.env.JWT_SECRET = 'test-secret-please-change';
  mockConnect.mockResolvedValue(undefined);
  mockPublish.mockResolvedValue(1);
  mockDisconnect.mockResolvedValue(undefined);
  mockIncr.mockResolvedValue(1);
  mockExpire.mockResolvedValue(1);
});

describe('Integración API /api/web', () => {
  let server: http.Server;
  let baseUrl = '';

  beforeAll(async () => {
    // Levantar servidor de inventario simulado
    server = http.createServer(async (req, res) => {
      const url = req.url || '';
      if (req.method === 'GET' && url.startsWith('/stock/')) {
        // /stock/:sku
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ disponible: true, cantidad: 100 }));
        return;
      }

      if (req.method === 'POST' && url === '/stock/reserve') {
        let body = '';
        for await (const chunk of req) body += chunk;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reserva_id: `RSV-${Date.now()}` }));
        return;
      }

      if (req.method === 'POST' && url === '/stock/release') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({}));
        return;
      }

      res.writeHead(404);
      res.end();
    });

    await new Promise<void>((resolve) => server.listen(0, resolve));
    // @ts-ignore
    const port = (server.address() as any).port;
    baseUrl = `http://127.0.0.1:${port}`;
    process.env.API_INVENTARIO_URL = baseUrl;
  });

  afterAll(async () => {
    server.close();
    // Limpieza de DB
    try {
      await prisma.stockReservation.deleteMany();
      await prisma.item.deleteMany();
      await prisma.order.deleteMany();
      await prisma.address.deleteMany();
      await prisma.client.deleteMany();
    } catch (err) {
      // ignore
    }
    await prisma.$disconnect();
  });

  it('procesa un pedido web completo y persiste en PostgreSQL', async () => {
    if (!process.env.DATABASE_URL) {
      throw new Error('Por favor configure DATABASE_URL apuntando a PostgreSQL para ejecutar las pruebas.');
    }

    // Generar JWT válido
    const alg = 'HS256';
    const token = await new SignJWT({ sub: 'test-user', role: 'user' })
      .setProtectedHeader({ alg })
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const body = {
      cliente: { nombre: 'Juan Perez', email: 'juan@example.com' },
      direccion_envio: { calle: 'Calle Falsa', numero: '123', ciudad: 'Santiago', pais: 'CL' },
      items: [{ sku: 'SKU-TEST-1', cantidad: 1, precio_unitario: 100, descuento: 0 }],
    };

    const req = new Request('http://localhost/api/web', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const res = await createWebOrder(req as unknown as Request);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json).toHaveProperty('pedido_id');

    // Verificar que el pedido esté en la BD
    const pedido = await prisma.order.findUnique({ where: { id: json.pedido_id } });
    expect(pedido).not.toBeNull();
    expect(pedido?.tipoCanal).toBe('web');
  });

  it('procesa webhook de pago aprobado y actualiza estado', async () => {
    if (!process.env.DATABASE_URL) {
      throw new Error('Por favor configure DATABASE_URL apuntando a PostgreSQL para ejecutar las pruebas.');
    }

    const alg = 'HS256';
    const token = await new SignJWT({ sub: 'test-user', role: 'user' })
      .setProtectedHeader({ alg })
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const orderBody = {
      cliente: { nombre: 'Ana Gómez', email: 'ana@example.com' },
      direccion_envio: { calle: 'Avenida Siempre Viva', numero: '742', ciudad: 'Valparaíso', pais: 'CL' },
      items: [{ sku: 'SKU-TEST-2', cantidad: 2, precio_unitario: 50, descuento: 0 }],
    };

    const createReq = new Request('http://localhost/api/web', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderBody),
    });

    const createRes = await createWebOrder(createReq as unknown as Request);
    const createJson = await createRes.json();

    expect(createRes.status).toBe(201);
    expect(createJson).toHaveProperty('pedido_id');

    const webhookReq = new Request('http://localhost/api/webhooks/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId: createJson.pedido_id, status: 'success' }),
    });

    const webhookRes = await paymentWebhookPOST(webhookReq as unknown as Request);
    const webhookJson = await webhookRes.json();

    expect(webhookRes.status).toBe(200);
    expect(webhookJson).toEqual(expect.objectContaining({ success: true }));

    const pedido = await prisma.order.findUnique({ where: { id: createJson.pedido_id } });
    expect(pedido).not.toBeNull();
    expect(pedido?.estado).toBe('pagado');
  });
});
