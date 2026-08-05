import React, { useState, useEffect } from 'react';
import { Header } from './components/workbench/Header';
import { Sidebar } from './components/workbench/Sidebar';
import { ApiClient } from './components/workbench/ApiClient';
import { DbExplorer } from './components/workbench/DbExplorer';
import { WorkflowCanvas } from './components/workbench/WorkflowCanvas';
import { SecretVault } from './components/workbench/SecretVault';
import { TelemetryLogs } from './components/workbench/TelemetryLogs';
import { CommandPalette } from './components/ui/CommandPalette';
import { ToastContainer } from './components/ui/Toast';
import { SettingsModal } from './components/workbench/SettingsModal';
import { LuminaApp } from './lumina/showcase/LuminaApp';
import { useStore } from './store/useStore';
import { Layers, Terminal } from 'lucide-react';

export const App: React.FC = () => {
  const { activeTab, setActiveTab } = useStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [workspaceMode, setWorkspaceMode] = useState<'workbench' | 'lumina'>('workbench');

  // Global Keyboard Navigation Shortcuts (e.g. G then A/D/W/V/L)
  useEffect(() => {
    let lastKey = '';
    let timer: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      const key = e.key.toUpperCase();

      if (lastKey === 'G') {
        if (key === 'A') {
          setWorkspaceMode('workbench');
          setActiveTab('api');
        } else if (key === 'D') {
          setWorkspaceMode('workbench');
          setActiveTab('database');
        } else if (key === 'W') {
          setWorkspaceMode('workbench');
          setActiveTab('workflows');
        } else if (key === 'V') {
          setWorkspaceMode('workbench');
          setActiveTab('vault');
        } else if (key === 'L') {
          setWorkspaceMode('workbench');
          setActiveTab('telemetry');
        } else if (key === 'U') {
          setWorkspaceMode('lumina');
        }
        lastKey = '';
      } else if (key === 'G') {
        lastKey = 'G';
        clearTimeout(timer);
        timer = setTimeout(() => {
          lastKey = '';
        }, 1000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveTab]);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#090a0f] text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Global Navigation Bar */}
      <div className="h-9 bg-[#0d0e14] border-b border-[#272d40] px-4 flex items-center justify-between text-xs shrink-0 select-none">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWorkspaceMode('workbench')}
            className={`px-2.5 py-0.5 rounded-md font-medium text-[11px] flex items-center gap-1.5 transition-colors ${
              workspaceMode === 'workbench'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3 h-3 text-indigo-400" /> Astera Studio Workbench
          </button>

          <button
            onClick={() => setWorkspaceMode('lumina')}
            className={`px-2.5 py-0.5 rounded-md font-medium text-[11px] flex items-center gap-1.5 transition-colors ${
              workspaceMode === 'lumina'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3 h-3 text-emerald-400" /> Lumina UI Reference Showcase
          </button>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
          <span>Switch Mode: <kbd className="text-slate-400">G U</kbd></span>
          <span>Astera Ecosystem v1.0</span>
        </div>
      </div>

      {workspaceMode === 'lumina' ? (
        <LuminaApp />
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Glassmorphic Top Header */}
          <Header onOpenSettings={() => setIsSettingsOpen(true)} />

          {/* Main Container */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Dynamic Workbench Active Module */}
            <main className="flex-1 flex flex-col overflow-hidden bg-[#090a0f] relative">
              {activeTab === 'api' && <ApiClient />}
              {activeTab === 'database' && <DbExplorer />}
              {activeTab === 'workflows' && <WorkflowCanvas />}
              {activeTab === 'vault' && <SecretVault />}
              {activeTab === 'telemetry' && <TelemetryLogs />}
            </main>
          </div>
        </div>
      )}

      {/* Global Command Palette */}
      <CommandPalette />

      {/* Global Toast Notifications Queue */}
      <ToastContainer />

      {/* Studio Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default App;
