import type { NextRequest } from 'next/server';

import { INTEGRATIONS, DEFAULT_POLL_INTERVAL_MS } from '@/lib/integrations';

const DEFAULT_TIMEOUT = 3000;

async function probeEndpoint(endpoint: string, timeout = DEFAULT_TIMEOUT) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const start = Date.now();
  try {
    const res = await fetch(endpoint, { method: 'GET', signal: controller.signal });
    const elapsed = Date.now() - start;
    return { ok: res.ok, statusCode: res.status, elapsed };
  } catch (err: any) {
    return { ok: false, error: err?.message ?? String(err) };
  } finally {
    clearTimeout(id);
  }
}

function mapStatusFromProbe(probe: { ok?: boolean; elapsed?: number } | undefined) {
  if (!probe || !probe.ok) return 'down';
  if (probe.elapsed !== undefined && probe.elapsed < 1000) return 'healthy';
  return 'degraded';
}

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;

      req.signal.addEventListener('abort', () => {
        closed = true;
      });

      const send = (data: any) => {
        const payload = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(payload));
      };

      // send initial snapshot
      const snapshot = INTEGRATIONS.map(i => ({ id: i.id, status: i.status, lastPing: i.lastPing, endpoint: i.endpoint, name: i.name, description: i.description }));
      send({ type: 'snapshot', integrations: snapshot });

      // polling loop
          while (!closed) {
            const results = await Promise.all(
              INTEGRATIONS.map(async (node) => {
                const probe = await probeEndpoint(node.endpoint);
                const status = mapStatusFromProbe(probe as any);
                return {
                  id: node.id,
                  status,
                  lastPing: new Date().toISOString(),
                  endpoint: node.endpoint,
                  probe: probe,
                };
              })
            );

            send({ type: 'update', integrations: results });

            // wait interval or break if closed
            await new Promise((res) => setTimeout(res, DEFAULT_POLL_INTERVAL_MS));
          }

      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
