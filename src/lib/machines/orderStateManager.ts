import { createActor } from 'xstate';
import { orderStateMachine, type OrderStatus, type OrderStateEvent } from './orderStateMachine';
import { publishOrderStateChange } from '@/lib/services/redisEventBus';

// Facilita la creacion de instancias de la maquina y transicionar entre estados

export interface OrderActor {
  state: OrderStatus;
  context: {
    orderId?: string;
    lastError?: string;
  };
}


// Crea una nueva instancia de la maquina de estados para un pedido.
// Inicia en estado 'creado' y retorna un actor listo para recibir eventos.
export function createOrderActor(orderId?: string): OrderActor {
  const actor = createActor(orderStateMachine, {
    input: {
      orderId,
    },
  });

  actor.start();

  return {
    state: actor.getSnapshot().value as OrderStatus,
    context: actor.getSnapshot().context,
  };
}

// Envía un evento a un actor y retorna el nuevo estado.
export function sendEventToActor(
  actor: OrderActor,
  event: OrderStateEvent,
): OrderActor {
  return actor;
}

/*
    Simulador de transición de estado sin persistencia.
    Util para MVP: dado un estado actual y un evento, retorna el siguiente estado.
    En producción, esto usaría la máquina persistente de la BD.
*/
export function transitionOrderState(
  currentState: OrderStatus,
  event: OrderStateEvent,
): { nextState: OrderStatus; error?: string } {
  // Definir transiciones validas segun la maquina de estados
  const transitions: Record<OrderStatus, Record<string, OrderStatus>> = {
    creado: {
      VALIDACION_EXITOSA: 'verificado',
      VALIDACION_FALLIDA: 'rechazado',
      CANCELAR: 'cancelado',
    },
    verificado: {
      PAGO_APROBADO: 'pagado',
      PAGO_RECHAZADO: 'rechazado',
      CANCELAR: 'cancelado',
    },
    pagado: {
      ENVIAR: 'listo_para_despacho',
      CANCELAR: 'cancelado',
    },
    listo_para_despacho: {
      EN_TRANSITO: 'en_transito',
      CANCELAR: 'cancelado',
    },
    en_transito: {
      ENTREGADO: 'entregado',
      CANCELAR: 'cancelado',
    },
    entregado: {},
    rechazado: {
      REINTENTAR: 'verificado',
      CANCELAR: 'cancelado',
    },
    cancelado: {},
  };

  const allowedTransitions = transitions[currentState];
  const nextState = allowedTransitions[event.type];

  if (!nextState) {
    return {
      nextState: currentState,
      error: `Evento '${event.type}' no permitido en estado '${currentState}'`,
    };
  }

  return { nextState };
}


// Obtiene el proximo estado basado en el evento, retornando estructura util para APIs.
export async function getOrderStateTransition(
  currentState: OrderStatus,
  event: OrderStateEvent,
  options?: {
    orderId?: string;
    publishToRedis?: boolean;
    metadata?: Record<string, unknown>;
  },
): Promise<{
  success: boolean;
  nextState: OrderStatus;
  message: string;
  error?: string;
}> {
  const result = transitionOrderState(currentState, event);

  if (result.error) {
    return {
      success: false,
      nextState: currentState,
      message: `Transición rechazada: ${result.error}`,
      error: result.error,
    };
  }

  const response = {
    success: true,
    nextState: result.nextState,
    message: `Pedido pasó de '${currentState}' a '${result.nextState}'`,
  };

  if (options?.publishToRedis) {
    try {
      await publishOrderStateChange({
        orderId: options.orderId,
        previousState: currentState,
        nextState: result.nextState,
        eventType: event.type,
        message: response.message,
        timestamp: new Date().toISOString(),
        error: result.error,
        metadata: options.metadata,
      });
    } catch (publishError) {
      console.error('No se pudo publicar evento de estado a Redis:', publishError);
    }
  }

  return response;
}
