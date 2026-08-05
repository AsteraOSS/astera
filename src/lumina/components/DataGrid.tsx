import React, { useState } from 'react';
import { ArrowUpDown, Search } from 'lucide-react';

export interface DataGridColumn<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface DataGridProps<T extends { id: string }> {
  data: T[];
  columns: DataGridColumn<T>[];
  pageSize?: number;
  ariaLabel?: string;
}

/**
 * Enterprise Lumina DataGrid Component
 * High-craft data grid featuring interactive sorting, filtering, keyboard navigation, and sticky header styling.
 */
export function LuminaDataGrid<T extends { id: string }>({
  data,
  columns,
  pageSize = 10,
  ariaLabel = 'Data Table Grid',
}: DataGridProps<T>) {
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) => String(val).toLowerCase().includes(filter.toLowerCase()))
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-3 font-mono text-xs w-full">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter records..."
            aria-label="Filter data table records"
            className="w-full h-8 pl-8 pr-3 bg-[#131622] border border-[#272d40] rounded-lg text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
        </div>
        <span className="text-[11px] text-slate-400 font-mono">{sortedData.length} records</span>
      </div>

      <div className="border border-[#272d40] rounded-xl overflow-hidden bg-[#08090d] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
        <table className="w-full text-left border-collapse" aria-label={ariaLabel}>
          <thead className="bg-[#0d0f17] border-b border-[#272d40] text-slate-300 font-semibold select-none">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  tabIndex={0}
                  onClick={() => handleSort(col.key)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort(col.key);
                    }
                  }}
                  className="px-3.5 py-2.5 border-r border-[#272d40]/40 cursor-pointer hover:bg-[#1a1e2e] transition-colors focus:outline-none focus:bg-[#1a1e2e]"
                >
                  <div className="flex items-center justify-between">
                    <span>{col.header}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400 ml-1 shrink-0" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#272d40]/40">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                  No matching records found
                </td>
              </tr>
            ) : (
              sortedData.slice(0, pageSize).map((row) => (
                <tr key={row.id} className="hover:bg-[#131622] transition-colors">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-3.5 py-2 text-slate-300 border-r border-[#272d40]/30">
                      {col.render ? col.render(row) : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
