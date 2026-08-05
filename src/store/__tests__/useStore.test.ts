import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '@/store/useStore';

describe('Astera Modular Zustand Store Slices', () => {
  beforeEach(() => {
    // Reset state defaults before each test
    useStore.setState({
      activeTab: 'api',
      environment: 'production',
      isCommandPaletteOpen: false,
      toasts: [],
      secrets: [],
      logs: [],
    });
  });

  it('handles navigation slice state updates', () => {
    const { setActiveTab, setEnvironment, setCommandPaletteOpen } = useStore.getState();

    setActiveTab('database');
    expect(useStore.getState().activeTab).toBe('database');

    setEnvironment('staging');
    expect(useStore.getState().environment).toBe('staging');

    setCommandPaletteOpen(true);
    expect(useStore.getState().isCommandPaletteOpen).toBe(true);
  });

  it('handles toast slice additions and removals', () => {
    const { addToast, removeToast } = useStore.getState();

    addToast({
      title: 'Test Toast',
      description: 'Test description',
      type: 'info',
    });

    const toasts = useStore.getState().toasts;
    expect(toasts.length).toBe(1);
    expect(toasts[0].title).toBe('Test Toast');

    removeToast(toasts[0].id);
    expect(useStore.getState().toasts.length).toBe(0);
  });

  it('handles vault slice secret additions and deletions', () => {
    const { addSecret, deleteSecret } = useStore.getState();

    addSecret('TEST_API_KEY', 'sk_live_12345', 'production');

    const secrets = useStore.getState().secrets;
    expect(secrets.length).toBe(1);
    expect(secrets[0].key).toBe('TEST_API_KEY');
    expect(secrets[0].environment).toBe('production');

    deleteSecret(secrets[0].id);
    expect(useStore.getState().secrets.length).toBe(0);
  });

  it('handles telemetry slice log additions and clearing', () => {
    const { addLog, clearLogs } = useStore.getState();

    addLog({
      level: 'INFO',
      service: 'test-service',
      message: 'Test log message',
    });

    expect(useStore.getState().logs.length).toBe(1);
    expect(useStore.getState().logs[0].message).toBe('Test log message');

    clearLogs();
    expect(useStore.getState().logs.length).toBe(0);
  });

  it('handles workflow node position updates', () => {
    const { updateNodePosition } = useStore.getState();

    updateNodePosition('n-1', { x: 100, y: 200 });

    const updatedNode = useStore.getState().workflowNodes.find((n) => n.id === 'n-1');
    expect(updatedNode?.position).toEqual({ x: 100, y: 200 });
  });
});
