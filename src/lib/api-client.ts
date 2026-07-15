import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import { toApiError } from "@/lib/api-error";
import { getAccessToken } from "@/lib/auth-token";
import { logger, setLoggerContext } from "@/lib/logger";

/**
 * Shared HTTP client for server communication.
 * Feature modules should call domain API functions that use this client —
 * do not scatter raw axios usage across UI components.
 */
export const apiClient = axios.create({
	baseURL: env.VITE_API_BASE_URL,
	timeout: 15_000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = getAccessToken();
	if (token) {
		config.headers.set("Authorization", `Bearer ${token}`);
	}

	const requestId = crypto.randomUUID();
	config.headers.set("X-Request-Id", requestId);
	config.headers.set("X-App-Name", env.VITE_APP_NAME);
	setLoggerContext({ requestId });

	return config;
});

apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		const apiError = toApiError(error);

		if (!apiError.isCanceled) {
			logger.error("API request failed", {
				status: apiError.status,
				code: apiError.code,
				message: apiError.message,
				url: error.config?.url,
				method: error.config?.method,
			});
		}

		return Promise.reject(apiError);
	},
);
