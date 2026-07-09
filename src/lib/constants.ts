export const APP_CONSTANTS = {
  // Configuración del sistema actual (Proyecto 3)
  SYSTEM_ID: 'P03',
  SYSTEM_NAME: 'pedidos',

  // Prioridades por defecto
  DEFAULT_SUPPORT_PRIORITY: 'alta' as const,
  
  // Limites
  MAX_PAYLOAD_SIZE_BYTES: 1024 * 1024, // 1MB
} as const;
