import { PrismaClient } from "@/generated/prisma/client";

// ---------------------------------------------------------------------------
// Singleton de PrismaClient con driver adapter para SQLite (Prisma 7)
//
// En desarrollo, reutilizamos la instancia entre recargas de HMR para evitar
// agotar las conexiones. En producción, se crea una sola instancia.
// ---------------------------------------------------------------------------

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  return new PrismaClient({} as any);
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
