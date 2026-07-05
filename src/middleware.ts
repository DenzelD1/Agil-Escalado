import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createRemoteJWKSet, jwtVerify } from 'jose';

// Configuraciones del proveedor de identidad basadas en el Proyecto 12
const JWKS_URI = 'https://underarm-those-stardust.ngrok-free.dev/realms/sistema-centralizado/protocol/openid-connect/certs';
const ISSUER = 'https://underarm-those-stardust.ngrok-free.dev/realms/sistema-centralizado';

// createRemoteJWKSet almacena en caché las claves JWKS de forma automática
const JWKS = createRemoteJWKSet(new URL(JWKS_URI));

export async function middleware(request: NextRequest) {
  // 1. Verificación de API Key externa (M2M)
  const apiKey = request.headers.get('x-api-key');
  const expectedApiKey = process.env.P07_API_KEY;

  if (apiKey && expectedApiKey && apiKey === expectedApiKey) {
    // Es una petición válida de un sistema externo, saltamos la validación JWT
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-roles', JSON.stringify(['sistema-externo']));
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 2. Extraer el token del header Authorization (Flujo JWT)
  const authHeader = request.headers.get('authorization');
  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // Si no hay token en el header, verificamos si está en una cookie
  // (Por el contexto: "como queda guardado en una cookie")
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

  try {
    // Verificar el token JWT utilizando el JWKS remoto
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: ISSUER,
      algorithms: ['RS256'],
    });

    // Extraer la información del usuario del payload, de acuerdo al ejemplo
    const userId = payload.sub;
    const username = payload.preferred_username;
    const realmAccess = payload.realm_access as { roles?: string[] } | undefined;
    const roles = realmAccess?.roles ?? [];

    // Propagar la información a través de los headers para las rutas o handlers
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
    // Si el token no es válido o está expirado, retornar 401/403
    return NextResponse.json(
      { error: 'No autorizado: Token inválido o expirado' },
      { status: 401 }
    );
  }
}

// Configuración del middleware para que intercepte llamadas a la API
export const config = {
  matcher: [
    // Aplicar a todas las rutas bajo /api/
    '/api/:path*',
  ],
};
