import { NextResponse } from 'next/server';
import { getDailyPerformanceReport } from '@/lib/services/reportService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    // Se usa la fecha que se recibe, pero si no enviaron nada (o enviaron texto basura), se usa la fecha de hoy.
    const targetDate = dateParam && !isNaN(Date.parse(dateParam))
      ? new Date(dateParam)
      : new Date();

    const reportData = await getDailyPerformanceReport(targetDate);

    // Retorna un 200 OK con el payload esperado
    return NextResponse.json({
      success: true,
      data: reportData
    }, { status: 200 });

  } catch (error) {
    console.error('Error al generar el reporte diario:', error);

    return NextResponse.json({
      success: false,
      error: 'Error interno al procesar las métricas de desempeño diario'
    }, { status: 500 });
  }
}