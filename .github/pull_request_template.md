<!--
  Title format: `TICKET-ID: subject`  (e.g. `PROJ-123: add reports route guard`)
  Branch format: `type/TICKET-ID-slug`  (e.g. `feature/PROJ-123-add-login-form`)
  See CONTRIBUTING.md and AGENTS.md.
-->

## Summary

<!-- What changed and why. Link the ticket. -->

## Type of change

- [ ] Feature
- [ ] Fix
- [ ] Chore / refactor
- [ ] Docs
- [ ] Architecture change (updated `docs/ARCHITECTURE.md` / `docs/DECISIONS.md`)

## Checklist

- [ ] `pnpm run verify` passes locally (lint, typecheck, coverage, secretlint, build)
- [ ] Code lives in the correct layer (see `docs/ARCHITECTURE.md` directory map)
- [ ] Cross-feature imports go through `@/features/<name>` public barrels only
- [ ] Server state uses TanStack Query; client state uses Zustand (no API caches in Zustand)
- [ ] HTTP goes through `apiClient`; logging goes through `logger` (no raw `console`)
- [ ] Tests colocated as `*.test.ts(x)` and cover user-visible behavior
- [ ] No secrets added to `VITE_*` env or committed `.env*` files
- [ ] Docs/`AGENTS.md` updated in this PR if a convention changed

## Notes for reviewers / AI agents

<!-- Trade-offs, follow-ups, or context that is not obvious from the diff. -->
