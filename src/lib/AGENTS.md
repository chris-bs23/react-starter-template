# Lib layer

Shared non-UI utilities and integrations.

## Rules

- Use `@/` imports
- Do not import from `@/features` or `@/routes` (Biome-enforced)
- HTTP: extend `apiClient` / `toApiError` — do not add parallel clients
- Logging: use `logger` / `setLoggerContext` / `logger.withContext`
- Query key factories: `createQueryKeys` in `query-keys.ts`

## Prefer small named modules

Avoid dumping unrelated helpers into `utils.ts`. Add a focused file instead.
