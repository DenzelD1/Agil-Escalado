import { NextResponse } from 'next/server';
import { getDailyPerformanceReport } from '@/lib/services/reportService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');
    
    // Si la fecha es válida, la usamos. Si no enviaron nada (o enviaron texto basura), usamos la fecha de hoy.
    const targetDate = dateParam && !isNaN(Date.parse(dateParam)) 
      ? new Date(dateParam) 
      : new Date();

    // Llamamos al servicio que acabamos de crear
    const reportData = await getDailyPerformanceReport(targetDate);

    // Retornamos un 200 OK con el payload esperado
    return NextResponse.json({
      success: true,
      data: reportData
    }, { status: 200 });

  } catch (error) {
    console.error('Error generando reporte diario:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Error interno al procesar las métricas de desempeño diario'
    }, { status: 500 });
  }
}