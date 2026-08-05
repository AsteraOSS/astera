import React from 'react';
import { clsx } from 'clsx';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard: React.FC<{
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  subtitle?: string;
}> = ({ title, value, change, isPositive = true, icon, subtitle }) => (
  <div className="p-4 bg-[#11131b] border border-[#272d40] rounded-xl shadow-astera-card hover:border-[#3b4460] transition-all space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-slate-400 font-sans">{title}</span>
      <div className="p-2 rounded-lg bg-[#161924] border border-[#272d40] text-indigo-400">
        {icon}
      </div>
    </div>
    <div className="flex items-baseline justify-between pt-1">
      <h3 className="text-xl font-bold text-slate-100 font-mono tracking-tight">{value}</h3>
      {change && (
        <span
          className={clsx(
            'text-xs font-mono font-semibold flex items-center gap-0.5 px-1.5 py-0.5 rounded',
            isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
          )}
        >
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      )}
    </div>
    {subtitle && <p className="text-[11px] text-slate-500 font-sans">{subtitle}</p>}
  </div>
);

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={clsx(
      'p-5 astera-glass border border-[#272d40] rounded-xl shadow-astera-card backdrop-blur-md',
      className
    )}
  >
    {children}
  </div>
);

export const BorderGlowCard: React.FC<{
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}> = ({ title, description, actionText, onAction }) => (
  <div className="relative p-5 bg-[#11131b] border border-indigo-500/40 rounded-xl shadow-astera-glow overflow-hidden group hover:border-indigo-500 transition-all">
    <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />
    <h3 className="text-sm font-bold text-slate-100 font-sans">{title}</h3>
    <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">{description}</p>
    {actionText && (
      <button
        onClick={onAction}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        <span>{actionText}</span> →
      </button>
    )}
  </div>
);
