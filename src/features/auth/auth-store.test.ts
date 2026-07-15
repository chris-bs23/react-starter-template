import { beforeEach, describe, expect, it } from "vitest";
import { getAccessToken } from "@/lib/auth-token";
import { selectCurrentUser, selectIsAuthenticated, useAuthStore } from "./auth-store";

describe("useAuthStore", () => {
	beforeEach(() => {
		useAuthStore.getState().clearSession();
	});

	it("tracks session, roles, and token bridge", () => {
		expect(useAuthStore.getState().status).toBe("anonymous");
		expect(selectIsAuthenticated(useAuthStore.getState())).toBe(false);

		useAuthStore.getState().setSession(
			{
				user: {
					id: "1",
					email: "a@example.com",
					displayName: "Ada",
					roles: ["admin"],
				},
				expiresAt: null,
			},
			"access-token",
		);

		expect(useAuthStore.getState().status).toBe("authenticated");
		expect(selectIsAuthenticated(useAuthStore.getState())).toBe(true);
		expect(selectCurrentUser(useAuthStore.getState())?.displayName).toBe("Ada");
		expect(useAuthStore.getState().hasRole("admin")).toBe(true);
		expect(useAuthStore.getState().hasRole("editor")).toBe(false);
		expect(getAccessToken()).toBe("access-token");

		useAuthStore.getState().clearSession();
		expect(useAuthStore.getState().status).toBe("anonymous");
		expect(getAccessToken()).toBeNull();
	});

	it("treats expired sessions as unauthenticated via selectors", () => {
		useAuthStore.getState().setSession(
			{
				user: {
					id: "1",
					email: "a@example.com",
					displayName: "Ada",
					roles: ["admin"],
				},
				expiresAt: "2020-01-01T00:00:00.000Z",
			},
			"access-token",
		);

		expect(useAuthStore.getState().status).toBe("authenticated");
		expect(selectIsAuthenticated(useAuthStore.getState())).toBe(false);
		expect(selectCurrentUser(useAuthStore.getState())).toBeNull();
	});
});
