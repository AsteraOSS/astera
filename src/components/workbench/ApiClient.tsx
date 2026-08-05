import React, { useState } from 'react';
import { Send, Plus, Trash2, Clock, Sparkles, Layers } from 'lucide-react';
import { useApiStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CodeEditor } from '@/components/ui/CodeEditor';
import { HttpMethod, KeyValuePair } from '@/types';

export const ApiClient: React.FC = () => {
  const { apiRequest, setApiRequest, apiResponse, isApiLoading, executeApiRequest } = useApiStore();
  const [activeTab, setActiveTab] = useState<'headers' | 'params' | 'body'>('body');

  const methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  const methodColors: Record<HttpMethod, string> = {
    GET: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    POST: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    PUT: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    PATCH: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    DELETE: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    HEAD: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    OPTIONS: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
  };

  const handleAddHeader = () => {
    const newHeader: KeyValuePair = {
      id: Date.now().toString(),
      key: '',
      value: '',
      enabled: true,
    };
    setApiRequest({ headers: [...apiRequest.headers, newHeader] });
  };

  const handleRemoveHeader = (id: string) => {
    setApiRequest({ headers: apiRequest.headers.filter((h) => h.id !== id) });
  };

  const handleHeaderChange = (id: string, field: 'key' | 'value', val: string) => {
    setApiRequest({
      headers: apiRequest.headers.map((h) => (h.id === id ? { ...h, [field]: val } : h)),
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#090a0f] overflow-hidden">
      {/* Top Request Bar */}
      <div className="p-4 bg-[#0d0e14] border-b border-[#272d40] flex items-center gap-3">
        {/* Method Selector */}
        <select
          value={apiRequest.method}
          onChange={(e) => setApiRequest({ method: e.target.value as HttpMethod })}
          className={`h-9 px-3 font-mono font-bold text-xs rounded-lg border focus:outline-none cursor-pointer ${
            methodColors[apiRequest.method]
          }`}
        >
          {methods.map((m) => (
            <option key={m} value={m} className="bg-[#11131b] text-slate-100 font-mono">
              {m}
            </option>
          ))}
        </select>

        {/* URL Input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={apiRequest.url}
            onChange={(e) => setApiRequest({ url: e.target.value })}
            placeholder="https://api.astera.dev/v1/resource"
            className="w-full h-9 bg-[#11131b] border border-[#272d40] rounded-lg px-3.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-indigo-500/80"
          />
        </div>

        {/* Send Button */}
        <Button
          onClick={executeApiRequest}
          isLoading={isApiLoading}
          leftIcon={<Send className="w-3.5 h-3.5" />}
          variant="primary"
          size="md"
        >
          Send Request
        </Button>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 grid grid-cols-2 divide-x divide-[#272d40] overflow-hidden">
        {/* Left Pane: Request Builder */}
        <div className="flex flex-col h-full p-4 overflow-y-auto space-y-4">
          {/* Sub Navigation */}
          <div className="flex items-center justify-between border-b border-[#272d40] pb-2">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('body')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'body'
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                JSON Body
              </button>
              <button
                onClick={() => setActiveTab('headers')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activeTab === 'headers'
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Headers ({apiRequest.headers.length})
              </button>
            </div>
            <span className="text-[11px] font-mono text-slate-500">Content-Type: application/json</span>
          </div>

          {/* Tab Content */}
          {activeTab === 'body' && (
            <div className="flex-1 flex flex-col">
              <CodeEditor
                value={apiRequest.body}
                onChange={(val) => setApiRequest({ body: val })}
                language="json"
                minHeight="280px"
              />
            </div>
          )}

          {activeTab === 'headers' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-medium text-slate-400 px-1">
                <span>Key</span>
                <span>Value</span>
                <span className="w-6" />
              </div>
              {apiRequest.headers.map((h) => (
                <div key={h.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={h.key}
                    onChange={(e) => handleHeaderChange(h.id, 'key', e.target.value)}
                    placeholder="Header Key"
                    className="flex-1 h-8 bg-[#11131b] border border-[#272d40] rounded px-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    value={h.value}
                    onChange={(e) => handleHeaderChange(h.id, 'value', e.target.value)}
                    placeholder="Header Value"
                    className="flex-1 h-8 bg-[#11131b] border border-[#272d40] rounded px-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => handleRemoveHeader(h.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <Button
                onClick={handleAddHeader}
                variant="ghost"
                size="sm"
                leftIcon={<Plus className="w-3 h-3" />}
                className="mt-2"
              >
                Add Header
              </Button>
            </div>
          )}
        </div>

        {/* Right Pane: Response Viewer */}
        <div className="flex flex-col h-full p-4 overflow-y-auto bg-[#0b0c12]">
          {apiResponse ? (
            <div className="space-y-3 flex-1 flex flex-col">
              {/* Response Stats Bar */}
              <div className="flex items-center justify-between p-3 bg-[#11131b] border border-[#272d40] rounded-xl">
                <div className="flex items-center gap-3">
                  <Badge variant="success" dot>
                    {apiResponse.status} {apiResponse.statusText}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-400" /> {apiResponse.timeMs}ms
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-emerald-400" /> {apiResponse.sizeBytes} B
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  {apiResponse.timestamp}
                </span>
              </div>

              {/* Response Body */}
              <div className="flex-1 flex flex-col">
                <CodeEditor
                  value={apiResponse.data}
                  readOnly
                  language="json"
                  minHeight="320px"
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3 text-slate-500">
              <div className="p-3 rounded-full bg-[#11131b] border border-[#272d40]">
                <Sparkles className="w-6 h-6 text-indigo-400/80" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-300">Ready to Send Request</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Press Send or hit <kbd className="font-mono text-slate-400">⌘ + Enter</kbd> to dispatch the HTTP payload.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
