import { ErrorComponent, type ErrorComponentProps, Link } from "@tanstack/react-router";
import { ErrorFallback } from "./error-fallback";

export function RouteError({ error }: ErrorComponentProps) {
	if (import.meta.env.DEV) {
		return <ErrorComponent error={error} />;
	}

	return (
		<ErrorFallback
			title="Page failed to load"
			message={error.message || "This page could not be rendered."}
			onRetry={() => window.location.reload()}
		/>
	);
}

export function NotFoundPage() {
	return (
		<div className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center gap-4 p-6">
			<h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
			<p className="text-muted-foreground text-sm leading-relaxed">
				The page you requested does not exist or has been moved.
			</p>
			<Link
				to="/"
				className="bg-primary text-primary-foreground inline-flex w-fit rounded-lg px-3 py-2 text-sm font-medium"
			>
				Back to home
			</Link>
		</div>
	);
}
