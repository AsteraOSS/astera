import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const LuminaTabs: React.FC<{
  tabs: { id: string; label: string; badge?: string }[];
  activeId?: string;
  onChange?: (id: string) => void;
}> = ({ tabs, activeId = tabs[0]?.id, onChange }) => {
  const [selected, setSelected] = useState(activeId);

  return (
    <div role="tablist" className="flex items-center gap-1 border-b border-[#272d40] pb-1 select-none font-sans relative">
      {tabs.map((t) => {
        const isActive = selected === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              setSelected(t.id);
              onChange?.(t.id);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors relative flex items-center gap-1.5 ${
              isActive
                ? 'text-indigo-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#161924]'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="lumina-active-tab-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute inset-0 bg-indigo-600/20 border border-indigo-500/30 rounded-lg -z-10"
              />
            )}
            <span>{t.label}</span>
            {t.badge && (
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#1f2434] text-slate-400">
                {t.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
