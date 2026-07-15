/// <reference types="vitest/config" />
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		sourcemap: true,
		target: "es2022",
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
						return "react";
					}
					if (id.includes("node_modules/@tanstack/")) {
						return "tanstack";
					}
					return undefined;
				},
			},
		},
	},
	preview: {
		headers: {
			"X-Content-Type-Options": "nosniff",
			"X-Frame-Options": "DENY",
			"Referrer-Policy": "strict-origin-when-cross-origin",
			"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
			"Content-Security-Policy": [
				"default-src 'self'",
				"base-uri 'self'",
				"frame-ancestors 'none'",
				"object-src 'none'",
				"img-src 'self' data:",
				"font-src 'self'",
				"style-src 'self' 'unsafe-inline'",
				"script-src 'self'",
				"connect-src 'self'",
			].join("; "),
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/test/setup.ts"],
		css: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "lcov"],
			include: ["src/lib/**/*.{ts,tsx}", "src/config/**/*.{ts,tsx}", "src/features/**/*.{ts,tsx}"],
			exclude: [
				"src/**/*.d.ts",
				"src/**/index.ts",
				"src/lib/api-client.ts",
				"src/lib/query-client.ts",
			],
			thresholds: {
				lines: 70,
				functions: 70,
				branches: 55,
				statements: 70,
			},
		},
	},
});
