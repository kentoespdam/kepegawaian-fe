/** Get href for a sidebar entity — default `/master/{id}`, override via entity.href. */
export function entityHref(e: { id: string; href?: string }): string {
	return e.href ?? `/master/${e.id}`;
}

/** Get RBAC gate entity name — default `id`, `null` = always visible. */
export function entityGate(e: { id: string; gate?: string | null }): string | null {
	return e.gate !== undefined ? e.gate : e.id;
}
