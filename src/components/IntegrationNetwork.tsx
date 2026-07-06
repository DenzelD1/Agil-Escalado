'use client';

import React, { useEffect, useState, useRef } from 'react';
import { INTEGRATIONS, type IntegrationNode as LibIntegrationNode } from '@/lib/integrations';

export type IntegrationStatus = 'healthy' | 'degraded' | 'down' | 'pending';

const statusConfig: Record<string, any> = {
  healthy: { color: 'bg-green-500', text: 'text-green-700', bgLight: 'bg-green-500/10', border: 'border-green-500/20', label: 'Conectado' },
  degraded: { color: 'bg-yellow-500', text: 'text-yellow-700', bgLight: 'bg-yellow-500/10', border: 'border-yellow-500/20', label: 'Degradado' },
  down: { color: 'bg-red-500', text: 'text-red-700', bgLight: 'bg-red-500/10', border: 'border-red-500/20', label: 'Desconectado' },
  pending: { color: 'bg-gray-400', text: 'text-gray-600', bgLight: 'bg-gray-400/10', border: 'border-gray-400/20', label: 'Pendiente' },
};

export default function IntegrationNetwork() {
  const [nodes, setNodes] = useState<LibIntegrationNode[]>(INTEGRATIONS);
  const [testingId, setTestingId] = useState<string | null>(null);
  const esRef = useRef<EventSource | null>(null);
  const [logs, setLogs] = useState<Record<string, Array<any>>>({});
  const [selectedLogsNode, setSelectedLogsNode] = useState<string | null>(null);
  const [nodeMeta, setNodeMeta] = useState<Record<string, { failures: number; successes: number }>>({});

  useEffect(() => {
    // connect to SSE stream
    const es = new EventSource('/api/integrations/stream');
    esRef.current = es;

    es.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data);
          if (parsed.type === 'snapshot') {
          const snapshot = parsed.integrations as any[];
          setNodes((cur) => cur.map(n => {
            const found = snapshot.find(s => s.id === n.id);
            return found ? { ...n, status: found.status ?? n.status, lastPing: found.lastPing ?? n.lastPing, displayStatus: (found.status === 'healthy') ? 'healthy' : 'down' } : n;
          }));
          // do not auto-initialize logs here; keep logs only for manual tests
          setNodeMeta((cur) => {
            const copy = { ...cur };
            snapshot.forEach(s => {
              if (!copy[s.id]) copy[s.id] = { failures: 0, successes: 0 };
            });
            return copy;
          });
        } else if (parsed.type === 'update') {
          const updates = parsed.integrations as any[];

          // do not append automatic SSE probes to logs; logs are reserved for manual tests

          // update meta counters and compute displayStatus for each node
          setNodeMeta((metaCur) => {
            const copy = { ...metaCur };
            updates.forEach((u: any) => {
              const nodeId = u.id;
              const probe = u.probe || {};
              const success = !!probe.ok;
              const prev = copy[nodeId] ?? { failures: 0, successes: 0 };
              if (success) copy[nodeId] = { failures: 0, successes: prev.successes + 1 };
              else copy[nodeId] = { failures: prev.failures + 1, successes: 0 };
            });

            // compute displayStatus using the updated meta
            setNodes((cur) => cur.map(n => {
              const u = updates.find((x: any) => x.id === n.id);
              if (!u) return n;
              const probe = u.probe || {};
              const success = !!probe.ok;
              // Simplified: any successful probe -> healthy (verde). Any failure -> down (rojo).
              const displayStatus: string = success ? 'healthy' : 'down';

              return { ...n, displayStatus };
            }));

            return copy;
          });
        }
      } catch (err) {
        // ignore malformed events
      }
    };

    es.onerror = () => {
      // on error, close and retry after a delay
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
        setTimeout(() => {
          if (!esRef.current) {
            const retry = new EventSource('/api/integrations/stream');
            esRef.current = retry;
          }
        }, 3000);
      }
    };

    return () => {
      es.close();
      esRef.current = null;
    };
  }, []);

  const handleTestConnection = async (id: string) => {
    setTestingId(id);
    const nodeToTest = nodes.find(n => n.id === id);
    if (!nodeToTest) { setTestingId(null); return; }

    try {
      const res = await fetch('/api/integrations/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, endpoint: nodeToTest.endpoint })
      });
      const data = await res.json();

      // Normalize probe shape similar to SSE probe
      const probe = {
        ok: data.status !== 'down',
        elapsed: data.elapsed ?? null,
        statusCode: data.statusCode ?? null,
        error: data.error ?? null,
      };

      const lastPing = 'Justo ahora';

      // append to logs
      setLogs((cur) => {
        const copy = { ...cur };
        copy[id] = copy[id] ?? [];
        copy[id].unshift({ timestamp: new Date().toISOString(), status: data.status, success: !!probe.ok, elapsed: probe.elapsed, statusCode: probe.statusCode, error: probe.error });
        if (copy[id].length > 40) copy[id].pop();
        return copy;
      });

      // update meta counters and compute displayStatus
      setNodeMeta((metaCur) => {
        const copy = { ...metaCur };
        const prev = copy[id] ?? { failures: 0, successes: 0 };
        if (probe.ok) copy[id] = { failures: 0, successes: prev.successes + 1 };
        else copy[id] = { failures: prev.failures + 1, successes: 0 };

        const meta = copy[id];

        // Simplified: success -> healthy (verde), any failure -> down (rojo)
        const displayStatus: string = probe.ok ? 'healthy' : 'down';

        // apply to nodes
        setNodes((cur) => cur.map(n => n.id === id ? { ...n, displayStatus, lastPing } : n));

        return copy;
      });
    } catch (err) {
      // on error, append log and increment failures but don't immediately mark as down until threshold
      setLogs((cur) => {
        const copy = { ...cur };
        copy[id] = copy[id] ?? [];
        copy[id].unshift({ timestamp: new Date().toISOString(), status: 'down', success: false, elapsed: null, statusCode: null, error: String(err) });
        if (copy[id].length > 40) copy[id].pop();
        return copy;
      });

      setNodeMeta((metaCur) => {
        const copy = { ...metaCur };
        const prev = copy[id] ?? { failures: 0, successes: 0 };
        copy[id] = { failures: prev.failures + 1, successes: 0 };

        const displayStatus = 'down';

        setNodes((cur) => cur.map(n => n.id === id ? { ...n, displayStatus, lastPing: 'Fallo al probar' } : n));

        return copy;
      });
    } finally {
      setTestingId(null);
    }
  };

  const handleViewLogs = (id: string) => {
    setSelectedLogsNode(id);
  };

  const closeLogs = () => setSelectedLogsNode(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {nodes.map(node => {
        const display = (node as any).displayStatus ?? node.status;
        const config = statusConfig[display] ?? statusConfig.pending;
        const isTesting = testingId === node.id;

        return (
          <div key={node.id} className={`relative group rounded-2xl p-6 backdrop-blur-xl bg-white/60 border ${config.border} shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between`}>
            <div className={`absolute inset-0 rounded-2xl ${config.bgLight} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-4 w-4">
                    {display === 'healthy' && (
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`} />
                    )}
                    {isTesting && (
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yale opacity-75`} />
                    )}
                    <span className={`relative inline-flex rounded-full h-4 w-4 ${isTesting ? 'bg-brand-yale' : config.color}`} />
                  </div>
                  <h3 className="font-bold text-lg text-brand-graphite">{node.name}</h3>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${config.bgLight} ${config.text}`}>{isTesting ? 'Probando...' : config.label}</span>
              </div>

              <p className="text-sm text-brand-graphite/70 mb-4 h-10">{node.description}</p>

              <div className="bg-brand-alabaster/30 rounded-lg p-3 mb-6 font-mono text-xs text-brand-graphite/80 truncate border border-brand-alabaster/50">{node.endpoint}</div>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-brand-alabaster/50 pt-4 mt-auto">
              <span className="text-xs text-brand-graphite/60 flex items-center gap-1">{node.lastPing ?? '-'}</span>

              <div className="flex gap-2">
                <button onClick={() => handleViewLogs(node.id)} className="px-3 py-1.5 text-xs font-medium text-brand-graphite bg-white border border-brand-alabaster rounded-md hover:bg-brand-alabaster/30 transition-colors">Logs</button>
                <button onClick={() => handleTestConnection(node.id)} disabled={isTesting} className="px-3 py-1.5 text-xs font-medium text-white bg-brand-yale rounded-md hover:bg-brand-teal transition-all shadow-sm hover:shadow active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1">{isTesting ? <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>}Probar</button>
              </div>
            </div>
          </div>
        );
      })}
      {selectedLogsNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeLogs} />
          <div className="relative z-10 w-[min(900px,95%)] max-h-[80vh] overflow-auto bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Logs — {nodes.find(n => n.id === selectedLogsNode)?.name}</h3>
              <button onClick={closeLogs} className="text-sm text-brand-graphite/70">Cerrar</button>
            </div>
            <div className="text-xs text-brand-graphite/70 mb-4">Últimos intentos de conexión (más reciente arriba)</div>

            <div className="space-y-2">
              {(logs[selectedLogsNode] ?? []).map((entry, idx) => {
                const entryDisplay = entry.success ? 'healthy' : 'down';
                const eConfig = statusConfig[entryDisplay] ?? statusConfig.pending;
                return (
                <div key={idx} className="p-3 rounded-lg bg-brand-alabaster/30 border border-brand-alabaster/50">
                  <div className="flex justify-between items-start gap-4">
                    <div className="text-xs text-brand-graphite/80">{new Date(entry.timestamp).toLocaleString('es-CL')}</div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-block h-2 w-2 rounded-full ${eConfig.color}`} />
                      <span className="text-xs font-medium" style={{color: undefined}}>{eConfig.label}</span>
                    </div>
                  </div>
                  <div className={`mt-1 text-xs ${entry.success ? 'text-green-700' : 'text-red-700'}`}>{entry.success ? `OK — ${entry.elapsed ?? '-'} ms` : `Error — ${entry.error ?? 'no response'}`}</div>
                  <div className="mt-2 text-[11px] font-mono text-brand-graphite/60">HTTP: {entry.statusCode ?? '-'}</div>
                </div>
                );
              })}
              {((logs[selectedLogsNode] ?? []).length === 0) && (
                <div className="p-3 rounded-lg bg-brand-alabaster/30 border border-brand-alabaster/50 text-sm text-brand-graphite/70">Sin registros aún.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
