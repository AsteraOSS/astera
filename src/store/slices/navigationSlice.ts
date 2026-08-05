import { StateCreator } from 'zustand';
import { ActiveTab, Environment } from '@/types';

export interface NavigationSlice {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  environment: Environment;
  setEnvironment: (env: Environment) => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const createNavigationSlice: StateCreator<NavigationSlice, [], [], NavigationSlice> = (set) => ({
  activeTab: 'api',
  setActiveTab: (activeTab) => set({ activeTab }),
  environment: 'production',
  setEnvironment: (environment) => set({ environment }),
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (isCommandPaletteOpen) => set({ isCommandPaletteOpen }),
});
