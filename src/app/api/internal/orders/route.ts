import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { validateApiKey, createAuthResponse } from '@/lib/auth';
import { processIncomingOrder } from '@/lib/services/orderOrchestrator';

export async function POST(request: Request) {
  try {
    const apiKeyResponse = validateApiKey(request);
    if (apiKeyResponse) return apiKeyResponse;

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createAuthResponse();
    }

    const token = authHeader.split(' ')[1];
    await verifyJwt(token); 

    let body: any;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: 'Cuerpo de la petición inválido o malformado' }, { status: 400 });
    }

    const result = await processIncomingOrder(body, 'internal', token);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error('Error procesando pedido interno:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
