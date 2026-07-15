import { createRootRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { NotFoundPage, RouteError } from "@/components/errors/route-error";
import { AppShell } from "@/components/layout/app-shell";
import { env } from "@/config/env";

const TanStackRouterDevtools = lazy(() =>
	import("@tanstack/react-router-devtools").then((module) => ({
		default: module.TanStackRouterDevtools,
	})),
);

const RootLayout = () => (
	<>
		<AppShell />
		{env.DEV && env.VITE_ENABLE_DEVTOOLS ? (
			<Suspense fallback={null}>
				<TanStackRouterDevtools position="bottom-right" />
			</Suspense>
		) : null}
	</>
);

export const Route = createRootRoute({
	component: RootLayout,
	errorComponent: RouteError,
	notFoundComponent: NotFoundPage,
});
