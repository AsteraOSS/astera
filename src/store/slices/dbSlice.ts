import { StateCreator } from 'zustand';
import { DbTable, DbQueryResult } from '@/types';
import { ToastSlice } from './toastSlice';

export interface DbSlice {
  dbTables: DbTable[];
  activeQuery: string;
  setActiveQuery: (query: string) => void;
  queryResult: DbQueryResult | null;
  isQueryLoading: boolean;
  executeQuery: () => Promise<void>;
}

const INITIAL_DB_TABLES: DbTable[] = [
  {
    name: 'deployments',
    rowCount: 1420,
    columns: [
      { name: 'id', type: 'uuid', nullable: false, isPrimaryKey: true },
      { name: 'service_name', type: 'varchar(64)', nullable: false, isPrimaryKey: false },
      { name: 'commit_sha', type: 'varchar(40)', nullable: false, isPrimaryKey: false },
      { name: 'environment', type: 'varchar(16)', nullable: false, isPrimaryKey: false },
      { name: 'status', type: 'varchar(16)', nullable: false, isPrimaryKey: false },
      { name: 'created_at', type: 'timestamptz', nullable: false, isPrimaryKey: false },
    ],
  },
  {
    name: 'secret_audits',
    rowCount: 8940,
    columns: [
      { name: 'audit_id', type: 'bigint', nullable: false, isPrimaryKey: true },
      { name: 'secret_key', type: 'varchar(128)', nullable: false, isPrimaryKey: false },
      { name: 'actor_email', type: 'varchar(255)', nullable: false, isPrimaryKey: false },
      { name: 'action', type: 'varchar(32)', nullable: false, isPrimaryKey: false },
      { name: 'ip_address', type: 'inet', nullable: false, isPrimaryKey: false },
      { name: 'timestamp', type: 'timestamptz', nullable: false, isPrimaryKey: false },
    ],
  },
  {
    name: 'workflow_executions',
    rowCount: 45210,
    columns: [
      { name: 'execution_id', type: 'uuid', nullable: false, isPrimaryKey: true },
      { name: 'workflow_name', type: 'varchar(128)', nullable: false, isPrimaryKey: false },
      { name: 'duration_ms', type: 'integer', nullable: false, isPrimaryKey: false },
      { name: 'status', type: 'varchar(16)', nullable: false, isPrimaryKey: false },
      { name: 'triggered_by', type: 'varchar(64)', nullable: false, isPrimaryKey: false },
    ],
  },
];

export const createDbSlice: StateCreator<DbSlice & ToastSlice, [], [], DbSlice> = (set, get) => ({
  dbTables: INITIAL_DB_TABLES,
  activeQuery: "SELECT id, service_name, commit_sha, environment, status, created_at\nFROM deployments\nWHERE environment = 'production'\nORDER BY created_at DESC\nLIMIT 10;",
  setActiveQuery: (activeQuery) => set({ activeQuery }),
  queryResult: null,
  isQueryLoading: false,
  executeQuery: async () => {
    set({ isQueryLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 240));

    const mockResult: DbQueryResult = {
      columns: ['id', 'service_name', 'commit_sha', 'environment', 'status', 'created_at'],
      rows: [
        {
          id: '8f921a8c-901a-4281-b991-2810a991b101',
          service_name: 'astera-control-plane',
          commit_sha: 'e4a8190',
          environment: 'production',
          status: 'ACTIVE',
          created_at: '2026-08-05 23:15:00 UTC',
        },
        {
          id: '1a90c88f-2819-4902-a192-88102938a992',
          service_name: 'astera-auth-vault',
          commit_sha: '992a18f',
          environment: 'production',
          status: 'ACTIVE',
          created_at: '2026-08-05 22:40:12 UTC',
        },
        {
          id: '38190a88-192a-4810-b991-1029a88191a3',
          service_name: 'astera-telemetry-ingress',
          commit_sha: '3310a88',
          environment: 'production',
          status: 'ACTIVE',
          created_at: '2026-08-05 21:00:45 UTC',
        },
        {
          id: '99281a00-3819-4820-c918-77102938a884',
          service_name: 'astera-edge-gateway',
          commit_sha: 'b81920a',
          environment: 'production',
          status: 'ACTIVE',
          created_at: '2026-08-05 19:30:10 UTC',
        },
      ],
      executionTimeMs: 4.8,
      rowCount: 4,
    };

    set({ queryResult: mockResult, isQueryLoading: false });

    get().addToast({
      title: 'Query Executed (4.8ms)',
      description: 'Returned 4 rows from table `deployments`.',
      type: 'success',
    });
  },
});
