import axios from "axios";
import { describe, expect, it } from "vitest";
import { toApiError } from "./api-error";

describe("toApiError", () => {
	it("normalizes native errors", () => {
		expect(toApiError(new Error("boom"))).toEqual({
			message: "boom",
			isNetworkError: false,
			isCanceled: false,
		});
	});

	it("handles unknown values", () => {
		expect(toApiError("nope").message).toBe("Unknown error");
	});

	it("passes through already normalized API errors", () => {
		const existing = {
			message: "cached",
			isNetworkError: false,
			isCanceled: false,
			status: 400,
		};
		expect(toApiError(existing)).toBe(existing);
	});

	it("normalizes axios errors", () => {
		const error = new axios.AxiosError("Request failed");
		error.response = {
			status: 500,
			statusText: "Server Error",
			headers: {},
			config: { headers: new axios.AxiosHeaders() },
			data: { message: "server says no", code: "INTERNAL" },
		};

		expect(toApiError(error)).toMatchObject({
			status: 500,
			code: "INTERNAL",
			message: "server says no",
			isNetworkError: false,
			isCanceled: false,
		});
	});
});
