type ErrorFallbackProps = {
	title?: string;
	message?: string;
	onRetry?: () => void;
};

export function ErrorFallback({
	title = "Something went wrong",
	message = "An unexpected error occurred. You can try again or reload the page.",
	onRetry,
}: ErrorFallbackProps) {
	return (
		<div
			role="alert"
			className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center gap-4 p-6"
		>
			<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
			<p className="text-muted-foreground text-sm leading-relaxed">{message}</p>
			<div className="flex flex-wrap gap-3">
				{onRetry ? (
					<button
						type="button"
						className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-sm font-medium"
						onClick={onRetry}
					>
						Try again
					</button>
				) : null}
				<button
					type="button"
					className="border-border rounded-lg border px-3 py-2 text-sm font-medium"
					onClick={() => window.location.assign("/")}
				>
					Go home
				</button>
			</div>
		</div>
	);
}
