import React from 'react';
import { Search, ShieldAlert, Cpu, Github, SlidersHorizontal } from 'lucide-react';
import { useNavigationStore, useToastStore } from '@/store/useStore';
import { Badge } from '@/components/ui/Badge';
import { Environment } from '@/types';

export interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { environment, setEnvironment, setCommandPaletteOpen } = useNavigationStore();
  const { addToast } = useToastStore();

  const handleEnvChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const env = e.target.value as Environment;
    setEnvironment(env);
    addToast({
      title: `Workspace Environment Updated`,
      description: `Active environment switched to [${env.toUpperCase()}].`,
      type: env === 'production' ? 'warning' : 'info',
    });
  };

  return (
    <header className="h-14 border-b border-[#272d40] bg-[#090a0f]/90 backdrop-blur-md px-5 flex items-center justify-between z-30 select-none">
      {/* Brand & Project Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-sm shadow-indigo-950 border border-indigo-400/30">
            <span className="font-mono text-xs font-bold text-white tracking-wider">A</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-100 tracking-tight font-sans">
                ASTERA
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                STUDIO v1.0
              </span>
            </div>
          </div>
        </div>

        <div className="h-4 w-[1px] bg-[#272d40]" />

        {/* Project Selector Badge */}
        <div className="flex items-center gap-2 text-xs text-slate-300 bg-[#11131b] border border-[#272d40] px-2.5 py-1 rounded-lg">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-medium">astera-fleet-prod</span>
          <Badge variant="success" dot className="ml-1 text-[10px]">
            HEALTHY
          </Badge>
        </div>
      </div>

      {/* Center Command Bar Trigger */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex items-center gap-3 bg-[#11131b] hover:bg-[#161924] border border-[#272d40] px-3.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-all duration-150 w-72 justify-between group shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          <span>Quick search or command...</span>
        </div>
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-[#1f2434] border border-[#272d40] rounded group-hover:border-indigo-500/40">
          ⌘K
        </kbd>
      </button>

      {/* Environment Selector & Quick Controls */}
      <div className="flex items-center gap-3">
        {/* Environment Picker */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Env:</span>
          </label>
          <select
            value={environment}
            onChange={handleEnvChange}
            className="bg-[#11131b] border border-[#272d40] text-xs text-slate-200 font-mono font-medium rounded-lg px-2.5 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>
        </div>

        <div className="h-4 w-[1px] bg-[#272d40]" />

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 text-slate-400 hover:text-slate-200 bg-[#11131b] hover:bg-[#161924] border border-[#272d40] rounded-lg transition-colors"
          title="Studio Settings"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        {/* GitHub link button */}
        <a
          href="https://github.com/astera-dev/astera"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 bg-[#11131b] hover:bg-[#161924] border border-[#272d40] px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          <span>Star</span>
        </a>
      </div>
    </header>
  );
};
