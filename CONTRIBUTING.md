# Contributing to Astera

Thank you for your interest in contributing to **Astera Studio**! As the founding engineering team, our benchmark is software that developers immediately star on GitHub because it feels handcrafted.

---

## ✦ Engineering Standards

1. **Strict TypeScript Only**: No `any`, no implicit types, zero TypeScript errors under `npx tsc --noEmit`.
2. **8pt Grid System**: All margins, padding, gaps, and component sizes must strictly align to an 8-pixel scale.
3. **No Unnecessary Visual Noise**: No random gradients, no distracting animations, no unnecessary rounded corners.
4. **Dark Mode Primacy**: Ensure high-contrast colors matching the Astera Obsidian palette (`#090a0f` base).
5. **Accessibility**: All interactive elements must support keyboard focus outlines and proper ARIA labels.

---

## ✦ Development Workflow

1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/astera.git
   cd astera
   npm install
   ```

2. **Run Local Server**
   ```bash
   npm run dev
   ```

3. **Verify Code Quality**
   Before submitting a Pull Request, verify strict type compilation and production build:
   ```bash
   npx tsc --noEmit
   npm run build
   ```

4. **Pull Request Guidelines**
   - Provide a clear summary of changes in the PR description.
   - Include visual screenshots or short screen recordings for any UI changes.
   - Ensure all automated checks pass.
