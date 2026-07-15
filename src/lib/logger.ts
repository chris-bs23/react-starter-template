import { env } from "@/config/env";

type LogLevel = "debug" | "info" | "warn" | "error";

type LogContext = Record<string, unknown>;

let baseContext: LogContext = {};

/**
 * Merge durable context into every subsequent log (e.g. last API request id).
 * Call with `null` to clear. Swap emit adapter later for Sentry/Datadog without
 * changing call sites.
 */
export function setLoggerContext(context: LogContext | null): void {
	baseContext = context ? { ...context } : {};
}

export function getLoggerContext(): LogContext {
	return { ...baseContext };
}

/**
 * Thin logging facade. Swap the adapter later for Sentry / Datadog / OpenTelemetry
 * without touching call sites across features.
 */
function emit(level: LogLevel, message: string, context?: LogContext) {
	if (env.PROD && level === "debug") {
		return;
	}

	const payload = {
		message,
		...baseContext,
		...context,
	};

	switch (level) {
		case "debug":
			console.debug("[app]", payload);
			break;
		case "info":
			console.info("[app]", payload);
			break;
		case "warn":
			console.warn("[app]", payload);
			break;
		case "error":
			console.error("[app]", payload);
			break;
	}
}

export const logger = {
	debug: (message: string, context?: LogContext) => emit("debug", message, context),
	info: (message: string, context?: LogContext) => emit("info", message, context),
	warn: (message: string, context?: LogContext) => emit("warn", message, context),
	error: (message: string, context?: LogContext) => emit("error", message, context),
	withContext: (context: LogContext) => ({
		debug: (message: string, extra?: LogContext) =>
			emit("debug", message, { ...context, ...extra }),
		info: (message: string, extra?: LogContext) => emit("info", message, { ...context, ...extra }),
		warn: (message: string, extra?: LogContext) => emit("warn", message, { ...context, ...extra }),
		error: (message: string, extra?: LogContext) =>
			emit("error", message, { ...context, ...extra }),
	}),
};
