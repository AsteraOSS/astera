import React, { useState } from 'react';
import { Activity, Search, Trash2, Terminal, Info, AlertTriangle, AlertCircle, Bug, Pause, Play } from 'lucide-react';
import { useTelemetryStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { TelemetryLog } from '@/types';

export const TelemetryLogs: React.FC = () => {
  const { logs, logFilter, setLogFilter, logLevelFilter, setLogLevelFilter, clearLogs, addLog } =
    useTelemetryStore();

  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [selectedLog, setSelectedLog] = useState<TelemetryLog | null>(null);

  const levelBadges = {
    INFO: <Badge variant="info">INFO</Badge>,
    WARN: <Badge variant="warning">WARN</Badge>,
    ERROR: <Badge variant="error">ERROR</Badge>,
    DEBUG: <Badge variant="default">DEBUG</Badge>,
  };

  const levelIcons = {
    INFO: <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
    WARN: <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />,
    ERROR: <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />,
    DEBUG: <Bug className="w-3.5 h-3.5 text-slate-400 shrink-0" />,
  };

  const handleSimulateLog = () => {
    addLog({
      level: 'INFO',
      service: 'astera-user-session',
      message: 'User authenticated via OAuth2 (GitHub SSO) — Session token issued',
      metadata: { userId: 'usr_88190c', ip: '10.0.4.12' },
    });
  };

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = logLevelFilter === 'ALL' || log.level === logLevelFilter;
    const matchesQuery =
      log.message.toLowerCase().includes(logFilter.toLowerCase()) ||
      log.service.toLowerCase().includes(logFilter.toLowerCase());
    return matchesLevel && matchesQuery;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#090a0f] overflow-hidden select-none">
      {/* Log Header Controls */}
      <div className="p-4 bg-[#0d0e14] border-b border-[#272d40] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold text-slate-100 font-sans">Live System Telemetry Stream</h2>
              {isLiveStreaming && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE STREAMING
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              Diagnostic logging pipeline from 48 active Kubernetes nodes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Input
            value={logFilter}
            onChange={(e) => setLogFilter(e.target.value)}
            placeholder="Filter logs or service..."
            leftIcon={<Search className="w-3.5 h-3.5" />}
            className="w-56"
          />
          <Button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            leftIcon={isLiveStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            variant="outline"
            size="sm"
          >
            {isLiveStreaming ? 'Pause Stream' : 'Resume Stream'}
          </Button>
          <Button
            onClick={handleSimulateLog}
            leftIcon={<Terminal className="w-3.5 h-3.5" />}
            variant="outline"
            size="sm"
          >
            Emit Test Log
          </Button>
          <Button
            onClick={clearLogs}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            variant="ghost"
            size="sm"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Level Tabs Bar */}
      <div className="px-4 py-2 bg-[#0b0c12] border-b border-[#272d40] flex items-center justify-between text-xs">
        <div className="flex gap-1">
          {['ALL', 'INFO', 'WARN', 'ERROR', 'DEBUG'].map((level) => (
            <button
              key={level}
              onClick={() => setLogLevelFilter(level)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
                logLevelFilter === level
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          Showing {filteredLogs.length} of {logs.length} entries
        </span>
      </div>

      {/* Log Feed Table */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto font-mono text-xs divide-y divide-[#272d40]/40">
          {filteredLogs.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 font-sans">
              No telemetry events match your current filter.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className={`flex items-center gap-3 px-4 py-2.5 hover:bg-[#161924] cursor-pointer transition-colors ${
                  selectedLog?.id === log.id ? 'bg-[#161924] border-l-2 border-indigo-500' : ''
                }`}
              >
                {levelIcons[log.level]}
                <span className="text-slate-500 w-24 text-[11px] shrink-0">{log.timestamp}</span>
                <span className="text-indigo-400 w-44 font-semibold shrink-0 truncate">
                  [{log.service}]
                </span>
                <span className="text-slate-200 flex-1 truncate">{log.message}</span>
                {log.metadata && (
                  <span className="text-[10px] text-slate-500 bg-[#1f2434] px-1.5 py-0.5 rounded border border-[#272d40] shrink-0">
                    +{Object.keys(log.metadata).length} meta
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Selected Log Drawer */}
        {selectedLog && (
          <div className="w-80 border-l border-[#272d40] bg-[#0d0e14] p-4 flex flex-col justify-between font-mono text-xs overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-[#272d40] pb-2 mb-3">
                <span className="font-semibold text-slate-200 font-sans">Log Event Details</span>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="text-slate-500 hover:text-slate-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-slate-500 text-[10px]">ID:</span>
                  <div className="text-slate-300">{selectedLog.id}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">Timestamp:</span>
                  <div className="text-slate-300">{selectedLog.timestamp}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">Level:</span>
                  <div>{levelBadges[selectedLog.level as keyof typeof levelBadges]}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">Service:</span>
                  <div className="text-indigo-400 font-semibold">{selectedLog.service}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">Message:</span>
                  <div className="text-slate-200 bg-[#11131b] p-2 rounded border border-[#272d40] font-sans text-xs">
                    {selectedLog.message}
                  </div>
                </div>

                {selectedLog.metadata && (
                  <div>
                    <span className="text-slate-500 text-[10px]">Metadata:</span>
                    <pre className="p-2 bg-[#090a0f] border border-[#272d40] rounded text-[11px] text-cyan-300 overflow-x-auto">
                      {JSON.stringify(selectedLog.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
