import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownItem {
  id: string;
  label: string;
  shortcut?: string;
  icon?: React.ReactNode;
  destructive?: boolean;
}

export const LuminaDropdown: React.FC<{
  label: string;
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
}> = ({ label, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left select-none">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 h-9 px-3.5 bg-[#11131b] border border-[#272d40] rounded-lg text-xs font-medium text-slate-200 hover:bg-[#161924] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/50"
      >
        <span>{label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
            className="absolute left-0 mt-1.5 z-40 w-52 bg-[#11131b] border border-[#272d40] rounded-xl shadow-astera-modal p-1 space-y-0.5"
          >
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  setSelectedId(item.id);
                  onSelect(item);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-sans transition-colors ${
                  item.destructive
                    ? 'text-rose-400 hover:bg-rose-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-[#161924]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {selectedId === item.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                {item.shortcut && !selectedId && (
                  <kbd className="px-1.5 py-0.2 text-[10px] font-mono text-slate-500 bg-[#1f2434] rounded border border-[#272d40]">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
