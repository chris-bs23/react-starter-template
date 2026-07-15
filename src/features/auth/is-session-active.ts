import type { AuthSession } from "./types";

/**
 * Returns true when a session exists and has not passed `expiresAt`.
 * `expiresAt: null` means no known expiry (treat as active until cleared).
 */
export function isSessionActive(session: AuthSession | null, now: number = Date.now()): boolean {
	if (!session) {
		return false;
	}

	if (session.expiresAt === null) {
		return true;
	}

	const expiresAtMs = Date.parse(session.expiresAt);
	if (Number.isNaN(expiresAtMs)) {
		return false;
	}

	return expiresAtMs > now;
}
