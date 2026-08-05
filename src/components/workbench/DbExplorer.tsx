import React from 'react';
import { Play, Database, Table, Key, FileSpreadsheet, Sparkles, RefreshCw } from 'lucide-react';
import { useDbStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CodeEditor } from '@/components/ui/CodeEditor';

export const DbExplorer: React.FC = () => {
  const { dbTables, activeQuery, setActiveQuery, queryResult, isQueryLoading, executeQuery } =
    useDbStore();

  const handleSelectTable = (tableName: string) => {
    setActiveQuery(
      `SELECT * FROM ${tableName}\nWHERE environment = 'production'\nORDER BY created_at DESC\nLIMIT 20;`
    );
  };

  return (
    <div className="flex-1 flex h-full bg-[#090a0f] overflow-hidden">
      {/* Sidebar: Schema Tree */}
      <div className="w-64 border-r border-[#272d40] bg-[#0d0e14] flex flex-col p-3 space-y-4 select-none">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>PostgreSQL Primary</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">v16.2</span>
        </div>

        <div className="space-y-1">
          <div className="px-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Tables ({dbTables.length})
          </div>
          {dbTables.map((t) => (
            <div key={t.name} className="space-y-1">
              <button
                onClick={() => handleSelectTable(t.name)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-[#161924] transition-colors group"
              >
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <Table className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  <span>{t.name}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{t.rowCount}</span>
              </button>

              {/* Column list preview */}
              <div className="pl-6 space-y-0.5 border-l border-[#272d40] ml-3">
                {t.columns.slice(0, 3).map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center justify-between text-[10px] font-mono text-slate-500 py-0.5"
                  >
                    <span className="flex items-center gap-1">
                      {col.isPrimaryKey && <Key className="w-2.5 h-2.5 text-amber-400" />}
                      {col.name}
                    </span>
                    <span className="text-slate-600">{col.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Query Editor Bar */}
        <div className="p-4 bg-[#0d0e14] border-b border-[#272d40] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 font-sans flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Interactive SQL Editor
            </span>
            <Button
              onClick={executeQuery}
              isLoading={isQueryLoading}
              leftIcon={<Play className="w-3.5 h-3.5" />}
              variant="emerald"
              size="sm"
            >
              Run Query (⌘E)
            </Button>
          </div>

          <CodeEditor
            value={activeQuery}
            onChange={(val) => setActiveQuery(val)}
            language="sql"
            minHeight="140px"
          />
        </div>

        {/* Query Data Grid Result */}
        <div className="flex-1 flex flex-col p-4 bg-[#0b0c12] overflow-hidden">
          {queryResult ? (
            <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-3">
                  <Badge variant="success" dot>
                    QueryResult: {queryResult.rowCount} rows
                  </Badge>
                  <span>Execution: {queryResult.executionTimeMs}ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[11px]">Export CSV</span>
                </div>
              </div>

              {/* Data Grid Table */}
              <div className="flex-1 border border-[#272d40] rounded-xl overflow-auto bg-[#090a0f]">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead className="bg-[#11131b] border-b border-[#272d40] sticky top-0 z-10 select-none">
                    <tr>
                      {queryResult.columns.map((col) => (
                        <th
                          key={col}
                          className="px-3.5 py-2.5 text-[11px] font-semibold text-slate-300 tracking-tight border-r border-[#272d40]/50"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#272d40]/40">
                    {queryResult.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#161924]/60 transition-colors">
                        {queryResult.columns.map((col) => (
                          <td
                            key={col}
                            className="px-3.5 py-2 text-slate-300 border-r border-[#272d40]/30 max-w-xs truncate"
                          >
                            {String(row[col])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
              <RefreshCw className="w-6 h-6 text-emerald-400/80 mb-2" />
              <p className="text-xs">Click Run Query or select a table from the sidebar tree.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
