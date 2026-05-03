import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt'; 

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado. Faltan credenciales.' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const decodedToken = await verifyJwt(token); 
    const usuarioId = decodedToken.sub; 

    const body = await request.json();

    for (const linea of body.lineas) {
      const resStock = await fetch(`${process.env.API_INVENTARIO_URL}/stock/${linea.productoId}`);
      
      if (!resStock.ok) throw new Error('Fallo al consultar inventario');
      
      const dataStock = await resStock.json();

      if (!dataStock.disponible || dataStock.cantidad < linea.cantidad) {
        return NextResponse.json({ error: `Stock insuficiente para SKU: ${linea.productoId}` }, { status: 409 });
      }

      const resReserva = await fetch(`${process.env.API_INVENTARIO_URL}/stock/reserve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sku: linea.productoId, cantidad: linea.cantidad })
      });
      
      if (!resReserva.ok) throw new Error(`Fallo al reservar SKU: ${linea.productoId}`);
    }

    return NextResponse.json(
      { mensaje: 'Pedido Web recibido y stock reservado' },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error procesando pedido Web:", error);
    return NextResponse.json({ error: 'Error interno del servidor procesando el pedido' }, { status: 500 });
  }
}