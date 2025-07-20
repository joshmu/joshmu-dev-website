# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Josh Mu's personal developer portfolio website built with Next.js 12, React 17, and TypeScript. It features animations, 3D graphics, and a custom theme system.

## Commands

### Development
```bash
yarn dev        # Start development server at http://localhost:3000
yarn build      # Create production build
yarn start      # Start production server
```

### Testing
```bash
yarn test              # Run all tests once
yarn test:watch        # Run tests in watch mode
yarn test:coverage     # Generate coverage report
```

### Code Generation
```bash
yarn plop       # Generate new components or pages from templates
```

## Architecture

### Tech Stack
- **Framework**: Next.js 12 with TypeScript
- **Styling**: Tailwind CSS + SCSS modules
- **Animation**: Framer Motion + Three.js for 3D graphics
- **Testing**: Jest + React Testing Library + jest-axe
- **Package Manager**: Yarn (preferred - both yarn.lock and package-lock.json exist)

### Project Structure
- **`pages/`**: Next.js pages with file-based routing
  - `api/`: API routes (github.ts for GitHub activity)
- **`src/components/`**: Feature-based component organization
  - Each component has its own folder with component, styles, and tests
  - `shared/ux/`: Reusable animation components (Parallax, Curtain, etc.)
- **`src/context/`**: React Context providers (global state, theme)
- **`src/hooks/`**: Custom React hooks
- **`plop-templates/`**: Templates for code generation

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
- Extensive mocks in `src/__test__/setupTests.tsx` for:
  - IntersectionObserver
  - react-ga (Google Analytics)
  - framer-motion
  - Context providers

### Important Configuration
- **TypeScript**: Build errors are ignored in production (`ignoreBuildErrors: true` in next.config.js)
- **Tailwind**: Experimental features enabled (uniformColorPalette, extendedSpacingScale)
- **Git Hooks**: Husky installed for pre-commit hooks

### Development Workflow
1. Use `yarn plop` to generate new components/pages with consistent structure
2. Components should include TypeScript types and be co-located with tests
3. Follow existing patterns for animations and theme integration
4. Use path aliases for clean imports
5. Test components focusing on user-facing behavior