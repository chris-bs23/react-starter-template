# Architecture decisions (starter baseline)

Short record of intentional choices for this foundation. Expand into formal ADRs when a decision needs broader stakeholder review.

## Adopted now

| Decision | Rationale |
| --- | --- |
| Feature folders under `src/features` | Industry-standard for large React apps; predictable for humans and AI |
| Keep `components/ui` for shadcn | Avoids fighting the shadcn generator; UI primitives stay domain-free |
| TanStack Query + Zustand split | Current mainstream best practice for server vs client state |
| Zod-validated `src/config/env.ts` | Fail fast on misconfiguration; already have Zod in stack |
| Axios `apiClient` + `toApiError` | Builds on existing Axios choice; one networking path |
| Auth foundation without Auth0/Clerk | Client has not chosen an IdP; avoid locking the template early |
| No demo auth UI / fake protected pages | Foundation, not a tutorial mini-app; guards live in docs + tests |
| `logger` facade without Sentry | Monitoring vendor undecided; keep call sites stable |
| Biome `recommended` + React domain | Replaces bloated ESLint-migrated config; single quality tool |
| Biome `noRestrictedImports` for barrels | Enforces feature public APIs without reintroducing ESLint |
| Query recipes in PATTERNS.md only | Avoid dead `GET /counter` stubs before a real API exists |
| `createQueryKeys` helper | Shared key factory when first Query hooks land |
| AGENTS.md + docs + `.cursor/rules` | Cross-tool AI DLC standard (AGENTS.md) with Cursor-scoped tips |
| `pnpm run verify` quality script | Avoid collision with pnpm’s built-in `pnpm ci` (clean-install) |
| GitHub Actions quality steps | Same gates as `verify`, invoked as explicit `pnpm run` commands |
| Least-privilege `permissions` in workflows | Default read-only `GITHUB_TOKEN`; grant `security-events: write` only to CodeQL |
| CodeQL SAST workflow | GitHub-native static analysis; no repo dependency; enterprise security baseline |
| Dependabot (npm + github-actions) | Automated supply-chain updates; framework majors ignored as deliberate decisions |
| PR template + issue templates + CODEOWNERS | Structured, reviewable changes for humans and AI agents; ownership routing |
| Root `.github/SECURITY.md` | GitHub-discoverable policy pointing to `docs/SECURITY.md` |

## Explicitly deferred

| Item | Why deferred | When to add |
| --- | --- | --- |
| Live `useQuery` exemplar in `src/` | No backend contract yet; docs recipe is enough | First real endpoint |
| Full Feature-Sliced Design (`entities`/`widgets`) | Over-structured for pre-feature starter | When domain count and team size justify layers |
| Playwright E2E | Needs real user journeys / staging | After first authenticated flows exist |
| MSW | Valuable, but API contracts are undefined | When OpenAPI or first endpoints stabilize |
| i18n | Product locales unknown | When localization requirements arrive |
| Sentry / Datadog / OTel | Vendor choice is organizational | Wire into `logger` when chosen |
| Managed auth (Auth0, Clerk, Entra ID) | IdP unknown | Plug into `features/auth` session model |
| Storybook | Costly until design system churns | When UI primitives multiply |
| OpenAPI client generation | No schema yet | When backend publishes OpenAPI |
| Dark-mode theme switcher | `.dark` tokens exist; product UX undecided | When brand/theme requirements arrive |
| eslint-plugin-boundaries | Biome enforces imports via `noRestrictedImports` | Only if Biome patterns prove insufficient |
| Cookie-vs-Bearer as exclusive default | Prefer cookies when API allows; Bearer bridge optional | Confirm with API security design |
