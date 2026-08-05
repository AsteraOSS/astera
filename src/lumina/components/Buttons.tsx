import React, { useState } from 'react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronDown } from 'lucide-react';

export interface LuminaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'emerald' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const LuminaButton = React.forwardRef<HTMLButtonElement, LuminaButtonProps>(
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
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 ease-out select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:transform-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:outline-none';

    const sizeStyles = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-9 px-4 text-sm gap-2',
      lg: 'h-11 px-5 text-base gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm shadow-indigo-950/50 border border-indigo-500/30',
      secondary:
        'bg-[#161924] text-slate-200 hover:bg-[#1f2434] hover:text-white border border-[#272d40]',
      outline:
        'bg-transparent text-slate-300 hover:bg-[#161924] hover:text-white border border-[#272d40]',
      ghost:
        'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-[#161924]',
      destructive:
        'bg-rose-600/10 text-rose-400 hover:bg-rose-600/20 border border-rose-500/20',
      emerald:
        'bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm shadow-emerald-950/50 border border-emerald-500/30',
      amber:
        'bg-amber-600 text-white hover:bg-amber-500 shadow-sm shadow-amber-950/50 border border-amber-500/30',
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...(props as any)}
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-current" /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);
LuminaButton.displayName = 'LuminaButton';

export const ButtonGroup: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    role="group"
    className={clsx(
      'inline-flex rounded-lg border border-[#272d40] overflow-hidden p-0.5 bg-[#11131b]',
      className
    )}
  >
    {children}
  </div>
);

export const SplitButton: React.FC<{
  label: string;
  onClick: () => void;
  options: string[];
  onSelectOption: (opt: string) => void;
}> = ({ label, onClick, options, onSelectOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-flex rounded-lg overflow-hidden border border-indigo-500/30 shadow-sm shadow-indigo-950/50">
      <button
        type="button"
        onClick={onClick}
        className="h-9 px-4 bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/50"
      >
        {label}
      </button>
      <button
        type="button"
        aria-label="Toggle options menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-2 bg-indigo-700 text-white border-l border-indigo-500/40 hover:bg-indigo-600 transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-500/50"
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-10 right-0 z-40 w-48 bg-[#11131b] border border-[#272d40] rounded-xl shadow-astera-modal p-1"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onSelectOption(opt);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-[#161924] rounded-lg transition-colors font-sans"
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
