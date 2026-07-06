import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, id } = body || {};

    if (!endpoint) {
      return NextResponse.json({ status: 'down', message: 'Missing endpoint' }, { status: 400 });
    }

    // Resolve relative endpoints to the current app base
    let url = endpoint;
    if (typeof url === 'string' && url.startsWith('/')) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      url = `${baseUrl}${url}`;
    }

    try {
      // Use AbortController with a short timeout to keep pings lightweight
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal as any,
      });

      clearTimeout(timeout);

      if (response.status >= 500) {
        return NextResponse.json({ id, status: 'degraded', statusText: response.statusText, statusCode: response.status });
      }

      return NextResponse.json({ id, status: 'healthy', statusText: response.statusText, statusCode: response.status });
    } catch (fetchError: any) {
      console.warn(`[Healthcheck] Error pinging ${url}:`, fetchError?.message ?? fetchError);
      return NextResponse.json({ id, status: 'down', error: fetchError?.message ?? String(fetchError) });
    }
  } catch (error) {
    return NextResponse.json({ status: 'down', message: 'Invalid JSON' }, { status: 400 });
  }
}
