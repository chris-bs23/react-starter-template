import { isRedirect } from "@tanstack/react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "./auth-store";
import { requireAuth } from "./require-auth";

describe("requireAuth", () => {
	beforeEach(() => {
		useAuthStore.getState().clearSession();
	});

	it("redirects anonymous users to loginTo", () => {
		expect(() => requireAuth()).toThrow();
		try {
			requireAuth();
		} catch (error) {
			expect(isRedirect(error)).toBe(true);
			if (isRedirect(error)) {
				expect(error.options.to).toBe("/");
			}
		}
	});

	it("allows authenticated sessions without expiry", () => {
		useAuthStore.getState().setSession(
			{
				user: {
					id: "1",
					email: "a@example.com",
					displayName: "Ada",
					roles: ["viewer"],
				},
				expiresAt: null,
			},
			"token",
		);

		expect(() => requireAuth()).not.toThrow();
	});

	it("clears and redirects expired sessions", () => {
		useAuthStore.getState().setSession(
			{
				user: {
					id: "1",
					email: "a@example.com",
					displayName: "Ada",
					roles: ["viewer"],
				},
				expiresAt: "2020-01-01T00:00:00.000Z",
			},
			"token",
		);

		try {
			requireAuth();
			expect.unreachable("expected redirect");
		} catch (error) {
			expect(isRedirect(error)).toBe(true);
		}

		expect(useAuthStore.getState().status).toBe("anonymous");
	});

	it("redirects users missing a required role to unauthorizedTo", () => {
		useAuthStore.getState().setSession(
			{
				user: {
					id: "1",
					email: "a@example.com",
					displayName: "Ada",
					roles: ["viewer"],
				},
				expiresAt: null,
			},
			"token",
		);

		try {
			requireAuth({ role: "admin", unauthorizedTo: "/" });
			expect.unreachable("expected redirect");
		} catch (error) {
			expect(isRedirect(error)).toBe(true);
			if (isRedirect(error)) {
				expect(error.options.to).toBe("/");
			}
		}

		expect(useAuthStore.getState().status).toBe("authenticated");
	});
});
