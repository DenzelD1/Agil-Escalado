import { z } from 'zod';
import { AddressSchema, type AddressType } from '@/lib/schemas/orderSchemas';

/**
 * Aliases de campos de dirección por canal:
 *
 * | Alias entrante                    | Campo canónico   |
 * |-----------------------------------|-----------------|
 * | street, direccion, address        | calle            |
 * | streetNumber, house_number, num   | numero           |
 * | city, localidad                   | ciudad           |
 * | state, province, provincia        | region           |
 * | zip, zipCode, postal_code, cp     | codigo_postal    |
 * | country, pais                     | pais             |
 * | notes, instructions, referencias  | notas_adicionales|
 */

interface RawAddress {
  // Aliases de calle
  calle?: unknown;
  street?: unknown;
  direccion?: unknown;
  address?: unknown;

  // Aliases de número
  numero?: unknown;
  streetNumber?: unknown;
  house_number?: unknown;
  num?: unknown;

  // Aliases de ciudad
  ciudad?: unknown;
  city?: unknown;
  localidad?: unknown;

  // Aliases de región
  region?: unknown;
  state?: unknown;
  province?: unknown;
  provincia?: unknown;

  // Aliases de código postal
  codigo_postal?: unknown;
  zip?: unknown;
  zipCode?: unknown;
  postal_code?: unknown;
  cp?: unknown;

  // Aliases de país
  pais?: unknown;
  country?: unknown;

  // Aliases de notas
  notas_adicionales?: unknown;
  notes?: unknown;
  instructions?: unknown;
  referencias?: unknown;

  [key: string]: unknown;
}

/**
 * Normaliza una dirección cruda (de cualquier canal) al tipo canónico.
 * Lanza `z.ZodError` si los datos no son válidos.
 *
 * @param raw - Payload crudo de la dirección
 * @returns Objeto `AddressType` normalizado y validado
 */
export function normalizeAddress(raw: RawAddress): AddressType {
  const resolved = {
    calle: raw.calle ?? raw.street ?? raw.direccion ?? raw.address,
    numero: raw.numero ?? raw.streetNumber ?? raw.house_number ?? raw.num,
    ciudad: raw.ciudad ?? raw.city ?? raw.localidad,
    region: raw.region ?? raw.state ?? raw.province ?? raw.provincia,
    codigo_postal: raw.codigo_postal ?? raw.zip ?? raw.zipCode ?? raw.postal_code ?? raw.cp,
    pais: raw.pais ?? raw.country,
    notas_adicionales:
      raw.notas_adicionales ?? raw.notes ?? raw.instructions ?? raw.referencias,
  };

  return AddressSchema.parse(resolved);
}

/**
 * Versión segura (no lanza). Retorna el resultado o el error Zod.
 */
export function safeNormalizeAddress(
  raw: RawAddress,
): { success: true; data: AddressType } | { success: false; error: z.ZodError } {
  return AddressSchema.safeParse({
    calle: raw.calle ?? raw.street ?? raw.direccion ?? raw.address,
    numero: raw.numero ?? raw.streetNumber ?? raw.house_number ?? raw.num,
    ciudad: raw.ciudad ?? raw.city ?? raw.localidad,
    region: raw.region ?? raw.state ?? raw.province ?? raw.provincia,
    codigo_postal: raw.codigo_postal ?? raw.zip ?? raw.zipCode ?? raw.postal_code ?? raw.cp,
    pais: raw.pais ?? raw.country,
    notas_adicionales:
      raw.notas_adicionales ?? raw.notes ?? raw.instructions ?? raw.referencias,
  });
}
