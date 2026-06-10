import { type NormalizedOrder } from '@/lib/normalizers/orderNormalizer';

interface OrderKanbanBoardProps {
  orders: NormalizedOrder[];
}

const KANBAN_COLUMNS = [
  { id: 'creado', title: 'Creado', color: 'border-blue-200 bg-blue-50/50', headerColor: 'bg-blue-100 text-blue-800' },
  { id: 'verificado', title: 'Verificado', color: 'border-indigo-200 bg-indigo-50/50', headerColor: 'bg-indigo-100 text-indigo-800' },
  { id: 'pagado', title: 'Pagado', color: 'border-brand-teal/20 bg-brand-teal/5', headerColor: 'bg-brand-teal/20 text-brand-teal' },
  { id: 'listo_para_despacho', title: 'Para Despacho', color: 'border-purple-200 bg-purple-50/50', headerColor: 'bg-purple-100 text-purple-800' },
  { id: 'en_transito', title: 'En Tránsito', color: 'border-amber-200 bg-amber-50/50', headerColor: 'bg-amber-100 text-amber-800' },
  { id: 'entregado', title: 'Entregado', color: 'border-green-200 bg-green-50/50', headerColor: 'bg-green-100 text-green-800' },
  { id: 'rechazado', title: 'Rechazado', color: 'border-red-200 bg-red-50/50', headerColor: 'bg-red-100 text-red-800' },
  { id: 'cancelado', title: 'Cancelado', color: 'border-gray-200 bg-gray-50/50', headerColor: 'bg-gray-200 text-gray-800' },
];

export default function OrderKanbanBoard({ orders }: OrderKanbanBoardProps) {
  // Agrupar órdenes por estado
  const ordersByStatus = KANBAN_COLUMNS.reduce((acc, col) => {
    acc[col.id] = orders.filter((order) => order.estado === col.id);
    return acc;
  }, {} as Record<string, NormalizedOrder[]>);

  const getPriorityIndicator = (priority?: string) => {
    switch (priority) {
      case 'alta':
        return <div className="w-2 h-2 rounded-full bg-red-500 mr-2 shrink-0" title="Prioridad Alta" />;
      case 'media':
        return <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2 shrink-0" title="Prioridad Media" />;
      case 'baja':
        return <div className="w-2 h-2 rounded-full bg-green-500 mr-2 shrink-0" title="Prioridad Baja" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-400 mr-2 shrink-0" title="Sin Prioridad" />;
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
      {KANBAN_COLUMNS.map((col) => (
        <div 
          key={col.id} 
          className={`flex flex-col min-w-[280px] max-w-[280px] shrink-0 border rounded-xl overflow-hidden snap-center ${col.color}`}
        >
          {/* Header de columna */}
          <div className={`px-4 py-3 flex justify-between items-center border-b ${col.color.split(' ')[0]} ${col.headerColor}`}>
            <h3 className="font-semibold text-sm uppercase tracking-wider">{col.title}</h3>
            <span className="bg-brand-white/70 text-current text-xs font-bold px-2 py-1 rounded-full">
              {ordersByStatus[col.id]?.length || 0}
            </span>
          </div>
          
          {/* Tarjetas de órdenes */}
          <div className="p-3 flex flex-col gap-3 h-[600px] overflow-y-auto custom-scrollbar">
            {ordersByStatus[col.id]?.length > 0 ? (
              ordersByStatus[col.id].map((order) => (
                <div 
                  key={order.id_pedido} 
                  className="bg-brand-white border border-brand-alabaster rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-brand-graphite/60 bg-brand-alabaster/50 px-1.5 py-0.5 rounded truncate max-w-[120px]">
                      {order.id_canal}
                    </span>
                    <span className="text-xs font-bold text-brand-teal">
                      ${order.total.toLocaleString('es-CL')}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-brand-graphite text-sm truncate mb-1">
                    {order.cliente.nombre}
                  </h4>
                  
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center">
                      {getPriorityIndicator(order.prioridad)}
                      <span className="text-[10px] text-brand-graphite/70 capitalize">
                        {order.tipo_canal.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <span className="text-[10px] text-brand-graphite/50">
                      {new Date(order.recibido_en).toLocaleDateString('es-CL', {
                        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-20 border-2 border-dashed border-brand-alabaster rounded-lg">
                <span className="text-xs text-brand-graphite/40 font-medium">Sin pedidos</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
