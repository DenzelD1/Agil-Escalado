import { NextResponse } from 'next/server';

const P03_API_KEY = () => process.env.P03_API_KEY || 'p03-api-key-agil-escalado-2026';

export function validateApiKey(request: Request): NextResponse | null {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey || apiKey !== P03_API_KEY()) {
    return NextResponse.json(
      { error: 'No autorizado. API Key inválida o ausente.' },
      { status: 401 },
    );
  }
  return null;
}

export function createAuthResponse() {
  return NextResponse.json(
    { error: 'No autorizado. Faltan credenciales.' },
    { status: 401 },
  );
}