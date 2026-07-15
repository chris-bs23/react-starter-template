import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "./auth-store";
import { isSessionActive } from "./is-session-active";

/** Route `to` values. Widen when a real login / unauthorized route is added. */
type AuthRedirectTo = "/";

type RequireAuthOptions = {
	/** Role required for the route. Omit for any authenticated user. */
	role?: string;
	/** Where to send anonymous or expired sessions. */
	loginTo?: AuthRedirectTo;
	/** Where to send authenticated users missing the required role. */
	unauthorizedTo?: AuthRedirectTo;
};

/**
 * Use inside TanStack Router `beforeLoad` to protect routes.
 *
 * @example
 * export const Route = createFileRoute('/reports')({
 *   beforeLoad: () => requireAuth({ role: 'viewer', loginTo: '/' }),
 *   component: ReportsPage,
 * })
 */
export function requireAuth(options: RequireAuthOptions = {}): void {
	const { role, loginTo = "/", unauthorizedTo = "/" } = options;
	const store = useAuthStore.getState();
	const { session, status, hasRole, clearSession } = store;

	if (status !== "authenticated" || !isSessionActive(session)) {
		if (status === "authenticated") {
			clearSession();
		}
		throw redirect({ to: loginTo });
	}

	if (role && !hasRole(role)) {
		throw redirect({ to: unauthorizedTo });
	}
}
