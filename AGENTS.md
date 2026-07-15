# AGENTS.md

Operational guide for AI coding agents working in this repository.

## Project

Enterprise React frontend **starter / foundation** (not a product). Stack is fixed: React,
TypeScript, pnpm, Biome, TanStack Router, TanStack Query, Zustand, Axios, Zod, Tailwind,
shadcn/ui.

Read `docs/ARCHITECTURE.md` before structural changes. Copy-paste recipes live in
`docs/PATTERNS.md`. Nested `AGENTS.md` files under `src/` add layer-specific rules.

## Commands

```bash
pnpm install
cp .env.example .env.local   # first-time local setup (CI uses .env)
pnpm dev
pnpm lint
pnpm lint:fix
pnpm typecheck
pnpm test:run
pnpm test:coverage
pnpm build
pnpm secretlint
pnpm run verify              # lint + typecheck + coverage + secretlint + build
```

Use **pnpm only** (never npm/yarn).

Never run bare `pnpm ci` — that is pnpm’s clean-install, not this repo’s quality gate.
Use `pnpm run verify` instead.

## Where to put code

| Change | Location |
| --- | --- |
| Business/domain logic & UI | `src/features/<domain>/` |
| Route entry | `src/routes/*.tsx` (keep thin) |
| Design-system primitive | `src/components/ui/` via shadcn |
| App shell / layout | `src/components/layout/` |
| Shared hook (2+ features) | `src/hooks/` (create when needed) |
| Env / bootstrapping | `src/config/`, `src/app/` |
| HTTP / logging / helpers | `src/lib/` |

Export feature public APIs from `src/features/<domain>/index.ts`.

## Hard rules

- ALWAYS: run `pnpm lint` and `pnpm typecheck` after non-trivial edits
- ALWAYS: import with `@/` aliases
- ALWAYS: use `apiClient` for HTTP; use `logger` instead of raw `console`
- ALWAYS: keep server state in TanStack Query and client state in Zustand
- ALWAYS: import features only through `@/features/<name>` (enforced by Biome)
- ASK FIRST: adding major dependencies, changing package manager, or replacing TanStack/Zustand/Biome
- NEVER: introduce ESLint/Prettier alongside Biome
- NEVER: put secrets in `VITE_*` env vars or commit `.env*` files (except `.env.example`)
- NEVER: import from `features/*` internals; use the feature `index.ts`
- NEVER: store API entity caches in Zustand
- NEVER: invent a second HTTP client or bypass `toApiError`
- NEVER: put business/domain UI in `src/components/ui`
- NEVER: scaffold fake login UIs, demo IdPs, or dead API endpoints “for examples”

## Anti-patterns

- Deep imports: `@/features/auth/auth-store` — wrong; use `@/features/auth`
- Mirroring Query data into Zustand “for convenience”
- Fat route files with API calls and business rules
- `console.*` in features (use `logger`)
- Tokens in `localStorage` without an explicit threat-model ADR
- Shipping toy product demos on `/` that look like real features

## Testing expectations

- Colocate `*.test.ts(x)` next to the unit under test
- Prefer public feature APIs and user-visible behavior
- After non-trivial edits: `pnpm test:run` (or `pnpm test:coverage` when touching covered modules)
- Coverage thresholds are enforced in Vitest and CI

## Git conventions (enforced by Husky)

- Branches: `type/TICKET-ID-slug` (e.g. `feature/PROJ-123-add-login-form`)
- Commits: `TICKET-ID: subject` (e.g. `PROJ-123: add login form`)
- Protected branch names `main` / `master` / `develop` skip branch-name checks

## Auth & protected routes

Auth is **foundation plumbing** (session store + `requireAuth` + token bridge) — not a
demo product. Wire a real IdP / login route when the client chooses one.

```ts
import { requireAuth } from "@/features/auth";

export const Route = createFileRoute("/reports")({
  beforeLoad: () => requireAuth(),
  component: ReportsPage,
});
```

Session state lives in `features/auth`. Token bridge for Axios is `lib/auth-token`.

## Server state (TanStack Query)

Provider + defaults are wired. There is **no** sample `useQuery` in app routes yet —
copy from `docs/PATTERNS.md` when the first real endpoint exists. Do not invent
`useEffect` + `fetch` for server data.

## Do not over-scaffold

This is a foundation, not a product. Prefer extending existing patterns over inventing
new folders or libraries. If a pattern is missing, add the smallest foundation that
matches `docs/ARCHITECTURE.md` and document it in `docs/PATTERNS.md`.
