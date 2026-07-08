'use client';

import { type NormalizedOrder } from '@/lib/normalizers/orderNormalizer';

interface PanelProps {
  order: NormalizedOrder | null;
  onClose: () => void;
}

export default function OrderDetailsPanel({ order, onClose }: PanelProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro con efecto blur */}
      <div className="absolute inset-0 bg-brand-graphite/30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Panel deslizante */}
      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300 border-l border-brand-alabaster/50">
        <div className="px-6 py-4 border-b border-brand-alabaster flex justify-between items-center bg-brand-alabaster/20">
          <h2 className="font-bold text-brand-yale text-lg">Detalle: {order.id_canal}</h2>
          <button onClick={onClose} className="text-brand-graphite/50 hover:text-brand-graphite">✕</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <p className="text-xs text-brand-graphite/50 uppercase font-bold">Cliente</p>
              <p className="font-medium text-brand-yale">{order.cliente.nombre}</p>
              <p className="text-sm text-brand-graphite/70">{order.cliente.email}</p>
            </div>

            <div>
              <p className="text-xs text-brand-graphite/50 uppercase font-bold">Dirección</p>
              <p className="text-sm text-brand-graphite">{order.direccion_envio.calle} {order.direccion_envio.numero}</p>
              <p className="text-sm text-brand-graphite">{order.direccion_envio.ciudad}, {order.direccion_envio.region}</p>
            </div>

            <div className="border-t border-brand-alabaster pt-4">
              <p className="text-xs text-brand-graphite/50 uppercase font-bold mb-2">Productos</p>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm py-1">
                  <span>{item.cantidad}x {item.sku}</span>
                  <span className="font-medium">${item.precio_unitario.toLocaleString('es-CL')}</span>
                </div>
              ))}
            </div>

            <div className="bg-brand-alabaster/20 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm"><span>Subtotal:</span><span>${order.subtotal.toLocaleString('es-CL')}</span></div>
              <div className="flex justify-between font-bold text-brand-yale"><span>Total:</span><span>${order.total.toLocaleString('es-CL')}</span></div>
            </div>

            <div className="border-t border-brand-alabaster pt-4">
              <p className="text-xs text-brand-graphite/50 uppercase font-bold mb-2">Pago</p>
              <div className="flex justify-between text-sm">
                <span>Intentos de pago:</span>
                <span className="font-medium">{order.intentosPago}</span>
              </div>
              {order.motivoRechazo && (
                <div className="flex justify-between text-sm mt-1">
                  <span>Motivo rechazo:</span>
                  <span className="font-medium text-red-600">{order.motivoRechazo}</span>
                </div>
              )}
            </div>

            {order.stockReservations.length > 0 && (
              <div className="border-t border-brand-alabaster pt-4">
                <p className="text-xs text-brand-graphite/50 uppercase font-bold mb-2">Reservas de Stock</p>
                {order.stockReservations.map((res, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1">
                    <span>{res.cantidad}x {res.sku}</span>
                    <span className="font-mono text-xs text-brand-teal">{res.reservaId}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}