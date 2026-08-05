import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LuminaContextMenu: React.FC<{
  children: React.ReactNode;
  menuItems: { label: string; action: () => void; shortcut?: string }[];
}> = ({ children, menuItems }) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleClick = () => setPosition(null);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPosition(null);
    };

    if (position) {
      window.addEventListener('click', handleClick);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onContextMenu={handleContextMenu} className="relative inline-block w-full">
      {children}
      <AnimatePresence>
        {position && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            role="menu"
            className="fixed z-50 w-48 bg-[#11131b] border border-[#272d40] rounded-xl shadow-astera-modal p-1 space-y-0.5"
            style={{ top: position.y, left: position.x }}
          >
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                type="button"
                role="menuitem"
                onClick={item.action}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-[#161924] transition-colors"
              >
                <span>{item.label}</span>
                {item.shortcut && (
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
