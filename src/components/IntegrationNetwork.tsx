'use client';

import React, { useState } from 'react';

export type IntegrationStatus = 'healthy' | 'degraded' | 'down' | 'pending';

export interface IntegrationNode {
  id: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  lastPing?: string;
  endpoint: string;
}

const mockIntegrations: IntegrationNode[] = [
  { id: 'P04', name: 'Pasarela UCNPay', description: 'Procesamiento de pagos (Proyecto 4)', status: 'pending', lastPing: '-', endpoint: 'http://localhost:4004/ucnpay/init' },
  { id: 'P05', name: 'Inventario Global', description: 'Gestión de stock (Proyecto 5)', status: 'pending', lastPing: '-', endpoint: 'https://proyectogestordeinventario-production.up.railway.app/api/inventory' },
  { id: 'P06', name: 'Notificaciones', description: 'SMS y Emails (Proyecto 6)', status: 'pending', lastPing: '-', endpoint: 'https://ucn-agil-notificaciones.up.railway.app/notifications/send' },
  { id: 'P07', name: 'CRM y Clientes', description: 'Soporte y VIPs (Proyecto 7)', status: 'pending', lastPing: '-', endpoint: 'https://pgti-proyecto-crm-backend.vercel.app/api/v1/tickets/externo' },
  { id: 'P09', name: 'Analítica BI', description: 'Métricas de negocio (Proyecto 9)', status: 'pending', lastPing: '-', endpoint: 'https://analisis-proyecto-ti.onrender.com/v1/events' },
  { id: 'P11', name: 'MochiCode Incidentes', description: 'Gestión de incidentes (Proyecto 11)', status: 'pending', lastPing: '-', endpoint: 'https://proyecto11-mochicode.onrender.com/api/v1/alertas' },
];

const statusConfig = {
  healthy: { color: 'bg-green-500', text: 'text-green-700', bgLight: 'bg-green-500/10', border: 'border-green-500/20', label: 'En Línea' },
  degraded: { color: 'bg-yellow-500', text: 'text-yellow-700', bgLight: 'bg-yellow-500/10', border: 'border-yellow-500/20', label: 'Degradado' },
  down: { color: 'bg-red-500', text: 'text-red-700', bgLight: 'bg-red-500/10', border: 'border-red-500/20', label: 'Caído' },
  pending: { color: 'bg-gray-400', text: 'text-gray-600', bgLight: 'bg-gray-400/10', border: 'border-gray-400/20', label: 'Pendiente' },
};

export default function IntegrationNetwork() {
  const [nodes, setNodes] = useState<IntegrationNode[]>(mockIntegrations);
  const [testingId, setTestingId] = useState<string | null>(null);

  const handleTestConnection = async (id: string) => {
    setTestingId(id);
    const nodeToTest = nodes.find(n => n.id === id);
    
    if (!nodeToTest) {
      setTestingId(null);
      return;
    }

    try {
      const res = await fetch('/api/integrations/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, endpoint: nodeToTest.endpoint })
      });
      
      const data = await res.json();
      
      setNodes(current => current.map(node => {
        if (node.id === id) {
          return { ...node, status: data.status, lastPing: 'Justo ahora' };
        }
        return node;
      }));
    } catch (err) {
      setNodes(current => current.map(node => {
        if (node.id === id) {
          return { ...node, status: 'down', lastPing: 'Fallo al probar' };
        }
        return node;
      }));
    } finally {
      setTestingId(null);
    }
  };

  const handleViewLogs = (id: string) => {
    alert(`Visualizando logs para ${id}... (Mock)`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {nodes.map(node => {
        const config = statusConfig[node.status];
        const isTesting = testingId === node.id;

        return (
          <div 
            key={node.id} 
            className={`relative group rounded-2xl p-6 backdrop-blur-xl bg-white/60 border ${config.border} shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between`}
          >
            {/* Background Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl ${config.bgLight} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-4 w-4">
                    {node.status === 'healthy' && (
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}></span>
                    )}
                    {isTesting && (
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yale opacity-75`}></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-4 w-4 ${isTesting ? 'bg-brand-yale' : config.color}`}></span>
                  </div>
                  <h3 className="font-bold text-lg text-brand-graphite">{node.name}</h3>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.bgLight} ${config.text}`}>
                  {isTesting ? 'Probando...' : config.label}
                </span>
              </div>
              
              <p className="text-sm text-brand-graphite/70 mb-4 h-10">{node.description}</p>
              
              <div className="bg-brand-alabaster/30 rounded-lg p-3 mb-6 font-mono text-xs text-brand-graphite/80 truncate border border-brand-alabaster/50">
                {node.endpoint}
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-brand-alabaster/50 pt-4 mt-auto">
              <span className="text-xs text-brand-graphite/60 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {node.lastPing}
              </span>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewLogs(node.id)}
                  className="px-3 py-1.5 text-xs font-medium text-brand-graphite bg-white border border-brand-alabaster rounded-md hover:bg-brand-alabaster/30 transition-colors"
                >
                  Logs
                </button>
                <button 
                  onClick={() => handleTestConnection(node.id)}
                  disabled={isTesting}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-brand-yale rounded-md hover:bg-brand-teal transition-all shadow-sm hover:shadow active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  {isTesting ? (
                    <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  )}
                  Probar
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
