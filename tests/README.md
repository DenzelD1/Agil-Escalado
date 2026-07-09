Pruebas de integración (PostgreSQL)

## Qué se hizo

- Se agregó `vitest` como runner de pruebas.
- Se creó un test de integración para la ruta `POST /api/web` en `tests/api/web.test.ts`.
- Se agregó un servidor simulado de inventario en el test para responder a las llamadas de stock.
- Se configuró Prisma para usar PostgreSQL y sincronizar el esquema con la base de datos de prueba.
- Se añadió `docker-compose.test.yml` para levantar un contenedor PostgreSQL de integración en el puerto `55432`.

## Cómo se comporta

- El test construye un JWT de prueba y envía un pedido válido a la ruta `/api/web`.
- La ruta valida la cabecera `Authorization`, normaliza el pedido, reserva stock mediante el servicio simulado y persiste el pedido en PostgreSQL.
- Si la normalización o la reserva de stock falla, la ruta devuelve el estado HTTP adecuado y no persiste el pedido.
- Cuando todo es correcto, la ruta devuelve `201` y el pedido queda registrado en la base de datos.

## Ejecución

1) Levantar PostgreSQL (Docker). En PowerShell:

```
docker compose -f docker-compose.test.yml up -d
```

2) Exportar la variable de entorno `DATABASE_URL` apuntando a la DB del contenedor:

PowerShell:
```
$env:DATABASE_URL = "postgresql://postgres:postgres@127.0.0.1:55432/agil_escalado?schema=public"
$env:JWT_SECRET = "test-secret-please-change"
npm test
```

Alternativamente, puede ejecutar `npx prisma db push --schema=prisma/schema.prisma` manualmente antes de `npm test`.

## Cambios realizados en esta sesión

- Se agregó `tests/api/happyFlows.test.ts` para validar flujos felices con servicios externos mockeados.
- Se actualizaron los tests de integración de `/api/web` para incluir mocks de Redis y el flujo de webhook de pago.
- Se agregó configuración de mocks para `@/lib/jwt`, `@/lib/middlewares/rateLimiter`, `@/lib/services/stockService`, `@/lib/services/orderPersistence`, `@/lib/services/redisEventBus` y `@/lib/prisma`.
- Se generó el cliente Prisma con `npx prisma generate` para resolver la dependencia de la prueba de integración.
- Se validó la suite completa de Vitest: `15 tests` pasaron exitosamente.
