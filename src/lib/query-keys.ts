/**
 * TanStack Query key factories — keep keys hierarchical and colocated per feature.
 *
 * @example
 * const counterKeys = createQueryKeys("counter");
 * counterKeys.all           // ["counter"]
 * counterKeys.lists()       // ["counter", "list"]
 * counterKeys.list({ page: 1 }) // ["counter", "list", { page: 1 }]
 * counterKeys.details()     // ["counter", "detail"]
 * counterKeys.detail("42")  // ["counter", "detail", "42"]
 */
export function createQueryKeys<TScope extends string>(scope: TScope) {
	const all = [scope] as const;

	return {
		all,
		lists: () => [...all, "list"] as const,
		list: <TFilters>(filters: TFilters) => [...all, "list", filters] as const,
		details: () => [...all, "detail"] as const,
		detail: <TId>(id: TId) => [...all, "detail", id] as const,
	};
}
