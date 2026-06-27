import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

async function verifyCheckoutToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'fallback-secret');
  return jwtVerify(token, secret);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.pathname.split('/').pop();

  if (!token) {
    return NextResponse.json(
      { message: 'Token inválido o expirado', error: 'Unauthorized', statusCode: 401 },
      { status: 401 }
    );
  }

  try {
    const { payload } = await verifyCheckoutToken(token);

    return NextResponse.json(
      {
        token,
        comercio: payload.nombreComercio,
        montoTotal: payload.monto,
        estado: payload.estado,
        urlRetorno: payload.urlRetorno,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Token inválido o expirado', error: 'Unauthorized', statusCode: 401 },
      { status: 401 }
    );
  }
}
