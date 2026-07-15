# Security baseline

## Client secrets

- Never put private keys, client secrets, or long-lived credentials in `VITE_*` variables.
- Anything prefixed with `VITE_` is embedded in the browser bundle.
- Use `.env.example` for documented public config only.

## Auth posture

- Prefer HttpOnly, Secure, SameSite cookies for session tokens when the API supports them (`withCredentials` is enabled on `apiClient`).
- The in-memory Bearer helper (`src/lib/auth-token.ts`) is optional for APIs that require `Authorization` headers and for tests — not the preferred default when cookies work.
- Do not persist access tokens in `localStorage` without an explicit threat-model decision.
- This starter ships session + `requireAuth` plumbing only; wire a real IdP when chosen.

## Supply chain

- Install with `pnpm install --frozen-lockfile` in CI.
- `engine-strict=true` refuses unsupported Node versions.
- `secretlint` runs locally (pre-push) and in CI.

## XSS / HTML

- Prefer React text rendering.
- Never use `dangerouslySetInnerHTML` without a documented sanitization step.

## Transport & headers

- Enforce HTTPS in production hosting.
- Configure CSP, HSTS, `X-Content-Type-Options`, and frame ancestry at the CDN/reverse-proxy layer (not in this SPA alone).
- Follow the checklist and examples in [DEPLOYMENT.md](./DEPLOYMENT.md).
- `pnpm preview` sets conservative headers for local production smoke tests.
- Example static-host file: [`public/_headers`](../public/_headers).
