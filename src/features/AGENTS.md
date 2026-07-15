# Features layer

Put domain code here. Each feature is a mini-module.

## Required shape

```text
features/<name>/
  api/              # Optional until first endpoint; use apiClient + createQueryKeys
  components/       # Optional feature UI
  hooks/            # Optional feature hooks
  <name>-store.ts   # Optional Zustand (client state only)
  types.ts          # Optional
  index.ts          # Required public API
  *.test.ts(x)      # Colocated tests
```

## Required

- One folder per domain: `src/features/<domain>/`
- Public exports only through `index.ts`
- Colocate feature UI, hooks, API calls, and Zustand stores
- Follow recipes in `docs/PATTERNS.md`

## Do not

- Import another feature's internal files (`@/features/x/y` is lint-blocked)
- Import from `@/routes`
- Put design-system primitives here (use `src/components/ui`)
- Mirror API caches into Zustand
- Call `axios` or `fetch` directly — use `apiClient` via feature `api/`
- Add fake login UIs or dead endpoint stubs “as examples”

## Auth

Use `@/features/auth` (`requireAuth`, `useAuthStore`, `isSessionActive`) instead of
inventing a parallel session model. There is no demo IdP in this starter.
