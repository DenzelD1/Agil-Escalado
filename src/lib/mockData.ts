import { type NormalizedOrder } from './normalizers/orderNormalizer';
import { type Prioridad, type Canal } from './schemas/orderSchemas';

const getRandomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const nombres = ['Juan Pérez', 'María Gómez', 'Carlos López', 'Ana Silva', 'Pedro Martínez', 'Laura Rodríguez', 'Diego Fernández', 'Sofía Castillo'];
const canales: Canal[] = ['web', 'app', 'call_center'];
const prioridades: Prioridad[] = ['alta', 'media', 'baja'];
const estados = ['creado', 'verificado', 'pagado', 'listo_para_despacho', 'en_transito', 'entregado', 'rechazado', 'cancelado'];

export const generateMockOrders = (count: number): NormalizedOrder[] => {
  return Array.from({ length: count }).map((_, i) => {
    const subtotal = Math.round((Math.random() * 50000 + 1000) * 100) / 100;
    const impuestos = Math.round((subtotal * 0.19) * 100) / 100;
    const total = Math.round((subtotal + impuestos) * 100) / 100;
    const canal = getRandomItem(canales);

    return {
      id_pedido: crypto.randomUUID(),
      recibido_en: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      id_canal: `${canal.toUpperCase()}-2026-${String(i).padStart(4, '0')}`,
      tipo_canal: canal,
      prioridad: getRandomItem(prioridades),
      cliente: {
        nombre: getRandomItem(nombres),
        email: `cliente${i}@example.com`,
        telefono: `+569${Math.floor(Math.random() * 90000000 + 10000000)}`,
      },
      direccion_envio: {
        calle: 'Av. Principal',
        numero: `${Math.floor(Math.random() * 1000) + 1}`,
        ciudad: 'SANTIAGO',
        region: 'METROPOLITANA',
        codigo_postal: '8320000',
        pais: 'CHILE',
      },
      items: [
        {
          sku: `PROD-${Math.floor(Math.random() * 100)}`,
          cantidad: Math.floor(Math.random() * 5) + 1,
          precio_unitario: Math.round(subtotal / 2),
          descuento: 0,
        }
      ],
      subtotal,
      impuestos,
      total,
      estado: getRandomItem(estados) as any,
    };
  });
};

export const MOCK_ORDERS = generateMockOrders(35);
