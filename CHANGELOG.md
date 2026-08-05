# Changelog

All notable changes to the Astera Ecosystem will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-08-05

### Added
- **Monorepo Foundation**: `pnpm-workspace.yaml` and `turbo.json` build pipeline configuration.
- **Modular Zustand Store Slices**: Partitioned store into 7 domain slices (`navigationSlice`, `toastSlice`, `apiSlice`, `dbSlice`, `workflowSlice`, `vaultSlice`, `telemetrySlice`).
- **Optimized Store Selectors**: Exposed domain selectors (`useApiStore`, `useDbStore`, `useWorkflowStore`, `useTelemetryStore`, `useVaultStore`, `useNavigationStore`, `useToastStore`) to eliminate re-render thrashing.
- **Path Alias Enforcement**: Converted 100% of internal relative imports to `@/` path alias.
- **Vitest Testing Infrastructure**: Configured Vitest runner with jsdom environment and initial store slice unit test suite (`src/store/__tests__/useStore.test.ts`).
- **ESLint & CI Pipeline**: Integrated ESLint flat config (`eslint.config.js`) and updated `.github/workflows/ci.yml` pipeline with lint, typecheck, test, and build steps.

## [0.0.1] - 2026-08-05

### Added
- Initial prototype release of Astera Studio Workbench and Lumina UI Design System showcase.
