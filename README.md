# joshmu-dev-website

Personal developer portfolio website.

## Tech Stack

- [Next.js 15](https://nextjs.org/) with Turbopack
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/) for 3D graphics
- [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)

## Development

```bash
yarn install    # Install dependencies
yarn dev        # Start dev server (http://localhost:3000)
yarn build      # Production build
yarn test       # Run tests
```

## Validation

| Tool         | Command              | Purpose                            |
| ------------ | -------------------- | ---------------------------------- |
| Oxlint       | `yarn lint`          | Linting (React, Next.js, a11y, TS) |
| Oxfmt        | `yarn format:check`  | Formatting                         |
| TypeScript   | `yarn typecheck`     | Type checking (strict)             |
| Jest         | `yarn test:coverage` | Tests + coverage thresholds        |
| markdownlint | `yarn lint:md`       | Markdown linting                   |
| shellcheck   | `yarn shellcheck`    | Shell script linting               |

Pre-commit hooks enforce lint, format, typecheck, and commitlint automatically. CI runs the full validation matrix on every PR.

## Commit Convention

```text
type(scope): description
```

Scope is always required. Enforced by commitlint in pre-commit and CI.

## License

MIT
