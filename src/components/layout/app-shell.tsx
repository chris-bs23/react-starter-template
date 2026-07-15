import { Link, Outlet } from "@tanstack/react-router";
import { env } from "@/config/env";

export function AppShell() {
	return (
		<div className="min-h-dvh bg-background text-foreground">
			<a
				href="#main-content"
				className="bg-primary text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-3 focus:py-2"
			>
				Skip to main content
			</a>

			<header className="border-border border-b">
				<div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
					<Link to="/" className="text-sm font-semibold tracking-tight">
						{env.VITE_APP_NAME}
					</Link>
					<nav aria-label="Primary" className="flex items-center gap-4 text-sm">
						<Link
							to="/"
							className="text-muted-foreground hover:text-foreground [&.active]:text-foreground [&.active]:font-medium"
						>
							Home
						</Link>
						<Link
							to="/about"
							className="text-muted-foreground hover:text-foreground [&.active]:text-foreground [&.active]:font-medium"
						>
							About
						</Link>
					</nav>
				</div>
			</header>

			<main id="main-content" className="mx-auto max-w-5xl px-4 py-8">
				<Outlet />
			</main>
		</div>
	);
}
