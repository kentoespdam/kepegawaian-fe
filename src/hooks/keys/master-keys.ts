/** Query key factory for master/reference data entities. */
export const masterKeys = {
	/** Base key for all master queries. */
	all: (entity: string) => [entity] as const,
	/** Key for master list queries. */
	lists: (entity: string) => [...masterKeys.all(entity), "list"] as const,
	/** Key for a specific master list with filters. */
	list: (entity: string, filters: Record<string, unknown> = {}) => [...masterKeys.lists(entity), filters] as const,
};
