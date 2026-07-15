# Deployment & security headers

This app is a static SPA (Vite). Enforce transport and browser security at the
CDN / reverse proxy. Treat this document as the checklist; vendor config is the
source of truth in production.

## Checklist

1. **HTTPS only** — redirect HTTP → HTTPS; enable HSTS once stable.
2. **Hashed assets** — long-cache `/assets/*` (immutable); short-cache or no-cache `index.html`.
3. **SPA fallback** — serve `index.html` for unknown paths (client router).
4. **Security headers** — see below.
5. **CSP rollout** — start with `Content-Security-Policy-Report-Only`, fix violations, then enforce.
6. **API URL** — set `VITE_API_BASE_URL` at build time to the public API origin (never secrets).

## Recommended headers

| Header | Suggested value |
| --- | --- |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` (after HTTPS is proven) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `X-Frame-Options` | `DENY` (or rely on CSP `frame-ancestors`) |
| `Content-Security-Policy` | Tighten per app; see example |

### Example CSP (SPA starting point)

```http
Content-Security-Policy:
  default-src 'self';
  base-uri 'self';
  frame-ancestors 'none';
  object-src 'none';
  img-src 'self' data: https:;
  font-src 'self';
  style-src 'self' 'unsafe-inline';
  script-src 'self';
  connect-src 'self' https://api.example.com;
```

Adjust `connect-src` to your real API and any observability endpoints. Prefer
nonce/hash policies when your hosting layer can inject them; pure static SPAs
often cannot use per-request nonces without an edge worker.

## Local preview

`pnpm build && pnpm preview` applies conservative security headers in
`vite.config.ts` for smoke testing. Production must still set headers at the edge.

## Host snippet

[`public/_headers`](../public/_headers) is a Netlify / Cloudflare Pages–style
example. Copy or translate it to nginx, CloudFront, Azure SWA, etc.

## Related

- [SECURITY.md](./SECURITY.md) — secrets, auth posture, XSS
- [ARCHITECTURE.md](./ARCHITECTURE.md) — app boundaries
