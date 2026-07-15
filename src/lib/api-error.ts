import axios from "axios";

export type ApiErrorShape = {
	status?: number;
	code?: string;
	message: string;
	details?: unknown;
	isNetworkError: boolean;
	isCanceled: boolean;
};

function isApiErrorShape(error: unknown): error is ApiErrorShape {
	return (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		"isNetworkError" in error &&
		"isCanceled" in error
	);
}

export function toApiError(error: unknown): ApiErrorShape {
	if (isApiErrorShape(error)) {
		return error;
	}

	if (axios.isCancel(error)) {
		return {
			message: "Request was canceled",
			isNetworkError: false,
			isCanceled: true,
		};
	}

	if (axios.isAxiosError(error)) {
		const status = error.response?.status;
		const data = error.response?.data as
			| { message?: string; code?: string; details?: unknown }
			| undefined;

		const normalized: ApiErrorShape = {
			message: data?.message ?? error.message ?? "Unexpected API error",
			isNetworkError: !error.response,
			isCanceled: false,
		};

		if (status !== undefined) {
			normalized.status = status;
		}

		const code = data?.code ?? error.code;
		if (code !== undefined) {
			normalized.code = code;
		}

		if (data?.details !== undefined) {
			normalized.details = data.details;
		} else if (data !== undefined) {
			normalized.details = data;
		}

		return normalized;
	}

	if (error instanceof Error) {
		return {
			message: error.message,
			isNetworkError: false,
			isCanceled: false,
		};
	}

	return {
		message: "Unknown error",
		isNetworkError: false,
		isCanceled: false,
	};
}
