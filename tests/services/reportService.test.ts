import { describe, it, expect, vi } from 'vitest';
import { getDailyPerformanceReport } from '@/lib/services/reportService';
import { prisma } from '@/lib/prisma';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    order: {
      findMany: vi.fn(),
    },
  },
}));

describe('Reporte de Desempeño Diario (reportService)', () => {
  it('debe retornar reporte en ceros si no hay pedidos', async () => {

    vi.mocked(prisma.order.findMany).mockResolvedValueOnce([]);

    const result = await getDailyPerformanceReport(new Date('2026-05-19'));

    expect(result.totalPedidos).toBe(0);
    expect(result.tasaAprobacion).toBe(0);
    expect(result.porCanal).toEqual({});
  });

  it('debe calcular correctamente los porcentajes y agrupaciones', async () => {
    // Tipamos explícitamente el mock para evitar problemas de 'any'
    const mockOrders: Array<{ tipoCanal: string; estado: string; motivoRechazo: string | null }> = [
      { tipoCanal: 'web', estado: 'pagado', motivoRechazo: null },
      { tipoCanal: 'web', estado: 'rechazado', motivoRechazo: 'Stock insuficiente' },
      { tipoCanal: 'app', estado: 'verificado', motivoRechazo: null },
      { tipoCanal: 'call_center', estado: 'rechazado', motivoRechazo: 'Fraude' },
    ];

    // Se le hace cast a "any" solo al mockResolvedValueOnce porque 
    // Prisma internamente espera una promesa más compleja, pero para el test esto basta.
    vi.mocked(prisma.order.findMany).mockResolvedValueOnce(mockOrders as any);

    const result = await getDailyPerformanceReport(new Date('2026-05-19'));

    expect(result.totalPedidos).toBe(4);

    // Verificamos agrupación por canal
    expect(result.porCanal).toEqual({
      web: 2,
      app: 1,
      call_center: 1,
    });

    // Verificamos agrupación de rechazos
    expect(result.rechazosPorRazon).toEqual({
      'Stock insuficiente': 1,
      'Fraude': 1,
    });

    // Verificamos porcentajes: 2 aprobados / 4 total = 50%
    expect(result.tasaAprobacion).toBe(50);
    expect(result.tasaRechazo).toBe(50);
  });
});