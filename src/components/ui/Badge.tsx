import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

/**
 * Enterprise Astera Badge Component
 * Features Obsidian 2.0 status glow indicator dots and strict 20px (sm) / 24px (md) height tokens.
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  dot = false,
}) => {
  const variantStyles = {
    default: 'bg-[#1a1e2e] text-slate-300 border-[#272d40]',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/25',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
    purple: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',
  };

  const sizeStyles = {
    sm: 'h-5 px-1.5 text-[10px] gap-1',
    md: 'h-6 px-2 text-xs gap-1.5',
  };

  const dotStyles = {
    default: 'bg-slate-400',
    success: 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
    warning: 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
    error: 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]',
    info: 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]',
    purple: 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-md font-medium font-mono border tracking-tight select-none',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', dotStyles[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
