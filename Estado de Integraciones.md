# Estado de Integraciones

Basado en el documento `informacionproyectos.md` y la base de código actual, aquí está el desglose exacto de lo que necesitamos para conectarnos a otros y lo que otros necesitan para conectarse a nosotros.

---

## 1. Proyectos de los que dependemos (Nosotros los consumimos a ellos)
Para que nuestro sistema pueda enviarle datos o pedirles acciones a otros proyectos, necesitamos sus **URLs de producción**, los **formatos (contratos) de sus APIs** y **credenciales (API Keys o tokens)**.

| Proyecto | Estado en nuestro código | ¿Qué nos falta o debemos validar? |
| :--- | :--- | :--- |
| **P04 (Pagos)** | 🟢 Completo. Tenemos el cliente `paymentClient.ts` y sus variables (`UCNPAY_PRIVATE_KEY` y `API_PAGOS_URL`) configuradas en `.env.local`. | Ninguna acción requerida. Ya contamos con la URL de producción. |
| **P02 (Logística)** | 🟢 **Simulado**. Como este proyecto no existe, usamos nuestro modo simulación (`SIMULAR_LOGISTICA='true'`). | Ninguna acción requerida, todo opera con datos mock locales. |
| **P05 (Inventario)** | 🟢 Completo. Tenemos su URL (`proyectogestordeinventario-production.up.railway.app`) y la API Key en `.env.local`. | Ninguna acción requerida por ahora. |
| **P06 (Notificaciones)** | 🟢 Completo. Tenemos la URL y la API Key configuradas directo en `notificationClient.ts`. | Ninguna acción requerida, a menos que cambien sus llaves. |
| **P07 (CRM)** | 🟢 Completo. Les enviamos tickets mediante `crmClient.ts` a su URL en Vercel. | Ninguna acción requerida. |
| **P09 (Analítica)** | 🟢 Código completo y variables agregadas. Ya enviamos eventos automáticamente (`pedido_creado`, `stock_agotado`, etc.) hacia `analisis-proyecto-ti.onrender.com`. | ❓ **Revisar compatibilidad con P09**. Debemos preguntarles si la estructura JSON que les estamos mandando les sirve. |
| **P11 (Incidentes)** | 🟢 Completo. Tenemos `INCIDENT_API_URL` e `INCIDENT_API_KEY` en `.env.local` y usamos `incidentReporterClient.ts`. | Ninguna acción requerida. |

---

## 2. Proyectos que dependen de nosotros (Ellos nos consumen a nosotros)
Otros proyectos necesitan enviarnos información (ej. avisarnos que un pago pasó o que un pedido se despachó) o consultarnos datos. Para esto, nosotros debemos proveerles **nuestras URLs (Webhooks/Endpoints)** y definir cómo se van a **autenticar**.

| Proyecto | Lo que esperan de nosotros | Estado actual | ¿Qué nos falta informarles/pedirles? |
| :--- | :--- | :--- | :--- |
| **P07 (CRM)** | Consultar información de un pedido. | 🟢 Completo. Ya les dimos el endpoint `GET /api/orders/{id}` y su API Key (`P07_API_KEY`). | Nada, ya se lo enviamos. |
| **P04 (Pagos)** | Avisarnos si un pago fue exitoso o rechazado (Webhook). | 🟢 Completo. Habilitamos `P04_API_KEY` en el middleware y validamos su JSON contra nuestro webhook (`/api/webhooks/payment`). | Ninguna acción requerida. Ya confirmamos la estructura del JSON (ya es compatible). |
| **P02 (Logística)** | Avisarnos cuando el pedido cambia de estado en tránsito o entregado (Webhook). | 🟢 **Simulado**. Este proyecto no fue asignado, así que no nos harán peticiones externas de webhook. | Ninguna acción requerida. |
| **P12 (Identidad)** | Validar tokens JWT. | 🟢 Completo. Nuestro `middleware.ts` ya consulta sus llaves públicas (JWKS). | Nada, ya funciona. |

---

## Cambios recientes (Resumen de implementación)

Fecha: 2026-07-06

- **Objetivo:** panel de estado en tiempo real para las integraciones, con indicadores visuales y logs sólo para pruebas manuales.

- **Backend**:
	- `src/app/api/integrations/ping/route.ts` — Endpoint `POST /api/integrations/ping` que comprueba un endpoint externo y responde JSON con `{ id, status, statusCode, elapsed, error }`.
	- `src/app/api/integrations/stream/route.ts` — Endpoint SSE `GET /api/integrations/stream` que emite snapshots y actualizaciones periódicas de probes.

- **Frontend**:
	- `src/components/IntegrationNetwork.tsx` — Consume el SSE y muestra tarjetas por nodo. Cambios principales:
		- Visual simple: sólo dos estados visibles para el usuario final: **Conectado** (verde) o **Desconectado** (rojo).
		- Los logs de conexión se registran únicamente cuando el usuario pulsa `Probar` (manual). Los probes automáticos del SSE ya no se agregan a los logs para evitar ruido.
		- Las entradas del modal `Logs` muestran un punto de color (verde/rojo) y etiqueta descriptiva según el resultado de la prueba.
		- El botón `Probar` hace `POST /api/integrations/ping` y guarda la entrada en `Logs` coloreada según éxito/fallo.

- **Middleware**:
	- `src/middleware.ts` adaptado para permitir el acceso a las rutas de integraciones (`/api/integrations/*`) sin bloquear con autenticación cuando corresponde.

- **Tests**:
	- `tests/api/ping.route.test.ts` — Pruebas unitarias del endpoint `ping` (healthy/degraded/down). Tests añadidos y ejecutados localmente (pasaron).

- **Cómo probar localmente**:
	1. Levanta el servidor de desarrollo:
		 ```bash
		 npm run dev
		 ```
	2. Abrir el dashboard de integraciones en el navegador (por ejemplo `http://localhost:3000/dashboard` o la ruta del componente).
	3. Pulsar `Probar` en cualquier nodo: la entrada aparecerá en `Logs` con punto verde si fue exitosa o rojo si falló.
	4. También puedes ejecutar el `ping` directamente desde terminal:
		 ```bash
		 curl -s -X POST http://localhost:3000/api/integrations/ping \
			 -H "Content-Type: application/json" \
			 -d '{"id":"P04","endpoint":"https://example.com/"}' | jq
		 ```

- **Notas y decisiones importantes**:
	- Se simplificó la visualización para evitar alarmismo: sólo verde/rojo para el usuario final.
	- Los probes automáticos no se añaden a los logs para evitar entradas constantes; los probes siguen llegando vía SSE para actualizar el estado, pero no saturan el historial.
	- Si prefieres volver a la lógica previa (hysteresis antes de marcar `down`), o permitir que se registren probes automáticos en un histórico separado, puedo revertir o adaptar según prefieras.

