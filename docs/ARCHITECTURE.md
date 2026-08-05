# Astera Ecosystem Architecture Blueprint & Technology Standard

This document defines the official technology stack, monorepo architecture, and engineering standards for all repositories in the **Astera** organization. Every new tool, library, desktop application, or service built under Astera must align with this blueprint.

---

## ✦ Executive Technology Summary

```
                     ┌─────────────────────────────────────────────────────────┐
                     │                   ASTERA MONOREPO                       │
                     │          (Turborepo + pnpm Workspaces)                 │
                     └────────────────────┬────────────────────────────────────┘
                                          │
       ┌──────────────────────────────────┼──────────────────────────────────┐
       │                                  │                                  │
┌──────┴──────────────┐       ┌───────────┴───────────┐       ┌──────────────┴──────────────┐
│  FRONTEND & DESKTOP │       │  BACKEND & TELEMETRY  │       │  DATA LAYER & STATE HUB     │
├─────────────────────┤       ├───────────────────────┤       ├─────────────────────────────┤
│ React 18 / Next.js  │       │ Hono / Fastify (TS)   │       │ PostgreSQL + Drizzle ORM    │
│ Vite + Tauri 2.0    │       │ Go (Telemetry Core)   │       │ Redis / Valkey (PubSub)     │
│ Tailwind + Framer   │       │ REST / gRPC / WebSock │       │ Zustand + TanStack Query    │
│ Radix UI Primitives │       │ WebAuthn / BetterAuth │       │ Encrypted Vault (AES-256)   │
└─────────────────────┘       └───────────────────────┘       └─────────────────────────────┘
```

---

## ✦ Detailed Technology Matrix & Architectural Rationale

### 1. Monorepo Strategy: Turborepo + pnpm Workspaces
- **Selection**: `Turborepo` + `pnpm` (`pnpm-workspace.yaml`).
- **Why**: 
  - **Blazing Fast Cache**: Sub-millisecond build caching across packages (only rebuilds affected targets).
  - **Shared Design System**: Single source of truth for UI primitives (`@astera/ui`), design tokens (`@astera/tokens`), TypeScript configurations (`@astera/tsconfig`), and linters (`@astera/eslint-config`).
  - **Modular Package Ecosystem**: Clean boundary separation between apps (`apps/web`, `apps/desktop`, `apps/docs`) and packages (`packages/ui`, `packages/db`, `packages/sdk`).

---

### 2. Package Manager: pnpm
- **Selection**: `pnpm` (v9.x).
- **Why**:
  - **Disk Space Efficiency**: Global content-addressable storage using hard links.
  - **Strict Dependency Tree**: Non-hoisted `node_modules` structure prevents "phantom dependencies" (importing packages not listed in package.json).
  - **Fastest Lockfile Resolution**: 2-3x faster than npm/yarn for large monorepos.

---

### 3. Frontend Architecture: React 18 + Next.js 14 (App Router) / Vite
- **Selection**: `Next.js 14` for web platforms & docs, `Vite 5` for desktop app containers and hyper-fast client SPAs.
- **Why**:
  - **Next.js 14**: Server Components (RSC) for instantaneous initial page loads, SEO optimization, and API route handling.
  - **Vite**: Sub-second HMR startup time, minimal bundle sizes, and optimal SPA architecture for local-first desktop apps.

---

### 4. UI & Design System: Tailwind CSS + Framer Motion + Radix UI + Lucide
- **Selection**: `Tailwind CSS 3/4` + `Framer Motion 11` + `Radix UI Primitives` + `Lucide Icons`.
- **Why**:
  - **Radix UI**: Headless, accessible primitives (dialogs, dropdowns, context menus, tooltips) adhering to WCAG AAA standards out of the box.
  - **Tailwind CSS**: Strict 8pt grid token enforcement (`px-2`, `p-4`, `m-8`) and custom Astera Obsidian dark-mode palette.
  - **Framer Motion**: Smooth 60 FPS spring-physics micro-interactions without gratuitous layout thrashing.
  - **Lucide Icons**: Pixel-perfect 16px/20px vector icons matching Linear and Raycast aesthetics.

---

### 5. Backend Architecture: Hono / Fastify (TypeScript) & Go
- **Selection**: `Hono` / `Fastify` for API microservices; `Go` for high-throughput edge telemetry collectors.
- **Why**:
  - **Hono / Fastify**: Lightweight, zero-overhead Web Standard request handling with strict end-to-end TypeScript inferencing via RPC.
  - **Go**: Compiled binary speed for low-latency telemetry streaming, background event workers, and CLI binaries.

---

### 6. Desktop Architecture: Tauri 2.0 (Rust + Web Engine)
- **Selection**: `Tauri 2.0`.
- **Why**:
  - **Sub-15MB Binary Size**: Uses the operating system's native WebView (WebKit on macOS, WebView2 on Windows) instead of bundling a full Chromium browser like Electron.
  - **Low Memory & CPU**: Consumes ~30-50MB RAM vs 500MB+ for Electron apps.
  - **Native Rust Security**: Memory-safe IPC bridge for local file system access, system tray, and OS keyboard shortcuts.

---

### 7. Mobile Architecture (Future Roadmap): React Native + Expo (Fabric Engine)
- **Selection**: `React Native` + `Expo` (New Architecture).
- **Why**:
  - **95%+ Code Sharing**: Reuses business logic, Zustand stores, API clients, and domain types between Web/Desktop and Mobile.
  - **Fabric & Skia**: Native 60 FPS rendering pipeline for mobile desktop companion apps.

---

### 8. Database Architecture: PostgreSQL + Redis (Valkey)
- **Selection**: `PostgreSQL 16` + `Redis 7` / `Valkey`.
- **Why**:
  - **PostgreSQL**: Industry-standard relational data store with JSONB support, pgvector for vector search, and transactional reliability.
  - **Redis / Valkey**: Sub-millisecond key-value caching, rate limiting, and real-time Pub/Sub log streaming.

---

### 9. ORM & Query Layer: Drizzle ORM
- **Selection**: `Drizzle ORM`.
- **Why**:
  - **Zero Runtime Overhead**: Compiles directly to clean, raw SQL queries.
  - **100% Type Safety**: Infers TypeScript types directly from schema definitions without code-generation build steps.
  - **Lightweight**: Zero heavy rust binaries (unlike Prisma), making it ideal for serverless and edge environments.

---

### 10. Authentication & Security: Better Auth / WebAuthn + KMS Encryption
- **Selection**: `Better Auth` / `Auth.js` + `AES-256-GCM` encryption for secrets.
- **Why**:
  - **Self-Hostable & Open Source**: Full control over user credentials, OAuth2 providers (GitHub, Google), and WebAuthn / Passkey authentication.
  - **Zero-Knowledge KMS**: Hardware-grade encryption for developer API keys and environment variables.

---

### 11. Documentation Engine: Fumadocs / Astro Starlight
- **Selection**: `Fumadocs` (Next.js) / `Starlight` (Astro).
- **Why**:
  - **Developer-Centric**: MDX support, instant fuzzy search, automatic TypeScript API reference generation, interactive code blocks, and dark mode primacy out of the box.

---

### 12. Testing Stack: Vitest + Playwright
- **Selection**: `Vitest` for Unit/Integration tests; `Playwright` for E2E & Visual Regression tests.
- **Why**:
  - **Vitest**: Shares Vite's transformation pipeline for instant unit test execution with 10x faster execution than Jest.
  - **Playwright**: Cross-browser automated testing (Chromium, Firefox, WebKit) for keyboard navigation, accessibility focus states, and visual snapshots.

---

### 13. Code Quality & Formatting: Biome + TypeScript Compiler
- **Selection**: `Biome` + `tsc --noEmit`.
- **Why**:
  - **Biome**: Formats and lints code in milliseconds (10-100x faster than Prettier/ESLint), written in Rust.
  - **Strict Compiler**: Zero implicit `any`, strict null checks, and zero compilation errors.

---

### 14. CI/CD & Automated Release Strategy: GitHub Actions + Changesets
- **Selection**: `GitHub Actions` + `@changesets/cli`.
- **Why**:
  - **Automated Matrix Testing**: Runs linting, typechecking, unit tests, and build verification on every pull request.
  - **Semantic Versioning & Changelogs**: Changesets automates package releases, changelog entries, and GitHub Release drafting upon merging to `main`.

---

## ✦ Astera Ecosystem Monorepo Directory Structure

```
astera-ecosystem/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # Automated Typecheck, Test, and Build workflow
│   │   └── release.yml            # Automated npm and GitHub release workflow
│   ├── ISSUE_TEMPLATE/            # Standardized Issue Templates
│   └── PULL_REQUEST_TEMPLATE.md   # Standardized PR Template
├── apps/
│   ├── web/                       # Astera Web Platform (Next.js 14)
│   ├── desktop/                   # Astera Native Desktop Application (Tauri 2.0)
│   └── docs/                      # Developer Documentation Portal (Fumadocs)
├── packages/
│   ├── ui/                        # Shared Astera UI Component System (@astera/ui)
│   ├── tokens/                    # Shared Design Tokens & Tailwind Preset (@astera/tokens)
│   ├── db/                        # Shared Database Schema & Drizzle ORM (@astera/db)
│   ├── sdk/                       # Astera Client SDK for JS/TS (@astera/sdk)
│   ├── tsconfig/                  # Shared Strict TypeScript Configuration (@astera/tsconfig)
│   └── eslint-config/             # Shared Linting Rules (@astera/eslint-config)
├── pnpm-workspace.yaml            # pnpm Workspace Package Map
├── turbo.json                     # Turborepo Build Cache Configuration
├── README.md                      # Ecosystem Entry Readme
├── LICENSE                        # MIT License
└── CHANGELOG.md                   # Global Ecosystem Changelog
```
