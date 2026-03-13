# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Josh Mu's personal developer portfolio website built with Next.js 16, React 19, and TypeScript 5.9. It features animations, 3D graphics, and a custom theme system.

## Commands

### Development

```bash
pnpm dev        # Start development server (Turbopack default in Next.js 16)
pnpm build      # Create production build
pnpm start      # Start production server
```

### Testing

```bash
pnpm test              # Run all tests once
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Generate coverage report
```

### Linting & Formatting

```bash
pnpm lint              # Run oxlint
pnpm lint:fix          # Run oxlint with auto-fix
pnpm format            # Format with oxfmt
pnpm format:check      # Check formatting with oxfmt
pnpm typecheck         # Run TypeScript type checking
```

### Code Generation

```bash
pnpm plop       # Generate new components or pages from templates
```

## Architecture

### Tech Stack

- **Framework**: Next.js 16 with TypeScript 5.9
- **Styling**: Tailwind CSS v4 (CSS-first config) + SCSS
- **Animation**: Framer Motion 12 + Three.js for 3D graphics
- **Testing**: Jest + React Testing Library + jest-axe
- **Linting**: oxlint + oxfmt (Oxc toolchain)
- **Package Manager**: pnpm

### Project Structure

- **`app/`**: Next.js App Router with file-based routing
  - `api/`: Route handlers (github activity)
- **`src/components/`**: Feature-based component organization
  - Each component has its own folder with component, styles, and tests
  - `shared/ux/`: Reusable animation components (Parallax, Curtain, etc.)
- **`src/context/`**: React Context providers (global state, theme)
- **`src/hooks/`**: Custom React hooks
- **`src/styles/`**: Global SCSS with Tailwind v4 `@theme` configuration
- **`plop-templates/`**: Templates for code generation

### Key Features

- **Path Aliases**: Use `@/components`, `@/hooks`, etc. for imports
- **Theme System**: 4 themes (dark/light/alt/alt2) with CSS variables
- **Custom Cursor**: Interactive cursor implementation
- **Animations**: Extensive use of Framer Motion 12 and intersection observers
- **Code Generation**: Plop templates for consistent component creation

### Tailwind v4 Configuration

- Theme config lives in `src/styles/globals.scss` using `@theme` directive
- Custom colors: `themeText`, `themeBg`, `themeAccent` etc. (map to CSS variables)
- PostCSS uses `@tailwindcss/postcss` (autoprefixer built-in)
- No `tailwind.config.js` — all config is CSS-first

### Testing Conventions

- Test files: `ComponentName.test.tsx` in same directory as component
- Use `test()` not `it()`
- Focus on user-visible behavior
- Extensive mocks in `src/__test__/setupTests.tsx` for:
  - IntersectionObserver
  - react-ga (Google Analytics)
  - framer-motion
  - Context providers

### Commit Conventions

- Uses **Conventional Commits** enforced by commitlint
- Allowed scopes: `deps`, `husky`, `github`, `ts`, `tailwind`, `oxc`, `next`, `react`, `framer`, `three`, `test`
- Pre-commit hook runs lint-staged (oxlint + oxfmt on staged files)
- Commit message hook validates conventional commit format

### CI Pipeline

- GitHub Actions runs on push to main and all PRs
- Jobs: lint, typecheck, build, test (run in parallel, build/test after lint+typecheck)

### Important Configuration

- **TypeScript**: Strict mode enabled, target ES2022
- **Oxlint**: Zero-config linter (`.oxlintrc.json` if needed), **Oxfmt**: formatter (`.oxfmtrc.json`)
- **Git Hooks**: Husky 9 with lint-staged and commitlint

### Development Workflow

1. Use `pnpm plop` to generate new components/pages with consistent structure
2. Components should include TypeScript types and be co-located with tests
3. Follow existing patterns for animations and theme integration
4. Use path aliases for clean imports
5. Test components focusing on user-facing behavior
6. All commits must follow conventional commit format
