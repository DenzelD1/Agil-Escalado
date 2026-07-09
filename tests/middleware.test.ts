import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';
import * as jose from 'jose';

// Mock de Next.js responses
vi.mock('next/server', () => {
  return {
    NextResponse: {
      json: vi.fn((body, init) => ({ body, init })),
      next: vi.fn((init) => ({ init, type: 'next' })),
    },
    NextRequest: vi.fn(),
  };
});

// Mock de la librería jose
vi.mock('jose', () => ({
  createRemoteJWKSet: vi.fn().mockReturnValue('mocked_jwks'),
  jwtVerify: vi.fn(),
}));

describe('Middleware de Autenticación (Proyecto 12)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería retornar 401 si no hay header Authorization ni cookie', async () => {
    const request = {
      headers: new Map(),
      cookies: {
        get: vi.fn().mockReturnValue(undefined),
      },
      url: 'http://localhost/api/test',
    } as unknown as NextRequest;

    const response = await middleware(request);
    
    // @ts-ignore
    expect(response.init.status).toBe(401);
    // @ts-ignore
    expect(response.body).toEqual({ error: 'No autorizado: Token faltante' });
  });

  it('debería retornar 401 si el token es inválido o está expirado', async () => {
    const request = {
      headers: new Map([['authorization', 'Bearer token_invalido']]),
      cookies: { get: vi.fn() },
      url: 'http://localhost/api/test',
    } as unknown as NextRequest;

    vi.mocked(jose.jwtVerify).mockRejectedValueOnce(new Error('Token expirado'));

    const response = await middleware(request);
    
    // @ts-ignore
    expect(response.init.status).toBe(401);
    // @ts-ignore
    expect(response.body).toEqual({ error: 'No autorizado: Token inválido o expirado' });
  });

  it('debería permitir el paso y setear headers si el token (header) es válido', async () => {
    const requestHeaders = new Map([['authorization', 'Bearer token_valido']]);
    const request = {
      headers: requestHeaders,
      cookies: { get: vi.fn() },
      url: 'http://localhost/api/test',
    } as unknown as NextRequest;

    const mockPayload = {
      sub: 'user-123',
      preferred_username: 'juanperez',
      realm_access: { roles: ['agent'] }
    };

    vi.mocked(jose.jwtVerify).mockResolvedValueOnce({ payload: mockPayload } as any);

    const response = await middleware(request);
    
    // @ts-ignore
    expect(response.type).toBe('next');
    // @ts-ignore
    const modifiedHeaders = response.init.request.headers as Headers;
    
    expect(modifiedHeaders.get('x-user-id')).toBe('user-123');
    expect(modifiedHeaders.get('x-username')).toBe('juanperez');
    expect(modifiedHeaders.get('x-user-roles')).toBe(JSON.stringify(['agent']));
  });

  it('debería permitir el paso si el token viene en cookie (fallback)', async () => {
    const request = {
      headers: new Map(),
      cookies: { get: vi.fn().mockReturnValue({ value: 'token_de_cookie' }) },
      url: 'http://localhost/api/test',
    } as unknown as NextRequest;

    const mockPayload = {
      sub: 'user-456',
      preferred_username: 'admin_test',
      realm_access: { roles: ['admin'] }
    };

    vi.mocked(jose.jwtVerify).mockResolvedValueOnce({ payload: mockPayload } as any);

    const response = await middleware(request);
    
    // @ts-ignore
    expect(response.type).toBe('next');
    // @ts-ignore
    const modifiedHeaders = response.init.request.headers as Headers;
    
    expect(modifiedHeaders.get('x-user-id')).toBe('user-456');
    expect(modifiedHeaders.get('x-user-roles')).toBe(JSON.stringify(['admin']));
  });
});
