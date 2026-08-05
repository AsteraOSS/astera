# Astera Engineering & Design System Standards

As the founding engineering team of **Astera**, all repositories, packages, tools, and UI components in the Astera ecosystem must adhere to the following principles.

---

## ✦ 1. Design Language & Visual Aesthetics
- **Apple, Linear, Raycast, Stripe, Figma, Vercel Standards**: Minimal, functional, timeless visual hierarchy.
- **Strict 8pt Grid System**: Every margin, padding, border radius, component height, and layout gap strictly aligns to 8pt spatial tokens (8px, 16px, 24px, 32px, 48px).
- **Dark Mode Primacy (Astera Obsidian)**: Handcrafted HSL color tokens (`#090a0f` workspace background, `#11131b` surface card, `#272d40` pristine borders, `#6366f1` indigo accent glow). Light mode equally polished.
- **60 FPS Micro-Interactions**: Natural spring physics via Framer Motion. Zero unnecessary visual noise, zero gratuitous animations.
- **Typography Hierarchy**: Primary UI text using `Inter` (`cv02`, `cv03`, `cv04`, `cv11` enabled), technical data/code using `JetBrains Mono`.

---

## ✦ 2. Engineering Standards
- **Strict TypeScript Everywhere**: `strict: true`, zero implicit `any`, zero ESLint warnings, zero `tsc` compilation errors.
- **Modular Ecosystem Architecture**: Feature-driven folder structure, reusable UI component primitives (`src/components/ui/`), centralized reactive state management (Zustand).
- **Zero Placeholder Code**: No mock fallbacks that hide errors, no TODO comments in production branches, no silent exception swallowing. Every feature must work.
- **Performance Budget**: Sub-millisecond state transitions, tree shaking, code splitting, lazy loading, and minimal bundle sizes.

---

## ✦ 3. Keyboard Navigation & Accessibility (WCAG AAA)
- **Keyboard-First Workflows**: Global command palette (`Cmd+K`), fast key bindings (`Cmd+Enter`, `Cmd+E`, `Cmd+R`, `G A`, `G D`, `G W`, `G V`, `G L`).
- **Accessible Focus States**: High-contrast WCAG visible focus outlines on all interactive controls (`focus-visible:ring-2 focus-visible:ring-indigo-500/50`).
- **Semantic HTML**: Proper heading structures (`h1` -> `h2` -> `h3`), ARIA landmarks, button types, and input labeling.

---

## ✦ 4. Open-Source Ecosystem Package Requirements
Every repository in the Astera organization must contain:
1. `README.md` (High-end typography, feature matrix, shortcuts table, architecture diagram, getting started guide).
2. `LICENSE` (MIT Open Source License).
3. `CHANGELOG.md` (Keep a Changelog + Semantic Versioning).
4. `CONTRIBUTING.md` (Contribution guidelines & engineering standards).
5. `CODE_OF_CONDUCT.md` & `SECURITY.md` (Contributor covenant & security disclosure policy).
6. `.github` Infrastructure (Bug Report, Feature Request issue templates, Pull Request template, CI GitHub Actions).

---

## ✦ 5. Ecosystem Vision & Maintainability
- **Think Long-Term**: Always prefer maintainability and structural clarity over quick hacks.
- **Ecosystem Consistency**: Shared design tokens, shared CLI tooling, shared SDKs, shared user experience philosophy across all repositories.
