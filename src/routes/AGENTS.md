# Routes layer

Thin file-based route entries for TanStack Router.

## Rules

- Keep route modules thin: compose features and layout; little business logic
- Protect routes with `beforeLoad: () => requireAuth(...)` from `@/features/auth` when needed
- Do not call `apiClient` from route files — use feature hooks/API modules
- Do not import feature internals; use `@/features/<name>`
- Rely on root `errorComponent` / `notFoundComponent`
- Code-splitting is automatic via the router plugin (`autoCodeSplitting`)
- Do not add tutorial/demo product pages; prefer PATTERNS.md samples

## After adding a route file

TanStack Router regenerates `src/routeTree.gen.ts` — do not edit that file by hand.
