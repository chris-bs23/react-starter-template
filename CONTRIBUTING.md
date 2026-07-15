# Contributing

## Prerequisites

- Node.js version from `.nvmrc` (24+)
- pnpm 10+

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Use **`.env.local`** for local development (gitignored). CI copies `.env.example` to
`.env` for the build pipeline — both work with Vite; prefer `.env.local` on developer machines.

## Quality gates

Before opening a PR, ensure:

```bash
pnpm run verify
```

That runs lint, typecheck, coverage tests, secretlint, and production build.

Do **not** run bare `pnpm ci` — that is pnpm’s clean-install alias, not this script.

CI (`.github/workflows/ci.yml`) runs the same gates as explicit `pnpm run …` steps.

## Branch & commit format

- Branch: `type/TICKET-ID-slug`
  - Types: `feature`, `fix`, `chore`, `hotfix`, `release`, `docs`
  - Example: `feature/PROJ-123-add-login-form`
- Commit: `TICKET-ID: subject`
  - Example: `PROJ-123: add login form`

Hooks under `.husky/` enforce these locally. Pre-push runs `pnpm run verify`.

## Architecture

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md). Recipes: [docs/PATTERNS.md](./docs/PATTERNS.md).
AI-oriented operating rules live in [AGENTS.md](./AGENTS.md).

## Adding UI primitives

Use the shadcn CLI so files land in `src/components/ui` with the project style:

```bash
pnpm dlx shadcn@latest add <component>
```

## Shared hooks

Create files under `src/hooks/` only when a hook is used by **two or more** features.
Otherwise keep the hook inside the owning feature.
