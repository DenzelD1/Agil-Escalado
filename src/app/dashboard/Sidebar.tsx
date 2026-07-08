'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Panel Operativo', href: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Mapa de Integraciones', href: '/dashboard/integrations', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' }
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-linear-to-b from-[#284B63] to-[#1A3141] shadow-2xl flex flex-col z-50 transition-all duration-300">
      
      {/* Zona del Logo y Marca */}
      <div className="h-24 flex items-center px-6 border-b border-[#D9D9D9]/10">
        
        {/* LOGO REDISEÑADO PREMIUM */}
        <div className="relative shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-[#3C6E71] to-[#284B63] flex items-center justify-center shadow-lg shadow-[#3C6E71]/40 overflow-hidden border border-white/10 group">
          {/* Efectos de luz internos */}
          <div className="absolute -right-2 -top-2 w-8 h-8 bg-white/20 rounded-full blur-sm transition-transform group-hover:scale-150 duration-500"></div>
          <div className="absolute -left-2 -bottom-2 w-6 h-6 bg-black/30 rounded-full blur-sm"></div>
          
          {/* Icono geométrico abstracto de fondo */}
          <svg className="absolute w-8 h-8 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          
          {/* Número central */}
          <span className="relative text-white font-black text-xl tracking-tighter drop-shadow-md">
            03
          </span>
        </div>

        <div className="ml-4 flex flex-col">
          <span className="font-bold text-white text-lg tracking-wide leading-tight">
            ÁgilEscalado
          </span>
          
          {/* PUNTITO VERDE ANIMADO Y ESTADO */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-semibold text-[#D9D9D9]/80 uppercase tracking-wider">
              Sistema en línea
            </span>
          </div>
        </div>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 py-8 flex flex-col gap-2 px-4 overflow-y-auto custom-scrollbar">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name}
              href={link.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive 
                  ? 'bg-white/10 text-white border-l-4 border-[#3C6E71] shadow-sm' 
                  : 'text-[#D9D9D9] hover:bg-white/5 hover:text-white hover:translate-x-1'
              }`}
            >
              <svg className={`w-5 h-5 mr-3 ${isActive ? 'text-[#3C6E71]' : 'text-[#D9D9D9]/70 group-hover:text-[#3C6E71] transition-colors'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
              </svg>
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}