# Plataforma de Gestión de Pedidos Omnicanal

Sistema centralizado para la recepción, normalización y gestión de pedidos desde múltiples canales de venta (web, app móvil y call center). Construido con **Next.js 16**, **TypeScript** y **Zod**.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5 |
| Validación / Normalización | Zod v4 |
| ORM | Prisma 7 (PostgreSQL) |
| Autenticación | JWT via `jose` |
| Estilos | Tailwind CSS v4 |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── web/route.ts          # Endpoint canal Web
│   │   ├── mobile/route.ts       # Endpoint canal App móvil
│   │   └── callcenter/route.ts   # Endpoint canal Call Center
│   ├── page.tsx
│   └── layout.tsx
└── lib/
    ├── jwt.ts                    # Verificación de tokens JWT
    ├── schemas/
    │   └── orderSchemas.ts       # Schemas Zod canónicos (Cliente, Dirección, SKU, Pedido)
    └── normalizers/
        ├── clientNormalizer.ts   # Normalización de datos del cliente
        ├── addressNormalizer.ts  # Normalización de dirección de envío
        ├── skuNormalizer.ts      # Normalización de ítems / SKUs
        └── orderNormalizer.ts    # Orquestador principal de normalización
```

---

## Endpoints de la API

| Método | Ruta | Canal | Descripción |
|---|---|---|---|
| `POST` | `/api/web` | Web | Recibe pedido del canal web con JWT |
| `POST` | `/api/mobile` | App | Recibe pedido del canal móvil con JWT |
| `POST` | `/api/callcenter` | Call Center | Recibe pedido con JWT de agente (`role: agent`) |

Todos los endpoints aplican **normalización automática** de datos antes de procesar el pedido.

### Ejemplo de request (canal web)

```json
POST /api/web
Authorization: Bearer <token>

{
  "cliente": {
    "name": "Juan Pérez",
    "mail": "JUAN@EJEMPLO.COM",
    "phone": "+56 9 1234 5678"
  },
  "shipping_address": {
    "street": "Av. Providencia",
    "num": "1234",
    "city": "Santiago",
    "state": "Metropolitana",
    "zip": "750 0000"
  },
  "products": [
    { "productId": "abc-001", "qty": 2, "price": 9990 }
  ]
}
```

### Respuesta normalizada (201)

```json
{
  "mensaje": "Pedido Web recibido, normalizado y stock reservado",
  "pedido": {
    "id_pedido": "uuid-v4",
    "recibido_en": "2026-05-10T17:41:00.000Z",
    "tipo_canal": "web",
    "estado": "creado",
    "cliente": {
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com",
      "telefono": "+56912345678"
    },
    "direccion_envio": {
      "calle": "Av. Providencia",
      "numero": "1234",
      "ciudad": "SANTIAGO",
      "region": "METROPOLITANA",
      "pais": "CHILE"
    },
    "items": [
      { "sku": "ABC-001", "cantidad": 2, "precio_unitario": 9990, "descuento": 0 }
    ],
    "subtotal": 19980,
    "impuestos": 3796.2,
    "total": 23776.2
  }
}
```

---

## Normalización de datos

La capa de normalización resuelve las diferencias de formato entre canales y aplica transformaciones estándar:

| Entidad | Alias soportados → campo canónico | Transformación |
|---|---|---|
| **Cliente** | `name` / `firstName+lastName` → `nombre` | trim |
| | `mail`, `correo` → `email` | lowercase |
| | `phone`, `celular` → `telefono` | solo dígitos y `+` |
| **Dirección** | `street`, `address` → `calle` | trim |
| | `city`, `localidad` → `ciudad` | UPPERCASE |
| | `zip`, `zipCode`, `cp` → `codigo_postal` | UPPERCASE, sin espacios |
| | `country` → `pais` | UPPERCASE, default `CHILE` |
| **SKU** | `productId`, `productoId` → `sku` | UPPERCASE |
| | `qty`, `quantity` → `cantidad` | entero positivo |
| | `price`, `unitPrice` → `precio_unitario` | 2 decimales |

Los totales (`subtotal`, `impuestos`, `total`) son **calculados automáticamente** con IVA 19%.

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
# JWT
JWT_SECRET=tu_secreto_seguro

# Inventario (Proyecto 5)
API_INVENTARIO_URL=http://localhost:4000

# Base de datos
DATABASE_URL=postgresql://usuario:password@localhost:5432/omnicanal
```

---

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Verificar tipos TypeScript
npx tsc --noEmit

# Lint
npm run lint
```

---

## Integraciones externas

| Servicio | Protocolo | Descripción |
|---|---|---|
| Inventario (Proyecto 5) | REST | Consulta y reserva de stock por SKU |
| Pagos (Proyecto 4) | Webhooks / Eventos | Confirmación o rechazo de cobros |
| Logística (Proyecto 2) | Eventos | Despacho y seguimiento |
| CRM (Proyecto 7) | Eventos | Escalación de tickets de soporte |

---

## Milestones

- [x] **MVP de recepción** — Ingesta multicanal, validación, normalización y vista de estado
- [ ] **Integración pagos/inventario** — Reservas de stock, cobros y rollback ante fallas
- [ ] **Orquestación completa** — Logística, notificaciones y reportes diarios
