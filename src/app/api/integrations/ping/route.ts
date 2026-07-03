import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { endpoint, id } = await request.json();

    if (!endpoint) {
      return NextResponse.json({ status: 'down', message: 'Missing endpoint' }, { status: 400 });
    }

    // Determine absolute URL if it's a relative path (internal API)
    let url = endpoint;
    if (url.startsWith('/')) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      url = `${baseUrl}${url}`;
    }

    // Perform a lightweight request (HEAD or GET) to check reachability
    // We expect some endpoints might return 401, 404, or 405 because we aren't sending valid payloads,
    // but ANY valid HTTP response means the server is reachable and thus "healthy" or "degraded".
    try {
      const response = await fetch(url, {
        method: 'GET', 
        headers: {
          'Accept': 'application/json',
        },
        // Very short timeout for ping
        signal: AbortSignal.timeout(3000)
      });

      // If it's a 5xx error, the service is struggling (degraded)
      if (response.status >= 500) {
        return NextResponse.json({ status: 'degraded', statusText: response.statusText, statusCode: response.status });
      }

      // 2xx, 3xx, 4xx mean the server is up and routing requests.
      return NextResponse.json({ status: 'healthy', statusText: response.statusText, statusCode: response.status });

    } catch (fetchError: any) {
      console.warn(`[Healthcheck] Error pinging ${url}:`, fetchError.message);
      // Network errors, timeouts, ECONNREFUSED
      return NextResponse.json({ status: 'down', error: fetchError.message });
    }

  } catch (error) {
    return NextResponse.json({ status: 'down', message: 'Internal Server Error' }, { status: 500 });
  }
}
