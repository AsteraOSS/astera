# The Astera Design System Specification

**Minimal. Functional. Timeless.**

This document defines the visual standards, design tokens, spatial grids, component principles, motion physics, and interaction guidelines for the entire **Astera** ecosystem.

---

## ✦ 1. Brand Vision & Design Philosophy

Astera software is built on one simple premise: **Every pixel must have a reason. Every interaction must feel intentional.**

We draw inspiration from physical industrial tools, high-end precision horology, architectural minimalism, and the digital craftsmanship of **Apple, Linear, Raycast, Stripe, Figma, and Vercel**.

### Core Tenets:
1. **No Visual Noise**: Eliminate unnecessary borders, aggressive drop shadows, gratuitous gradients, and ambient clutter.
2. **Whitespace as Design**: Use whitespace deliberately to establish visual hierarchy without relying on heavy containers.
3. **Obsidian Dark Primacy**: Handcrafted dark modes with deep space values, crisp glass borders, and subtle glowing status indicators.
4. **Keyboard-First Ergonomics**: Every feature must be accessible via keyboard shortcuts without requiring cursor interaction.

---

## ✦ 2. Typography Hierarchy & Tokens

Astera utilizes two complementary font families carefully selected for maximum legibility, precision data display, and timeless aesthetics.

### Font Families
- **Primary Interface Font**: `Inter` (OpenType features enabled: `cv02`, `cv03`, `cv04`, `cv11`).
- **Technical Code & Data Font**: `JetBrains Mono` (OpenType ligatures enabled: `calt`, `zero`).

### Typography Scale Table

| Scale Token | Size | Line Height | Weight | Letter Spacing | Font Family | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display` | 32px (2.0rem) | 40px (2.5rem) | 700 (Bold) | -0.02em | Inter | Hero headings & key metrics |
| `h1` | 24px (1.5rem) | 32px (2.0rem) | 700 (Bold) | -0.015em | Inter | Primary page title |
| `h2` | 18px (1.125rem) | 24px (1.5rem) | 600 (SemiBold) | -0.01em | Inter | Section & panel titles |
| `h3` | 14px (0.875rem) | 20px (1.25rem) | 600 (SemiBold) | -0.005em | Inter | Subsections & card titles |
| `body` | 13px (0.8125rem) | 18px (1.125rem) | 400 (Regular) | 0.0em | Inter | Primary text & form labels |
| `caption` | 11px (0.6875rem) | 14px (0.875rem) | 500 (Medium) | +0.01em | Inter | Badges, subtext & metadata |
| `code` | 12px (0.75rem) | 18px (1.125rem) | 400 & 600 | 0.0em | JetBrains Mono | Code snippet & SQL queries |

---

## ✦ 3. Spatial Grid System (Strict 8pt Grid)

Astera layout geometry strictly aligns to an 8pt spatial token system. All padding, margins, container heights, and gaps must strictly use multiples of 4px and 8px.

```
┌────────────────────────────────────────────────────────────────────────┐
│  space-0.5  (4px)   │ Micro gaps, badge padding                       │
│  space-1    (8px)   │ Base spatial token, item padding, gap-2         │
│  space-2    (16px)  │ Component margins, panel padding, gap-4         │
│  space-3    (24px)  │ Section separation, modal padding               │
│  space-4    (32px)  │ Page margins, container gutter                  │
│  space-6    (48px)  │ Major layout grid split                         │
│  space-8    (64px)  │ Hero section spacing                            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ✦ 4. Radius & Corner Geometry

Corner radii are derived from structural hierarchy. Smaller components receive subtle radii, while elevated overlay components receive softer curvature.

| Token | Value | Tailwind Class | Application |
| :--- | :--- | :--- | :--- |
| `radius-xs` | 4px | `rounded-md` | Badges, status pills, inline code tags |
| `radius-sm` | 6px | `rounded-lg` | Buttons, text inputs, dropdown menu items |
| `radius-md` | 10px | `rounded-xl` | Cards, sidebars, panel containers |
| `radius-lg` | 14px | `rounded-2xl` | Command palette, modals, floating drawers |
| `radius-full` | 9999px | `rounded-full` | Circular status indicators, user avatars |

---

## ✦ 5. Color System (Dark & Light Mode Tokens)

Astera features a handcrafted **Obsidian** dark theme and a high-end **Pristine** light theme.

### Astera Dark Mode Tokens (Obsidian Primacy)

```css
:root {
  /* Workspace Canvas & Surfaces */
  --astera-bg: #090a0f;              /* Deep space canvas */
  --astera-surface: #11131b;         /* Panel surface background */
  --astera-card: #161924;            /* Card & modal surface */
  --astera-elevated: #1f2434;        /* Elevated hover surface */
  
  /* Pristine Borders */
  --astera-border: #272d40;          /* Subdued structural border */
  --astera-border-hover: #3b4460;    /* Interactive border highlight */

  /* Text & Contrast */
  --astera-text-primary: #f1f5f9;    /* High contrast primary text */
  --astera-text-secondary: #94a3b8;  /* Subdued body text */
  --astera-text-muted: #64748b;      /* Muted captions & metadata */

  /* Accent & Status Glow Tokens */
  --astera-accent: #6366f1;          /* Astera Indigo Glow */
  --astera-emerald: #10b981;         /* Health & Success Status */
  --astera-amber: #f59e0b;           /* Warning Status */
  --astera-rose: #f43f5e;            /* Error & Destructive Status */
  --astera-cyan: #06b6d4;            /* Telemetry & Info Status */
}
```

### Astera Light Mode Tokens (Pristine Light)

```css
.light {
  --astera-bg: #f8fafc;
  --astera-surface: #ffffff;
  --astera-card: #f1f5f9;
  --astera-elevated: #e2e8f0;
  --astera-border: #cbd5e1;
  --astera-border-hover: #94a3b8;
  --astera-text-primary: #0f172a;
  --astera-text-secondary: #475569;
  --astera-text-muted: #64748b;
  --astera-accent: #4f46e5;
}
```

---

## ✦ 6. Elevation, Glassmorphism & Depth Architecture

Depth in Astera is achieved through subtle border contrast, subtle inset rim highlights, and glassmorphic backdrop filters rather than heavy drop shadows.

- **Glass Backdrop Blur**: `backdrop-filter: blur(12px)` with `background: rgba(17, 19, 27, 0.75)`.
- **Inset Rim Highlight**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`.
- **Card Depth Profile**: `box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)`.
- **Modal Depth Profile**: `box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08)`.

---

## ✦ 7. Motion Physics & Micro-Animations

Animations in Astera must feel natural, physical, and instant. We avoid linear transitions and gratuitous movement.

### Framer Motion Spring Config
```typescript
export const asteraSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};
```

### Duration & Easing Rules
- **Micro Hover States**: `100ms ease-out`
- **Dropdown & Popover Overlays**: `150ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Modals & Command Palette**: `200ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Active Button Click Feedback**: `scale-[0.98]` transform on active click.

---

## ✦ 8. Iconography Standards

- **Library**: `Lucide Icons`.
- **Stroke Width**: `1.75px` or `2px`.
- **Sizing Scale**:
  - `14px`: Inline button icons, badge icons, metadata tags.
  - `16px`: Navigation sidebar items, search bar icons, action menus.
  - `20px` / `24px`: Empty state illustrations, modal headers, major tool logos.

---

## ✦ 9. Accessibility (WCAG AAA) & Keyboard Ergonomics

- **Visible Focus States**: Every focusable control features a high-contrast focus outline ring:
  ```css
  *:focus-visible {
    outline: 2px solid #6366f1 !important;
    outline-offset: 2px !important;
  }
  ```
- **Contrast Ratios**: Body text achieves > 7:1 contrast against dark surfaces.
- **Keyboard Traps**: All modals and command palettes trap focus while open, supporting `Escape` key close.

---

## ✦ 10. Component Philosophy & Interaction Design

1. **Compound Component Architecture**: Components export clean subcomponents (`Modal.Header`, `Modal.Body`, `Modal.Footer`).
2. **Unstyled Primitive Foundation**: Built on Radix UI primitives for accessible keyboard navigation and focus management.
3. **Direct Manipulation & Optimistic UI**: UI updates immediately upon user interaction with background synchronization.
