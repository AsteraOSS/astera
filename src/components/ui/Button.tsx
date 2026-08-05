import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Enterprise Astera Button Component
 * Standardized height tokens: 32px (sm), 40px (md), 48px (lg).
 * Features WCAG AAA focus-visible outlines and tactile glass rim highlights.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 ease-out select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090d] disabled:opacity-50 disabled:pointer-events-none disabled:transform-none';

    const sizeStyles = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-5 text-base gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm shadow-indigo-950/50 border border-indigo-500/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]',
      secondary:
        'bg-[#131622] text-slate-200 hover:bg-[#1a1e2e] hover:text-white border border-[#272d40] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]',
      outline:
        'bg-transparent text-slate-300 hover:bg-[#131622] hover:text-white border border-[#272d40]',
      ghost:
        'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-[#131622]',
      destructive:
        'bg-rose-600/10 text-rose-400 hover:bg-rose-600/20 border border-rose-500/20 shadow-[inset_0_1px_0_0_rgba(244,63,94,0.1)]',
      emerald:
        'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm shadow-emerald-950/50 border border-emerald-500/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
