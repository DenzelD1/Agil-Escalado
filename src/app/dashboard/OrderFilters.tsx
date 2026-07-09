'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';

export default function OrderFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCanal = searchParams.get('canal') || '';
  const currentPrioridad = searchParams.get('prioridad') || '';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    startTransition(() => {
      router.push(`?${createQueryString(name, value)}`);
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-brand-white rounded-xl shadow-sm border border-brand-alabaster">
      <div className="flex flex-col">
        <label htmlFor="canal-filter" className="text-sm font-medium text-brand-graphite mb-1">
          Canal de Venta
        </label>
        <select
          id="canal-filter"
          className="bg-brand-alabaster/30 border border-brand-alabaster text-brand-graphite text-sm rounded-lg focus:ring-brand-teal focus:border-brand-teal block w-full p-2.5"
          value={currentCanal}
          onChange={(e) => handleFilterChange('canal', e.target.value)}
          disabled={isPending}
        >
          <option value="">Todos los canales</option>
          <option value="web">Web</option>
          <option value="app">App Mobile</option>
          <option value="call_center">Call Center</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="prioridad-filter" className="text-sm font-medium text-brand-graphite mb-1">
          Prioridad
        </label>
        <select
          id="prioridad-filter"
          className="bg-brand-alabaster/30 border border-brand-alabaster text-brand-graphite text-sm rounded-lg focus:ring-brand-teal focus:border-brand-teal block w-full p-2.5"
          value={currentPrioridad}
          onChange={(e) => handleFilterChange('prioridad', e.target.value)}
          disabled={isPending}
        >
          <option value="">Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>
      
      {isPending && (
        <div className="flex items-end mb-2">
          <span className="text-sm text-brand-teal animate-pulse font-medium">Actualizando...</span>
        </div>
      )}
    </div>
  );
}
