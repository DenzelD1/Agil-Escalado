# Documentación de Integración: API de Pedidos (P03)

Este documento detalla cómo los sistemas externos pueden inyectar pedidos en la plataforma **ÁgilEscalado (P03)**.

## 1. Endpoint de Recepción
*   **URL:** `/api/web`
*   **Método:** `POST`
*   **Formato:** JSON

## 2. Esquema del Payload (Cuerpo de la petición)
Para registrar un nuevo pedido, se debe enviar un JSON con la siguiente estructura normalizada:

```json
{
  "id_canal": "STRING (Ej: WEB-2026-0001)",
  "tipo_canal": "STRING (Ej: 'web', 'mobile', 'call_center')",
  "prioridad": "STRING ('alta' | 'media' | 'baja')",
  "cliente": {
    "nombre": "STRING",
    "email": "STRING",
    "telefono": "STRING"
  },
  "direccion_envio": {
    "calle": "STRING",
    "numero": "STRING",
    "ciudad": "STRING",
    "region": "STRING",
    "pais": "STRING"
  },
  "items": [
    {
      "sku": "STRING",
      "cantidad": "NUMBER",
      "precio_unitario": "NUMBER",
      "descuento": "NUMBER"
    }
  ],
  "subtotal": "NUMBER",
  "impuestos": "NUMBER",
  "total": "NUMBER"
}
```

## 3. Consideraciones Técnicas
*   **Rate Limiting:** El endpoint cuenta con un middleware de protección. No exceda las 100 peticiones por minuto por IP para evitar bloqueos temporales (código de error `429`).
*   **Validación:** Todos los campos son obligatorios. Si el cuerpo de la petición no cumple con el esquema, el sistema responderá con un error `400 Bad Request`.
*   **Procesamiento:** Una vez recibida la petición, el `OrderOrchestrator` procesará los datos, validará el stock en el inventario (P01) y disparará las notificaciones correspondientes al cliente.

## 4. Códigos de Respuesta
| Código | Descripción |
| :--- | :--- |
| `201 Created` | Pedido registrado y orquestado exitosamente. |
| `400 Bad Request` | Error en la validación del esquema JSON. |
| `413 Payload Too Large` | El tamaño del pedido excede 1MB. |
| `429 Too Many Requests` | Límite de velocidad excedido. |
| `500 Internal Error` | Error inesperado en el orquestador o base de datos. |

---

*Nota: Esta API es parte del Ecosistema ÁgilEscalado (P03). Para dudas sobre la implementación, contactar al equipo de arquitectura de datos.*
