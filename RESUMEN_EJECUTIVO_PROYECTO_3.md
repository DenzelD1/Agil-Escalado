# RESUMEN EJECUTIVO: Proyecto 3 (Orders Management System)
**Versión compacta para comunicación rápida**

---

## ESTADO ACTUAL (MVP Fase 1: Recepción)

✅ **Listo:**
- 3 endpoints omnicanal (web, app, call center) que reciben y normalizan pedidos
- Máquina de estados explícita (7 estados)
- Validación de cliente, dirección, items, totales
- Reserva básica de stock (web/app)
- Transiciones de estado integradas en API

❌ **No hecho aún:**
- Base de datos (Prisma no configurada)
- Integración con pagos (Proyecto 4)
- Integración con logística (Proyecto 2)
- Eventos a analítica (Proyecto 6)
- Panel operativo

---

## FLUJO ACTUAL

```
Pedido entra (web/app/call_center)
    ↓ Normalización
    ↓ Validación
    ↓ Reserva de stock (si web/app)
    ↓ Transición: creado → verificado
    ↓ Retorna pedido con estado y metadata
```

---

## RESPUESTAS RÁPIDAS A OTROS EQUIPOS

| Pregunta | Respuesta |
|----------|-----------|
| ¿Cuándo integramos pagos? | Fase 2 (pendiente: contrato, BD, webhook receiver) |
| ¿Pueden liberar stock si falla pago? | Sí, pero después de tener persistencia y webhook |
| ¿Cuándo mandamos eventos? | Fase 4, después de tener BD y flujo completo |
| ¿Cuándo envían a logística? | Fase 3, después de Fase 2 (pagos confirmados) |
| ¿Qué datos necesitan de un pedido? | ID único, cliente, items (SKU+cant), dirección, total, estado |

---

## FASES

| Fase | Entregable | Tiempo | Estado |
|------|-----------|--------|--------|
| 1 | Recepción + normalización + máquina de estados | 1-2 sem | ✅ HECHO |
| 2 | BD + Pagos (Proyecto 4) | 2-3 sprint | Pendiente |
| 3 | Logística (Proyecto 2) | 2-3 sprint | Pendiente |
| 4 | Eventos + Analítica (Proyecto 6) | 1-2 sprint | Pendiente |
| 5 | Panel + Soporte | 2-3 sprint | Pendiente |

---

## CONTRATO CON OTROS EQUIPOS

**Proyecto 4 (Pagos):**
- Nosotros: Enviamos pedido normalizado con monto cuando estado = 'verificado'
- Ellos: Webhook con aprobación/rechazo → nos transicionan a 'pagado' o 'rechazado'

**Proyecto 5 (Inventario):**
- Nosotros: Consultamos GET /stock/{sku} y POST /stock/reserve
- Ellos: Devuelven disponibilidad y aceptan reservas; liberan si fallamos

**Proyecto 2 (Logística):**
- Nosotros: Cuando estado = 'pagado', enviamos orden con items + dirección
- Ellos: Webhook con entrega → nos transicionan a 'entregado'

**Proyecto 6 (Analítica):**
- Nosotros: Emitimos eventos en cada transición importante
- Ellos: Reciben y calculan KPIs

---

## POR QUÉ DECIR "NO PODEMOS" (todavía)

- ❌ "No tenemos persistencia aún" → explicar que es Fase 2
- ❌ "No podemos hacer X con pagos" → explicar que Proyecto 4 aún no integrado
- ❌ "No podemos garantizar consistencia distribuida" → normal, de todos modos hay rollback manual

---

**Para más detalle:** Ver `INFORME_DETALLADO_PROYECTO_3.md`
