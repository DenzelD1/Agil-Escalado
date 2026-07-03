import { loadEnvConfig } from '@next/env';
import { requestReservation } from '../lib/services/inventoryClient';
import { SignJWT } from 'jose';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function generateSystemToken(): Promise<string> {
  const secretString = process.env.JWT_SECRET || 'fallback_secret';
  const secret = new TextEncoder().encode(secretString);
  return new SignJWT({ sub: 'system', role: 'system' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(secret);
}

async function main() {
  console.log('--- Iniciando Test Específico: Proyecto 5 (Inventario) ---');
  console.log('API_INVENTARIO_URL configurada:', process.env.API_INVENTARIO_URL);

  if (!process.env.API_INVENTARIO_URL) {
    console.error('❌ Falta API_INVENTARIO_URL en las variables de entorno.');
    return;
  }
  
  try {
    const token = await generateSystemToken();
    console.log('Token JWT de sistema generado, intentando reserva de stock (POST /api/v1/reservations)...');
    
    const reservationId = await requestReservation('ORDER-TEST-001', 'SKU-999', 1, token);
    
    console.log('✅ Conexión con P05 Exitosa.');
    console.log('Reserva realizada exitosamente. ID de Reserva:', reservationId);
  } catch (error: any) {
    console.error('❌ Falló la conexión o la operación con P05:');
    console.error(error.message || error);
    console.log('Asegúrate de que el backend de Inventario esté encendido y recibiendo peticiones en esa URL.');
  }
}

main().catch(console.error);
