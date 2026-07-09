import { describe, it, expect, beforeEach, vi } from 'vitest';

import { POST } from '../../src/app/api/integrations/ping/route';

describe('POST /api/integrations/ping', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns healthy for 2xx responses', async () => {
    // mock fetch to return 200
    vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 200, statusText: 'OK' })));

    const req: any = { json: async () => ({ endpoint: 'https://example.com/ping', id: 'P01' }) };
    const res: any = await POST(req);
    const body = await res.json();

    expect(body).toHaveProperty('status', 'healthy');
    expect(body).toHaveProperty('id', 'P01');
  });

  it('returns degraded for 5xx responses', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 503, statusText: 'Service Unavailable' })));

    const req: any = { json: async () => ({ endpoint: 'https://example.com/ping', id: 'P02' }) };
    const res: any = await POST(req);
    const body = await res.json();

    expect(body).toHaveProperty('status', 'degraded');
    expect(body).toHaveProperty('statusCode', 503);
  });

  it('returns down when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('network'); }));

    const req: any = { json: async () => ({ endpoint: 'https://doesnotexist.local', id: 'P03' }) };
    const res: any = await POST(req);
    const body = await res.json();

    expect(body).toHaveProperty('status', 'down');
    expect(body).toHaveProperty('error');
  });
});
