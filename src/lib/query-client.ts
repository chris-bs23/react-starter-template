import { QueryClient } from "@tanstack/react-query";
import { toApiError } from "@/lib/api-error";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60_000,
			gcTime: 5 * 60_000,
			retry: (failureCount, error) => {
				const apiError = toApiError(error);
				if (apiError.status && apiError.status >= 400 && apiError.status < 500) {
					return false;
				}
				return failureCount < 2;
			},
			refetchOnWindowFocus: true,
		},
		mutations: {
			retry: 0,
		},
	},
});
