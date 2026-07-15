import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/features/counter";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const count = useCounterStore((state) => state.count);
	const increment = useCounterStore((state) => state.increment);
	const reset = useCounterStore((state) => state.reset);

	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-semibold tracking-tight">Frontend foundation</h1>
				<p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
					Starter template for large-scale feature work. Domain code lives under{" "}
					<code className="text-foreground">src/features</code>; routes stay thin. See{" "}
					<code className="text-foreground">docs/ARCHITECTURE.md</code> and{" "}
					<code className="text-foreground">docs/PATTERNS.md</code> before adding features.
				</p>
			</div>

			<div className="flex flex-wrap items-center gap-3">
				<Button type="button" onClick={increment}>
					Count is {count}
				</Button>
				<Button type="button" variant="outline" onClick={reset}>
					Reset
				</Button>
			</div>
			<p className="text-muted-foreground text-xs">
				Above: feature-local Zustand example only. Server state uses TanStack Query — see
				PATTERNS.md.
			</p>
		</section>
	);
}
