import { createMachine, assign } from 'xstate';

export type OrderStateContext = {
  orderId?: string;
  lastError?: string;
};

export type OrderStateEvent =
  | { type: 'VALIDACION_EXITOSA' }
  | { type: 'VALIDACION_FALLIDA'; error: string }
  | { type: 'PAGO_APROBADO' }
  | { type: 'PAGO_RECHAZADO'; error: string }
  | { type: 'STOCK_RESERVADO' }
  | { type: 'STOCK_INSUFICIENTE'; error: string }
  | { type: 'ENVIAR' }
  | { type: 'EN_TRANSITO'; trackingNumber?: string }
  | { type: 'ENTREGADO' }
  | { type: 'CANCELAR' }
  | { type: 'REINTENTAR' };

export type OrderStatus =
  | 'creado'
  | 'verificado'
  | 'pagado'
  | 'listo_para_despacho'
  | 'en_transito'
  | 'entregado'
  | 'rechazado'
  | 'cancelado';

export const orderStateMachine = createMachine(
  {
    id: 'order',
    initial: 'creado',
    context: {
      orderId: undefined as string | undefined,
      lastError: undefined as string | undefined,
    },
    states: {
      creado: {
        on: {
          VALIDACION_EXITOSA: 'verificado',
          VALIDACION_FALLIDA: {
            target: 'rechazado',
            actions: 'setError',
          },
          CANCELAR: 'cancelado',
        },
      },
      verificado: {
        on: {
          PAGO_APROBADO: 'pagado',
          PAGO_RECHAZADO: {
            target: 'rechazado',
            actions: 'setError',
          },
          CANCELAR: 'cancelado',
        },
      },
      pagado: {
        on: {
          ENVIAR: 'listo_para_despacho',
          CANCELAR: 'cancelado',
        },
      },
      listo_para_despacho: {
        on: {
          EN_TRANSITO: 'en_transito',
          CANCELAR: 'cancelado',
        },
      },
      en_transito: {
        on: {
          ENTREGADO: 'entregado',
          CANCELAR: 'cancelado',
        },
      },
      entregado: {
        type: 'final',
      },
      rechazado: {
        on: {
          REINTENTAR: 'verificado',
          CANCELAR: 'cancelado',
        },
      },
      cancelado: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      setError: assign({
        lastError: (_ctx, event) => {
          if (event && typeof event === 'object' && 'error' in event) {
            return (event as { error?: string }).error ?? 'Error desconocido';
          }
          return 'Error desconocido';
        },
      }),
    },
  },
);

export const initialOrderState: OrderStatus = 'creado';
