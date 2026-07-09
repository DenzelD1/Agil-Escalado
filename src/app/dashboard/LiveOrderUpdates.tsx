'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LiveOrderUpdates() {
  const router = useRouter();

  useEffect(() => {
    // We connect to the SSE endpoint to listen for any order changes
    const eventSource = new EventSource('/api/stream/orders');

    eventSource.onmessage = (event) => {
      // Whenever we receive an event from Redis (e.g., state change, new prescription)
      // we tell Next.js to refresh the current route data.
      // router.refresh() fetches the new RSC payload without a hard reload,
      // keeping React state intact while updating the server-rendered parts (like the Orders Kanban).
      console.log('[LiveOrderUpdates] Received update:', event.data);
      router.refresh();
    };

    eventSource.onerror = (error) => {
      console.error('[LiveOrderUpdates] SSE error:', error);
      // EventSource automatically attempts to reconnect on error
    };

    return () => {
      eventSource.close();
    };
  }, [router]);

  return null;
}
