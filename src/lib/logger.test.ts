import { afterEach, describe, expect, it, vi } from "vitest";
import { getLoggerContext, logger, setLoggerContext } from "./logger";

describe("logger", () => {
	afterEach(() => {
		setLoggerContext(null);
		vi.restoreAllMocks();
	});

	it("writes info messages through console.info", () => {
		const spy = vi.spyOn(console, "info").mockImplementation(() => undefined);
		logger.info("hello", { requestId: "abc" });
		expect(spy).toHaveBeenCalledWith("[app]", { message: "hello", requestId: "abc" });
	});

	it("writes error messages through console.error", () => {
		const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
		logger.error("failed");
		expect(spy).toHaveBeenCalledWith("[app]", { message: "failed" });
	});

	it("merges base context into subsequent logs", () => {
		const spy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
		setLoggerContext({ requestId: "req-1" });
		expect(getLoggerContext()).toEqual({ requestId: "req-1" });
		logger.warn("slow");
		expect(spy).toHaveBeenCalledWith("[app]", { message: "slow", requestId: "req-1" });
	});

	it("scopes context with withContext", () => {
		const spy = vi.spyOn(console, "info").mockImplementation(() => undefined);
		logger.withContext({ feature: "auth" }).info("signed in", { userId: "1" });
		expect(spy).toHaveBeenCalledWith("[app]", {
			message: "signed in",
			feature: "auth",
			userId: "1",
		});
	});
});
