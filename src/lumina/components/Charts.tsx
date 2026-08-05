import React from 'react';

export const SparklineChart: React.FC<{
  data: number[];
  color?: string;
  height?: number;
}> = ({ data, color = '#6366f1', height = 48 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * 180;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg className="w-full overflow-visible" height={height} viewBox={`0 0 180 ${height}`}>
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} strokeLinecap="round" />
    </svg>
  );
};

export const BarChart: React.FC<{ data: { label: string; value: number }[] }> = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-2 h-32 pt-4 px-2 select-none">
      {data.map((item, idx) => {
        const heightPct = (item.value / max) * 100;
        return (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
            <div
              className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t transition-all duration-300 hover:from-indigo-500 hover:to-indigo-300 relative group"
              style={{ height: `${heightPct}%` }}
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#1f2434] text-white font-mono text-[10px] px-1.5 py-0.5 rounded border border-[#272d40]">
                {item.value}
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-500">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};
