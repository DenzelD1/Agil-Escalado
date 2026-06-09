import { prisma } from '@/lib/prisma'; 

export interface DailyReport {
  fecha: string;
  totalPedidos: number;
  porCanal: Record<string, number>;
  tasaAprobacion: number;
  tasaRechazo: number;
  rechazosPorRazon: Record<string, number>;
}

export async function getDailyPerformanceReport(targetDate: Date = new Date()): Promise<DailyReport> {
  const startOfDay = new Date(targetDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  const orders: Array<{ tipoCanal: string; estado: string; motivoRechazo: string | null }> = await prisma.order.findMany({
    where: {
      recibidoEn: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    select: {
      tipoCanal: true,
      estado: true,
      motivoRechazo: true,
    },
  });

  const totalPedidos = orders.length;

  if (totalPedidos === 0) {
    return {
      fecha: startOfDay.toISOString().split('T')[0],
      totalPedidos: 0,
      porCanal: {},
      tasaAprobacion: 0,
      tasaRechazo: 0,
      rechazosPorRazon: {},
    };
  }

  const porCanal: Record<string, number> = {};
  const rechazosPorRazon: Record<string, number> = {};
  let aprobadosCount = 0;
  let rechazadosCount = 0;

  orders.forEach((order) => {
    porCanal[order.tipoCanal] = (porCanal[order.tipoCanal] || 0) + 1;

    if (order.estado === 'rechazado') {
      rechazadosCount++;
      const razon = order.motivoRechazo || 'Sin motivo especificado';
      rechazosPorRazon[razon] = (rechazosPorRazon[razon] || 0) + 1;
    } else if (order.estado !== 'cancelado' && order.estado !== 'creado') {
      aprobadosCount++;
    }
  });

  return {
    fecha: startOfDay.toISOString().split('T')[0],
    totalPedidos,
    porCanal,
    tasaAprobacion: Number(((aprobadosCount / totalPedidos) * 100).toFixed(2)),
    tasaRechazo: Number(((rechazadosCount / totalPedidos) * 100).toFixed(2)),
    rechazosPorRazon,
  };
}