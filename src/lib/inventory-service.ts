import { LineaPedido } from './types';

export async function validarYReservarStock(lineas: LineaPedido[], token: string) {
  for (const linea of lineas) {
    // Consulta disponibilidad
    const resStock = await fetch(`${process.env.API_INVENTARIO_URL}/stock/${linea.productoId}`);
    if (!resStock.ok) throw new Error(`Error de conexión con inventario para SKU: ${linea.productoId}`);
    
    const dataStock = await resStock.json();

    // Valida stock físico
    if (!dataStock.disponible || dataStock.cantidad < linea.cantidad) {
      throw new Error(`STOCK_INSUFICIENTE:${linea.productoId}`);
    }

    // Ejecuta la reserva
    const resReserva = await fetch(`${process.env.API_INVENTARIO_URL}/stock/reserve`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ sku: linea.productoId, cantidad: linea.cantidad })
    });
    
    if (!resReserva.ok) throw new Error(`Fallo al reservar SKU: ${linea.productoId}`);
  }
}