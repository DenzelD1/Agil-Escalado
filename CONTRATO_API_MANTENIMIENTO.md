# Contrato de Integración: Recepción de Repuestos por Mantenimiento

**De:** Proyecto 1 (Gestión de Atención en Terreno)
**Para:** Proyecto 3 (Gestión de Pedidos)

Este documento define el contrato de la API (Webhook) que el **Proyecto 1** debe consumir para notificar al **Proyecto 3** cada vez que se complete una inspección técnica de un equipo médico y se requieran repuestos (como filtros HEPA o baterías). Esto aplica específicamente al caso de uso de **Mantenimiento Preventivo**.

## 1. Endpoint

- **URL (Producción/Staging):** `https://agil-escalado.vercel.app/api/webhooks/maintenance`
- **Método HTTP:** `POST`
- **Content-Type:** `application/json`

## 2. Autenticación

El endpoint está protegido. El Proyecto 1 debe incluir un token de autorización en los headers de la petición:

```http
Authorization: Bearer <TOKEN_COMPARTIDO_P01_P03>
```

*(Nota: El token a utilizar debe ser acordado entre ambos equipos, usualmente configurado en variables de entorno).*

## 3. Formato del Payload (JSON)

El cuerpo de la petición (que puede derivar del evento `MaintenanceInspectionCompleted`) debe contener la información de la clínica/cliente, la dirección de despacho y los repuestos requeridos.

```json
{
  "orderId": "MANT-2026-001",
  "prioridad": "alta",
  "cliente": {
    "nombre": "Clínica Privada (Mantenimiento)",
    "email": "contacto@clinicaprivada.cl",
    "telefono": "+56987654321"
  },
  "direccion_envio": {
    "calle": "Av. Vitacura",
    "numero": "5950",
    "ciudad": "Santiago",
    "region": "Metropolitana",
    "codigo_postal": "7630000",
    "pais": "Chile",
    "notas_adicionales": "Entregar al Jefe de Mantenimiento de Equipos"
  },
  "items": [
    {
      "sku": "FILTRO-HEPA-01",
      "cantidad": 1,
      "precio_unitario": 0,
      "descuento": 0
    },
    {
      "sku": "BATERIA-RESPALDO-02",
      "cantidad": 1,
      "precio_unitario": 0,
      "descuento": 0
    }
  ]
}
```

### Detalle de Campos:

- `orderId` *(opcional pero recomendado)*: ID único del servicio o mantenimiento generado por el Proyecto 1. Si no se envía, el Proyecto 3 generará uno automáticamente.
- `prioridad` *(opcional)*: Puede ser `baja`, `media`, `alta` o `urgente`.
- `cliente`: Objeto obligatorio. El `email` es fundamental, ya que se usa como identificador (CustomerID) en el Proyecto 3.
- `direccion_envio`: Objeto obligatorio. Define a dónde llegará el repuesto para la instalación.
- `items`: Array obligatorio. Debe contener al menos 1 ítem (ej. el filtro o la batería).
  - `sku`: Código identificador del repuesto en el Inventario (Proyecto 5).
  - `precio_unitario`: Debe enviarse como `0` o será forzado a exento de pago internamente, dado que el mantenimiento preventivo ya está cubierto por contrato.

## 4. Respuesta Esperada

### 🟢 201 Created (Éxito)

Si el pedido de repuestos es recibido y el stock es reservado exitosamente.

```json
{
  "mensaje": "Pedido de Mantenimiento B2B procesado y liberado automáticamente",
  "pedido_id": "uuid-interno-generado",
  "estado": "pendiente_preparacion"
}
```

### 🔴 400 Bad Request (Error de Validación)

Si faltan datos requeridos (ej. no se enviaron los repuestos o falta la dirección).

```json
{
  "error": "Error de validación y normalización de datos",
  "errores": [
    {
      "campo": "items",
      "mensaje": "El pedido debe contener al menos un repuesto"
    }
  ]
}
```

### 🔴 409 Conflict (Sin Stock)

Si el Proyecto 5 (Inventario) rechaza la reserva por falta de unidades de un repuesto crítico.

```json
{
  "error": "Stock insuficiente para el SKU: FILTRO-HEPA-01",
  "tipo": "stock_insuficiente"
}
```

## 5. Lógica Interna del Proyecto 3 (Transparente para P1)

Al recibir esta petición, el **Proyecto 3** de forma autónoma:

1. Aplica un flag interno `exento_pago: true`.
2. Asigna la vía del pedido como canal `internal` (marcado en UI como Pedido B2B/Interno).
3. Va al **Proyecto 5** a reservar el stock automáticamente de los repuestos.
4. Genera la orden y emite el evento `OrderCreated` hacia el **Proyecto 9** (Business Intelligence) para reportar el consumo de repuestos.
5. Deja el pedido listo en estado `pendiente_preparacion` esperando la gestión logística (Proyecto 2).
