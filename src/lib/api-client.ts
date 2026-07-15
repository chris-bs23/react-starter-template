import axios from "axios";

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10_000,
});

apiClient.interceptors.request.use((config) => {
	return config;
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error),
);
