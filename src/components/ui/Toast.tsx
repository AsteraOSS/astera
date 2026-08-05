import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useToastStore } from '@/store/useStore';

/**
 * Enterprise Astera Toast Container Component
 * Features screen reader aria-live announcements, spring physics transitions, and Obsidian glass rim depth.
 */
export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  const iconMap = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />,
    info: <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="pointer-events-auto p-3.5 bg-[#131622]/95 backdrop-blur-xl border border-[#272d40] rounded-xl shadow-2xl shadow-black/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] flex items-start gap-3 relative overflow-hidden"
          >
            {iconMap[toast.type]}
            <div className="flex-1 pr-4">
              <h4 className="text-xs font-semibold text-slate-100 font-sans">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-slate-400 mt-0.5 font-sans leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="text-slate-400 hover:text-slate-200 transition-colors p-1 rounded-md hover:bg-[#1a1e2e] focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
