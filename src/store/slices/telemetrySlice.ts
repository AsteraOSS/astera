import { StateCreator } from 'zustand';
import { TelemetryLog } from '@/types';

export interface TelemetrySlice {
  logs: TelemetryLog[];
  logFilter: string;
  setLogFilter: (filter: string) => void;
  logLevelFilter: string;
  setLogLevelFilter: (level: string) => void;
  addLog: (log: Omit<TelemetryLog, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
}

const INITIAL_LOGS: TelemetryLog[] = [
  {
    id: 'log-101',
    timestamp: '23:28:14.901',
    level: 'INFO',
    service: 'astera-gateway-node-01',
    message: 'HTTP POST /v1/telemetry/query 200 OK — 14ms (3.4 KB)',
    metadata: { ip: '192.168.1.45', traceId: 'tr_882a10c9' },
  },
  {
    id: 'log-102',
    timestamp: '23:28:12.441',
    level: 'INFO',
    service: 'astera-workflow-engine',
    message: 'Workflow [Deploy Fleet Pipeline] execution completed successfully in 340ms',
    metadata: { executionId: 'ex_991823a', stepsCount: 5 },
  },
  {
    id: 'log-103',
    timestamp: '23:28:09.112',
    level: 'DEBUG',
    service: 'astera-vault-kms',
    message: 'Decrypting secret key [ASTERA_API_MASTER_KEY] for service [astera-control-plane]',
    metadata: { keyId: 'sec-1', algorithm: 'AES-256-GCM' },
  },
  {
    id: 'log-104',
    timestamp: '23:27:54.004',
    level: 'WARN',
    service: 'astera-db-pool-master',
    message: 'Connection pool usage reached 82% capacity (41/50 connections active)',
    metadata: { activeConns: 41, maxConns: 50, avgWaitMs: 2.1 },
  },
  {
    id: 'log-105',
    timestamp: '23:27:30.821',
    level: 'INFO',
    service: 'astera-telemetry-collector',
    message: 'Ingested 14,200 metric events from 48 nodes in us-east-1 cluster',
  },
];

export const createTelemetrySlice: StateCreator<TelemetrySlice, [], [], TelemetrySlice> = (set) => ({
  logs: INITIAL_LOGS,
  logFilter: '',
  setLogFilter: (logFilter) => set({ logFilter }),
  logLevelFilter: 'ALL',
  setLogLevelFilter: (logLevelFilter) => set({ logLevelFilter }),
  addLog: (log) => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0] + '.' + now.getMilliseconds();
    const newLog: TelemetryLog = {
      id: `log-${Date.now()}`,
      timestamp,
      ...log,
    };
    set((state) => ({ logs: [newLog, ...state.logs.slice(0, 99)] }));
  },
  clearLogs: () => set({ logs: [] }),
});
