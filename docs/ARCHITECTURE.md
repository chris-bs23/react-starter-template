# Architecture

This document is the source of truth for how code is organized in this frontend
foundation. Read it before adding features. AI agents should treat violations of
these boundaries as defects.

## Goals

- Scale to many developers and many domains without folder chaos
- Keep server state and client state responsibilities clear
- Make the next change location obvious for humans and AI agents
- Fail fast on misconfiguration, API errors, and uncaught UI errors

## Stack (decided)

| Concern | Choice |
| --- | --- |
| UI | React 19 + TypeScript |
| Build | Vite |
| Package manager | pnpm |
| Lint / format | Biome |
| Routing | TanStack Router (file routes, auto code-splitting) |
| Server state | TanStack Query |
| Client state | Zustand (feature-local by default) |
| HTTP | Axios (`src/lib/api-client.ts`) |
| Forms / schemas | React Hook Form + Zod |
| Styling | Tailwind CSS v4 + shadcn/ui primitives |

Do not introduce competing libraries for the same concern without an ADR.

## Directory map

```text
src/
  app/                 # App bootstrap: providers, router instance
  components/
    ui/                # Design-system primitives (shadcn). Do not put business UI here.
    layout/            # App chrome (shell, nav)
    errors/            # Error and not-found UI
  config/              # Env and app-level configuration
  features/            # Business domains (primary place for product code)
    auth/              # Session store + route-guard foundations (no demo UI)
    counter/           # Minimal Zustand client-state example
  hooks/               # Shared hooks used by 2+ features (create when needed)
  lib/                 # Shared non-UI utilities and integrations
  routes/              # Thin route entries (/, /about)
  test/                # Test setup only
  types/               # Cross-cutting TypeScript types only
```

## Dependency rules

1. `routes` may import from `features`, `components`, `hooks`, `lib`, `config`
2. `features` may import from `components`, `hooks`, `lib`, `config`, `types`
3. `features/*` must not import from other features except through that feature's public `index.ts`
4. `components/ui` must stay domain-agnostic
5. `lib` and `config` must not import from `features` or `routes`
6. Prefer `@/` aliases over deep relative imports

These rules are **partially lint-enforced** via Biome `noRestrictedImports`
(deep `@/features/...` imports, `lib`/`config` → features/routes, and features → routes).
Relative cross-feature imports are not fully blocked — prefer `@/` and public barrels.
See `biome.json`. Do not treat this as full eslint-plugin-boundaries.
## State policy

- **Server state** (API data): TanStack Query only
- **Client/UI state**: Zustand inside the owning feature
- **Cross-cutting session**: `features/auth` only
- Never mirror API responses into Zustand "for convenience"

## Feature module shape

```text
features/<name>/
  api/           # Optional: endpoint functions + query keys
  components/    # Optional: feature UI
  hooks/         # Optional: feature hooks
  <name>-store.ts
  types.ts
  index.ts       # Public API only
```

Export only what other layers need from `index.ts`. Copy-paste recipes: [PATTERNS.md](./PATTERNS.md).

## Routing policy

- Keep route files thin
- Use `beforeLoad` + `requireAuth()` for protected routes (checks session expiry)
- Always rely on root `errorComponent` / `notFoundComponent`
- Let TanStack Router code-split route modules (`autoCodeSplitting`)
- Keep a single `<main>` landmark in the app shell; error/not-found UI uses `<div>`
## Networking policy

- All HTTP goes through `apiClient`
- Normalize failures with `toApiError`
- Domain modules own request/response Zod schemas when contracts stabilize
- Auth token bridging uses `src/lib/auth-token.ts` so shared code stays feature-free

## Environment policy

- Validate with Zod in `src/config/env.ts` at startup
- Only `VITE_*` values may be read in client code
- Never put secrets in Vite env files

## Error & observability policy

- UI crashes: `AppErrorBoundary`
- Route failures: `RouteError`
- Unexpected events: `logger` facade (swap adapter later for Sentry/Datadog)
- Do not call `console.*` directly from feature code

## Testing policy

- Unit/integration: Vitest + Testing Library
- Colocate tests as `*.test.ts(x)` next to the unit under test
- Prefer testing public feature APIs and user-visible behavior
- Coverage thresholds are enforced in Vitest and CI

## AI-oriented conventions

- One obvious place for each concern (see directory map)
- Public feature barrels (`index.ts`) reduce speculative deep imports
- Architecture decisions live here; agent operating instructions live in `AGENTS.md`
- Prefer small, named modules over mega-files and vague `utils.ts` dumping grounds
- Pattern catalog: [PATTERNS.md](./PATTERNS.md)
- Nested `AGENTS.md` under `src/features`, `src/lib`, `src/routes`, `src/components`
