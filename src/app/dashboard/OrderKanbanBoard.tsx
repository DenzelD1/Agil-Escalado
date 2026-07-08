'use client';

import { type NormalizedOrder } from '@/lib/normalizers/orderNormalizer';

interface OrderKanbanBoardProps {
  orders: NormalizedOrder[];
  onOrderClick?: (order: NormalizedOrder) => void;
}

// ⚠️ ACTUALIZADO: Las columnas ahora coinciden exactamente con los estados de PostgreSQL (Prisma)
const KANBAN_COLUMNS = [
  { id: 'creado', title: 'Creado', color: 'border-blue-200 bg-blue-50/30', headerColor: 'bg-blue-100/80 text-blue-800', active: true },
  { id: 'procesando', title: 'Procesando', color: 'border-indigo-200 bg-indigo-50/30', headerColor: 'bg-indigo-100/80 text-indigo-800', active: true },
  { id: 'confirmado', title: 'Confirmado', color: 'border-cyan-200 bg-cyan-50/30', headerColor: 'bg-cyan-100/80 text-cyan-800', active: true },
  { id: 'pagado', title: 'Pagado', color: 'border-brand-teal/30 bg-brand-teal/10', headerColor: 'bg-brand-teal/20 text-brand-teal' },
  { id: 'enviado', title: 'Enviado', color: 'border-amber-200 bg-amber-50/30', headerColor: 'bg-amber-100/80 text-amber-800' },
  { id: 'entregado', title: 'Entregado', color: 'border-green-200 bg-green-50/30', headerColor: 'bg-green-100/80 text-green-800' },
  { id: 'cancelado', title: 'Cancelado', color: 'border-gray-200 bg-gray-50/30', headerColor: 'bg-gray-200/80 text-gray-800' },
  { id: 'error', title: 'Error', color: 'border-red-200 bg-red-50/30', headerColor: 'bg-red-100/80 text-red-800' },
];

export default function OrderKanbanBoard({ orders, onOrderClick }: OrderKanbanBoardProps) {
  // Agrupar órdenes por estado
  const ordersByStatus = KANBAN_COLUMNS.reduce((acc, col) => {
    acc[col.id] = orders.filter((order) => order.estado === col.id);
    return acc;
  }, {} as Record<string, NormalizedOrder[]>);

  const getPriorityIndicator = (priority?: string) => {
    switch (priority) {
      case 'alta':
      case 'urgente':
        return <div className="w-2 h-2 rounded-full bg-red-500 mr-2 shrink-0 animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.6)]" title="Prioridad Alta" />;
      case 'media':
        return <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2 shrink-0" title="Prioridad Media" />;
      case 'baja':
        return <div className="w-2 h-2 rounded-full bg-green-500 mr-2 shrink-0" title="Prioridad Baja" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-brand-alabaster mr-2 shrink-0" title="Sin Prioridad" />;
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 snap-x custom-scrollbar">
      {KANBAN_COLUMNS.map((col) => (
        // Glassmorphism en las columnas
        <div 
          key={col.id} 
          className={`flex flex-col min-w-70 max-w-70 shrink-0 border rounded-xl overflow-hidden snap-center backdrop-blur-md transition-all duration-300 hover:shadow-md ${col.color}`}
        >
          {/* Header de columna */}
          <div className={`px-4 py-3 flex justify-between items-center border-b ${col.color.split(' ')[0]} ${col.headerColor}`}>
            <div className="flex items-center gap-2">
              {/* Punto parpadeante (Live Status) para columnas activas */}
              {col.active && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                </span>
              )}
              <h3 className="font-semibold text-sm uppercase tracking-wider">{col.title}</h3>
            </div>
            <span className="bg-white/60 text-current text-xs font-bold px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">
              {ordersByStatus[col.id]?.length || 0}
            </span>
          </div>
          
          {/* Tarjetas de órdenes */}
          <div className="p-3 flex flex-col gap-3 h-150 overflow-y-auto custom-scrollbar">
            {ordersByStatus[col.id]?.length > 0 ? (
              ordersByStatus[col.id].map((order) => (
                // Hover Effects: Elevación y cambio de borde
                <div 
                  key={order.id_pedido} 
                  onClick={() => onOrderClick?.(order)} 
                  className="group bg-white/80 backdrop-blur-sm border border-brand-alabaster rounded-lg p-3 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-brand-teal/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-brand-graphite/60 bg-brand-alabaster/40 px-1.5 py-0.5 rounded truncate max-w-30 group-hover:text-brand-yale transition-colors">
                      {order.id_canal}
                    </span>
                    <span className="text-xs font-bold text-brand-teal">
                      ${order.total.toLocaleString('es-CL')}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-brand-graphite text-sm truncate mb-1 group-hover:text-brand-teal transition-colors">
                    {order.cliente.nombre}
                  </h4>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center">
                      {getPriorityIndicator(order.prioridad)}
                      <span className="text-[10px] text-brand-graphite/70 capitalize">
                        {order.tipo_canal === 'internal' ? (
                          <span className="bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold border border-indigo-200">
                            🚑 Prescripción
                          </span>
                        ) : (
                          order.tipo_canal.replace('_', ' ')
                        )}
                      </span>
                    </div>
                    
                    <span className="text-[10px] text-brand-graphite/50 group-hover:text-brand-graphite/80 transition-colors">
                      {new Date(order.recibido_en).toLocaleDateString('es-CL', {
                        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              // Empty state estilizado con glassmorphism
              <div className="flex items-center justify-center h-20 border-2 border-dashed border-brand-alabaster/60 rounded-lg bg-white/30 backdrop-blur-sm">
                <span className="text-xs text-brand-graphite/40 font-medium">Sin pedidos</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}