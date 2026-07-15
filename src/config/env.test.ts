import { describe, expect, it } from "vitest";
import { env } from "./env";

describe("env", () => {
	it("exposes a validated API base URL", () => {
		expect(env.VITE_API_BASE_URL).toMatch(/^https?:\/\//);
	});

	it("exposes an application name", () => {
		expect(env.VITE_APP_NAME.length).toBeGreaterThan(0);
	});
});
