# Estado de Integraciones

Basado en el documento `informacionproyectos.md` y la base de código actual, aquí está el desglose exacto de lo que necesitamos para conectarnos a otros y lo que otros necesitan para conectarse a nosotros.

---

## 1. Proyectos de los que dependemos (Nosotros los consumimos a ellos)
Para que nuestro sistema pueda enviarle datos o pedirles acciones a otros proyectos, necesitamos sus **URLs de producción**, los **formatos (contratos) de sus APIs** y **credenciales (API Keys o tokens)**.

| Proyecto | Estado en nuestro código | ¿Qué nos falta o debemos validar? |
| :--- | :--- | :--- |
| **P04 (Pagos)** | Tenemos el cliente `paymentClient.ts` y una llave en `.env.local` (`UCNPAY_PRIVATE_KEY`). | ❓ **Falta la URL de Producción de Pagos**. Actualmente no veo una variable como `API_PAGOS_URL` en tu `.env.local`. Necesitamos saber a qué URL le vamos a pegar para iniciar un cobro. |
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
| **P04 (Pagos)** | Avisarnos si un pago fue exitoso o rechazado (Webhook). | 🟢 Listo por nuestro lado. Habilitamos `P04_API_KEY` en el middleware. Tenemos el webhook `/api/webhooks/payment`. | ❓ **Entregar URL y Key a P04:** Avisarle a Pagos que nuestra URL es `https://agil-escalado.vercel.app/api/webhooks/payment` y deben enviar su `x-api-key`. También preguntar qué JSON nos enviarán. |
| **P02 (Logística)** | Avisarnos cuando el pedido cambia de estado en tránsito o entregado (Webhook). | 🟢 **Simulado**. Este proyecto no fue asignado, así que no nos harán peticiones externas de webhook. | Ninguna acción requerida. |
| **P12 (Identidad)** | Validar tokens JWT. | 🟢 Completo. Nuestro `middleware.ts` ya consulta sus llaves públicas (JWKS). | Nada, ya funciona. |
