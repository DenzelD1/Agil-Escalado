import { jwtVerify } from 'jose';

export async function verifyJwt(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    if (!payload.sub || !payload.role) {
      throw new Error('Token invalido: Faltan claims requeridos');
    }
    
    return payload;
  } catch (error) {
    throw new Error('Fallo de autenticacion');
  }
}