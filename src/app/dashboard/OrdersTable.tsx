import { type NormalizedOrder } from '@/lib/normalizers/orderNormalizer';

interface OrdersTableProps {
  orders: NormalizedOrder[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-brand-white rounded-xl shadow-sm border border-brand-alabaster">
        <div className="w-16 h-16 bg-brand-alabaster rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-brand-graphite opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
        </div>
        <h3 className="text-lg font-medium text-brand-graphite">No se encontraron pedidos</h3>
        <p className="text-brand-graphite/70 text-sm mt-1">Ajusta los filtros para ver más resultados.</p>
      </div>
    );
  }

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'alta':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded border border-red-200">Alta</span>;
      case 'media':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded border border-yellow-200">Media</span>;
      case 'baja':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-200">Baja</span>;
      default:
        return <span className="bg-brand-alabaster text-brand-graphite text-xs font-medium px-2.5 py-0.5 rounded border border-gray-300">N/A</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'creado':
        return <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue-200">Creado</span>;
      case 'verificado':
        return <span className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-indigo-200">Verificado</span>;
      case 'pagado':
        return <span className="bg-brand-teal/10 text-brand-teal text-xs font-medium px-2.5 py-0.5 rounded-full border border-brand-teal/20">Pagado</span>;
      case 'listo_para_despacho':
        return <span className="bg-purple-50 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-purple-200">Listo para despacho</span>;
      case 'entregado':
        return <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-green-200">Entregado</span>;
      case 'rechazado':
      case 'cancelado':
        return <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-200 capitalize">{status}</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-gray-200 capitalize">{status}</span>;
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-sm sm:rounded-xl border border-brand-alabaster bg-brand-white">
      <table className="w-full text-sm text-left text-brand-graphite">
        <thead className="text-xs text-brand-yale uppercase bg-brand-alabaster/50 border-b border-brand-alabaster">
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
            <tr key={order.id_pedido} className="bg-brand-white border-b border-brand-alabaster hover:bg-brand-alabaster/20 transition-colors">
              <td className="px-6 py-4 font-medium whitespace-nowrap">
                {order.id_canal}
              </td>
              <td className="px-6 py-4">
                <div className="font-medium text-brand-graphite">{order.cliente.nombre}</div>
                <div className="text-xs text-brand-graphite/70">{order.cliente.email}</div>
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
                  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
