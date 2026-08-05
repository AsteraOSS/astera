import { StateCreator } from 'zustand';
import { ApiRequestState, ApiResponse } from '@/types';
import { ToastSlice } from './toastSlice';

export interface ApiSlice {
  apiRequest: ApiRequestState;
  setApiRequest: (req: Partial<ApiRequestState>) => void;
  apiResponse: ApiResponse | null;
  isApiLoading: boolean;
  executeApiRequest: () => Promise<void>;
}

const INITIAL_API_REQUEST: ApiRequestState = {
  id: 'req-1',
  name: 'Fetch Astera Fleet Telemetry',
  method: 'POST',
  url: 'https://api.astera.dev/v1/telemetry/query',
  headers: [
    { id: '1', key: 'Content-Type', value: 'application/json', enabled: true },
    { id: '2', key: 'Authorization', value: 'Bearer astera_sec_89f3a921d', enabled: true },
    { id: '3', key: 'X-Astera-Client-Version', value: 'v1.4.0', enabled: true },
  ],
  queryParams: [
    { id: '1', key: 'limit', value: '100', enabled: true },
    { id: '2', key: 'sort', value: 'desc', enabled: true },
  ],
  bodyType: 'json',
  body: JSON.stringify(
    {
      region: 'us-east-1',
      clusterId: 'astera-prod-alpha',
      metrics: ['cpu_utilization', 'memory_headroom', 'p99_latency_ms'],
      window: '5m',
    },
    null,
    2
  ),
  history: [],
};

export const createApiSlice: StateCreator<ApiSlice & ToastSlice, [], [], ApiSlice> = (set, get) => ({
  apiRequest: INITIAL_API_REQUEST,
  setApiRequest: (partial) =>
    set((state) => ({ apiRequest: { ...state.apiRequest, ...partial } })),
  apiResponse: null,
  isApiLoading: false,
  executeApiRequest: async () => {
    set({ isApiLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 380));
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0] + '.' + now.getMilliseconds();

    const mockResponse: ApiResponse = {
      id: `res-${Date.now()}`,
      status: 200,
      statusText: 'OK',
      timeMs: 38,
      sizeBytes: 1420,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-astera-trace-id': `tr_${Math.random().toString(36).substring(2, 10)}`,
        'cache-control': 'no-cache, private',
        'server': 'Astera/1.4.0 (Obsidian)',
      },
      data: JSON.stringify(
        {
          success: true,
          status: 'HEALTHY',
          cluster: 'astera-prod-alpha',
          region: 'us-east-1',
          nodesOnline: 48,
          metrics: {
            cpuUtilizationPct: 24.6,
            memoryHeadroomMb: 12480,
            p99LatencyMs: 4.2,
            activeSockets: 1840,
          },
          telemetryReceivedAt: new Date().toISOString(),
        },
        null,
        2
      ),
      timestamp,
    };

    set((state) => ({
      apiResponse: mockResponse,
      isApiLoading: false,
      apiRequest: {
        ...state.apiRequest,
        history: [mockResponse, ...state.apiRequest.history.slice(0, 9)],
      },
    }));

    get().addToast({
      title: '200 OK — 38ms',
      description: 'API Request returned 1.4 KB payload successfully.',
      type: 'success',
    });
  },
});
