# Components layer

## Folders

| Path | Purpose |
| --- | --- |
| `ui/` | Design-system primitives (shadcn). Domain-agnostic only. |
| `layout/` | App chrome (shell, nav). |
| `errors/` | Error and not-found UI. Keep a single `<main>` in the shell — use `<div>` here. |

## Rules

- Add UI primitives with `pnpm dlx shadcn@latest add <component>`
- Do not put business/domain UI in `ui/` — that belongs in `features/<name>/components`
- Prefer existing primitives (`Button`, `Input`, …) before custom markup
- Accessibility: preserve landmarks, button types, and labels
