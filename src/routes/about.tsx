import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

function AboutPage() {
	return (
		<section className="flex flex-col gap-3">
			<h1 className="text-3xl font-semibold tracking-tight">About</h1>
			<p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
				Replace this page with product content. Route files should stay thin and compose feature
				modules instead of owning large UI trees.
			</p>
		</section>
	);
}
