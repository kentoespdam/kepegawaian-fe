/**
 * shared/auth — authentication & authorization types
 *
 * PrefRole, PrefPermission — tipe permission/role untuk RBAC.
 */

export interface PrefPermission {
	name?: string;
}

export interface PrefRole {
	id: string; // minLength 1
	description?: string;
	permissions?: PrefPermission[];
}
