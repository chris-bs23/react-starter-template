/**
 * In-memory access-token bridge between the auth feature and the HTTP client.
 * Keeps `@/lib` free of feature imports (shared → feature is forbidden).
 *
 * Prefer HttpOnly cookies for production auth when the backend supports it.
 * This token helper exists for Bearer/Authorization setups and tests.
 */
let accessToken: string | null = null;

export function getAccessToken(): string | null {
	return accessToken;
}

export function setAccessToken(token: string | null): void {
	accessToken = token;
}
