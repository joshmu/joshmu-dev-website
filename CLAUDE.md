# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Josh Mu's personal developer portfolio website built with Next.js 16 (app router), React 19, and TypeScript. Features animations (Framer Motion), 3D graphics (Three.js), and a custom multi-theme system. Domain terms are defined in `CONTEXT.md`.

## Commands

### Development

```bash
pnpm dev        # Start development server (Turbopack) at http://localhost:3000
pnpm build      # Create production build
pnpm start      # Start production server
```

### Testing

```bash
pnpm test              # Run Vitest in watch mode
pnpm test:run          # Run all tests once
pnpm test:coverage     # Run tests with a coverage report
```

### Validation

```bash
pnpm lint              # Run Oxlint on src/
pnpm lint:fix          # Run Oxlint with auto-fix on src/
pnpm format            # Format src/ with Oxfmt
pnpm format:check      # Check src/ formatting without writing
pnpm typecheck         # Run tsc --noEmit (strict mode)
pnpm lint:md           # Run markdownlint-cli2
pnpm lint:knip         # Run Knip dead code detection
pnpm run audit         # Dependency vulnerability scan (critical only)
pnpm shellcheck        # Run shellcheck on tracked .sh files
pnpm bash32-compat     # Check bash scripts for Bash 4+ features
```

### Code Generation

```bash
pnpm plop       # Generate a new component from templates
```

## Architecture

### Tech Stack

- **Framework**: Next.js 16 app router with Turbopack (dev), TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 + SCSS
- **Animation**: Framer Motion + Three.js for 3D graphics
- **Testing**: Vitest 4 (jsdom) + React Testing Library + jest-dom matchers
- **Linting**: Oxlint (React, Next.js, JSX-a11y, TypeScript plugins)
- **Formatting**: Oxfmt
- **Dead code**: Knip
- **Package Manager**: pnpm (version pinned in `packageManager`); Node version in `.nvmrc`

### Project Structure

- **`app/`**: Next.js app router (`layout.tsx`, `page.tsx`, `page-layout.tsx`, `providers.tsx`)
  - `api/github/`: route handler serving GitHub contribution activity
- **`src/components/`**: Feature-based component organization
  - Each component has its own folder with component and tests
  - `shared/ux/`: Reusable animation components (Curtain, Compressor, RevealInView)
- **`src/context/`**: React Context providers (theme)
- **`src/hooks/`**: Custom React hooks
- **`src/services/`**: Non-UI modules
- **`src/styles/`**: Global SCSS
- **`scripts/`**: Shell scripts (shellcheck + bash 3.2 compat checked)
- **`plop-templates/`**: Component and component-test templates for `pnpm plop`
- **`.github/workflows/`**: CI/CD pipeline

### Key Features

- **Path Aliases**: Use `@/components`, `@/shared`, `@/context`, `@/hooks`, `@/app`, `@/styles`, `@/services` for imports
- **Theme System**: Four cycling themes (dark, light, alt, alt2) via CSS variables, persisted in localStorage
- **Custom Cursor**: Interactive cursor implementation
- **Animations**: Extensive use of Framer Motion and intersection observers
- **Code Generation**: Plop templates for consistent component creation

### Testing Conventions

- Test files: `ComponentName.test.tsx` in same directory as component
- Use `test()` not `it()` (Vitest globals are enabled)
- Focus on user-visible behavior
- Global mocks in `src/__test__/setupTests.tsx` for:
  - react-player
  - IntersectionObserver
  - framer-motion
- Theme-dependent components render through the real `ThemeProvider` via `src/__test__/renderWithProviders.tsx`

## Validation & CI/CD

### Commit Message Convention

All commits must follow: `type(scope): description`

- **Scope is required**: enforced by commitlint (commit-msg hook + CI)
- Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`, `build`
- Examples: `feat(hero): add parallax scroll effect`, `fix(theme): correct dark mode toggle`

### Git Hooks (Husky + lint-staged)

On every commit, the following run automatically:

1. **Oxlint + Oxfmt** on staged `.ts/.tsx/.js/.jsx` files
2. **Oxfmt** on staged `.json/.jsonc/.yml/.yaml/.css/.scss` files
3. **Oxfmt, then markdownlint** on staged `.md` files
4. **TypeScript type check** (`tsc --noEmit`) on full project
5. **Commitlint** validates the commit message (commit-msg hook)

### CI Pipeline (GitHub Actions)

Runs on push to `main` and on all PRs:

| Job           | Gated by ci-status | Purpose                        |
| ------------- | ------------------ | ------------------------------ |
| format        | Yes                | Oxfmt check                    |
| lint          | Yes                | Oxlint                         |
| lint-md       | Yes                | Markdown linting               |
| typecheck     | Yes                | `tsc --noEmit` (strict)        |
| shellcheck    | Yes                | Shell script linting           |
| test          | Yes                | Vitest suite                   |
| coverage      | Yes                | Vitest with coverage report    |
| gitleaks      | Yes                | Secret scanning                |
| audit         | Yes                | Critical dependency advisories |
| knip          | Yes                | Dead code detection            |
| commitlint    | No (PR only)       | Commit message validation      |
| **ci-status** | Gate               | Aggregates the gated jobs      |

Branch protection should target the `ci-status` gate job. CI has no `next build` job, so run `pnpm build` locally before merging.

### Important Configuration

- **TypeScript**: Strict mode enabled. `tsc --noEmit` enforced in CI and pre-commit.
- **Next.js**: `ignoreBuildErrors` is not set, so type errors block builds.
- **Tailwind**: Custom theme colors via CSS variables.
- **Git Hooks**: Husky v9 + lint-staged (configured in `.lintstagedrc.json`) for pre-commit; commitlint for commit-msg.

### Development Workflow

1. Use `pnpm plop` to generate new components with consistent structure
2. Components should include TypeScript types and be co-located with tests
3. Follow existing patterns for animations and theme integration
4. Use path aliases for clean imports
5. Test components focusing on user-facing behavior
6. Commits must use `type(scope): description` format
7. Pre-commit hooks validate lint, format, types, and commit message automatically
8. CI runs full validation: check the `ci-status` gate job before merging
