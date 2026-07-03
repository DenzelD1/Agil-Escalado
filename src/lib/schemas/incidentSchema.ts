import { z } from 'zod';

// Integración con Proyecto 11 (Gestión de Incidentes) - Esquemas

export const IncidentPayloadSchema = z.object({
  titulo: z.string().min(1, 'El título es obligatorio'),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  prioridad: z.enum(['critica', 'alta', 'media', 'baja']),
}).catchall(z.any()); // Permite cualquier otra propiedad adicional

export const IncidentSchema = z.object({
  sistema_id: z.string(),
  creado_en: z.string().datetime(), // ISO 8601 UTC
  payload: IncidentPayloadSchema,
});

export type IncidentPayload = z.infer<typeof IncidentPayloadSchema>;
export type Incident = z.infer<typeof IncidentSchema>;
