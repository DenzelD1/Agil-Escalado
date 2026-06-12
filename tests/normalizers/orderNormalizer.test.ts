import { describe, it, expect } from 'vitest';
import { safeNormalizeOrder } from '@/lib/normalizers/orderNormalizer';

describe('Pruebas de Normalización de Pedidos', () => {

  it('debe normalizar correctamente un payload del canal WEB', () => {
    const webPayload = {
      cliente: { nombre: 'Ana', email: 'ana@web.com' },
      direccion_envio: { calle: 'Principal', numero: '123', ciudad: 'Santiago' },
      items: [
        { sku: 'PROD-A', cantidad: 2, precio_unitario: 100 }
      ]
    };

    const result = safeNormalizeOrder(webPayload, 'web');

    expect(result.success).toBe(true);
    if (result.success) {
      const pedido = result.data;
      expect(pedido.id_pedido).toBeDefined();
      expect(pedido.recibido_en).toBeDefined();

      expect(pedido.estado).toBe('creado');
      expect(pedido.tipo_canal).toBe('web');

      expect(pedido.subtotal).toBe(200);
      expect(pedido.impuestos).toBe(38);
      expect(pedido.total).toBe(238);
    }
  });

  it('debe normalizar correctamente un payload del canal APP (Mobile) usando alias', () => {
    const appPayload = {
      cliente: { firstName: 'Carlos', lastName: 'López', email: 'carlos@app.com' },
      shippingAddress: {
        street: 'Secundaria',
        streetNumber: '456',
        city: 'Valparaíso'
      },
      products: [
        { productId: 'PROD-B', qty: 1, price: 500 }
      ]
    };

    const result = safeNormalizeOrder(appPayload, 'app');

    expect(result.success).toBe(true);
    if (result.success) {
      const pedido = result.data;

      expect(pedido.cliente.nombre).toContain('Carlos');
      expect(pedido.direccion_envio.calle).toBe('Secundaria');
      expect(pedido.items[0].sku).toBe('PROD-B');
      expect(pedido.subtotal).toBe(500);
    }
  });

  it('debe fallar la normalización si faltan datos obligatorios', () => {
    const payloadIncompleto = {
      cliente: { nombre: 'Sin Email' },
      items: []
    };

    const result = safeNormalizeOrder(payloadIncompleto, 'web');

    expect(result.success).toBe(false);
    // Debe devolver un arreglo de errores detallando qué falló
    if (!result.success) {
      expect(result.errors).toBeDefined();
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });
});