import { LineaPedido } from './types';

export const validarPedidoPorCanal = (canal: 'web' | 'mobile', lineas: LineaPedido[]) => {
  if (lineas.length === 0) throw new Error("El pedido no tiene productos");

  // Reglas específicas para la WEB
  if (canal === 'web') {
    if (lineas.length > 5) {
      throw new Error("Web: No puedes pedir más de 5 productos distintos por vez");
    }
  }

  // Reglas específicas para MOBILE / CALL CENTER
  if (canal === 'mobile') {
    for (const l of lineas) {
      if (l.cantidad > 50) {
        throw new Error("Mobile: Un Call Center no puede pedir más de 50 unidades de un solo ítem");
      }
    }
  }
};