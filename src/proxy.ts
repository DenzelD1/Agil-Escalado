import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const JWKS_URI = process.env.JWKS_URI || '';
const ISSUER = process.env.JWT_ISSUER || '';

const JWKS = JWKS_URI ? createRemoteJWKSet(new URL(JWKS_URI)) : null;

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/integrations')) {
    return NextResponse.next();
  }

  const apiKey = request.headers.get('x-api-key') || request.headers.get('x_api_key');

  const validApiKeys = [
    process.env.P07_API_KEY,
    process.env.P04_API_KEY,
  ].filter(Boolean);

  if (apiKey && validApiKeys.includes(apiKey)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-roles', JSON.stringify(['sistema-externo']));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const authHeader = request.headers.get('authorization');
  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    const cookieToken = request.cookies.get('accessToken')?.value;
    if (cookieToken) {
      token = cookieToken;
    }
  }

  if (!token) {
    return NextResponse.json(
      { error: 'No autorizado: Token faltante' },
      { status: 401 }
    );
  }

  if (!JWKS) {
    console.error('Error: JWKS_URI no configurado en entorno.');
    return NextResponse.json(
      { error: 'Configuración de seguridad incompleta' },
      { status: 500 }
    );
  }

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: ISSUER,
      algorithms: ['RS256'],
    });

    const userId = payload.sub;
    const username = payload.preferred_username;
    const realmAccess = payload.realm_access as { roles?: string[] } | undefined;
    const roles = realmAccess?.roles ?? [];

    const requestHeaders = new Headers(request.headers);
    if (userId) {
      requestHeaders.set('x-user-id', userId);
    }
    if (typeof username === 'string') {
      requestHeaders.set('x-username', username);
    }
    requestHeaders.set('x-user-roles', JSON.stringify(roles));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Error verificando JWT:', error);
    return NextResponse.json(
      { error: 'No autorizado: Token inválido o expirado' },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
};
