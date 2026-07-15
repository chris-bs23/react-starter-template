import { z } from "zod";

/**
 * Runtime-validated client environment.
 * Only `VITE_*` keys are exposed by Vite; never put secrets here.
 */
const envSchema = z.object({
	MODE: z.enum(["development", "test", "production"]),
	DEV: z.boolean(),
	PROD: z.boolean(),
	VITE_APP_NAME: z.string().min(1).default("React Starter"),
	VITE_API_BASE_URL: z.url(),
	VITE_ENABLE_DEVTOOLS: z
		.enum(["true", "false"])
		.optional()
		.default("true")
		.transform((value) => value === "true"),
});

function readEnv() {
	const parsed = envSchema.safeParse({
		MODE: import.meta.env.MODE,
		DEV: import.meta.env.DEV,
		PROD: import.meta.env.PROD,
		VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
		VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
		VITE_ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS,
	});

	if (!parsed.success) {
		const details = parsed.error.issues
			.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
			.join("\n");
		throw new Error(`Invalid environment variables:\n${details}`);
	}

	return parsed.data;
}

export const env = readEnv();

export type Env = typeof env;
