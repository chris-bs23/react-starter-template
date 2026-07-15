import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CounterState = {
	count: number;
	increment: () => void;
	reset: () => void;
};

/**
 * Feature-local client state example.
 * Prefer keeping Zustand stores inside `features/<name>/` unless state is
 * truly cross-cutting (e.g. auth session).
 */
export const useCounterStore = create<CounterState>()(
	devtools(
		(set) => ({
			count: 0,
			increment: () => set((state) => ({ count: state.count + 1 }), false, "counter/increment"),
			reset: () => set({ count: 0 }, false, "counter/reset"),
		}),
		{ name: "counter-store" },
	),
);
