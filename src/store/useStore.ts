import { create } from 'zustand';
import { NavigationSlice, createNavigationSlice } from './slices/navigationSlice';
import { ToastSlice, createToastSlice } from './slices/toastSlice';
import { ApiSlice, createApiSlice } from './slices/apiSlice';
import { DbSlice, createDbSlice } from './slices/dbSlice';
import { WorkflowSlice, createWorkflowSlice } from './slices/workflowSlice';
import { VaultSlice, createVaultSlice } from './slices/vaultSlice';
import { TelemetrySlice, createTelemetrySlice } from './slices/telemetrySlice';

export type AsteraState = NavigationSlice &
  ToastSlice &
  ApiSlice &
  DbSlice &
  WorkflowSlice &
  VaultSlice &
  TelemetrySlice;

export const useStore = create<AsteraState>()((...args) => ({
  ...createNavigationSlice(...args),
  ...createToastSlice(...args),
  ...createApiSlice(...args),
  ...createDbSlice(...args),
  ...createWorkflowSlice(...args),
  ...createVaultSlice(...args),
  ...createTelemetrySlice(...args),
}));

// Domain state selectors for optimized component rendering
export const useNavigationStore = () =>
  useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
    environment: state.environment,
    setEnvironment: state.setEnvironment,
    isCommandPaletteOpen: state.isCommandPaletteOpen,
    setCommandPaletteOpen: state.setCommandPaletteOpen,
  }));

export const useToastStore = () =>
  useStore((state) => ({
    toasts: state.toasts,
    addToast: state.addToast,
    removeToast: state.removeToast,
  }));

export const useApiStore = () =>
  useStore((state) => ({
    apiRequest: state.apiRequest,
    setApiRequest: state.setApiRequest,
    apiResponse: state.apiResponse,
    isApiLoading: state.isApiLoading,
    executeApiRequest: state.executeApiRequest,
  }));

export const useDbStore = () =>
  useStore((state) => ({
    dbTables: state.dbTables,
    activeQuery: state.activeQuery,
    setActiveQuery: state.setActiveQuery,
    queryResult: state.queryResult,
    isQueryLoading: state.isQueryLoading,
    executeQuery: state.executeQuery,
  }));

export const useWorkflowStore = () =>
  useStore((state) => ({
    workflowNodes: state.workflowNodes,
    workflowEdges: state.workflowEdges,
    isWorkflowRunning: state.isWorkflowRunning,
    runWorkflow: state.runWorkflow,
    updateNodePosition: state.updateNodePosition,
  }));

export const useVaultStore = () =>
  useStore((state) => ({
    secrets: state.secrets,
    addSecret: state.addSecret,
    deleteSecret: state.deleteSecret,
  }));

export const useTelemetryStore = () =>
  useStore((state) => ({
    logs: state.logs,
    logFilter: state.logFilter,
    setLogFilter: state.setLogFilter,
    logLevelFilter: state.logLevelFilter,
    setLogLevelFilter: state.setLogLevelFilter,
    addLog: state.addLog,
    clearLogs: state.clearLogs,
  }));
