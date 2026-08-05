import React from 'react';
import { clsx } from 'clsx';

export const LuminaSwitch: React.FC<{
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
}> = ({ checked, onChange, label }) => (
  <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={clsx(
        'w-9 h-5 rounded-full transition-colors duration-200 relative p-0.5 border border-[#272d40]',
        checked ? 'bg-indigo-600 border-indigo-500' : 'bg-[#161924]'
      )}
    >
      <span
        className={clsx(
          'w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200 shadow-sm block',
          checked ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
    {label && <span className="text-xs font-medium text-slate-300 font-sans">{label}</span>}
  </label>
);

export const LuminaCheckbox: React.FC<{
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
}> = ({ checked, onChange, label }) => (
  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 rounded border-[#272d40] bg-[#11131b] text-indigo-600 focus:ring-indigo-500/30"
    />
    {label && <span className="text-xs font-medium text-slate-300 font-sans">{label}</span>}
  </label>
);

export const LuminaSlider: React.FC<{
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  label?: string;
}> = ({ value, min = 0, max = 100, onChange, label }) => (
  <div className="space-y-1.5 w-full">
    {label && (
      <div className="flex justify-between text-xs font-medium text-slate-400">
        <span>{label}</span>
        <span className="font-mono text-indigo-400 font-semibold">{value}</span>
      </div>
    )}
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-[#1f2434] rounded-lg appearance-none cursor-pointer accent-indigo-500"
    />
  </div>
);
