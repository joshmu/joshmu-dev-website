# joshmu-dev-website

Personal developer portfolio website.

## Tech Stack

- [Next.js 16](https://nextjs.org/) with Turbopack
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/) for 3D graphics
- [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)

## Development

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server (http://localhost:3000)
pnpm build      # Production build
pnpm test       # Run tests (watch mode)
pnpm test:run   # Run tests once
```

## Validation

| Tool         | Command              | Purpose                            |
| ------------ | -------------------- | ---------------------------------- |
| Oxlint       | `pnpm lint`          | Linting (React, Next.js, a11y, TS) |
| Oxfmt        | `pnpm format:check`  | Formatting                         |
| TypeScript   | `pnpm typecheck`     | Type checking (strict)             |
| Vitest       | `pnpm test:coverage` | Tests + coverage thresholds        |
| markdownlint | `pnpm lint:md`       | Markdown linting                   |
| shellcheck   | `pnpm shellcheck`    | Shell script linting               |
| Knip         | `pnpm lint:knip`     | Dead code detection                |

Pre-commit hooks enforce lint, format, typecheck, and commitlint automatically. CI runs the full validation matrix on every PR.

## Commit Convention

```text
type(scope): description
```

Scope is always required. Enforced by commitlint in pre-commit and CI.

## License

MIT
