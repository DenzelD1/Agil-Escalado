import { Suspense } from 'react';
import Link from 'next/link';
import OrderFilters from './OrderFilters';
import OrdersTable from './OrdersTable';
import OrderKanbanBoard from './OrderKanbanBoard';
import { MOCK_ORDERS } from '@/lib/mockData';

interface DashboardProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const resolvedSearchParams = await searchParams;
  
  const canalFilter = typeof resolvedSearchParams.canal === 'string' ? resolvedSearchParams.canal : undefined;
  const prioridadFilter = typeof resolvedSearchParams.prioridad === 'string' ? resolvedSearchParams.prioridad : undefined;
  const view = typeof resolvedSearchParams.view === 'string' ? resolvedSearchParams.view : 'table';

  // Helper to build URLs preserving current query params
  const buildUrl = (newView: string) => {
    const params = new URLSearchParams();
    if (canalFilter) params.set('canal', canalFilter);
    if (prioridadFilter) params.set('prioridad', prioridadFilter);
    params.set('view', newView);
    return `?${params.toString()}`;
  };

  // Filtrar los pedidos
  let filteredOrders = [...MOCK_ORDERS];
  
  if (canalFilter) {
    filteredOrders = filteredOrders.filter(order => order.tipo_canal === canalFilter);
  }
  
  if (prioridadFilter) {
    filteredOrders = filteredOrders.filter(order => order.prioridad === prioridadFilter);
  }

  // Ordenar por fecha descendente
  filteredOrders.sort((a, b) => new Date(b.recibido_en).getTime() - new Date(a.recibido_en).getTime());

  // Calcular métricas
  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const highPriorityCount = filteredOrders.filter(o => o.prioridad === 'alta').length;

  return (
    <div className="min-h-screen bg-brand-background text-brand-graphite p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-brand-yale">Panel Operativo</h1>
            <p className="text-brand-graphite/70 mt-1">
              Gestión centralizada de pedidos omnicanal. Datos de prueba cargados.
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex bg-brand-alabaster/30 p-1 rounded-lg border border-brand-alabaster self-start">
            <Link 
              href={buildUrl('table')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                view === 'table' 
                  ? 'bg-brand-white text-brand-yale shadow-sm border border-brand-alabaster' 
                  : 'text-brand-graphite/70 hover:text-brand-graphite hover:bg-brand-alabaster/50'
              }`}
            >
              Tabla
            </Link>
            <Link 
              href={buildUrl('kanban')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                view === 'kanban' 
                  ? 'bg-brand-white text-brand-yale shadow-sm border border-brand-alabaster' 
                  : 'text-brand-graphite/70 hover:text-brand-graphite hover:bg-brand-alabaster/50'
              }`}
            >
              Kanban
            </Link>
          </div>
        </header>

        {/* Métricas KPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-brand-white p-6 rounded-xl shadow-sm border border-brand-alabaster flex flex-col hover:shadow-md transition-shadow">
            <span className="text-sm font-medium text-brand-graphite/70">Total Pedidos</span>
            <span className="text-3xl font-bold text-brand-yale mt-2">{totalOrders}</span>
          </div>
          <div className="bg-brand-white p-6 rounded-xl shadow-sm border border-brand-alabaster flex flex-col hover:shadow-md transition-shadow">
            <span className="text-sm font-medium text-brand-graphite/70">Ingresos Totales (CLP)</span>
            <span className="text-3xl font-bold text-brand-teal mt-2">
              ${totalRevenue.toLocaleString('es-CL')}
            </span>
          </div>
          <div className="bg-brand-white p-6 rounded-xl shadow-sm border border-red-100 flex flex-col hover:shadow-md transition-shadow">
            <span className="text-sm font-medium text-red-600/80">Alta Prioridad</span>
            <span className="text-3xl font-bold text-red-600 mt-2">{highPriorityCount}</span>
          </div>
        </div>

        <div className="mb-6">
          <Suspense fallback={<div className="h-20 bg-brand-alabaster/30 rounded-xl animate-pulse"></div>}>
            <OrderFilters />
          </Suspense>
        </div>

        {/* Dynamic View Rendering */}
        <div className="animate-in fade-in duration-300">
          {view === 'kanban' ? (
            <OrderKanbanBoard orders={filteredOrders} />
          ) : (
            <OrdersTable orders={filteredOrders} />
          )}
        </div>
      </div>
    </div>
  );
}
