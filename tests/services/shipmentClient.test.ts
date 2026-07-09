import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockPayload = {
  orderId: 'ORD-12345',
  customer: {
    nombre: 'Test User',
    email: 'test@example.com'
  },
  address: {
    calle: 'Test St',
    numero: '123',
    ciudad: 'Test City',
    pais: 'Test Country'
  },
  items: [{ sku: 'SKU-1', cantidad: 1 }],
  prioridad: 'alta',
  canal: 'web'
};

describe('shipmentClient', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debería retornar éxito simulado cuando SIMULAR_LOGISTICA es true', async () => {
    vi.stubEnv('SIMULAR_LOGISTICA', 'true');
    
    // Importación dinámica para evaluar la variable de entorno actual
    const { sendOrderToLogistics } = await import('../../src/lib/services/shipmentClient');
    
    const result = await sendOrderToLogistics(mockPayload);
    
    expect(result.success).toBe(true);
    expect(result.simulated).toBe(true);
    expect(result.trackingNumber).toMatch(/^SIM-TRK-/);
  });

  it('debería realizar una petición fetch exitosa si SIMULAR_LOGISTICA es false y la API responde OK', async () => {
    vi.stubEnv('SIMULAR_LOGISTICA', 'false');
    vi.stubEnv('API_LOGISTICA_URL', 'https://mock-logistics.com');
    
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ trackingNumber: 'REAL-TRK-777' })
    });
    vi.stubGlobal('fetch', fetchSpy);
    
    const { sendOrderToLogistics } = await import('../../src/lib/services/shipmentClient');
    
    const result = await sendOrderToLogistics(mockPayload, 0);
    
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
    expect(result.simulated).toBe(false);
    expect(result.trackingNumber).toBe('REAL-TRK-777');
  });

  it('debería reintentar y hacer fallback a simulación si la API falla persistentemente', async () => {
    vi.stubEnv('SIMULAR_LOGISTICA', 'false');
    vi.stubEnv('API_LOGISTICA_URL', 'https://mock-logistics.com');
    
    // Simular que el fetch falla todas las veces
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });
    vi.stubGlobal('fetch', fetchSpy);
    
    // Evitar que imprima logs en la consola durante el test
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    const { sendOrderToLogistics } = await import('../../src/lib/services/shipmentClient');
    
    const maxRetries = 2;
    const result = await sendOrderToLogistics(mockPayload, maxRetries);
    
    expect(fetchSpy).toHaveBeenCalledTimes(maxRetries + 1); // Intento inicial + reintentos
    expect(result.success).toBe(true); // El fallback asume que lo encoló
    expect(result.simulated).toBe(true); // Pasó a modo simulación por error
    expect(result.error).toMatch(/no respondió/);
    expect(result.trackingNumber).toMatch(/^FALLBACK-/);
  });
});
