import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Database, GitFork, Key, Activity, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    setActiveTab,
    setEnvironment,
    executeApiRequest,
    executeQuery,
    runWorkflow,
    addToast,
  } = useStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  const commands = [
    {
      id: 'tab-api',
      category: 'Navigation',
      title: 'Open API & Webhook Studio',
      description: 'REST, GraphQL & WebSocket request workbench',
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      shortcut: ['G', 'A'],
      action: () => {
        setActiveTab('api');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'tab-db',
      category: 'Navigation',
      title: 'Open Database & SQL Explorer',
      description: 'Visual query runner, schema diagramming & data grid',
      icon: <Database className="w-4 h-4 text-emerald-400" />,
      shortcut: ['G', 'D'],
      action: () => {
        setActiveTab('database');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'tab-workflow',
      category: 'Navigation',
      title: 'Open Event Workflow Canvas',
      description: 'Visual node orchestration & step execution',
      icon: <GitFork className="w-4 h-4 text-amber-400" />,
      shortcut: ['G', 'W'],
      action: () => {
        setActiveTab('workflows');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'tab-vault',
      category: 'Navigation',
      title: 'Open Encrypted Secret Vault',
      description: 'Environment variables & encrypted keys manager',
      icon: <Key className="w-4 h-4 text-rose-400" />,
      shortcut: ['G', 'V'],
      action: () => {
        setActiveTab('vault');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'tab-telemetry',
      category: 'Navigation',
      title: 'Open System Telemetry Stream',
      description: 'Live log stream & cluster diagnostics',
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
      shortcut: ['G', 'L'],
      action: () => {
        setActiveTab('telemetry');
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'act-run-api',
      category: 'Actions',
      title: 'Execute Active API Request',
      description: 'Send current HTTP POST request payload',
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
      shortcut: ['⌘', 'Enter'],
      action: () => {
        executeApiRequest();
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'act-run-query',
      category: 'Actions',
      title: 'Execute SQL Query',
      description: 'Run active query against production cluster',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      shortcut: ['⌘', 'Enter'],
      action: () => {
        executeQuery();
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'act-run-workflow',
      category: 'Actions',
      title: 'Trigger Workflow Execution Pipeline',
      description: 'Run step-by-step pipeline validation',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      shortcut: ['⌘', 'Enter'],
      action: () => {
        runWorkflow();
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'env-prod',
      category: 'Environment',
      title: 'Switch Environment: Production',
      description: 'Active: astera-prod-alpha cluster',
      icon: <Key className="w-4 h-4 text-rose-400" />,
      action: () => {
        setEnvironment('production');
        addToast({ title: 'Environment Changed', description: 'Switched target to Production.', type: 'info' });
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'env-staging',
      category: 'Environment',
      title: 'Switch Environment: Staging',
      description: 'Active: astera-stage-beta cluster',
      icon: <Key className="w-4 h-4 text-amber-400" />,
      action: () => {
        setEnvironment('staging');
        addToast({ title: 'Environment Changed', description: 'Switched target to Staging.', type: 'info' });
        setCommandPaletteOpen(false);
      },
    },
    {
      id: 'env-dev',
      category: 'Environment',
      title: 'Switch Environment: Development',
      description: 'Active: local sandbox environment',
      icon: <Key className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setEnvironment('development');
        addToast({ title: 'Environment Changed', description: 'Switched target to Development.', type: 'info' });
        setCommandPaletteOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.description && cmd.description.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <Dialog.Root open={isCommandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-black/75 backdrop-blur-md z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -10 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-xl bg-[#11131b] border border-[#272d40] rounded-xl shadow-2xl overflow-hidden focus:outline-none"
                >
                  <Dialog.Title className="sr-only">Command Palette</Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Search commands and switch workbench views using keyboard navigation
                  </Dialog.Description>

                  {/* Search Bar Input */}
                  <div className="flex items-center px-4 py-3 border-b border-[#272d40] gap-3">
                    <Search className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      autoFocus
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedIndex(0);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a command or search tools..."
                      className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none font-sans"
                    />
                    <kbd className="px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-[#1f2434] border border-[#272d40] rounded">
                      ESC
                    </kbd>
                  </div>

                  {/* Results List */}
                  <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#272d40]/40">
                    {filteredCommands.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-500">
                        No matching commands found for "{query}"
                      </div>
                    ) : (
                      filteredCommands.map((cmd, idx) => {
                        const isSelected = idx === selectedIndex;
                        return (
                          <button
                            key={cmd.id}
                            onClick={cmd.action}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors duration-100 text-left ${
                              isSelected
                                ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                                : 'text-slate-300 hover:bg-[#161924]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded-md bg-[#1f2434] border border-[#272d40]">
                                {cmd.icon}
                              </div>
                              <div>
                                <div className="text-xs font-semibold font-sans">{cmd.title}</div>
                                {cmd.description && (
                                  <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                                    {cmd.description}
                                  </div>
                                )}
                              </div>
                            </div>

                            {cmd.shortcut && (
                              <div className="flex items-center gap-1">
                                {cmd.shortcut.map((key, kIdx) => (
                                  <kbd
                                    key={kIdx}
                                    className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-[#1f2434] border border-[#272d40] rounded"
                                  >
                                    {key}
                                  </kbd>
                                ))}
                              </div>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between px-4 py-2 bg-[#0d0e14] border-t border-[#272d40] text-[11px] text-slate-500">
                    <div className="flex items-center gap-3">
                      <span>
                        <kbd className="text-slate-400 font-mono">↑↓</kbd> Navigate
                      </span>
                      <span>
                        <kbd className="text-slate-400 font-mono">↵</kbd> Select
                      </span>
                    </div>
                    <span className="font-mono text-slate-400">Astera Command Engine v1.0</span>
                  </div>
                </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
