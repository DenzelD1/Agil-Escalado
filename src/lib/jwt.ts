import { jwtVerify } from 'jose';

// Obtiene la clave secreta desde las variables de entorno
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    console.warn("ADVERTENCIA: JWT_SECRET no está definido. La validación de tokens fallará.");
    return new Uint8Array(0);
  }
  return new TextEncoder().encode(secret);
};

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload;
  } catch (error) {
    console.error("Error validando el JWT:", error);
    throw new Error('Token JWT inválido o expirado');
  }
}
