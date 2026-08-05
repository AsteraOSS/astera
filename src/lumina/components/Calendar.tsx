import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export const LuminaCalendar: React.FC<{
  onSelectDate?: (date: Date) => void;
}> = ({ onSelectDate }) => {
  const [selectedDay, setSelectedDay] = useState(15);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="w-64 p-3 bg-[#11131b] border border-[#272d40] rounded-xl font-mono text-xs select-none shadow-astera-card">
      <div className="flex items-center justify-between pb-2 border-b border-[#272d40] mb-2 font-sans font-semibold text-slate-200">
        <span>August 2026</span>
        <div className="flex gap-1 text-slate-400">
          <button className="p-1 hover:text-white rounded"><ChevronLeft className="w-3.5 h-3.5" /></button>
          <button className="p-1 hover:text-white rounded"><ChevronRight className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center gap-1 text-[10px] text-slate-500 font-semibold mb-1">
        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => {
              setSelectedDay(d);
              onSelectDate?.(new Date(2026, 7, d));
            }}
            className={`h-7 rounded text-xs flex items-center justify-center transition-colors ${
              d === selectedDay
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-300 hover:bg-[#161924]'
            }`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
};

export const LuminaDatePicker: React.FC<{ value?: string; onChange?: (val: string) => void }> = ({
  value = '2026-08-15',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [val, setVal] = useState(value);

  return (
    <div className="relative inline-block select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-9 px-3 bg-[#11131b] border border-[#272d40] rounded-lg text-xs font-mono text-slate-200 hover:bg-[#161924]"
      >
        <CalendarIcon className="w-3.5 h-3.5 text-indigo-400" />
        <span>{val}</span>
      </button>

      {isOpen && (
        <div className="absolute top-10 left-0 z-40">
          <LuminaCalendar
            onSelectDate={(d) => {
              const formatted = d.toISOString().split('T')[0];
              setVal(formatted);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
