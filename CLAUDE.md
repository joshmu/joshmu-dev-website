# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Josh Mu's personal developer portfolio website built with Next.js 15, React 19, and TypeScript. Features animations (Framer Motion), 3D graphics (Three.js), and a custom dark/light theme system.

## Commands

### Development

```bash
yarn dev        # Start development server (Turbopack) at http://localhost:3000
yarn build      # Create production build
yarn start      # Start production server
```

### Testing

```bash
yarn test              # Run all tests once
yarn test:watch        # Run tests in watch mode
yarn test:coverage     # Generate coverage report (with thresholds)
```

### Validation

```bash
yarn lint              # Run Oxlint
yarn lint:fix          # Run Oxlint with auto-fix
yarn format            # Format code with Oxfmt (or Prettier)
yarn format:check      # Check formatting without writing
yarn typecheck         # Run tsc --noEmit (strict mode)
yarn lint:md           # Run markdownlint-cli2
yarn shellcheck        # Run shellcheck on tracked .sh files
yarn bash32-compat     # Check bash scripts for Bash 4+ features
```

### Code Generation

```bash
yarn plop       # Generate new components or pages from templates
```

## Architecture

### Tech Stack

- **Framework**: Next.js 15 with Turbopack (dev), TypeScript (strict mode)
- **Styling**: Tailwind CSS 3 + SCSS modules
- **Animation**: Framer Motion + Three.js for 3D graphics
- **Testing**: Jest 30 + React Testing Library + jest-axe
- **Linting**: Oxlint (React, Next.js, JSX-a11y, TypeScript plugins)
- **Formatting**: Oxfmt (or Prettier as fallback)
- **Package Manager**: Yarn

### Project Structure

- **`pages/`**: Next.js pages with file-based routing
  - `api/`: API routes (github.ts for GitHub activity)
- **`src/components/`**: Feature-based component organization
  - Each component has its own folder with component, styles, and tests
  - `shared/ux/`: Reusable animation components (Parallax, Curtain, etc.)
- **`src/context/`**: React Context providers (global state, theme)
- **`src/hooks/`**: Custom React hooks
- **`scripts/`**: Shell scripts (shellcheck + bash 3.2 compat checked)
- **`plop-templates/`**: Templates for code generation
- **`.github/workflows/`**: CI/CD pipeline

### Key Features

- **Path Aliases**: Use `@/components`, `@/hooks`, etc. for imports
- **Theme System**: Dark/light mode with CSS variables
- **Custom Cursor**: Interactive cursor implementation
- **Animations**: Extensive use of Framer Motion and intersection observers
- **Code Generation**: Plop templates for consistent component creation

### Testing Conventions

- Test files: `ComponentName.test.tsx` in same directory as component
- Use `test()` not `it()`
- Focus on user-visible behavior
- Coverage thresholds enforced (statements, branches, functions, lines)
- Extensive mocks in `src/__test__/setupTests.tsx` for:
  - IntersectionObserver
  - react-ga (Google Analytics)
  - framer-motion
  - Context providers

## Validation & CI/CD

### Commit Message Convention

All commits must follow: `type(scope): description`

- **Scope is required** — enforced by commitlint (pre-commit hook + CI)
- Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`, `build`
- Examples: `feat(hero): add parallax scroll effect`, `fix(theme): correct dark mode toggle`

### Pre-commit Hooks (Husky + lint-staged)

On every commit, the following run automatically:

1. **Oxlint + Oxfmt** on staged `.ts/.tsx/.js/.jsx` files
2. **Markdownlint** on staged `.md` files
3. **Shellcheck** on staged `.sh` files
4. **TypeScript type check** (`tsc --noEmit`) on full project
5. **Commitlint** validates commit message format

### CI Pipeline (GitHub Actions)

Runs on push to `main` and on all PRs:

| Job           | Blocking      | Purpose                          |
| ------------- | ------------- | -------------------------------- |
| typecheck     | Yes           | `tsc --noEmit` (strict)          |
| lint          | Yes           | Oxlint                           |
| format        | Yes           | Oxfmt/Prettier check             |
| test          | Yes           | Jest test suite                  |
| build         | Yes           | `next build` (type errors block) |
| coverage      | Yes           | Jest with coverage thresholds    |
| lint-md       | Yes           | Markdown linting                 |
| gitleaks      | Yes           | Secret scanning                  |
| knip          | Yes           | Dead code detection              |
| audit         | No            | Dependency vulnerability scan    |
| commitlint    | Yes (PR only) | Commit message validation        |
| **ci-status** | Gate          | Aggregates all blocking jobs     |

Branch protection should target the `ci-status` gate job.

### Important Configuration

- **TypeScript**: Strict mode enabled. `tsc --noEmit` enforced in CI and pre-commit.
- **Next.js**: `ignoreBuildErrors` removed — type errors block builds.
- **Tailwind**: Custom theme colors via CSS variables.
- **Git Hooks**: Husky v9 + lint-staged for pre-commit; commitlint for commit-msg.

### Development Workflow

1. Use `yarn plop` to generate new components/pages with consistent structure
2. Components should include TypeScript types and be co-located with tests
3. Follow existing patterns for animations and theme integration
4. Use path aliases for clean imports
5. Test components focusing on user-facing behavior
6. Commits must use `type(scope): description` format
7. Pre-commit hooks validate lint, format, types, and commit message automatically
8. CI runs full validation — check `ci-status` gate job before merging
