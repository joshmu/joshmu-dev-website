# Validation & CI/CD Plan — joshmu-dev-website

Comprehensive plan to bring joshmu-dev-website up to parity with the validation architecture established across `agent-observability`, `~/.claude`, and `~/dotfiles`. Aligns with the Ox toolchain (Oxlint, Oxfmt) used in the lighter repos while adapting for the Next.js build requirements.

**Created**: 2026-03-29
**Target branch**: `claude/agent-observability-review-plan-20dU2`
**Related**: Validation Architecture doc, CI/CD Architecture doc

---

## Current State (Gap Analysis)

| Area                | Current                                     | Target                                              |
| ------------------- | ------------------------------------------- | --------------------------------------------------- |
| **Linting**         | None (eslint-config-next as dep, no config) | Oxlint                                              |
| **Formatting**      | None                                        | Oxfmt                                               |
| **Type checking**   | `strict: false`, `ignoreBuildErrors: true`  | `tsc --noEmit` enforced, strict mode                |
| **Unit tests**      | Jest (exists, no CI)                        | Jest in CI with coverage thresholds                 |
| **Pre-commit**      | Husky installed, hook disabled              | Husky + lint-staged (full pipeline)                 |
| **Commit-msg**      | None                                        | Commitlint with scope required                      |
| **CI/CD**           | Claude Code review only                     | Full validation pipeline (8+ jobs)                  |
| **Secret scanning** | None                                        | Gitleaks in CI                                      |
| **Shell scripts**   | None exist yet                              | Shellcheck + Bash 3.2 compat checker                |
| **Markdown lint**   | None                                        | markdownlint-cli2                                   |
| **Dead code**       | None                                        | Knip (non-blocking)                                 |
| **Dep audit**       | None                                        | yarn audit (non-blocking)                           |
| **Coverage**        | jest --coverage (no thresholds)             | Coverage with enforced thresholds                   |
| **Package manager** | Yarn (v1)                                   | Yarn (keep — no reason to migrate PM for this repo) |
| **Docs**            | CLAUDE.md outdated, README minimal          | Both updated to reflect actual stack                |

---

## Decision: Why Oxlint/Oxfmt Over ESLint/Prettier

- **Consistency**: `~/.claude` and `~/dotfiles` already use the Ox toolchain
- **Speed**: Oxlint is 50-100x faster than ESLint; Oxfmt is significantly faster than Prettier
- **Simplicity**: Single binary, minimal config, no plugin ecosystem to manage
- **ESLint removal**: `eslint-config-next` is currently a dependency but unused (no ESLint config exists). Clean removal.
- **Trade-off**: Oxlint has fewer rules than ESLint, but for a personal portfolio site the coverage is more than sufficient. Next.js-specific rules (from eslint-config-next) are partially covered by Oxlint's React/Next.js categories.

---

## Atomic Commits Plan

Each commit is self-contained, builds on the previous, and the repo should be in a valid state after each one. Every commit follows `type(scope): description` format.

---

### Commit 1: `chore(deps): add oxlint and configure linting`

**What**:

- Install `oxlint` as a devDependency
- Create `oxlintrc.json` with categories: `correctness`, `suspicious`, `pedantic`, `perf`, `style`, `restriction` (selected rules)
- Enable React and Next.js-specific rules
- Add `"lint"` and `"lint:fix"` scripts to package.json
- Remove `eslint-config-next` from dependencies (unused — no ESLint config exists)

**Config** (`oxlintrc.json`):

```jsonc
{
  "$schema": "https://raw.githubusercontent.com/nicolo-ribaudo/oxc/json-schema/npm/oxlint/configuration_schema.json",
  "categories": {
    "correctness": "error",
    "suspicious": "warn",
    "pedantic": "off",
    "perf": "warn",
    "style": "off",
  },
  "plugins": ["react", "react-perf", "nextjs", "jsx-a11y", "typescript"],
  "rules": {},
  "ignorePatterns": [".next/", "node_modules/", "coverage/", "out/", "build/", "plop-templates/"],
}
```

**Scripts**:

```json
"lint": "oxlint .",
"lint:fix": "oxlint --fix ."
```

**Verify**: `yarn lint` runs without errors (fix any issues found)

---

### Commit 2: `chore(deps): add oxfmt and configure formatting`

**What**:

- Install `@oxc/oxfmt` (or the appropriate oxfmt package) as a devDependency
- Create `.oxfmt.json` config (or use oxfmt defaults — check current oxfmt config format)
- Add `"format"`, `"format:check"` scripts to package.json
- Run `yarn format` to format the entire codebase

**Scripts**:

```json
"format": "oxfmt --write .",
"format:check": "oxfmt --check ."
```

**Note**: If `oxfmt` is not yet available as a standalone npm package (it's newer than oxlint), fall back to Prettier as an interim solution and document the planned migration. Check <https://oxc.rs> for current status.

**Fallback scripts (Prettier)**:

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

**Verify**: `yarn format:check` passes after formatting

---

### Commit 3: `chore(ts): enable strict mode and enforce type checking`

**What**:

- Update `tsconfig.json`: set `strict: true` (replaces individual `strictNullChecks: true`)
- Add `"typecheck"` script: `"tsc --noEmit"`
- Fix any type errors introduced by strict mode (expect these in areas using `any`, missing return types, etc.)
- **Keep** `ignoreBuildErrors: true` in `next.config.js` for now (remove in a later commit once CI validates types separately)

**Scripts**:

```json
"typecheck": "tsc --noEmit"
```

**Verify**: `yarn typecheck` passes

**Expected effort**: Medium — strict mode will surface issues with implicit `any`, unchecked nulls, and loose function signatures. Fix incrementally; use `// @ts-expect-error` sparingly with justification comments for third-party type gaps.

---

### Commit 4: `chore(hooks): configure husky + lint-staged pre-commit`

**What**:

- Upgrade Husky to v9 (current is v7) — simpler hook format
- Install `lint-staged` as a devDependency
- Create `.lintstagedrc.json` config
- Re-enable and rewrite `.husky/pre-commit`
- Add commit-msg hook placeholder (wired in next commit)

**Config** (`.lintstagedrc.json`):

```json
{
  "*.{ts,tsx,js,jsx}": ["oxlint --fix", "oxfmt --write"],
  "*.{json,md,yml,yaml}": ["oxfmt --write"],
  "*.md": ["markdownlint-cli2 --fix"],
  "*.sh": ["shellcheck"]
}
```

**Pre-commit hook** (`.husky/pre-commit`):

```bash
yarn lint-staged
yarn typecheck
```

**Scripts** (update `postinstall`):

```json
"postinstall": "husky",
"prepare": "husky"
```

**Verify**: Stage a file, commit — lint-staged runs oxlint + oxfmt on staged files

---

### Commit 5: `chore(hooks): add commitlint with scope-required rule`

**What**:

- Install `@commitlint/cli` and `@commitlint/config-conventional` as devDependencies
- Create `commitlint.config.mjs` (repo has no `"type"` field in package.json, so use `.mjs`)
- Add `.husky/commit-msg` hook
- Rule: `scope-empty: [2, 'never']` — every commit must have a scope

**Config** (`commitlint.config.mjs`):

```js
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-empty": [2, "never"],
  },
};
```

**Hook** (`.husky/commit-msg`):

```bash
npx --no -- commitlint --edit ${1}
```

**Verify**: Commit without scope → rejected. Commit with `chore(test): foo` → accepted.

---

### Commit 6: `chore(test): add coverage thresholds to jest config`

**What**:

- Run `yarn test:coverage` to measure current baseline
- Set conservative thresholds (~10-15% below measured values, per learnings from agent-observability)
- Add `coverageThreshold` to `jest.config.js`
- Update `test:coverage` script if needed

**Config addition** (in `jest.config.js`):

```js
coverageThreshold: {
  global: {
    statements: 30,   // calibrate after measuring
    branches: 25,
    functions: 30,
    lines: 30,
  },
},
```

**Verify**: `yarn test:coverage` passes with thresholds

---

### Commit 7: `chore(scripts): add shellcheck and bash 3.2 compat checker`

**What**:

- Create `scripts/check-bash32-compat.sh` (adapted from agent-observability)
- Add `"shellcheck"` and `"bash32-compat"` scripts to package.json
- Script checks for Bash 4+ features: `declare -A`, `mapfile`/`readarray`, `${var,,}`/`${var^^}`, `coproc`, negative array indices, `declare -g`, `declare -n`
- Self-excludes to avoid false positives

**Scripts**:

```json
"shellcheck": "git ls-files '*.sh' | xargs shellcheck",
"bash32-compat": "bash scripts/check-bash32-compat.sh"
```

**Note**: Currently no `.sh` files exist in the repo. These scripts establish the infrastructure for when shell scripts are added (e.g., release scripts, CI helpers). The pre-commit hook will automatically pick them up via lint-staged.

**Verify**: Both scripts exit 0 (no files to check = success)

---

### Commit 8: `chore(lint): add markdownlint-cli2 for markdown validation`

**What**:

- Install `markdownlint-cli2` as a devDependency
- Create `.markdownlint-cli2.jsonc` config
- Add `"lint:md"` script to package.json
- Fix any markdown issues in existing `.md` files (CLAUDE.md, README.md, VALIDATION_PLAN.md)

**Config** (`.markdownlint-cli2.jsonc`):

```jsonc
{
  "config": {
    "MD013": false,
    "MD033": false,
    "MD041": false,
  },
  "ignores": ["node_modules/", ".next/", "plop-templates/"],
}
```

**Scripts**:

```json
"lint:md": "markdownlint-cli2 '**/*.md' '#node_modules' '#.next'"
```

**Verify**: `yarn lint:md` passes

---

### Commit 9: `ci(workflow): add comprehensive validation pipeline`

**What**:

- Create `.github/workflows/ci.yml` with parallel jobs
- Follows best practices from CI/CD architecture doc

**Jobs** (8 parallel + 1 gate):

| Job             | Command                         | Blocking                 | Timeout |
| --------------- | ------------------------------- | ------------------------ | ------- |
| `typecheck`     | `yarn typecheck`                | Yes                      | 10min   |
| `lint`          | `yarn lint`                     | Yes                      | 5min    |
| `format`        | `yarn format:check`             | Yes                      | 5min    |
| `test`          | `yarn test`                     | Yes                      | 15min   |
| `build`         | `yarn build`                    | Yes                      | 15min   |
| `coverage`      | `yarn test:coverage`            | Yes                      | 15min   |
| `lint-md`       | `yarn lint:md`                  | Yes                      | 5min    |
| `gitleaks`      | `gitleaks/gitleaks-action@v2`   | Yes                      | 5min    |
| `knip`          | `npx knip`                      | No (continue-on-error)   | 10min   |
| `audit`         | `yarn audit --level high`       | No (continue-on-error)   | 5min    |
| **`ci-status`** | Gate job — `needs: [all above]` | Branch protection target | 1min    |

**Workflow features**:

- Triggers: push to `main`, PRs to `main`
- Concurrency: `cancel-in-progress` for PRs
- Node 22 + Yarn caching via `setup-node`
- Next.js build cache
- Explicit `timeout-minutes` on every job
- Minimal permissions (`contents: read`)
- Stable `ci-status` gate job for branch protection
- `fail-fast: false` — all jobs run to completion

**Skeleton**:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.head_ref || github.run_id }}
  cancel-in-progress: ${{ github.event_name == 'pull_request' }}

permissions:
  contents: read

jobs:
  typecheck:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: yarn typecheck

  lint:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: yarn lint

  format:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: yarn format:check

  test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: yarn test

  build:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: yarn
      - run: yarn install --frozen-lockfile
      - uses: actions/cache@v4
        with:
          path: .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('yarn.lock') }}-${{ github.sha }}
          restore-keys: ${{ runner.os }}-nextjs-${{ hashFiles('yarn.lock') }}-
      - run: yarn build

  coverage:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: yarn test:coverage

  lint-md:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: yarn lint:md

  gitleaks:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITLEAKS_LICENSE: ${{ secrets.GITLEAKS_LICENSE }}

  knip:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    continue-on-error: true
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: npx knip

  audit:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    continue-on-error: true
    steps:
      - uses: actions/checkout@v4
      - run: yarn audit --level high || true

  ci-status:
    needs: [typecheck, lint, format, test, build, coverage, lint-md, gitleaks]
    if: always()
    runs-on: ubuntu-latest
    timeout-minutes: 1
    steps:
      - if: contains(needs.*.result, 'failure')
        run: exit 1
```

**Verify**: Push to branch, CI runs all jobs, `ci-status` gate passes

---

### Commit 10: `chore(ci): add commitlint validation to PR workflow`

**What**:

- Add a `commitlint` job to `.github/workflows/ci.yml`
- Only runs on PRs (not push to main)
- Validates all commits in the PR range

**Job**:

```yaml
commitlint:
  if: github.event_name == 'pull_request'
  runs-on: ubuntu-latest
  timeout-minutes: 5
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - uses: actions/setup-node@v4
      with:
        node-version: 22
        cache: yarn
    - run: yarn install --frozen-lockfile
    - run: npx commitlint --from ${{ github.event.pull_request.base.sha }} --to ${{ github.event.pull_request.head.sha }} --verbose
```

**Verify**: PR with bad commit message → commitlint job fails

---

### Commit 11: `chore(config): remove ignoreBuildErrors from next.config.js`

**What**:

- Remove `typescript.ignoreBuildErrors: true` from `next.config.js`
- Now safe because:
  - `tsc --noEmit` runs separately in CI (catches all type errors)
  - Strict mode is enabled and all errors were fixed in Commit 3
  - `next build` will now also enforce type safety

**Verify**: `yarn build` passes without `ignoreBuildErrors`

---

### Commit 12: `chore(ci): add dependabot for GitHub Actions`

**What**:

- Create `.github/dependabot.yml` for automated action updates
- Also covers npm dependencies (weekly schedule)

**Config**:

```yaml
version: 2
updates:
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    open-pull-requests-limit: 5
```

**Verify**: File exists, Dependabot picks it up on next sync

---

### Commit 13: `docs(readme): update README and CLAUDE.md to reflect validation stack`

**What**:

- Update `README.md` with current tech stack, validation tools, and development workflow
- Update `CLAUDE.md` to reflect:
  - Actual framework versions (Next.js 15, React 19 — not 12/17)
  - Ox toolchain for linting/formatting
  - All new scripts (lint, format, typecheck, etc.)
  - CI/CD pipeline description
  - Commit message conventions (`type(scope): description`)
  - Pre-commit hook behavior
  - Remove references to yarn as "preferred" if it's the only PM
- Add validation section to CLAUDE.md documenting all enforcement points

**Verify**: Read through both files for accuracy

---

## Execution Order & Dependencies

```text
Commit 1 (oxlint) ─────────────────┐
Commit 2 (oxfmt) ──────────────────┤
Commit 3 (strict TS) ──────────────┤
                                    ├── Commit 4 (husky + lint-staged)
Commit 5 (commitlint) ─────────────┤       ↓
Commit 6 (coverage thresholds) ────┤   Commit 9 (CI workflow)
Commit 7 (shellcheck + bash32) ────┤       ↓
Commit 8 (markdownlint) ───────────┘   Commit 10 (commitlint CI)
                                           ↓
                                    Commit 11 (remove ignoreBuildErrors)
                                           ↓
                                    Commit 12 (dependabot)
                                           ↓
                                    Commit 13 (docs update)
```

Commits 1-3, 5-8 are independent of each other and could theoretically be done in parallel. Commits 4 and 9+ depend on the tools being installed.

---

## Validation Matrix (Post-Implementation)

| Validation           | joshmu-dev-website           | Notes                                        |
| -------------------- | ---------------------------- | -------------------------------------------- |
| **Type checking**    | `tsc --noEmit`               | strict mode                                  |
| **Linting**          | Oxlint                       | React, Next.js, JSX-a11y, TypeScript plugins |
| **Formatting**       | Oxfmt (or Prettier fallback) |                                              |
| **Unit tests**       | Jest + RTL                   | Coverage thresholds enforced                 |
| **Build**            | `next build`                 | Type errors now blocking                     |
| **Shellcheck**       | Yes                          | Portable via `git ls-files`                  |
| **Bash 3.2 compat**  | Yes                          | Custom checker                               |
| **Commitlint**       | Yes (scope required)         | `type(scope): description`                   |
| **Gitleaks**         | CI action                    | `gitleaks/gitleaks-action@v2`                |
| **Test coverage**    | Jest (thresholds TBD)        | Calibrate after measuring                    |
| **Dead code (knip)** | Non-blocking CI              |                                              |
| **Dep audit**        | `yarn audit` (non-blocking)  |                                              |
| **Markdown lint**    | markdownlint-cli2            |                                              |

---

## Enforcement Points (Post-Implementation)

### Pre-commit (Husky + lint-staged)

- Oxlint + Oxfmt on staged `.ts/.tsx/.js/.jsx` files
- Markdownlint on staged `.md` files
- Shellcheck on staged `.sh` files
- `tsc --noEmit` (full project typecheck)

### Commit-msg

- Commitlint: `type(scope): description` — scope always required

### CI (GitHub Actions)

- 8 blocking jobs + 2 non-blocking + 1 gate job
- Concurrency control with cancel-in-progress for PRs
- Next.js build cache
- Dependabot for action and dependency updates
- Gitleaks secret scanning

---

## Risk Mitigation

| Risk                                           | Mitigation                                                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Strict TS surfaces many errors                 | Fix incrementally; use `@ts-expect-error` with comments for third-party gaps                          |
| Oxfmt not yet stable/available                 | Fall back to Prettier; document migration plan                                                        |
| Coverage thresholds too aggressive             | Measure in CI first; set 15-20% below (per agent-observability learnings)                             |
| Knip false positives (Next.js dynamic imports) | `continue-on-error: true`; clean up incrementally                                                     |
| Gitleaks needs license for action@v2           | Secret `GITLEAKS_LICENSE` must be configured; or use manual binary approach                           |
| Pre-commit slows development                   | Keep typecheck in pre-commit but can be skipped with `--no-verify` for WIP (commitlint catches on CI) |

---

## Future Considerations

- **Bundle size monitoring**: `@next/bundle-analyzer` or `TURBOPACK_STATS` for Next.js 15+
- **E2E tests**: Playwright if/when the site needs E2E coverage
- **Shared validation package**: If configs keep diverging across repos, extract to `joshmu/.github` composite actions
- **Reusable CI workflow**: Thin 3-line caller per repo once `joshmu/.github` is set up
