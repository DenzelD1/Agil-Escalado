import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { safeNormalizeOrder } from '@/lib/normalizers/orderNormalizer';

export async function POST(request: Request) {
  try {
    // --- Autenticación ---
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No autorizado. Faltan credenciales.' },
        { status: 401 },
      );
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await verifyJwt(token);
    const usuarioId = decodedToken.sub;

    const body = await request.json();

    // --- Normalización de datos (Cliente, Dirección, SKU) ---
    // El canal 'app' puede enviar: firstName/lastName, street, productId, qty, etc.
    const normResult = safeNormalizeOrder(body, 'app');

    if (!normResult.success) {
      return NextResponse.json(
        {
          error: 'Error de validación y normalización de datos',
          errores: normResult.errors,
        },
        { status: 400 },
      );
    }

    const pedidoNormalizado = normResult.data;

    // --- Verificación y reserva de stock (usando ítems ya normalizados) ---
    for (const item of pedidoNormalizado.items) {
      const resStock = await fetch(
        `${process.env.API_INVENTARIO_URL}/stock/${item.sku}`,
      );

      if (!resStock.ok) throw new Error('Fallo al consultar inventario');

      const dataStock = await resStock.json();

      if (!dataStock.disponible || dataStock.cantidad < item.cantidad) {
        return NextResponse.json(
          { error: `Stock insuficiente para SKU: ${item.sku}` },
          { status: 409 },
        );
      }

      const resReserva = await fetch(
        `${process.env.API_INVENTARIO_URL}/stock/reserve`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sku: item.sku, cantidad: item.cantidad }),
        },
      );

      if (!resReserva.ok)
        throw new Error(`Fallo al reservar SKU: ${item.sku}`);
    }

    return NextResponse.json(
      {
        mensaje: 'Pedido Mobile recibido, normalizado y stock reservado',
        pedido: pedidoNormalizado,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error procesando pedido Mobile:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor procesando el pedido' },
      { status: 500 },
    );
  }
}