import IntegrationNetwork from '@/components/IntegrationNetwork';

export default function IntegrationsPage() {
  return (
    <div className="p-6 md:p-10 min-h-screen bg-brand-background relative overflow-hidden">
      {/* Background decorations for extra premium feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-yale/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-teal/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-brand-yale">Mapa de Integraciones</h1>
          <p className="text-brand-graphite/70 mt-2 max-w-3xl">
            Monitorea el estado de conexión, latencia y salud de todos los proyectos interconectados a nuestro ecosistema omnicanal.
          </p>
        </header>

        {/* Global Network Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-brand-alabaster shadow-sm">
            <span className="block text-xs font-medium text-brand-graphite/60 uppercase tracking-wider">Conexiones Activas</span>
            <span className="block text-2xl font-bold text-brand-teal mt-1">4/6</span>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-brand-alabaster shadow-sm">
            <span className="block text-xs font-medium text-brand-graphite/60 uppercase tracking-wider">Latencia Promedio</span>
            <span className="block text-2xl font-bold text-brand-graphite mt-1">124ms</span>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-brand-alabaster shadow-sm">
            <span className="block text-xs font-medium text-brand-graphite/60 uppercase tracking-wider">Fallos (24h)</span>
            <span className="block text-2xl font-bold text-yellow-600 mt-1">12</span>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-brand-alabaster shadow-sm">
            <span className="block text-xs font-medium text-brand-graphite/60 uppercase tracking-wider">Último Incidente</span>
            <span className="block text-sm font-bold text-red-600 mt-2 truncate">P11 Auth 401</span>
          </div>
        </div>

        {/* Dynamic Network Grid */}
        <div className="mt-8">
          <IntegrationNetwork />
        </div>
      </div>
    </div>
  );
}
