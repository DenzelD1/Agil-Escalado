'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado que controla si el modo oscuro está activo o no
  const [isDark, setIsDark] = useState(false);

  return (
    // El fondo principal cambia fluidamente entre Alabaster y Graphite
    <div className={`min-h-screen flex transition-colors duration-500 ${isDark ? 'bg-[#353535]' : 'bg-[#D9D9D9]'}`}>
      
      {/* La Barra Lateral es independiente y mantiene su diseño original */}
      <Sidebar />
      
      <main className="flex-1 ml-64 transition-all duration-300 relative">
        
        {/* Botón Flotante Premium */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="fixed bottom-8 right-8 z-50 bg-[#3C6E71] hover:bg-[#284B63] text-white px-5 py-2.5 rounded-full shadow-lg font-bold text-sm flex items-center gap-2 transition-all duration-300 border border-white/20 hover:scale-105"
        >
          {isDark ? 'Modo Claro' : 'Modo Oscuro'}
        </button>

        {/* Contenedor dinámico: Si está oscuro, activa una clase mágica */}
        <div className={isDark ? 'tema-oscuro' : ''}>
          {children}
        </div>
        
      </main>
    </div>
  );
}