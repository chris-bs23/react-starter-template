# Patterns (copy-paste templates)

Canonical recipes for this codebase. Prefer these shapes over inventing new ones.
See also [ARCHITECTURE.md](./ARCHITECTURE.md) and root [AGENTS.md](../AGENTS.md).

The starter ships **plumbing** (providers, `apiClient`, auth guards, `createQueryKeys`).
It does **not** ship fake endpoints or demo login UIs. Paste these when a real domain arrives.

## New feature module

```text
src/features/<name>/
  api/<name>-api.ts      # HTTP via apiClient + query keys
  components/            # Feature UI (optional)
  hooks/                 # Feature hooks (optional)
  <name>-store.ts        # Zustand only when client state is needed
  types.ts
  index.ts               # Public exports only
```

`index.ts` example:

```ts
export { useOrdersQuery } from "./hooks/use-orders-query";
export type { Order } from "./types";
```

Import as `@/features/<name>` — never `@/features/<name>/hooks/...`.

## Query keys + TanStack Query

```ts
// features/orders/api/orders-api.ts
import { apiClient } from "@/lib/api-client";
import { createQueryKeys } from "@/lib/query-keys";
import type { ApiSuccess } from "@/types/api";
import type { Order } from "../types";

export const orderKeys = createQueryKeys("orders");

export async function fetchOrders(): Promise<Order[]> {
  const { data } = await apiClient.get<ApiSuccess<Order[]>>("/orders");
  return data.data;
}
```

```ts
// features/orders/hooks/use-orders-query.ts
import { useQuery } from "@tanstack/react-query";
import { fetchOrders, orderKeys } from "../api/orders-api";

export function useOrdersQuery() {
  return useQuery({
    queryKey: orderKeys.lists(),
    queryFn: fetchOrders,
  });
}
```

Export the hook from the feature `index.ts`. Keep server cache in Query — never mirror it into Zustand.

## Protected route

```ts
import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/features/auth";

export const Route = createFileRoute("/reports")({
  beforeLoad: () => requireAuth({ role: "viewer" }),
  component: ReportsPage,
});
```

- Anonymous / expired → `loginTo` (default `/` until a real login route exists)
- Authenticated but missing role → `unauthorizedTo` (default `/`)

Widen `AuthRedirectTo` in `require-auth.ts` when you add `/login` or `/unauthorized`.

## React Hook Form + Zod

```ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.email(),
});

type Values = z.infer<typeof schema>;

function ExampleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  return (
    <form onSubmit={handleSubmit(console.info)} noValidate>
      <Input aria-invalid={Boolean(errors.email)} {...register("email")} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## HTTP rules

- All network calls go through `apiClient`
- Normalize failures with `toApiError`
- Domain Zod schemas live next to the feature API when contracts stabilize
- Prefer HttpOnly cookies when the API supports them (`withCredentials` is on); use the Bearer token bridge only when required
