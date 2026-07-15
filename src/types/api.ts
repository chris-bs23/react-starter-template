/**
 * Shared API contract helpers. Prefer feature-local types when the shape is
 * domain-specific; keep only cross-cutting response envelopes here.
 */
export type PaginatedResponse<T> = {
	items: T[];
	page: number;
	pageSize: number;
	total: number;
};

export type ApiSuccess<T> = {
	data: T;
};
