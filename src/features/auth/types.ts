export type AuthUser = {
	id: string;
	email: string;
	displayName: string;
	roles: string[];
};

export type AuthSession = {
	user: AuthUser;
	/** ISO timestamp; used by route guards and refresh flows. */
	expiresAt: string | null;
};
