import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt'; 
import { validarYReservarStock } from '@/lib/inventory-service';
import { validarPedidoPorCanal } from '@/lib/business-rules';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    await verifyJwt(token);
    
    const body = await request.json();
    validarPedidoPorCanal('web', body.lineas);

    await validarYReservarStock(body.lineas, token);

    return NextResponse.json({ mensaje: 'Pedido Web recibido y stock reservado' }, { status: 201 });

  } catch (error: any) {
    if (error.message.includes("STOCK_INSUFICIENTE")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || 'Error interno' }, { status: 500 });
  }
}