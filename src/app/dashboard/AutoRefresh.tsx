'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AutoRefreshProps {
  interval?: number;
}

export default function AutoRefresh({ interval = 5000 }: AutoRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      router.refresh();
    }, interval);

    // Limpieza del temporizador
    return () => clearInterval(timer);
  }, [router, interval]);

  return null;
}