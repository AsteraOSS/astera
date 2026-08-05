export type ActiveTab = 'api' | 'database' | 'workflows' | 'vault' | 'telemetry';

export type Environment = 'development' | 'staging' | 'production';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
  description?: string;
}

export interface ApiRequestState {
  id: string;
  name: string;
  method: HttpMethod;
  url: string;
  headers: KeyValuePair[];
  queryParams: KeyValuePair[];
  bodyType: 'json' | 'form-data' | 'raw' | 'none';
  body: string;
  history: ApiResponse[];
}

export interface ApiResponse {
  id: string;
  status: number;
  statusText: string;
  timeMs: number;
  sizeBytes: number;
  headers: Record<string, string>;
  data: string;
  timestamp: string;
}

export interface DbTableColumn {
  name: string;
  type: string;
  nullable: boolean;
  isPrimaryKey: boolean;
}

export interface DbTable {
  name: string;
  rowCount: number;
  columns: DbTableColumn[];
}

export interface DbQueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  executionTimeMs: number;
  rowCount: number;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'transform' | 'condition';
  title: string;
  description: string;
  status: 'idle' | 'running' | 'success' | 'error';
  position: { x: number; y: number };
  config: Record<string, string>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface SecretItem {
  id: string;
  key: string;
  value: string;
  environment: Environment;
  isEncrypted: boolean;
  updatedAt: string;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  service: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface CommandItem {
  id: string;
  category: string;
  title: string;
  description?: string;
  shortcut?: string[];
  action: () => void;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
