import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/middlewares/rateLimiter';
import { verifyJwt } from '@/lib/jwt';
import { processIncomingOrder } from '@/lib/services/orderOrchestrator';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const isAllowed = await checkRateLimit(ip);
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Demasiadas peticiones (Rate Limit excedido). Intente más tarde.' },
        { status: 429 }
      );
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No autorizado. Faltan credenciales.' },
        { status: 401 },
      );
    }

    const token = authHeader.split(' ')[1];
    await verifyJwt(token);

    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 1024 * 1024) { // 1MB limit
      return NextResponse.json(
        { error: 'El tamaño de la petición excede el límite permitido de 1MB.' },
        { status: 413 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: 'Cuerpo de la petición inválido o malformado' },
        { status: 400 },
      );
    }

    const result = await processIncomingOrder(body, 'app', token);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error('Error procesando pedido en móvil:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor procesando el pedido' },
      { status: 500 },
    );
  }
}
