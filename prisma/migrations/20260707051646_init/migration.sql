-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CREADO', 'PROCESANDO', 'CONFIRMADO', 'PAGADO', 'ENVIADO', 'ENTREGADO', 'CANCELADO', 'ERROR');

-- CreateEnum
CREATE TYPE "OrderPriority" AS ENUM ('BAJA', 'MEDIA', 'ALTA', 'URGENTE');

-- CreateEnum
CREATE TYPE "OrderChannel" AS ENUM ('WEB', 'MOBILE', 'CALLCENTER');

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "calle" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "region" TEXT,
    "codigoPostal" TEXT,
    "pais" TEXT NOT NULL DEFAULT 'Chile',
    "notasAdicionales" TEXT,
    "esDirectionPrincipal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "idCanal" TEXT NOT NULL,
    "tipoCanal" "OrderChannel" NOT NULL,
    "clienteId" TEXT NOT NULL,
    "direccionId" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "impuestos" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "estado" "OrderStatus" NOT NULL DEFAULT 'CREADO',
    "prioridad" "OrderPriority" NOT NULL DEFAULT 'MEDIA',
    "recibidoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "procesadoEn" TIMESTAMP(3),
    "notas" TEXT,
    "agenteId" TEXT,
    "intentosPago" INTEGER NOT NULL DEFAULT 0,
    "motivoRechazo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DOUBLE PRECISION NOT NULL,
    "descuento" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockReservation" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "reservaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockReservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE INDEX "Client_email_idx" ON "Client"("email");

-- CreateIndex
CREATE INDEX "Address_clientId_idx" ON "Address"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_idCanal_key" ON "Order"("idCanal");

-- CreateIndex
CREATE INDEX "Order_clienteId_idx" ON "Order"("clienteId");

-- CreateIndex
CREATE INDEX "Order_direccionId_idx" ON "Order"("direccionId");

-- CreateIndex
CREATE INDEX "Order_estado_idx" ON "Order"("estado");

-- CreateIndex
CREATE INDEX "Order_recibidoEn_idx" ON "Order"("recibidoEn");

-- CreateIndex
CREATE INDEX "Item_orderId_idx" ON "Item"("orderId");

-- CreateIndex
CREATE INDEX "Item_sku_idx" ON "Item"("sku");

-- CreateIndex
CREATE INDEX "StockReservation_orderId_idx" ON "StockReservation"("orderId");

-- CreateIndex
CREATE INDEX "StockReservation_sku_idx" ON "StockReservation"("sku");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_direccionId_fkey" FOREIGN KEY ("direccionId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockReservation" ADD CONSTRAINT "StockReservation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
