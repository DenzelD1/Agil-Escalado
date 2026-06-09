import { describe, it, expect } from 'vitest';
import { ClientSchema, AddressSchema, ItemSchema } from '@/lib/schemas/orderSchemas';

describe('Pruebas de Esquemas Zod', () => {

  describe('ClientSchema', () => {
    it('debe limpiar y validar un cliente correcto', () => {
      const input = {
        nombre: 'Juan Pérez',
        email: 'JUAN.PEREZ@EXAMPLE.COM ', // Con mayúsculas
        telefono: 'texto basura +56912345678'
      };

      const result = ClientSchema.parse(input);

      // Verificamos las transformaciones automáticas de Zod
      expect(result.email).toBe('juan.perez@example.com'); // Todo a minúsculas
      expect(result.telefono).toBe('+56912345678'); // Solo extrae dígitos y el +
    });

    it('debe fallar si el email es inválido', () => {
      const input = { nombre: 'Juan', email: 'correo-falso' };
      
      const result = ClientSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe('ItemSchema', () => {
    it('debe fallar si la cantidad o el precio son negativos', () => {
      const inputMalo = { sku: 'PROD-1', cantidad: -2, precio_unitario: -100 };
      
      const result = ItemSchema.safeParse(inputMalo);
      expect(result.success).toBe(false);
    });

    it('debe transformar el SKU a mayúsculas', () => {
      const input = { sku: 'prod-teclado', cantidad: 1, precio_unitario: 100 };
      
      const result = ItemSchema.parse(input);
      expect(result.sku).toBe('PROD-TECLADO');
    });
  });
});