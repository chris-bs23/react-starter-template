import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ErrorFallback } from "./error-fallback";

describe("ErrorFallback", () => {
	it("renders as an alert without nesting a main landmark", () => {
		render(<ErrorFallback title="Boom" message="Failed" />);

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(screen.queryByRole("main")).not.toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Boom" })).toBeInTheDocument();
	});
});
