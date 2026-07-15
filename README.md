# React Starter Template

Frontend **foundation / starter** for large enterprise React apps and AI-assisted development.
It is intentionally thin: plumbing, conventions, and docs — not a demo product.

## Stack

- React 19 + TypeScript
- Vite
- pnpm
- Biome
- TanStack Router + TanStack Query
- Zustand
- Axios
- Zod + React Hook Form
- Tailwind CSS v4 + shadcn/ui
- Vitest + Testing Library
- Husky + lint-staged + Secretlint

## Quick start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Local development server |
| `pnpm build` | Typecheck + production build |
| `pnpm typecheck` | TypeScript project build |
| `pnpm lint` / `pnpm lint:fix` | Biome check / autofix |
| `pnpm test` | Vitest watch mode |
| `pnpm test:run` | Single test run |
| `pnpm test:coverage` | Coverage with thresholds |
| `pnpm secretlint` | Secret scanning |
| `pnpm run verify` | Full local quality gate |

Do not use bare `pnpm ci` for quality — that is pnpm clean-install.

## What is intentionally empty

- No sample IdP / login page (auth store + `requireAuth` only)
- No live `useQuery` feature yet (provider + recipes in PATTERNS.md)
- No MSW / E2E / Storybook until product needs them (see DECISIONS.md)

## Documentation

- [Architecture](./docs/ARCHITECTURE.md) — folder boundaries, state, networking, testing
- [Patterns](./docs/PATTERNS.md) — copy-paste recipes for features, Query, forms, auth
- [Deployment](./docs/DEPLOYMENT.md) — hosting headers, CSP, caching
- [Security](./docs/SECURITY.md) — secrets, auth posture, XSS
- [Decisions](./docs/DECISIONS.md) — adopted and deferred choices
- [Contributing](./CONTRIBUTING.md) — local workflow, branch/commit rules
- [AGENTS.md](./AGENTS.md) — instructions for AI coding agents

## Project shape (short)

```text
src/
  app/         # providers + router
  components/  # ui primitives, layout, errors
  config/      # validated environment
  features/    # business domains
  hooks/       # shared hooks
  lib/         # api client, logger, helpers
  routes/      # thin file-based routes
```

## Quality gates

Pre-push and CI enforce lint, typecheck, tests/coverage, secretlint, and production build.

## Repository governance

- CI quality gate: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)
- Security scanning (CodeQL): [`.github/workflows/codeql.yml`](./.github/workflows/codeql.yml)
- Dependency automation: [`.github/dependabot.yml`](./.github/dependabot.yml)
- PR / issue templates and [`CODEOWNERS`](./.github/CODEOWNERS) live under `.github/`

Replace `@your-org/...` placeholders in `CODEOWNERS` and the issue-template links
with real teams before enabling branch protection.
