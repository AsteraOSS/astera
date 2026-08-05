import React from 'react';
import { clsx } from 'clsx';
import { PackageOpen, Loader2 } from 'lucide-react';

export const LuminaSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx('bg-[#1f2434] animate-pulse rounded-lg', className)} />
);

export const LuminaEmptyState: React.FC<{
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}> = ({ title, description, actionText, onAction, icon }) => (
  <div className="py-12 px-6 border border-dashed border-[#272d40] rounded-xl text-center space-y-3 bg-[#11131b]/50">
    <div className="p-3 w-12 h-12 rounded-full bg-[#161924] border border-[#272d40] mx-auto flex items-center justify-center text-indigo-400">
      {icon || <PackageOpen className="w-6 h-6 text-indigo-400" />}
    </div>
    <div>
      <h3 className="text-sm font-semibold text-slate-200 font-sans">{title}</h3>
      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto font-sans leading-relaxed">
        {description}
      </p>
    </div>
    {actionText && (
      <button
        onClick={onAction}
        className="h-8 px-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
      >
        {actionText}
      </button>
    )}
  </div>
);

export const LuminaLoadingSpinner: React.FC<{ label?: string }> = ({ label = 'Loading...' }) => (
  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
    <span>{label}</span>
  </div>
);
