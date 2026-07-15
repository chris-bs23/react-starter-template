import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { setAccessToken } from "@/lib/auth-token";
import { isSessionActive } from "./is-session-active";
import type { AuthSession, AuthUser } from "./types";

type AuthState = {
	session: AuthSession | null;
	status: "anonymous" | "authenticated";
	setSession: (session: AuthSession, accessToken?: string | null) => void;
	clearSession: () => void;
	hasRole: (role: string) => boolean;
};

export const useAuthStore = create<AuthState>()(
	devtools(
		(set, get) => ({
			session: null,
			status: "anonymous",
			setSession: (session, accessToken = null) => {
				setAccessToken(accessToken);
				set({ session, status: "authenticated" }, false, "auth/setSession");
			},
			clearSession: () => {
				setAccessToken(null);
				set({ session: null, status: "anonymous" }, false, "auth/clearSession");
			},
			hasRole: (role) => {
				const roles = get().session?.user.roles ?? [];
				return roles.includes(role);
			},
		}),
		{ name: "auth-store" },
	),
);

export function selectCurrentUser(state: AuthState): AuthUser | null {
	if (!isSessionActive(state.session)) {
		return null;
	}
	return state.session?.user ?? null;
}

export function selectIsAuthenticated(state: AuthState): boolean {
	return isSessionActive(state.session);
}
