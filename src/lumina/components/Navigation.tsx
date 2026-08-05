import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { clsx } from 'clsx';

export const LuminaBreadcrumbs: React.FC<{ items: { label: string; href?: string }[] }> = ({
  items,
}) => (
  <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-sans select-none">
    {items.map((item, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
        <span
          className={clsx(
            idx === items.length - 1
              ? 'font-semibold text-slate-100'
              : 'hover:text-slate-200 cursor-pointer transition-colors'
          )}
        >
          {item.label}
        </span>
      </React.Fragment>
    ))}
  </nav>
);

export const LuminaPagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center gap-2 text-xs font-mono select-none">
    <button
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="p-1.5 rounded-lg bg-[#11131b] border border-[#272d40] text-slate-300 hover:text-white disabled:opacity-40"
    >
      <ChevronLeft className="w-3.5 h-3.5" />
    </button>
    <span className="text-slate-400 px-2">
      Page <strong className="text-slate-100">{currentPage}</strong> of {totalPages}
    </span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      className="p-1.5 rounded-lg bg-[#11131b] border border-[#272d40] text-slate-300 hover:text-white disabled:opacity-40"
    >
      <ChevronRight className="w-3.5 h-3.5" />
    </button>
  </div>
);
