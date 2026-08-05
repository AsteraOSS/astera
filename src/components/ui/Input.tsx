import React from 'react';
import { clsx } from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shortcut?: string;
  error?: string;
  label?: string;
  helperText?: string;
}

/**
 * Enterprise Astera Input Component
 * Features 40px standardized height token, accessible focus indicators, shortcut pill badges, and error message handling.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, shortcut, error, label, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-slate-300 font-sans">
            {label}
          </label>
        )}
        <div className="w-full relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center shrink-0">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            aria-invalid={!!error}
            className={clsx(
              'w-full bg-[#131622] border border-[#272d40] rounded-lg text-sm text-slate-100 placeholder:text-slate-500 font-sans transition-colors duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]',
              'focus:outline-none focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 focus:ring-offset-[#08090d]',
              leftIcon ? 'pl-9' : 'pl-3.5',
              rightIcon || shortcut ? 'pr-12' : 'pr-3.5',
              'h-10',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30',
              className
            )}
            {...props}
          />
          {shortcut && !rightIcon && (
            <div className="absolute right-3 pointer-events-none flex items-center">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-[#1a1e2e] border border-[#272d40] rounded">
                {shortcut}
              </kbd>
            </div>
          )}
          {rightIcon && (
            <div className="absolute right-3 text-slate-400 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-rose-400 font-sans">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400 font-sans">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
