import { Component, type ErrorInfo, type ReactNode } from "react";
import { logger } from "@/lib/logger";
import { ErrorFallback } from "./error-fallback";

type AppErrorBoundaryProps = {
	children: ReactNode;
};

type AppErrorBoundaryState = {
	hasError: boolean;
};

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
	override state: AppErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(): AppErrorBoundaryState {
		return { hasError: true };
	}

	override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		logger.error("Unhandled UI error", {
			message: error.message,
			stack: error.stack,
			componentStack: errorInfo.componentStack,
		});
	}

	private handleRetry = (): void => {
		this.setState({ hasError: false });
	};

	override render(): ReactNode {
		if (this.state.hasError) {
			return <ErrorFallback onRetry={this.handleRetry} />;
		}

		return this.props.children;
	}
}
