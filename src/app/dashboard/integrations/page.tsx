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

        {/* Dynamic Network Grid */}
        <div className="mt-8">
          <IntegrationNetwork />
        </div>
      </div>
    </div>
  );
}
