import { type NormalizedOrder } from '@/lib/normalizers/orderNormalizer';

interface OrdersTableProps {
  orders: NormalizedOrder[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-brand-alabaster transition-all duration-300">
        <div className="w-16 h-16 bg-brand-alabaster/50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-brand-graphite opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
        </div>
        <h3 className="text-lg font-medium text-brand-yale">No se encontraron pedidos</h3>
        <p className="text-brand-graphite/70 text-sm mt-1">Ajusta los filtros o espera nuevos ingresos.</p>
      </div>
    );
  }

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'alta':
      case 'urgente':
        return <span className="bg-red-100/80 text-red-800 text-xs font-medium px-2.5 py-1 rounded-md border border-red-200">Alta</span>;
      case 'media':
        return <span className="bg-yellow-100/80 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-md border border-yellow-200">Media</span>;
      case 'baja':
        return <span className="bg-green-100/80 text-green-800 text-xs font-medium px-2.5 py-1 rounded-md border border-green-200">Baja</span>;
      default:
        return <span className="bg-brand-alabaster text-brand-graphite text-xs font-medium px-2.5 py-1 rounded-md border border-gray-300">N/A</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'creado':
      case 'procesando':
        // Aquí aplicamos la micro-animación (Punto parpadeante / Pulse effect)
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-50/80 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="capitalize">{status}</span>
          </span>
        );
      case 'pagado':
        return <span className="bg-brand-teal/10 text-brand-teal text-xs font-medium px-2.5 py-1 rounded-full border border-brand-teal/30 shadow-sm">Pagado</span>;
      case 'cancelado':
      case 'rechazado':
      case 'error':
        return <span className="bg-gray-100/80 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 capitalize">{status}</span>;
      default:
        return <span className="bg-brand-alabaster/50 text-brand-yale text-xs font-medium px-2.5 py-1 rounded-full border border-brand-alabaster capitalize">{status}</span>;
    }
  };

  return (
    // Aplicamos Glassmorphism: bg-white/70 y backdrop-blur-md
    <div className="relative overflow-x-auto shadow-sm sm:rounded-xl border border-brand-alabaster bg-white/70 backdrop-blur-md">
      <table className="w-full text-sm text-left text-brand-graphite">
        <thead className="text-xs text-brand-yale uppercase bg-brand-alabaster/30 border-b border-brand-alabaster">
          <tr>
            <th scope="col" className="px-6 py-4">ID Canal</th>
            <th scope="col" className="px-6 py-4">Cliente</th>
            <th scope="col" className="px-6 py-4">Canal</th>
            <th scope="col" className="px-6 py-4">Prioridad</th>
            <th scope="col" className="px-6 py-4">Estado</th>
            <th scope="col" className="px-6 py-4 text-right">Total</th>
            <th scope="col" className="px-6 py-4 text-right">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            // Aplicamos Hover Effects: hover:bg-white transition-all duration-300
            <tr key={order.id_pedido} className="border-b border-brand-alabaster/50 hover:bg-white hover:shadow-sm transition-all duration-300 cursor-default group">
              <td className="px-6 py-4 font-medium whitespace-nowrap text-brand-yale group-hover:text-brand-teal transition-colors">
                {order.id_canal}
              </td>
              <td className="px-6 py-4">
                <div className="font-medium text-brand-graphite">{order.cliente.nombre}</div>
                <div className="text-xs text-brand-graphite/60">{order.cliente.email}</div>
              </td>
              <td className="px-6 py-4">
                <span className="capitalize">{order.tipo_canal.replace('_', ' ')}</span>
              </td>
              <td className="px-6 py-4">
                {getPriorityBadge(order.prioridad)}
              </td>
              <td className="px-6 py-4">
                {getStatusBadge(order.estado)}
              </td>
              <td className="px-6 py-4 text-right font-medium">
                ${order.total.toLocaleString('es-CL')}
              </td>
              <td className="px-6 py-4 text-right text-xs text-brand-graphite/70">
                {new Date(order.recibido_en).toLocaleDateString('es-CL', {
                  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}