import { beforeEach, describe, expect, it } from "vitest";
import { getAccessToken, setAccessToken } from "./auth-token";

describe("auth-token", () => {
	beforeEach(() => {
		setAccessToken(null);
	});

	it("stores and clears the access token in memory", () => {
		expect(getAccessToken()).toBeNull();
		setAccessToken("token-123");
		expect(getAccessToken()).toBe("token-123");
		setAccessToken(null);
		expect(getAccessToken()).toBeNull();
	});
});
