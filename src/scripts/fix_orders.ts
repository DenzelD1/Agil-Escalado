import { prisma } from '../lib/prisma';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../../.env.local') });

async function run() {
  const orders = await prisma.order.findMany();
  console.log("Current states:", orders.map(o => o.estado));
  
  for (const o of orders) {
    if (o.estado === 'PROCESANDO' || o.estado === 'CONFIRMADO') {
      await prisma.order.update({
        where: { id: o.id },
        data: { estado: 'CREADO' }
      });
      console.log(`Updated order ${o.id} from ${o.estado} to CREADO`);
    } else if (o.estado === 'ENVIADO') {
      await prisma.order.update({
        where: { id: o.id },
        data: { estado: 'ENTREGADO' }
      });
      console.log(`Updated order ${o.id} from ENVIADO to ENTREGADO`);
    } else if (o.estado === 'ERROR') {
      await prisma.order.update({
        where: { id: o.id },
        data: { estado: 'RECHAZADO' as any } // RECHAZADO no esta en el enum de BD, asi que uso CREADO o CANCELADO
      }).catch(() => prisma.order.update({
        where: { id: o.id },
        data: { estado: 'CANCELADO' }
      }));
    }
  }
}

run().catch(console.error).finally(() => prisma.$disconnect());
