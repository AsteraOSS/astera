import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export interface CodeEditorProps {
  value: string;
  onChange?: (val: string) => void;
  language?: string;
  readOnly?: boolean;
  minHeight?: string;
  label?: string;
}

/**
 * Enterprise Astera Code Editor Component
 * Features JetBrains Mono typography (24px line height), sticky line numbers, Tab key handling, and copy to clipboard action.
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'json',
  readOnly = false,
  minHeight = '220px',
  label = 'Code Editor',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && !readOnly) {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange?.(newValue);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lines = value.split('\n');

  return (
    <div className="w-full bg-[#0d0e14] border border-[#272d40] rounded-xl overflow-hidden font-mono text-xs flex flex-col shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#11131b] border-b border-[#272d40] select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider ml-2 font-mono">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors px-2 py-1 rounded hover:bg-[#1a1e2e] focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400 shrink-0" /> : <Copy className="w-3 h-3 shrink-0" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Editor Code Canvas */}
      <div className="relative flex-1 flex overflow-x-auto" style={{ minHeight }}>
        {/* Line Numbers */}
        <div
          aria-hidden="true"
          className="py-3 px-3 bg-[#08090d] border-r border-[#272d40]/60 text-slate-600 text-right select-none font-mono text-[11px] leading-6 min-w-[36px]"
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        {readOnly ? (
          <pre className="p-3 text-indigo-300 leading-6 whitespace-pre font-mono overflow-x-auto flex-1 select-text">
            <code>{value}</code>
          </pre>
        ) : (
          <textarea
            aria-label={label}
            aria-readonly={readOnly}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="w-full h-full p-3 bg-transparent text-indigo-200 leading-6 font-mono resize-none focus:outline-none flex-1 selection:bg-indigo-500/30"
            style={{ minHeight }}
          />
        )}
      </div>
    </div>
  );
};
