---
name: verify
description: Build, run and drive joshmu.dev locally to verify a change at its real surfaces (the /api/github route and the single page in a browser).
---

# Verify joshmu.dev

## Build and run

```bash
pnpm install --frozen-lockfile
pnpm build                                   # /api/github must show as ƒ (dynamic)
pnpm exec next start -p 3101                 # happy path: token from .env.local
GITHUB_TOKEN=invalid pnpm exec next start -p 3102   # failure path: GitHub answers 401
```

- A stale `.next/dev/types` from an old `next dev` run can fail `next build` on routes that no longer exist. Move `.next` to the trash and rebuild.
- `tsc` and `next build` rewrite the tracked `tsconfig.tsbuildinfo` and `next-env.d.ts`. Restore them with `git checkout --` afterwards.
- `.env.local` is private; never read it. Process env overrides it.

## Drive

- API: `curl localhost:3101/api/github` returns `[{date, grade}]`. On :3102 it returns 502, and a repeat request retries GitHub, so a failure is never cached.
- Page: drive it with `playwright-cli -s=<name> run-code --filename=<script>`. Wait for `load`, not `networkidle`: the project videos stream forever.
- Flows worth driving: theme toggle cycle (body class plus the `joshmu.dev:theme` key), Hero title click, reload persistence, header logo compressing on scroll, and the Activity grid (cells are `.bg-themeText.w-full.h-full`).
- `app/scroll-to-top.tsx` forces every load to the top, so a mid-page reload always starts at the hero.

## Production

The `joshmu.dev` custom domain can lag the latest production deployment. Compare against the deployment URL from `gh api repos/joshmu/joshmu-dev-website/deployments/<id>/statuses`.
