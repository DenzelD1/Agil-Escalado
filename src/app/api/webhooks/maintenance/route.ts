import { NextResponse } from 'next/server';
import { processIncomingOrder } from '@/lib/services/orderOrchestrator';

export async function POST(request: Request) {
  try {
    // Verificamos autorización
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No autorizado. Faltan credenciales Bearer.' },
        { status: 401 }
      );
    }
    const token = authHeader.split(' ')[1];

    let body: Record<string, unknown>;
    try {
      body = await request.json() as Record<string, unknown>;
    } catch (e) {
      return NextResponse.json(
        { error: 'Cuerpo de la petición inválido o malformado' },
        { status: 400 }
      );
    }

    // Adaptamos el payload del webhook de Mantenimiento al formato esperado
    // Soportamos si viene envuelto en 'payload' o si es directo
    const payload = (body.payload as Record<string, unknown>) || body;
    
    // Añadimos flag explícito para bypass de pago y prioridad
    const orderData = {
      ...payload,
      exento_pago: true,
      prioridad: 'alta' // Repuestos críticos de mantenimiento suelen tener prioridad alta
    };

    // Procesamos como canal interno
    const result = await processIncomingOrder(orderData, 'internal', token);
    
    // Personalizamos el mensaje de éxito si corresponde
    const responseBody = { ...result.body };
    if (result.status === 201 && responseBody.mensaje) {
        responseBody.mensaje = 'Pedido de Mantenimiento B2B procesado y liberado automáticamente';
    }

    return NextResponse.json(responseBody, { status: result.status });
  } catch (error) {
    console.error('Error procesando webhook de mantenimiento:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
