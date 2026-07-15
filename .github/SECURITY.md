# Security Policy

## Reporting a vulnerability

Do not open a public issue for security vulnerabilities. Report them privately to
the maintaining team (replace with your org's security contact / GitHub private
vulnerability reporting) and allow reasonable time for a fix before disclosure.

## Scope and posture

This repository is a frontend **foundation**. Its security baseline — client
secret handling, auth posture, XSS rules, transport, and CSP/headers — is
documented in [`docs/SECURITY.md`](../docs/SECURITY.md) and
[`docs/DEPLOYMENT.md`](../docs/DEPLOYMENT.md).

Automated checks in this repo:

- **Secretlint** — pre-push and CI secret scanning (`pnpm secretlint`).
- **CodeQL** — static analysis on push/PR and a weekly schedule (`.github/workflows/codeql.yml`).
- **Dependabot** — dependency and GitHub Actions updates (`.github/dependabot.yml`).
