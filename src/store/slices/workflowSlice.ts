import { StateCreator } from 'zustand';
import { WorkflowNode, WorkflowEdge } from '@/types';
import { ToastSlice } from './toastSlice';

export interface WorkflowSlice {
  workflowNodes: WorkflowNode[];
  workflowEdges: WorkflowEdge[];
  isWorkflowRunning: boolean;
  runWorkflow: () => Promise<void>;
  updateNodePosition: (id: string, pos: { x: number; y: number }) => void;
}

const INITIAL_WORKFLOW_NODES: WorkflowNode[] = [
  {
    id: 'n-1',
    type: 'trigger',
    title: 'Webhook Event Received',
    description: 'Triggers on HTTP POST /v1/webhooks/github',
    status: 'idle',
    position: { x: 40, y: 120 },
    config: { path: '/v1/webhooks/github', method: 'POST' },
  },
  {
    id: 'n-2',
    type: 'transform',
    title: 'Sanitize Payload & Auth',
    description: 'Validates HMAC signature & extracts JSON data',
    status: 'idle',
    position: { x: 320, y: 120 },
    config: { secretKey: 'GITHUB_WEBHOOK_SECRET' },
  },
  {
    id: 'n-3',
    type: 'condition',
    title: 'Branch: Main Push?',
    description: 'Check if payload.ref == refs/heads/main',
    status: 'idle',
    position: { x: 600, y: 120 },
    config: { expression: "payload.ref === 'refs/heads/main'" },
  },
  {
    id: 'n-4',
    type: 'action',
    title: 'Dispatch Fleet Deployment',
    description: 'POST to Astera Control Plane API',
    status: 'idle',
    position: { x: 880, y: 60 },
    config: { targetEnv: 'production', autoRollback: 'true' },
  },
  {
    id: 'n-5',
    type: 'action',
    title: 'Notify Slack Alert Channel',
    description: 'Post commit status summary',
    status: 'idle',
    position: { x: 880, y: 220 },
    config: { channel: '#deploy-notifications' },
  },
];

const INITIAL_WORKFLOW_EDGES: WorkflowEdge[] = [
  { id: 'e-1-2', source: 'n-1', target: 'n-2' },
  { id: 'e-2-3', source: 'n-2', target: 'n-3' },
  { id: 'e-3-4', source: 'n-3', target: 'n-4' },
  { id: 'e-3-5', source: 'n-3', target: 'n-5' },
];

export const createWorkflowSlice: StateCreator<WorkflowSlice & ToastSlice, [], [], WorkflowSlice> = (set, get) => ({
  workflowNodes: INITIAL_WORKFLOW_NODES,
  workflowEdges: INITIAL_WORKFLOW_EDGES,
  isWorkflowRunning: false,
  runWorkflow: async () => {
    set({ isWorkflowRunning: true });

    const nodes = get().workflowNodes;
    for (let i = 0; i < nodes.length; i++) {
      set((state) => ({
        workflowNodes: state.workflowNodes.map((n, idx) =>
          idx === i ? { ...n, status: 'running' } : n
        ),
      }));
      await new Promise((res) => setTimeout(res, 350));
      set((state) => ({
        workflowNodes: state.workflowNodes.map((n, idx) =>
          idx === i ? { ...n, status: 'success' } : n
        ),
      }));
    }

    set({ isWorkflowRunning: false });
    get().addToast({
      title: 'Workflow Execution Completed',
      description: 'All 5 nodes executed successfully with zero errors.',
      type: 'success',
    });
  },
  updateNodePosition: (id, pos) =>
    set((state) => ({
      workflowNodes: state.workflowNodes.map((n) =>
        n.id === id ? { ...n, position: pos } : n
      ),
    })),
});
