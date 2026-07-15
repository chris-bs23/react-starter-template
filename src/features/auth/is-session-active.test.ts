import { describe, expect, it } from "vitest";
import { isSessionActive } from "./is-session-active";
import type { AuthSession } from "./types";

const baseSession = (expiresAt: string | null): AuthSession => ({
	user: {
		id: "1",
		email: "a@example.com",
		displayName: "Ada",
		roles: ["viewer"],
	},
	expiresAt,
});

describe("isSessionActive", () => {
	it("returns false for null session", () => {
		expect(isSessionActive(null)).toBe(false);
	});

	it("treats null expiresAt as active", () => {
		expect(isSessionActive(baseSession(null))).toBe(true);
	});

	it("returns true before expiry", () => {
		const now = Date.parse("2026-07-15T12:00:00.000Z");
		expect(isSessionActive(baseSession("2026-07-15T13:00:00.000Z"), now)).toBe(true);
	});

	it("returns false at or after expiry", () => {
		const now = Date.parse("2026-07-15T13:00:00.000Z");
		expect(isSessionActive(baseSession("2026-07-15T13:00:00.000Z"), now)).toBe(false);
		expect(isSessionActive(baseSession("2026-07-15T12:59:59.000Z"), now)).toBe(false);
	});

	it("returns false for invalid expiresAt", () => {
		expect(isSessionActive(baseSession("not-a-date"))).toBe(false);
	});
});
