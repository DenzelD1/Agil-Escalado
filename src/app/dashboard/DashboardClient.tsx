'use client';

import { useState } from 'react';
import type { NormalizedOrder } from '@/lib/normalizers/orderNormalizer';
import OrdersTable from './OrdersTable';
import OrderKanbanBoard from './OrderKanbanBoard';
import OrderDetailsPanel from './OrderDetailsPanel';

interface DashboardClientProps {
  orders: NormalizedOrder[];
  view: string;
}

export default function DashboardClient({ orders, view }: DashboardClientProps) {
  const [selectedOrder, setSelectedOrder] = useState<NormalizedOrder | null>(null);

  return (
    <>
      {view === 'kanban' ? (
        <OrderKanbanBoard orders={orders} onOrderClick={setSelectedOrder} />
      ) : (
        <OrdersTable orders={orders} onOrderClick={setSelectedOrder} />
      )}
      <OrderDetailsPanel order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
}
