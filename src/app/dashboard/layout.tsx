import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-background text-brand-graphite font-sans">
      {/* Navbar Superior */}
      <nav className="bg-brand-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-brand-alabaster shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold bg-gradient-to-r from-brand-yale to-brand-teal bg-clip-text text-transparent">
                  ÁgilEscalado (P03)
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/dashboard"
                    className="text-brand-graphite hover:text-brand-yale px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-brand-alabaster/50"
                  >
                    Panel Operativo
                  </Link>
                  <Link
                    href="/dashboard/integrations"
                    className="text-brand-graphite hover:text-brand-yale px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-brand-alabaster/50"
                  >
                    Mapa de Integraciones
                  </Link>
                </div>
              </div>
            </div>
            
            {/* User Profile / Status Mock */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative p-1 rounded-full text-brand-teal focus:outline-none">
                  <span className="sr-only">Estado del Sistema</span>
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <span className="ml-2 text-sm font-medium text-brand-graphite/80">Sistema En Línea</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main>
        {children}
      </main>
    </div>
  );
}
