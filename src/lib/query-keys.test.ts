import { describe, expect, it } from "vitest";
import { createQueryKeys } from "./query-keys";

describe("createQueryKeys", () => {
	const keys = createQueryKeys("counter");

	it("builds hierarchical keys", () => {
		expect(keys.all).toEqual(["counter"]);
		expect(keys.lists()).toEqual(["counter", "list"]);
		expect(keys.list({ page: 1 })).toEqual(["counter", "list", { page: 1 }]);
		expect(keys.details()).toEqual(["counter", "detail"]);
		expect(keys.detail("42")).toEqual(["counter", "detail", "42"]);
	});
});
