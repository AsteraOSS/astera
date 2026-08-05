import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const LuminaAccordion: React.FC<{
  items: { id: string; title: string; content: React.ReactNode }[];
}> = ({ items }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ [items[0]?.id || '']: true });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="border border-[#272d40] rounded-xl overflow-hidden divide-y divide-[#272d40] bg-[#11131b] select-none font-sans">
      {items.map((item) => {
        const isOpen = openIds[item.id];
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-3.5 text-left text-xs font-semibold text-slate-200 hover:bg-[#161924] transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/50"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-indigo-400' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-3.5 text-xs text-slate-400 leading-relaxed bg-[#0d0e14] border-t border-[#272d40]/60 font-sans">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
