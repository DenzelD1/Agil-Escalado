# INFORME DETALLADO: Sistema Centralizado de Gestión de Pedidos Omnicanal
**Proyecto 3: Orders Management System**  
**Fecha:** Mayo 2026  
**Versión:** 1.0 - Estado Inicial Implementado

---

## TABLA DE CONTENIDOS

1. [Introducción ejecutiva](#introducción-ejecutiva)
2. [Mapeo de integraciones y dependencias](#mapeo-de-integraciones-y-dependencias)
3. [Arquitectura técnica actual](#arquitectura-técnica-actual)
4. [Qué tenemos implementado](#qué-tenemos-implementado)
5. [Qué hicimos con la máquina de estados](#qué-hicimos-con-la-máquina-de-estados)
6. [Flujos de transición de estados](#flujos-de-transición-de-estados)
7. [Especificaciones de endpoints](#especificaciones-de-endpoints)
8. [Cómo responder a otros equipos](#cómo-responder-a-otros-equipos)
9. [Hoja de ruta (MVP → Producción)](#hoja-de-ruta-mvp--producción)
10. [Riesgos, consideraciones y limitaciones](#riesgos-consideraciones-y-limitaciones)

---

## INTRODUCCIÓN EJECUTIVA

### Propósito del proyecto
Este proyecto es el **núcleo de orquestación de pedidos** para una plataforma omnicanal. Su tarea es:
- Recibir pedidos desde múltiples canales (web, app, call center)
- Normalizar datos heterogéneos a un formato canónico consistente
- Gestionar el ciclo de vida del pedido con una máquina de estados explícita
- Conectar y coordinar con servicios externos (pagos, inventario, logística, analítica)

### Qué NO es este proyecto
- No es el sistema de pagos (eso es Proyecto 4)
- No es el sistema de inventario (eso es Proyecto 5)
- No es el sistema de logística (eso es Proyecto 2)
- No es el panel operativo ni la interfaz de usuario

### Qué SÍ es
Es el **maestro de ceremonias** que recibe datos, los valida, los transforma, los rastrea en un estado de máquina y luego dispara acciones en los servicios externos.

---

## MAPEO DE INTEGRACIONES Y DEPENDENCIAS

### Relación con otros proyectos

```
                    ┌─────────────────────────────────────────────┐
                    │  Proyecto 3: Orders Management System        │
                    │  (Núcleo - Donde estamos trabajando)        │
                    └────────┬────────────────────────────┬────────┘
                             │                            │
         ┌───────────────────┼────────────────────────────┼───────────────────┐
         │                   │                            │                   │
         ▼                   ▼                            ▼                   ▼
    ┌─────────┐          ┌─────────┐            ┌──────────────┐        ┌──────────┐
    │ Proyecto│          │Proyecto │            │  Proyecto 2  │        │Proyecto 6│
    │    4    │          │    5    │            │  Logistics   │        │Notif.   │
    │ Pagos   │          │Inventario           │ (Shipping)   │        │Events   │
    └─────────┘          └─────────┘            └──────────────┘        └──────────┘
         ▲                   ▲                            ▲                   ▲
         │                   │                            │                   │
    - POST /payments/init    - GET /stock/{sku}       - POST /shipments    - POST /events
    - Webhook: pago aprobado - POST /stock/reserve    - Webhook: shipped   - payload:
    - Webhook: pago rechazado - DELETE /stock/cancel                         order_id,
                                                                              status,
                                                                              amount
         
         ┌──────────────────────────┐
         │  Proyecto 7: CRM/Support │
         │  (Escalamientos)         │
         └──────────────────────────┘
                    ▲
                    │
              - POST /tickets
              - Nota de crédito
              - Reintentos manuales
```

### Flujo de datos entre sistemas

**Flujo de un pedido típico:**

```
Cliente (Web/App/Call Center)
        ↓
  POST /api/{channel}
        ↓
[Proyecto 3: Normalización]
        ↓
[Estado: creado]
        ↓
[Validación + reserva de stock]
        ↓
[Estado: verificado]
        ↓
    (evento: pedido_creado) → Proyecto 6 (Analítica)
        ↓
[Intenta pagar]
        ↓
    POST → Proyecto 4 (Pagos)
        ↓
    (Webhook desde Proyecto 4)
        ↓
[Si pagado: estado: pagado]
[Si rechazado: estado: rechazado + liberar stock]
        ↓
[Si pagado, enviar a logística]
        ↓
    POST → Proyecto 2 (Logística)
        ↓
[Estado: listo_para_despacho]
        ↓
[Proyecto 2 completa envío]
        ↓
    (Webhook desde Proyecto 2)
        ↓
[Estado: entregado]
```

### Comunicación esperada con cada proyecto

| Proyecto | Tipo | Qué nos envía | Qué le enviamos | Estado actual |
|----------|------|---------------|-----------------|---|
| Proyecto 4 (Pagos) | Síncrono + Webhook | Aprobación/Rechazo | order_id, monto, metadata | Pending (no integrado aún) |
| Proyecto 5 (Inventario) | Síncrono | Disponibilidad, OK reserva | sku, cantidad, order_id | Parcial (consulta básica) |
| Proyecto 2 (Logística) | Síncrono + Webhook | Status de envío | order_id, items, dirección | No integrado |
| Proyecto 6 (Analítica) | Webhook | - | pedido_creado, pedido_pagado | No integrado |
| Proyecto 7 (CRM) | Síncrono | - | Tickets escalados | No integrado |

---

## ARQUITECTURA TÉCNICA ACTUAL

### Stack tecnológico

```
Frontend
├── Next.js 16.2.4 (React 19)
├── TypeScript 5
└── Tailwind CSS + PostCSS

Backend (Next.js API Routes)
├── Node.js runtime
├── José (JWT handling)
├── Prisma 7.8.0 (ORM - no DB aún configurada)
└── Zod 4.4.3 (Schema validation)

State Management
└── XState 5.31.1 (State machine)

Development
├── ESLint 9
└── Prisma CLI
```

### Estructura de carpetas relevantes

```
src/
├── app/
│   ├── api/
│   │   ├── web/route.ts          ← Ingesta canal web
│   │   ├── mobile/route.ts       ← Ingesta canal app
│   │   └── callcenter/route.ts   ← Ingesta canal call center
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
└── lib/
    ├── jwt.ts                     ← Verificación de tokens
    │
    ├── machines/
    │   ├── orderStateMachine.ts   ← Definición de máquina de estados
    │   └── orderStateManager.ts   ← Gestor de transiciones (NUEVO)
    │
    ├── normalizers/
    │   ├── orderNormalizer.ts     ← Orquestador de normalización
    │   ├── clientNormalizer.ts    ← Normalización de cliente
    │   ├── addressNormalizer.ts   ← Normalización de dirección
    │   └── skuNormalizer.ts       ← Normalización de items/SKUs
    │
    └── schemas/
        └── orderSchemas.ts        ← Definición de esquemas Zod

prisma/
└── schema.prisma                   ← (No configurada aún)
```

### Flujo de datos dentro del código

```
HTTP Request
    ↓
Verificación de JWT (verifyJwt)
    ↓
Extracción de payload JSON
    ↓
Normalización segura (safeNormalizeOrder)
    ├─ normalizeClient() → ClientType
    ├─ normalizeAddress() → AddressType
    ├─ normalizeItems() → ItemType[]
    ├─ Cálculo de totales (subtotal, IVA 19%, total)
    └─ Generación de metadata (id_pedido UUID, recibido_en timestamp)
    ↓
[Estado inicial = creado]
    ↓
Validación de stock (si aplica al canal)
    ├─ Consulta: GET ${API_INVENTARIO_URL}/stock/{sku}
    └─ Reserva: POST ${API_INVENTARIO_URL}/stock/reserve
    ↓
Transición de estado (orderStateManager.ts)
    ├─ Si validación falla: creado → rechazado
    └─ Si validación exitosa: creado → verificado
    ↓
HTTP Response con estado y transición
```

---

## QUÉ TENEMOS IMPLEMENTADO

### 1. Esquemas de validación Zod (`src/lib/schemas/orderSchemas.ts`)

**Qué es:**
Definición de estructuras de datos y reglas de validación para todos los componentes del pedido. Actúa como "contrato de datos interno".

**Detalle técnico:**

#### CanalSchema
```typescript
export const CanalSchema = z.enum(['web', 'app', 'call_center']);
```
- Restringe a 3 canales válidos
- Cualquier intento de otro valor fallará en validación

#### OrderStatusSchema (NUEVO)
```typescript
export const OrderStatusSchema = z.enum([
  'creado',
  'verificado',
  'pagado',
  'listo_para_despacho',
  'entregado',
  'rechazado',
  'cancelado',
]);
```
- Define estados posibles del pedido
- Centraliza lista de estados válidos
- Usado por máquina de estados y por respuestas de API

#### ClientSchema
```typescript
{
  id: string (optional),
  nombre: string (min 1 char),
  email: string (lowercase + valid format),
  telefono: string (optional, digits + '+' only)
}
```
- **Transformaciones automáticas:**
  - `email` → `toLowerCase()` para normalizar
  - `telefono` → extrae solo `[+\d]` para evitar caracteres especiales

#### AddressSchema
```typescript
{
  calle: string (min 1),
  numero: string (min 1),
  ciudad: string (min 1, uppercase),
  region: string (optional, uppercase),
  codigo_postal: string (optional, without spaces, uppercase),
  pais: string (default 'Chile', uppercase),
  notas_adicionales: string (optional)
}
```
- **Transformaciones:**
  - `ciudad`, `region`, `pais` → `toUpperCase()`
  - `codigo_postal` → sin espacios + uppercase

#### ItemSchema
```typescript
{
  sku: string (uppercase + normalize),
  cantidad: number (positive integer),
  precio_unitario: number (≥ 0, 2 decimals),
  descuento: number (0–1 range, default 0)
}
```
- **Transformaciones:**
  - `sku` → `toUpperCase()` + `spaces → '-'`
  - `precio_unitario` → siempre 2 decimales (redondeo)

#### OrderSchema (completo)
```typescript
{
  id_canal: string,
  tipo_canal: Canal,
  cliente: ClientSchema,
  direccion_envio: AddressSchema,
  items: ItemSchema[] (min 1),
  subtotal: number (≥ 0),
  impuestos: number (≥ 0),
  total: number (≥ 0),
  estado: OrderStatusSchema (default 'creado')
}
```

**Beneficio:** Cualquier dato que entre al sistema es garantizado válido o rechazado con errores claros.

---

### 2. Normalización de pedidos (`src/lib/normalizers/orderNormalizer.ts`)

**Qué es:**
Motor que convierte datos heterogéneos de 3 canales diferentes a un formato canónico único.

**Detalle técnico:**

**Función: `normalizeOrder(body, canal)`**

Entrada: `body` (JSON crudo) + `canal` ('web' | 'app' | 'call_center')  
Salida: `NormalizedOrder` (estructura garantizada)

**Pasos internos:**
```
1. normalizeClient(body.cliente)
   - Acepta aliases por canal (diferente estructura en cada uno)
   - Retorna ClientType consistente

2. normalizeAddress(body.direccion_envio || body.shippingAddress || ...)
   - Soporta múltiples nombres de campos
   - Normaliza a AddressType

3. normalizeItems(body.items || body.lineas || body.products || ...)
   - Convierte array de ítems (nombre varía por canal)
   - Aplica esquema ItemSchema
   - Retorna ItemType[]

4. calcularSubtotal(items)
   - Fórmula: subtotal = Σ(precio_unitario × cantidad × (1 - descuento))
   - Redondeo a 2 decimales

5. Validación de IVA
   - IVA_RATE = 19% (Chile, configurable por env)
   - impuestos = subtotal × 0.19
   - total = subtotal + impuestos
   - Si cliente envía total, verifica coherencia (tolerancia 1%)

6. Generación de metadata
   - id_pedido = UUID aleatorio
   - recibido_en = ISO 8601 timestamp
   - id_canal = referencia externa del cliente
   - tipo_canal = 'web' | 'app' | 'call_center'
   - estado = initialOrderState ('creado')
```

**Interfaz de respuesta segura:**
```typescript
safeNormalizeOrder(body, canal) retorna:
{
  success: true,
  data: NormalizedOrder
} OR {
  success: false,
  errors: NormalizationError[],
  rawError?: unknown
}
```

**Beneficio:** Los canales pueden enviar datos con estructura diferente; el normalizer los convierte a un formato único.

**Ejemplo en código:**

```typescript
// El cliente web envía:
{
  "cliente": { "nombre": "Juan", "email": "juan@example.com" },
  "shippingAddress": { "calle": "Calle 1", "numero": "123" },
  "items": [{ "sku": "PROD-001", "cantidad": 2, "precio_unitario": 100 }]
}

// El cliente app envía:
{
  "cliente": { "nombre": "Maria", "email": "maria@example.com" },
  "street": "Av. Principal",
  "number": "456",
  "products": [{ "productId": "PROD-002", "qty": 1, "price": 200 }]
}

// Ambos se normalizan a:
{
  "id_pedido": "550e8400-e29b-41d4-a716-446655440000",
  "recibido_en": "2026-05-19T20:30:45.123Z",
  "tipo_canal": "web" | "app",
  "cliente": { "nombre": "...", "email": "...", "telefono": "..." },
  "direccion_envio": { "calle": "...", "ciudad": "..." },
  "items": [{ "sku": "PROD-XXX", "cantidad": 1, "precio_unitario": 100 }],
  "subtotal": 200,
  "impuestos": 38,
  "total": 238,
  "estado": "creado"
}
```

---

### 3. Máquina de estados (`src/lib/machines/orderStateMachine.ts`)

**Qué es:**
Definición explícita del ciclo de vida de un pedido usando XState, una librería para máquinas de estados.

**Detalle técnico:**

**Estados (7 total):**

```
┌─────────────────────────────────────────────────────────────┐
│                    Ciclo de vida de pedido                  │
└─────────────────────────────────────────────────────────────┘

    ┌──────────┐
    │ CREADO   │  ← Estado inicial
    └────┬─────┘
         │
         ├──[VALIDACION_EXITOSA]──→ ┌──────────────┐
         │                          │  VERIFICADO  │  ← Datos validados
         │                          └──────┬───────┘
         │                                 │
         └─[VALIDACION_FALLIDA]──→ ┌──────────────┐
                                   │  RECHAZADO   │  ← Terminal (con retry)
                                   └──────┬───────┘
                                          │
                                    [REINTENTAR]
                                          │
                                          ▼
              ┌──────────────────────────────────┐
              │                                  │
         ┌────┴─────┐                           │
         │           │                           │
    [PAGO_APROBADO]  │ [PAGO_RECHAZADO]        │
         │           │                           │
         ▼           └──[REINTENTAR]──→ [Vuelve a VERIFICADO]
     ┌────────┐
     │ PAGADO │  ← Pago confirmado
     └────┬───┘
          │
    [ENVIAR]
          │
          ▼
    ┌──────────────────────┐
    │ LISTO_PARA_DESPACHO  │  ← Enviado a logística
    └────────┬─────────────┘
             │
       [ENTREGADO]
             │
             ▼
        ┌──────────┐
        │ ENTREGADO│  ← Terminal (final exitoso)
        └──────────┘

En cualquier estado:
    [CANCELAR] → CANCELADO (terminal)
```

**Eventos (transiciones permitidas):**

| Evento | Origen | Destino | Significado |
|--------|--------|---------|---|
| VALIDACION_EXITOSA | creado | verificado | Datos validados, cliente/dirección/items OK |
| VALIDACION_FALLIDA | creado/verificado/rechazado | rechazado | Datos inválidos, stock insuficiente, etc |
| PAGO_APROBADO | verificado | pagado | Proyecto 4 confirmó pago |
| PAGO_RECHAZADO | verificado | rechazado | Proyecto 4 rechazó pago |
| STOCK_RESERVADO | verificado | verificado | (informativo) Stock reservado exitosamente |
| STOCK_INSUFICIENTE | creado/verificado | rechazado | No hay stock disponible |
| ENVIAR | pagado | listo_para_despacho | Proyecto 2 recibió orden de envío |
| ENTREGADO | listo_para_despacho | entregado | Proyecto 2 confirmó entrega |
| CANCELAR | cualquiera | cancelado | Usuario/sistema cancela pedido |
| REINTENTAR | rechazado | verificado | Reintentar pago/stock desde el inicio |

**Contexto del actor (datos que viajan con el estado):**

```typescript
{
  orderId?: string,          // ID del pedido en BD
  lastError?: string         // Último mensaje de error
}
```

**Implementación en código:**

```typescript
export const orderStateMachine = createMachine(
  {
    id: 'order',
    initial: 'creado',
    context: {
      orderId: undefined as string | undefined,
      lastError: undefined as string | undefined,
    },
    states: {
      creado: {
        on: {
          VALIDACION_EXITOSA: 'verificado',
          VALIDACION_FALLIDA: {
            target: 'rechazado',
            actions: 'setError',  // Guarda error en contexto
          },
          CANCELAR: 'cancelado',
        },
      },
      // ... otros estados
    },
  },
  {
    actions: {
      setError: assign({
        lastError: (_ctx, event) => {
          if (event && typeof event === 'object' && 'error' in event) {
            return (event as { error?: string }).error ?? 'Error desconocido';
          }
          return 'Error desconocido';
        },
      }),
    },
  },
);

export const initialOrderState: OrderStatus = 'creado';
```

**Beneficio:** El ciclo de vida del pedido es explícito, validable y predecible. No hay transiciones "mágicas" o inesperadas.

---

### 4. Gestor de estado (`src/lib/machines/orderStateManager.ts`) - NUEVO

**Qué es:**
Capa de utilidad que facilita calcular transiciones válidas desde los endpoints sin necesidad de XState en tiempo de ejecución (MVP sin persistencia).

**Detalle técnico:**

**Función: `transitionOrderState(currentState, event)`**

```typescript
// Dado un estado actual y un evento, calcula el siguiente estado
// Retorna { nextState, error? }

// Uso:
const result = transitionOrderState('creado', { type: 'VALIDACION_EXITOSA' });
// result = { nextState: 'verificado' }

const result2 = transitionOrderState('creado', { type: 'PAGO_APROBADO' });
// result2 = { nextState: 'creado', error: "Evento 'PAGO_APROBADO' no permitido en estado 'creado'" }
```

**Tabla de transiciones interna:**

```typescript
const transitions = {
  creado: {
    VALIDACION_EXITOSA: 'verificado',
    VALIDACION_FALLIDA: 'rechazado',
    CANCELAR: 'cancelado',
  },
  verificado: {
    PAGO_APROBADO: 'pagado',
    PAGO_RECHAZADO: 'rechazado',
    CANCELAR: 'cancelado',
  },
  pagado: {
    ENVIAR: 'listo_para_despacho',
    CANCELAR: 'cancelado',
  },
  listo_para_despacho: {
    ENTREGADO: 'entregado',
    CANCELAR: 'cancelado',
  },
  entregado: {}, // Final, sin transiciones
  rechazado: {
    REINTENTAR: 'verificado',
    CANCELAR: 'cancelado',
  },
  cancelado: {}, // Final, sin transiciones
};
```

**Función: `getOrderStateTransition(currentState, event)`**

Envoltura más amigable para APIs:

```typescript
// Retorna:
{
  success: boolean,
  nextState: OrderStatus,
  message: string,  // "Pedido pasó de 'creado' a 'verificado'"
  error?: string    // Si transición no válida
}
```

**Uso en endpoints:**

```typescript
// En POST /api/web
const stateTransition = getOrderStateTransition(initialOrderState, {
  type: 'VALIDACION_EXITOSA',
});

// Retorna:
{
  success: true,
  nextState: 'verificado',
  message: "Pedido pasó de 'creado' a 'verificado'"
}

// Y se incluye en respuesta HTTP:
{
  "pedido": { ..., "estado": "verificado" },
  "estado": "verificado",
  "transicion": "Pedido pasó de 'creado' a 'verificado'"
}
```

**Beneficio:** Los endpoints pueden usar máquina de estados sin complejidad de XState runtime.

---

## QUÉ HICIMOS CON LA MÁQUINA DE ESTADOS

### Integración en endpoints

Los tres endpoints (`/api/web`, `/api/mobile`, `/api/callcenter`) ahora implementan transiciones de estado durante su lógica de procesamiento.

**Flujo actualizado en cada endpoint:**

```
1. Verificar autenticación (JWT)
   └─ Si falla: retornar 401
   
2. Parsear request JSON
   
3. Normalizar datos (safeNormalizeOrder)
   ├─ Si falla:
   │  └─ Transición: creado → rechazado (VALIDACION_FALLIDA)
   │  └─ Retornar 400 con estado = 'rechazado'
   │
   └─ Si éxito:
      └─ Transición: creado → verificado (VALIDACION_EXITOSA)

4. [SOLO web/app] Validar stock
   ├─ Si insuficiente:
   │  └─ Transición: verificado → rechazado (VALIDACION_FALLIDA)
   │  └─ Retornar 409 con estado = 'rechazado'
   │
   └─ Si OK:
      └─ Mantener estado 'verificado'

5. [SOLO callcenter] No valida stock (asíncrono)

6. Retornar respuesta con:
   - pedido.estado = nextState
   - estado = nextState
   - transicion = mensaje de cambio
   - HTTP status 201 (creado exitosamente)
```

### Publicación de eventos de cambio de estado en Redis

Cada transición de pedido ahora genera un evento hacia Redis para facilitar la orquestación con servicios externos.

- Canal Redis por defecto: `order:state_changes`
- Variable de entorno configurada: `REDIS_ORDER_STATE_CHANNEL`
- URL de redis configurada con: `REDIS_URL`

**Qué se publica:**
- `orderId`
- `previousState`
- `nextState`
- `eventType`
- `message`
- `timestamp`
- `metadata` opcional

**Dónde se publica:**
- `src/lib/services/redisEventBus.ts`
- Se consume desde `src/lib/machines/orderStateManager.ts` cuando `publishToRedis: true`

**Beneficio:**
- Desacopla la máquina de estados del consumidor final
- Permite a otros servicios suscribirse en tiempo real a cambios críticos de pedido
- Si Redis falla, la transición de estado no se bloquea; el pedido sigue procesándose y se registra el error

### Ejemplo real de respuesta POST /api/web (exitoso)

```json
{
  "mensaje": "Pedido Web recibido, normalizado y stock reservado",
  "pedido": {
    "id_pedido": "550e8400-e29b-41d4-a716-446655440000",
    "recibido_en": "2026-05-19T20:35:12.456Z",
    "id_canal": "WEB-2026-05-19-001",
    "tipo_canal": "web",
    "cliente": {
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "telefono": "+56912345678"
    },
    "direccion_envio": {
      "calle": "Calle Principal",
      "numero": "123",
      "ciudad": "SANTIAGO",
      "region": "METROPOLITANA",
      "codigo_postal": "8320000",
      "pais": "CHILE"
    },
    "items": [
      {
        "sku": "PROD-001",
        "cantidad": 2,
        "precio_unitario": 100.00,
        "descuento": 0
      }
    ],
    "subtotal": 200.00,
    "impuestos": 38.00,
    "total": 238.00,
    "estado": "verificado"
  },
  "estado": "verificado",
  "transicion": "Pedido pasó de 'creado' a 'verificado'"
}
```

### Ejemplo real de respuesta POST /api/web (falla validación)

```json
{
  "error": "Error de validación y normalización de datos",
  "errores": [
    {
      "campo": "cliente.email",
      "mensaje": "El email del cliente no es válido",
      "valor_recibido": "invalid-email"
    }
  ],
  "estado": "rechazado",
  "transicion": "Pedido pasó de 'creado' a 'rechazado'"
}
```

HTTP Status: `400 Bad Request`

### Ejemplo real de respuesta POST /api/mobile (stock insuficiente)

```json
{
  "error": "Error de validación de stock",
  "errores_stock": [
    "Stock insuficiente para SKU: PROD-005 (disponible: 2, solicitado: 5)"
  ],
  "estado": "rechazado",
  "transicion": "Pedido pasó de 'creado' a 'rechazado'"
}
```

HTTP Status: `409 Conflict`

---

## FLUJOS DE TRANSICIÓN DE ESTADOS

### Flujo 1: Creación exitosa (Web/App)

```
Cliente web/app envía pedido
    ↓
[1] JWT válido
    ↓
[2] normalizeOrder() exitoso
    ↓
    Transición: creado → verificado (VALIDACION_EXITOSA)
    ↓
[3] Para cada item:
    - GET /inventario/stock/{sku}
    - POST /inventario/stock/reserve
    (si ambas OK, continuar)
    ↓
[4] Retornar 201 con estado = 'verificado'
    ↓
SIGUIENTE PASO (no implementado aún): Enviar a Proyecto 4 para pago
```

### Flujo 2: Creación fallida - Validación (Todos los canales)

```
Cliente envía pedido con datos inválidos
    ↓
[1] JWT válido
    ↓
[2] normalizeOrder() falla (ej: email inválido)
    ↓
    Transición: creado → rechazado (VALIDACION_FALLIDA)
    ↓
[3] Capturar errores de validación
    ↓
[4] Retornar 400 con estado = 'rechazado' + listado de errores
```

### Flujo 3: Creación fallida - Stock insuficiente (Web/App)

```
Cliente envía pedido válido
    ↓
[1] JWT válido
    ↓
[2] normalizeOrder() exitoso
    ↓
    Transición: creado → verificado (VALIDACION_EXITOSA)
    ↓
[3] Para algún item:
    GET /inventario/stock/{sku} retorna cantidad insuficiente
    ↓
    Transición: verificado → rechazado (VALIDACION_FALLIDA)
    ↓
[4] Retornar 409 con estado = 'rechazado' + detalles de stock
    
NOTA: Stock NO se reservó, permanece disponible para otros clientes
```

### Flujo 4: Call center (no valida stock en tiempo real)

```
Agente de call center envía pedido
    ↓
[1] JWT válido + rol = 'agent' | 'admin'
    ↓
[2] Valida presencia de agente_id
    ↓
[3] normalizeOrder() exitoso
    ↓
    Transición: creado → verificado (VALIDACION_EXITOSA)
    ↓
[4] NO HACE validación de stock
    (el agente ya confirmó disponibilidad por teléfono)
    ↓
[5] Retornar 201 con estado = 'verificado'
    ↓
SIGUIENTE PASO: Validación asíncrona de stock + envío a pagos
```

### Flujo futuro: Recepción de pago (no implementado aún)

```
Proyecto 4 envía webhook: { status: 'APPROVED', order_id: '...' }
    ↓
[Sistema busca pedido en BD con order_id]
    ↓
[Verifica estado actual = 'verificado']
    ↓
    Transición: verificado → pagado (PAGO_APROBADO)
    ↓
[Genera evento: pedido_pagado]
    ↓
    POST → Proyecto 6 (Analítica)
    ↓
[Prepara datos para Proyecto 2 (Logística)]
    ↓
    POST /logistica/shipments con pedido_id, items, dirección
    ↓
    Transición: pagado → listo_para_despacho (ENVIAR)
    ↓
[Espera webhook de Proyecto 2: { status: 'SHIPPED' }]
    ↓
    Transición: listo_para_despacho → entregado (ENTREGADO)
```

### Flujo futuro: Rechazo de pago (no implementado aún)

```
Proyecto 4 envía webhook: { status: 'REJECTED', order_id: '...' }
    ↓
[Sistema busca pedido con order_id]
    ↓
[Verifica estado = 'verificado']
    ↓
    Transición: verificado → rechazado (PAGO_RECHAZADO)
    ↓
[Liberar stock reservado]
    ↓
    POST /inventario/stock/cancel con sku, cantidad, order_id
    ↓
[Generar evento: pedido_rechazado]
    ↓
    POST → Proyecto 6 (Analítica)
    ↓
[Opción: generar ticket en Proyecto 7]
    
NOTA: Usuario puede reintentar con transición REINTENTAR
    rechazado → verificado (vuelve a intentar pago)
```

---

## ESPECIFICACIONES DE ENDPOINTS

### POST /api/web

**Propósito:** Ingesta de pedidos desde canal web

**Autenticación:** Bearer Token (JWT requerido)

**Validaciones específicas del canal:**
- Email del cliente es obligatorio
- Se valida stock en tiempo real
- Se reserva stock antes de retornar

**Request payload:**

```json
{
  "cliente": {
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "+56912345678"
  },
  "direccion_envio": {
    "calle": "Calle Principal",
    "numero": "123",
    "ciudad": "Santiago",
    "region": "Metropolitana",
    "codigo_postal": "8320000",
    "pais": "Chile"
  },
  "items": [
    {
      "sku": "PROD-001",
      "cantidad": 2,
      "precio_unitario": 100.00,
      "descuento": 0.1
    }
  ]
}
```

**Response 201 (Éxito):**
```json
{
  "mensaje": "Pedido Web recibido, normalizado y stock reservado",
  "pedido": { ... normalizado ... },
  "estado": "verificado",
  "transicion": "Pedido pasó de 'creado' a 'verificado'"
}
```

**Response 400 (Error de validación):**
```json
{
  "error": "Error de validación y normalización de datos",
  "errores": [
    {
      "campo": "cliente.email",
      "mensaje": "El email del cliente no es válido"
    }
  ],
  "estado": "rechazado",
  "transicion": "Pedido pasó de 'creado' a 'rechazado'"
}
```

**Response 409 (Stock insuficiente):**
```json
{
  "error": "Error de validación de stock",
  "errores_stock": [
    "Stock insuficiente para SKU: PROD-001 (disponible: 5, solicitado: 10)"
  ],
  "estado": "rechazado",
  "transicion": "Pedido pasó de 'creado' a 'rechazado'"
}
```

---

### POST /api/mobile (app)

**Propósito:** Ingesta de pedidos desde canal app/mobile

**Autenticación:** Bearer Token (JWT requerido)

**Validaciones específicas del canal:**
- Email del cliente es obligatorio
- Se valida stock en tiempo real
- Se reserva stock antes de retornar
- Soporta aliases: firstName/lastName, street, productId, qty, price

**Request payload (ejemplo con aliases):**

```json
{
  "cliente": {
    "firstName": "Maria",
    "lastName": "González",
    "email": "maria@example.com",
    "phone": "(56) 9 1234-5678"
  },
  "street": "Av. Principal",
  "number": "456",
  "city": "Santiago",
  "products": [
    {
      "productId": "PROD-002",
      "qty": 1,
      "price": 200.00
    }
  ]
}
```

**Response:** (Mismo formato que web)

---

### POST /api/callcenter

**Propósito:** Ingesta de pedidos desde canal call center

**Autenticación:** Bearer Token + Rol = 'agent' | 'admin'

**Validaciones específicas del canal:**
- Email del cliente es OPCIONAL (se genera fallback si no existe)
- ID del agente es OBLIGATORIO
- NO se valida stock en tiempo real (verificación asíncrona)
- El agente ya confirmó disponibilidad por teléfono

**Request payload:**

```json
{
  "agente_id": "AGENT-001",
  "cliente": {
    "nombre": "Carlos López",
    "telefono": "+56987654321"
  },
  "direccion_envio": {
    "calle": "Calle Secundaria",
    "numero": "789"
  },
  "items": [
    {
      "sku": "PROD-003",
      "cantidad": 5,
      "precio_unitario": 50.00
    }
  ]
}
```

**Nota sobre email fallback:**
```typescript
email = body.cliente.email 
     || body.cliente.mail 
     || `callcenter+${Date.now()}@sinregistro.local`
```

Si el cliente no tiene email registrado, se crea uno temporal para tracking.

**Response 201 (Éxito):**
```json
{
  "mensaje": "Pedido Call Center recibido y normalizado. Stock en verificación asíncrona.",
  "pedido": { ... normalizado ... },
  "estado": "verificado",
  "transicion": "Pedido pasó de 'creado' a 'verificado'",
  "agente_id": "AGENT-001"
}
```

---

## CÓMO RESPONDER A OTROS EQUIPOS

### Escenario 1: Proyecto 4 (Pagos) pregunta qué necesita de nosotros

**Pregunta:** "¿Cuándo van a estar listos para recibir nuestros webhooks de pago?"

**Respuesta correcta:**

> "Actualmente tenemos el esquema de pedido y máquina de estados listos. Un pedido nace en estado 'creado', se valida (→'verificado') y espera pago.
> 
> Nosotros podemos:
> - Recibir orden de pedido (ya hecho)
> - Mantener estado consistente
> - Guardar el pedido en BD (cuando Prisma esté configurado)
> - Recibir tu webhook cuando apruebes/rechaces pago
> 
> Todavía NO tenemos:
> - Persistencia en BD (no tenemos Prisma configurada)
> - Endpoint que procese tu webhook
> - Integración de llamada a tu API para iniciar pago
> 
> Para avanzar necesitamos:
> - Contrato claro de webhook (formato de evento, campos, URL)
> - Documentación de tu endpoint POST /payments/init
> - Definir campos de metadata que necesitas"

**Qué decir que NO podemos:**
- ❌ "Podemos hacer reintentos automáticos de pago" (aún no tenemos persistencia)
- ❌ "Podemos mantener histórico de pagos rechazados" (BD no configura)
- ❌ "Podemos llamar a tu API sin esperar" (no tenemos async jobs aún)

---

### Escenario 2: Proyecto 5 (Inventario) pregunta si podemos hacer más

**Pregunta:** "¿Podemos pedirles que también hagan liberación automática de stock si un pago falla?"

**Respuesta correcta:**

> "Sí, pero necesitamos hacerlo juntos:
> 
> AHORA podemos:
> - Consultar stock: GET /stock/{sku}
> - Reservar stock: POST /stock/reserve
> 
> CUANDO TENGAN WEBHOOK DE PAGOS RECHAZADOS:
> - Recibiremos notificación de Proyecto 4
> - Identificaremos qué stock reservamos
> - Llamaremos a tu endpoint DELETE /stock/cancel
> 
> PERO necesitamos primero:
> - Persistencia de pedidos (BD)
> - Endpoint de webhook receiver
> - Definir contrato: qué campos envían, qué retornamos
> 
> PROPUESTA DE FLUJO:
> 1. Pedido reserva stock (OK)
> 2. Proyecto 4 rechaza pago (webhook)
> 3. Nuestro sistema recibe webhook
> 4. Buscamos pedido en BD
> 5. Identificamos items reservados
> 6. POST /inventario/stock/cancel para cada item
> 7. Transición: verificado → rechazado"

---

### Escenario 3: Proyecto 6 (Analítica) pregunta qué datos manda

**Pregunta:** "¿Cuándo van a mandar los eventos de pedido_creado?"

**Respuesta correcta:**

> "Tenemos dos partes:
> 
> AHORA:
> - Generamos pedido normalizado con id_pedido único
> - Sabemos tipo_canal, cliente, items, total, timestamp
> 
> TODAVÍA NO:
> - No tenemos persistencia
> - No podemos detectar cuándo transiciona a cada estado
> - No podemos hacer emit de eventos
> 
> PROPUESTA DE INTEGRACIÓN:
> Después de Fase 1 (MVP con persistencia), implementaremos:
> 
> POST http://{host_de_analisis}:8000/events
> {
>   'source': 'orders',
>   'event_type': 'pedido_creado',
>   'payload': {
>     'order_id': '550e8400-e29b...',
>     'customer_id': '123',
>     'sales_channel': 'web|app|call_center',
>     'total_amount': 238.00,
>     'total_items': 2,
>     'timestamp': '2026-05-19T20:35:12.456Z'
>   }
> }
> 
> Y después de cada transición importante:
> - pedido_verificado
> - pedido_pagado
> - pedido_rechazado
> - pedido_entregado"

---

### Escenario 4: Proyecto 2 (Logística) pregunta cuándo se integra

**Pregunta:** "¿Cuándo nos envían los pedidos listos para despacho?"

**Respuesta correcta:**

> "Desglosamos el flujo:
> 
> FASE ACTUAL (MVP de recepción):
> - Recibimos pedido
> - Lo normalizamos
> - Lo validamos
> - Reservamos stock
> - Estado: 'verificado'
> 
> FASE 2 (Integración con Pagos):
> - Llamamos a Proyecto 4 para pago
> - Si aprobado: estado → 'pagado'
> 
> FASE 3 (Integración con ustedes):
> - Estado 'pagado' → les enviamos orden
> - POST /logistica/shipments {order_id, items, address}
> - Estado: 'listo_para_despacho'
> - Esperamos webhook: {status: 'SHIPPED'}
> - Estado: 'entregado'
> 
> TIMELINE estimado:
> - Fase 1 (recepción): Ya hecho
> - Fase 2 (pagos): 1-2 sprints
> - Fase 3 (logística): 2-3 sprints después
> 
> LO QUE NECESITAMOS DE USTEDES:
> - Contrato de webhook de envío
> - Documentación de POST /shipments
> - Qué datos necesitan exactamente"

---

## HOJA DE RUTA (MVP → PRODUCCIÓN)

### Fase 1: MVP de Recepción ✅ (COMPLETADO)

**Qué se logró:**
- ✅ Esquema canónico de pedido
- ✅ Normalización multi-canal (web, app, call center)
- ✅ Máquina de estados con estado inicial 'creado'
- ✅ Integración de transiciones en endpoints
- ✅ Validación de cliente, dirección, items
- ✅ Cálculo de totales e IVA
- ✅ Consulta y reserva básica de stock

**Output:**
- 3 endpoints funcionales que aceptan pedidos normalizados
- Pedidos en estado 'verificado' listos para siguiente fase
- Respuestas HTTP que incluyen estado y transición

**No incluye:**
- Persistencia en BD
- Integración con pagos
- Integración con logística
- Eventos

**Tiempo:** Semana 1-2

---

### Fase 2: Persistencia y Webhooks

**Qué hay que hacer:**

1. **Configurar Prisma y BD**
   - Schema: tablas de pedidos, items, clientes, direcciones
   - Migrations
   - Seeders para testing

2. **Implementar webhook receiver para Proyecto 4**
   - POST /api/webhooks/payments
   - Procesa evento: { order_id, status, ... }
   - Transición: verificado → pagado (si aprobado)
   - Transición: verificado → rechazado (si rechazado)
   - Liberar stock si rechazado

3. **Agregar persistencia a endpoints**
   - Guardar pedido en BD después de validación
   - Retornar order_id en respuesta

4. **Implementar llamada a Proyecto 4**
   - POST ${API_PAGOS}/payments/init
   - Enviar: order_id, monto, cliente, callback URL

**Salida:**
- Pedidos persistidos en BD
- Flujo completo: recepción → pago → confirmación
- Manejo de pagos rechazados con stock liberado

**Dependencias:**
- Contrato firmado con Proyecto 4
- Documento de API de Proyecto 4
- Variables de entorno (API_PAGOS_URL, API_PAGOS_KEY)

**Tiempo:** 2-3 sprints

---

### Fase 3: Integración con Logística

**Qué hay que hacer:**

1. **Webhook receiver para Proyecto 2**
   - POST /api/webhooks/shipments
   - Procesa evento: { order_id, status, tracking, ... }
   - Transición: listo_para_despacho → entregado

2. **Endpoint para enviar a logística**
   - POST ${API_LOGISTICA}/shipments
   - Enviar: order_id, items, dirección, cliente
   - Transición: pagado → listo_para_despacho

3. **Panel de seguimiento básico**
   - GET /api/orders/{id}
   - Retorna: estado actual, historial de transiciones

**Salida:**
- Flujo completo: recepción → pago → envío → entrega
- Pedidos en estado 'entregado' como éxito final

**Dependencias:**
- Contrato con Proyecto 2
- Documento de API de Proyecto 2

**Tiempo:** 2-3 sprints

---

### Fase 4: Eventos y Analítica

**Qué hay que hacer:**

1. **Event bus interno**
   - Disparar evento en cada transición
   - Eventos: pedido_creado, pedido_verificado, pedido_pagado, etc.

2. **Integración con Proyecto 6 (Analítica)**
   - POST ${ANALYTICS_HOST}:8000/events
   - Enviar payload normalizado

3. **Notificaciones a cliente**
   - Integración con Proyecto 6 (Notificaciones)
   - Enviar: pedido recibido, pago confirmado, enviado, entregado

**Salida:**
- KPIs disponibles en Proyecto 6
- Clientes notificados de cambios

**Tiempo:** 1-2 sprints

---

### Fase 5: Panel Operativo y Soporte

**Qué hay que hacer:**

1. **UI de panel operativo**
   - Visualizar pedidos con filtros (canal, estado, fecha)
   - Búsqueda por order_id, email cliente
   - Detalle de pedido con historial de transiciones

2. **Herramientas de soporte**
   - Botón: Reintentar pago (REINTENTAR event)
   - Botón: Cancelar pedido (CANCELAR event)
   - Emitir nota de crédito (integración Proyecto 7)

3. **Reportes diarios**
   - Total pedidos por canal
   - % aprobación
   - % rechazos por razón

**Salida:**
- Operadores pueden monitorear y intervenir
- Soporte tiene herramientas para resolver incidencias

**Tiempo:** 2-3 sprints

---

### Timeline total

```
Semana  1-2:  Fase 1 ✅ (MVP recepción)
Semana  3-8:  Fase 2 (Persistencia + Pagos)
Semana  9-14: Fase 3 (Logística)
Semana 15-17: Fase 4 (Eventos + Analítica)
Semana 18-23: Fase 5 (Panel + Soporte)

TOTAL: ~23 semanas (~5-6 meses) para producción completa
```

---

## RIESGOS, CONSIDERACIONES Y LIMITACIONES

### Riesgo 1: Pérdida de estado sin persistencia

**Problema:**
Actualmente usamos máquina de estados en memoria. Si el servidor falla, el estado del pedido se pierde.

**Impacto:** CRÍTICO para producción

**Solución:**
- Fase 2: Guardar estado en BD
- Cada transición: `UPDATE pedidos SET estado = 'nuevo_estado' WHERE id = ?`
- Al recuperar pedido: recrear máquina con estado guardado

**Mitigación actual:**
- MVP solo en desarrollo
- No procesamos pagos reales aún

---

### Riesgo 2: Race conditions en reserva de stock

**Problema:**
Dos pedidos llegan simultáneamente, ambos ven stock disponible, ambos reservan más del disponible.

**Impacto:** ALTO

**Ejemplo:**
```
Stock PROD-001: 10 unidades

Cliente A: GET /stock/PROD-001 → 10 disponibles ✓
Cliente B: GET /stock/PROD-001 → 10 disponibles ✓

Cliente A: POST /stock/reserve {sku: PROD-001, cant: 8} ✓ (quedan 2)
Cliente B: POST /stock/reserve {sku: PROD-001, cant: 5} ✓ PROBLEMA: no hay 5

Resultado: Stock negativo o conflicto
```

**Solución:**
- Proyecto 5 debe usar transacciones en BD
- Nuestra parte: esperar respuesta de Proyecto 5 antes de confirmar

**Mitigación actual:**
- Es responsabilidad de Proyecto 5 (inventario)
- Definir contrato claro: POST /stock/reserve retorna error si no disponible

---

### Riesgo 3: Inconsistencia si falla integración con externo

**Problema:**
Pagamos a Proyecto 4, pero webhook nunca llega. Pedido queda en 'verificado' infinitamente.

**Impacto:** ALTO

**Solución (Fase 2+):**
- Timeout: Si no hay webhook en 24h, marcar como timeout
- Reintentos: Poder reintentar pago manualmente
- Webhook fallido: Implementar retry mechanism

**Mitigación actual:**
- No tenemos integración aún
- Definir SLA en contrato con Proyecto 4

---

### Riesgo 4: Email temporal en call center

**Problema:**
Call center genera `callcenter+${timestamp}@sinregistro.local` si cliente no tiene email.
Esto genera múltiples clientes ficticios en BD.

**Impacto:** MEDIO

**Solución:**
- Usar ID de cliente de Proyecto 7 (CRM) si disponible
- Agregar campo `cliente_id` opcional en schema
- Deduplicar clientes por ID, no email

**Mitigación actual:**
- Es un MVP, data limpia posterior
- O implementar búsqueda en CRM antes

---

### Riesgo 5: No hay rollback de stock si falla algo después de reserva

**Problema:**
Reservamos stock, luego falla validación de totales → pedido rechazado.
Stock queda reservado indefinidamente.

**Impacto:** MEDIO

**Solución (Fase 2):**
- En transición a 'rechazado', llamar inmediatamente a liberar stock
- DELETE /stock/{sku}?order_id={id}&cantidad={cant}

**Mitigación actual:**
- Hoy la validación de totales casi nunca falla
- Pero hay que agregar try-catch y rollback

---

### Riesgo 6: Sin autenticación de Proyecto 4 en webhook

**Problema:**
Cualquiera puede enviar POST /api/webhooks/payments falsificando orden de pago.

**Impacto:** CRÍTICO

**Solución:**
- Validar firma del webhook (HMAC SHA256 con secret)
- O Bearer token exclusivo para webhooks
- O validar IP origin

**Mitigación actual:**
- Endpoint no existe aún
- Cuando lo hagamos (Fase 2), implementar desde inicio

---

### Riesgo 7: Datos personales en logs

**Problema:**
Guardamos email, teléfono, dirección en logs de error.

**Impacto:** BAJO (pero importante para compliance)

**Solución:**
- No loguear datos personales
- Loguear solo: order_id, tipo_error, timestamp

---

### Limitación 1: Call center sin validación de stock real-time

**Qué es:**
Call center NO valida stock al crear pedido. Stock se valida después.

**Por qué:**
Agente ya confirmó por teléfono, no quería delay en UI.

**Consecuencia:**
Si stock falta, pedido queda en 'verificado' esperando confirmación.

**Solución futura:**
- Validación asíncrona posterior
- Notificar al agente si stock insuficiente

---

### Limitación 2: IVA hardcodeado al 19%

**Qué es:**
```typescript
const IVA_RATE = 0.19;
```

**Por qué:**
Chile usa 19% IVA. Pero qué si expanden a otros países?

**Solución:**
```typescript
const IVA_RATE = parseFloat(process.env.IVA_RATE || '0.19');
```

---

### Limitación 3: Sin soporte para descuentos globales

**Qué es:**
Cada item tiene descuento individual. No hay descuento de orden global.

**Por qué:**
MVP simple. Pueden agregarse cupones después.

**Cómo agregarlo:**
- Agregar campo `descuento_orden: number` a OrderSchema
- Restar del total final

---

## CHECKLIST PARA COMPAÑEROS

Antes de hablar con otro equipo, verifica:

- [ ] ¿Ya revisé el informe completo?
- [ ] ¿Entiendo qué estados existen?
- [ ] ¿Sé qué validaciones hacemos nosotros vs qué hacen otros?
- [ ] ¿Sé cuál es la Fase 1 (recepción) vs Fase 2+ (integraciones)?
- [ ] ¿Sé qué contratos necesitamos de otros equipos?
- [ ] ¿Puedo explicar por qué NO podemos hacer X cosa todavía?
- [ ] ¿He leído la sección "Cómo responder a otros equipos"?

---

## DOCUMENTO DE FIRMA

**Preparado por:** [Tu nombre]  
**Fecha:** Mayo 2026  
**Versión:** 1.0 - Estado inicial implementado  
**Para:** Equipo de Proyecto 3 (Orders Management System)

**Aprobaciones:**
- [ ] PO: _________________
- [ ] Líder técnico: _________________
- [ ] Integrantes del equipo: _________________

---

## ANEXO: Ejemplo de contrato con Proyecto 4 (Pagos)

### Contrato de API: Proyecto 4 → Proyecto 3 (Webhook de pago)

**Endpoint (nuestro):**
```
POST /api/webhooks/payments
```

**Payload esperado:**
```json
{
  "order_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "APPROVED" | "REJECTED",
  "transaction_id": "TRX-2026-05-19-001",
  "amount": 238.00,
  "timestamp": "2026-05-19T20:40:00.000Z",
  "signature": "sha256_hash"
}
```

**Respuesta esperada:**
```json
{
  "received": true,
  "order_id": "550e8400-e29b...",
  "new_state": "pagado" | "rechazado"
}
```

**Acciones que dispara:**
- Si APPROVED: `verificado → pagado`
- Si REJECTED: `verificado → rechazado` + liberar stock

---

Fin del informe.
