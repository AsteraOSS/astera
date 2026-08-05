/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        astera: {
          bg: '#090a0f',
          surface: '#11131b',
          card: '#161924',
          subtle: '#1f2434',
          border: '#272d40',
          hover: '#2e354c',
          text: '#f1f5f9',
          muted: '#94a3b8',
          dim: '#64748b',
          accent: {
            DEFAULT: '#4f46e5',
            glow: '#6366f1',
            light: '#818cf8',
          },
          emerald: {
            DEFAULT: '#10b981',
            glow: 'rgba(16, 185, 129, 0.15)',
          },
          amber: {
            DEFAULT: '#f59e0b',
            glow: 'rgba(245, 158, 11, 0.15)',
          },
          rose: {
            DEFAULT: '#f43f5e',
            glow: 'rgba(244, 63, 94, 0.15)',
          },
          cyan: {
            DEFAULT: '#06b6d4',
            glow: 'rgba(6, 182, 212, 0.15)',
          }
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'astera-glow': '0 0 25px -5px rgba(99, 102, 241, 0.2)',
        'astera-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
        'astera-modal': '0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
