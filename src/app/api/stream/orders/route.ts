import { NextResponse } from 'next/server';
import { subscribeToOrderStateChanges } from '@/lib/services/redisEventBus';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Use nodejs because Redis (redis pkg) might not work natively in Edge

export async function GET(request: Request) {
  let subscriberClient: any = null;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        subscriberClient = await subscribeToOrderStateChanges((event) => {
          // Format as Server-Sent Event
          const data = JSON.stringify(event);
          controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
        });

        // Send an initial ping to establish connection
        controller.enqueue(new TextEncoder().encode(': ping\n\n'));
      } catch (err) {
        console.error('[SSE] Error setting up subscription:', err);
        controller.close();
        if (subscriberClient) {
          subscriberClient.disconnect();
        }
      }
    },
    cancel() {
      console.log('[SSE] Client disconnected (cancel)');
      if (subscriberClient) {
        subscriberClient.disconnect().catch(console.error);
        subscriberClient = null;
      }
    }
  });

  request.signal.addEventListener('abort', () => {
    console.log('[SSE] Request aborted');
    if (subscriberClient) {
      subscriberClient.disconnect().catch(console.error);
      subscriberClient = null;
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
