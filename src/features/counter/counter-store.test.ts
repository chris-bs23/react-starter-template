import { beforeEach, describe, expect, it } from "vitest";
import { useCounterStore } from "./counter-store";

describe("useCounterStore", () => {
	beforeEach(() => {
		useCounterStore.getState().reset();
	});

	it("increments and resets the counter", () => {
		expect(useCounterStore.getState().count).toBe(0);
		useCounterStore.getState().increment();
		useCounterStore.getState().increment();
		expect(useCounterStore.getState().count).toBe(2);
		useCounterStore.getState().reset();
		expect(useCounterStore.getState().count).toBe(0);
	});
});
