export interface Prefs {
	roles: string[];
}

export interface AppwriteUser {
	$id: string;
	email: string;
	name: string;
	labels: string[];
	prefs: Prefs;
}

export type Action = "view" | "create" | "update" | "delete";

/** `GET /account/me` — roles + permissions user login (union semua role). */
export interface AccountMeResponse {
	id: number;
	name: string;
	roles: string[];
	permissions: string[];
}
