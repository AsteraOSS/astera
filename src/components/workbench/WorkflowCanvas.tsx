import React from 'react';
import { Play, GitFork, ArrowRight, Zap, Code, ShieldCheck, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useWorkflowStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const WorkflowCanvas: React.FC = () => {
  const { workflowNodes, isWorkflowRunning, runWorkflow } = useWorkflowStore();

  const nodeIcons = {
    trigger: <Zap className="w-4 h-4 text-amber-400" />,
    transform: <Code className="w-4 h-4 text-cyan-400" />,
    condition: <ShieldCheck className="w-4 h-4 text-indigo-400" />,
    action: <Send className="w-4 h-4 text-emerald-400" />,
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#090a0f] overflow-hidden select-none">
      {/* Workflow Toolbar */}
      <div className="p-4 bg-[#0d0e14] border-b border-[#272d40] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <GitFork className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-100">GitHub Event Deployment Pipeline</h2>
            <p className="text-[11px] text-slate-400">
              Triggers on push event → validates signature → checks main branch → deploys fleet
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="purple" dot>
            5 Active Nodes
          </Badge>
          <Button
            onClick={runWorkflow}
            isLoading={isWorkflowRunning}
            leftIcon={<Play className="w-3.5 h-3.5" />}
            variant="primary"
            size="sm"
          >
            Run Pipeline
          </Button>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="flex-1 bg-[#090a0f] relative overflow-auto p-8 flex items-center justify-center">
        {/* Subtle Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-[#272d40] 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Node Pipeline Card Sequence */}
        <div className="flex items-center gap-6 z-10 overflow-x-auto py-8 px-4 max-w-full">
          {workflowNodes.map((node, index) => {
            const isLast = index === workflowNodes.length - 1;
            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div
                  className={`w-64 bg-[#11131b] border rounded-xl p-4 shadow-astera-card transition-all duration-200 ${
                    node.status === 'running'
                      ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-105'
                      : node.status === 'success'
                      ? 'border-emerald-500/60 bg-[#111718]'
                      : 'border-[#272d40] hover:border-[#3b4460]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-[#161924] border border-[#272d40]">
                        {nodeIcons[node.type]}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        {node.type}
                      </span>
                    </div>

                    {node.status === 'running' && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                    )}
                    {node.status === 'success' && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    {node.status === 'idle' && (
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-slate-100 font-sans">{node.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {node.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-[#272d40]/60 space-y-1">
                    {Object.entries(node.config).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between text-[10px] font-mono text-slate-500"
                      >
                        <span>{k}:</span>
                        <span className="text-slate-300 font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connecting Arrow */}
                {!isLast && (
                  <div className="flex items-center justify-center shrink-0">
                    <div className="w-8 h-[2px] bg-[#272d40] relative">
                      <ArrowRight className="w-4 h-4 text-slate-500 absolute -right-2 -top-[7px]" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
