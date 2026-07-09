import { z } from 'zod';
import { ClientSchema, type ClientType } from '@/lib/schemas/orderSchemas';

/**
 * Aliases de campos de cliente por canal:
 *
 * | Alias entrante            | Campo canónico |
 * |---------------------------|----------------|
 * | name, fullName            | nombre         |
 * | firstName + lastName      | nombre         |
 * | first_name + last_name    | nombre         |
 * | mail, correo              | email          |
 * | phone, celular, cel       | telefono       |
 * | userId, user_id, clientId | id             |
 */

interface RawClient {
  // Aliases de nombre
  nombre?: unknown;
  name?: unknown;
  fullName?: unknown;
  full_name?: unknown;
  firstName?: unknown;
  first_name?: unknown;
  lastName?: unknown;
  last_name?: unknown;

  // Aliases de email
  email?: unknown;
  mail?: unknown;
  correo?: unknown;

  // Aliases de teléfono
  telefono?: unknown;
  phone?: unknown;
  celular?: unknown;
  cel?: unknown;

  // Aliases de ID
  id?: unknown;
  userId?: unknown;
  user_id?: unknown;
  clientId?: unknown;
  client_id?: unknown;

  [key: string]: unknown;
}

/**
 * Resuelve el nombre canónico del cliente a partir de los distintos formatos
 * que puede venir según el canal (web, app, call center).
 */
function resolveName(raw: RawClient): unknown {
  // Nombre completo directo
  if (raw.nombre) return raw.nombre;
  if (raw.name) return raw.name;
  if (raw.fullName) return raw.fullName;
  if (raw.full_name) return raw.full_name;

  // Nombre compuesto: firstName + lastName
  const first = raw.firstName ?? raw.first_name;
  const last = raw.lastName ?? raw.last_name;
  if (first && last) return `${first} ${last}`;
  if (first) return first;

  return undefined;
}

/**
 * Normaliza un objeto cliente crudo (de cualquier canal) al tipo canónico.
 * Lanza `z.ZodError` si los datos no son válidos tras la resolución de aliases.
 *
 * @param raw - Payload crudo del cliente
 * @returns Objeto `ClientType` normalizado y validado
 */
export function normalizeClient(raw: RawClient): ClientType {
  const resolved = {
    id: raw.id ?? raw.userId ?? raw.user_id ?? raw.clientId ?? raw.client_id,
    nombre: resolveName(raw),
    email: raw.email ?? raw.mail ?? raw.correo,
    telefono: raw.telefono ?? raw.phone ?? raw.celular ?? raw.cel,
  };

  return ClientSchema.parse(resolved);
}

/**
 * Versión segura (no lanza). Retorna el resultado o el error Zod.
 */
export function safeNormalizeClient(
  raw: RawClient,
): { success: true; data: ClientType } | { success: false; error: z.ZodError } {
  const result = ClientSchema.safeParse({
    id: raw.id ?? raw.userId ?? raw.user_id ?? raw.clientId ?? raw.client_id,
    nombre: resolveName(raw),
    email: raw.email ?? raw.mail ?? raw.correo,
    telefono: raw.telefono ?? raw.phone ?? raw.celular ?? raw.cel,
  });
  return result;
}
