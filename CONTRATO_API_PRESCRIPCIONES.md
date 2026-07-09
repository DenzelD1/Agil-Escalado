# Contrato de Integración: Recepción de Prescripciones Médicas

**De:** Proyecto 1 (Atención Domiciliaria)
**Para:** Proyecto 3 (Gestión de Pedidos)

Este documento define el contrato de la API (Webhook) que el **Proyecto 1** debe consumir para notificar al **Proyecto 3** cada vez que un médico prescriba un kit clínico domiciliario.

## 1. Endpoint

- **URL (Producción/Staging):** `https://agil-escalado.vercel.app/api/webhooks/prescriptions`
- **Método HTTP:** `POST`
- **Content-Type:** `application/json`

## 2. Autenticación

El endpoint está protegido. El Proyecto 1 debe incluir un token de autorización en los headers de la petición:

```http
Authorization: Bearer <TOKEN_COMPARTIDO>
```

_(Nota: El token a utilizar debe ser acordado entre ambos equipos, usualmente configurado en variables de entorno)._

## 3. Formato del Payload (JSON)

El cuerpo de la petición debe contener la información del paciente, la dirección de entrega y los insumos del kit. El sistema de Gestión de Pedidos es flexible, pero se recomienda la siguiente estructura estándar:

```json
{
  "orderId": "PRSC-10045",
  "prioridad": "alta",
  "cliente": {
    "nombre": "Juan Pérez",
    "email": "juan.perez@email.com",
    "telefono": "+56912345678"
  },
  "direccion_envio": {
    "calle": "Av. Apoquindo",
    "numero": "1234",
    "ciudad": "Santiago",
    "region": "Metropolitana",
    "codigo_postal": "7550000",
    "pais": "Chile",
    "notas_adicionales": "Dejar en conserjería"
  },
  "items": [
    {
      "sku": "KIT-RESP-01",
      "cantidad": 1,
      "precio_unitario": 0,
      "descuento": 0
    },
    {
      "sku": "PARACETAMOL-500",
      "cantidad": 2,
      "precio_unitario": 0,
      "descuento": 0
    }
  ]
}
```

### Detalle de Campos:

- `orderId` _(opcional pero recomendado)_: ID único de la prescripción generado por el Proyecto 1. Si no se envía, el Proyecto 3 generará uno automáticamente.
- `prioridad` _(opcional)_: Puede ser `baja`, `media`, `alta` o `urgente`.
- `cliente`: Objeto obligatorio. El `email` es fundamental, ya que se usa como identificador (CustomerID) en el Proyecto 3.
- `direccion_envio`: Objeto obligatorio. Define dónde llegará el kit clínico.
- `items`: Array obligatorio. Debe contener al menos 1 ítem (el kit clínico o los medicamentos).
  - `sku`: Código identificador del producto en el Inventario (Proyecto 5).
  - `precio_unitario`: Puede enviarse como `0` dado que la prescripción es un servicio exento de cobro en el checkout.

## 4. Respuesta Esperada

### 🟢 201 Created (Éxito)

Si el pedido es recibido y el stock es reservado exitosamente.

```json
{
  "mensaje": "Pedido Interno B2B procesado y liberado automáticamente",
  "pedido_id": "uuid-interno-generado",
  "estado": "pendiente_preparacion"
}
```

### 🔴 400 Bad Request (Error de Validación)

Si faltan datos requeridos (ej. no se enviaron los items o falta la dirección).

```json
{
  "error": "Error de validación y normalización de datos",
  "errores": [
    {
      "campo": "items",
      "mensaje": "El pedido debe contener al menos un ítem"
    }
  ]
}
```

### 🔴 409 Conflict (Sin Stock)

Si el Proyecto 5 rechaza la reserva de inventario por falta de unidades.

```json
{
  "error": "Stock insuficiente para el SKU: KIT-RESP-01",
  "tipo": "stock_insuficiente"
}
```

## 5. Lógica Interna del Proyecto 3 (Transparente para P1)

Al recibir esta petición, el **Proyecto 3** de forma autónoma:

1. Aplica un flag interno `exento_pago: true`.
2. Asigna la vía del pedido como canal `internal` (marcado en UI como 🚑 Prescripción).
3. Va al **Proyecto 5** a reservar el stock automáticamente.
4. Genera la orden y emite el evento `OrderCreated` (pedido_creado) hacia el **Proyecto 9** (Business Intelligence).
5. Deja el pedido listo en estado `pendiente_preparacion` (Pend. Prep.) esperando la recolección logística.
