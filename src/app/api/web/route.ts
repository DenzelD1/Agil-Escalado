import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { safeNormalizeOrder } from '@/lib/normalizers/orderNormalizer';
import { getOrderStateTransition } from '@/lib/machines/orderStateManager';
import { initialOrderState } from '@/lib/machines/orderStateMachine';

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
    const normResult = safeNormalizeOrder(body, 'web');

    if (!normResult.success) {
      // Transicion: creado -> rechazado (validacion fallida)
      const stateTransition = getOrderStateTransition(initialOrderState, {
        type: 'VALIDACION_FALLIDA',
        error: `Validación rechazada: ${normResult.errors.map((e) => e.mensaje).join('; ')}`,
      });

      return NextResponse.json(
        {
          error: 'Error de validación y normalización de datos',
          errores: normResult.errors,
          estado: stateTransition.nextState,
          transicion: stateTransition.message,
        },
        { status: 400 },
      );
    }

    // Transicion: creado -> verificado (validacion exitosa)
    let stateTransition = getOrderStateTransition(initialOrderState, {
      type: 'VALIDACION_EXITOSA',
    });

    const pedidoNormalizado = normResult.data;
    const stockValidationErrors: string[] = [];

    // --- Verificación y reserva de stock (usando ítems ya normalizados) ---
    for (const item of pedidoNormalizado.items) {
      try {
        const resStock = await fetch(
          `${process.env.API_INVENTARIO_URL}/stock/${item.sku}`,
        );

        if (!resStock.ok) throw new Error('Fallo al consultar inventario');

        const dataStock = await resStock.json();

        if (!dataStock.disponible || dataStock.cantidad < item.cantidad) {
          stockValidationErrors.push(
            `Stock insuficiente para SKU: ${item.sku} (disponible: ${dataStock.cantidad}, solicitado: ${item.cantidad})`,
          );
          continue;
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
      } catch (error) {
        stockValidationErrors.push(
          `Error procesando SKU ${item.sku}: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        );
      }
    }

    // Si hay errores de stock, transicionar a rechazado
    if (stockValidationErrors.length > 0) {
      stateTransition = getOrderStateTransition(stateTransition.nextState, {
        type: 'VALIDACION_FALLIDA',
        error: `Stock insuficiente: ${stockValidationErrors.join('; ')}`,
      });

      return NextResponse.json(
        {
          error: 'Error de validación de stock',
          errores_stock: stockValidationErrors,
          estado: stateTransition.nextState,
          transicion: stateTransition.message,
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        mensaje: 'Pedido Web recibido, normalizado y stock reservado',
        pedido: {
          ...pedidoNormalizado,
          estado: stateTransition.nextState,
        },
        estado: stateTransition.nextState,
        transicion: stateTransition.message,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error procesando pedido Web:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor procesando el pedido' },
      { status: 500 },
    );
  }
}
