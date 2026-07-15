import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, type ReactNode, Suspense } from "react";
import { AppErrorBoundary } from "@/components/errors/app-error-boundary";
import { env } from "@/config/env";
import { queryClient } from "@/lib/query-client";

const ReactQueryDevtools = lazy(() =>
	import("@tanstack/react-query-devtools").then((module) => ({
		default: module.ReactQueryDevtools,
	})),
);

type AppProvidersProps = {
	children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
	const showDevtools = env.DEV && env.VITE_ENABLE_DEVTOOLS;

	return (
		<AppErrorBoundary>
			<QueryClientProvider client={queryClient}>
				{children}
				{showDevtools ? (
					<Suspense fallback={null}>
						<ReactQueryDevtools initialIsOpen={false} />
					</Suspense>
				) : null}
			</QueryClientProvider>
		</AppErrorBoundary>
	);
}
