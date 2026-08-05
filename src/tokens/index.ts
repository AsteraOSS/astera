// Astera Design System Tokens 2.0 — "Obsidian & Pristine"

export const asteraSpatialTokens = {
  'space-0.5': '2px',
  'space-1': '4px',
  'space-2': '8px',
  'space-3': '12px',
  'space-4': '16px',
  'space-6': '24px',
  'space-8': '32px',
  'space-12': '48px',
  'space-16': '64px',
} as const;

export const asteraHeightTokens = {
  'height-xs': '24px',
  'height-sm': '32px',
  'height-md': '40px',
  'height-lg': '48px',
  'height-xl': '56px',
} as const;

export const asteraRadiusTokens = {
  'radius-xs': '4px',
  'radius-sm': '6px',
  'radius-md': '8px',
  'radius-lg': '12px',
  'radius-xl': '16px',
  'radius-full': '9999px',
} as const;

export const asteraObsidianColors = {
  canvas: '#08090d',
  surfaceLow: '#0d0f17',
  surfaceBase: '#131622',
  surfaceHigh: '#1a1e2e',
  surfaceOverlay: '#22273b',
  borderSubdued: 'rgba(255, 255, 255, 0.06)',
  borderStandard: 'rgba(255, 255, 255, 0.10)',
  borderHover: 'rgba(255, 255, 255, 0.18)',
  borderActive: 'rgba(99, 102, 241, 0.50)',
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  accentIndigo: '#6366f1',
  statusEmerald: '#10b981',
  statusAmber: '#f59e0b',
  statusRose: '#f43f5e',
  statusCyan: '#06b6d4',
} as const;

export const asteraSpring = {
  type: 'spring',
  stiffness: 420,
  damping: 32,
  mass: 0.8,
} as const;
