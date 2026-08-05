import React from 'react';
import { Terminal, Database, GitFork, Key, Activity, Sparkles, HelpCircle } from 'lucide-react';
import { useNavigationStore, useVaultStore, useTelemetryStore } from '@/store/useStore';
import { ActiveTab } from '@/types';
import { clsx } from 'clsx';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useNavigationStore();
  const { secrets } = useVaultStore();
  const { logs } = useTelemetryStore();

  const navItems: {
    id: ActiveTab;
    label: string;
    description: string;
    icon: React.ReactNode;
    badge?: string | number;
    shortcut: string;
  }[] = [
    {
      id: 'api',
      label: 'API & Webhooks',
      description: 'HTTP & GraphQL workbench',
      icon: <Terminal className="w-4 h-4" />,
      shortcut: 'G A',
    },
    {
      id: 'database',
      label: 'Database Explorer',
      description: 'SQL & Cache runner',
      icon: <Database className="w-4 h-4" />,
      badge: '3 Tables',
      shortcut: 'G D',
    },
    {
      id: 'workflows',
      label: 'Workflow Canvas',
      description: 'Event-driven visual nodes',
      icon: <GitFork className="w-4 h-4" />,
      badge: '5 Nodes',
      shortcut: 'G W',
    },
    {
      id: 'vault',
      label: 'Secret Vault',
      description: 'Encrypted KMS variables',
      icon: <Key className="w-4 h-4" />,
      badge: secrets.length,
      shortcut: 'G V',
    },
    {
      id: 'telemetry',
      label: 'Telemetry Stream',
      description: 'Real-time diagnostic logs',
      icon: <Activity className="w-4 h-4" />,
      badge: logs.length,
      shortcut: 'G L',
    },
  ];

  return (
    <aside className="w-60 border-r border-[#272d40] bg-[#0d0e14] flex flex-col justify-between p-3 select-none z-20">
      {/* Primary Navigation */}
      <div className="space-y-6">
        <div>
          <div className="px-2 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
            Developer Modules
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={clsx(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 group relative',
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#161924]'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={clsx(
                        'transition-colors',
                        isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
                      )}
                    >
                      {item.icon}
                    </span>
                    <span className="font-sans">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={clsx(
                        'px-1.5 py-0.2 rounded text-[10px] font-mono',
                        isActive
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'bg-[#1f2434] text-slate-500 group-hover:text-slate-400'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick System Metric */}
        <div className="p-3 bg-[#11131b] border border-[#272d40] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-indigo-400" /> Cluster Load
            </span>
            <span className="font-mono text-emerald-400 font-semibold">24.6%</span>
          </div>
          <div className="w-full bg-[#1f2434] h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[24.6%]" />
          </div>
          <div className="text-[10px] text-slate-500 font-mono flex justify-between pt-0.5">
            <span>48 Nodes</span>
            <span>4.2ms P99</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-[#272d40] text-[11px] text-slate-500 flex items-center justify-between px-1 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Astera Core v1.0
        </span>
        <button
          className="hover:text-slate-300 transition-colors"
          title="Open Architecture Docs"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
