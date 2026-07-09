import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const VALID_PRIVATE_KEYS = new Set([
  process.env.UCNPAY_PRIVATE_KEY ?? 'test-private-key',
]);

const UCNPAY_SESSION_EXPIRATION_SECONDS = 15 * 60;

function validatePrivateKey(request: Request) {
  const privateKey = request.headers.get('x-private-key');
  if (!privateKey) {
    return NextResponse.json({ error: 'x-private-key es obligatorio' }, { status: 401 });
  }

  if (!VALID_PRIVATE_KEYS.has(privateKey)) {
    return NextResponse.json({ error: 'Clave privada inválida' }, { status: 401 });
  }

  return null;
}

async function signCheckoutToken(payload: Record<string, unknown>): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'fallback-secret');
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${UCNPAY_SESSION_EXPIRATION_SECONDS}s`)
    .sign(secret);
}

export async function POST(request: Request) {
  const validationResponse = validatePrivateKey(request);
  if (validationResponse) return validationResponse;

  let body: any;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Cuerpo inválido o malformado' }, { status: 400 });
  }

  const requiredFields = ['idOrden', 'monto', 'moneda', 'nombreComercio', 'returnUrl'];
  const missingFields = requiredFields.filter((field) => !body[field]);
  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        error: 'Faltan campos requeridos',
        missingFields,
      },
      { status: 400 }
    );
  }

  if (typeof body.monto !== 'number' || body.monto < 50 || body.monto > 500000) {
    return NextResponse.json(
      { error: 'Monto inválido. Debe ser numérico entre 50 y 500000.' },
      { status: 400 }
    );
  }

  const transactionId = crypto.randomUUID();
  const token = await signCheckoutToken({
    transactionId,
    idOrden: body.idOrden,
    monto: body.monto,
    moneda: body.moneda,
    nombreComercio: body.nombreComercio,
    urlRetorno: body.returnUrl,
    estado: 'PENDIENTE',
  });

  return NextResponse.json(
    {
      token,
      transactionUrl: `${process.env.BASE_URL ?? 'http://localhost:3000'}/api/ucnpay/checkout/${token}`,
      transactionId,
      tokenType: 'Bearer',
      expiresIn: '15m',
    },
    { status: 201 }
  );
}
