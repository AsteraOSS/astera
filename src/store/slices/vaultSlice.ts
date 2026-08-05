import { StateCreator } from 'zustand';
import { SecretItem, Environment } from '@/types';
import { ToastSlice } from './toastSlice';

export interface VaultSlice {
  secrets: SecretItem[];
  addSecret: (key: string, value: string, environment: Environment) => void;
  deleteSecret: (id: string) => void;
}

const INITIAL_SECRETS: SecretItem[] = [
  {
    id: 'sec-1',
    key: 'ASTERA_API_MASTER_KEY',
    value: 'ast_live_99481a8c01f92e8310c8',
    environment: 'production',
    isEncrypted: true,
    updatedAt: '2 mins ago',
  },
  {
    id: 'sec-2',
    key: 'DATABASE_URL_PRIMARY',
    value: 'postgres://astera_admin:p8823901a8@db.prod.astera.internal:5432/astera_primary',
    environment: 'production',
    isEncrypted: true,
    updatedAt: '1 hour ago',
  },
  {
    id: 'sec-3',
    key: 'REDIS_CACHE_CLUSTER_URI',
    value: 'rediss://default:x99a102c81@cache.prod.astera.internal:6379',
    environment: 'production',
    isEncrypted: true,
    updatedAt: '3 hours ago',
  },
  {
    id: 'sec-4',
    key: 'STRIPE_WEBHOOK_SIGNING_SECRET',
    value: 'whsec_99a810f2c819a28841029',
    environment: 'staging',
    isEncrypted: true,
    updatedAt: 'Yesterday',
  },
  {
    id: 'sec-5',
    key: 'OPENAI_ORGANIZATION_KEY',
    value: 'sk-proj-9910293a88190c821a99',
    environment: 'development',
    isEncrypted: true,
    updatedAt: '3 days ago',
  },
];

export const createVaultSlice: StateCreator<VaultSlice & ToastSlice, [], [], VaultSlice> = (set, get) => ({
  secrets: INITIAL_SECRETS,
  addSecret: (key, value, environment) => {
    const newSecret: SecretItem = {
      id: `sec-${Date.now()}`,
      key: key.toUpperCase(),
      value,
      environment,
      isEncrypted: true,
      updatedAt: 'Just now',
    };
    set((state) => ({ secrets: [newSecret, ...state.secrets] }));
    get().addToast({
      title: 'Secret Encrypted & Stored',
      description: `Stored key [${key.toUpperCase()}] in [${environment}].`,
      type: 'success',
    });
  },
  deleteSecret: (id) => {
    set((state) => ({ secrets: state.secrets.filter((s) => s.id !== id) }));
    get().addToast({
      title: 'Secret Deleted',
      description: 'Removed secret from vault.',
      type: 'info',
    });
  },
});
