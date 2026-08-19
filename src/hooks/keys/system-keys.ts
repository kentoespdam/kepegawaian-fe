/** Query key factory for system (roles, users) queries. */
export const systemKeys = {
	all: ["system"] as const,

	roles: {
		all: () => [...systemKeys.all, "roles"] as const,
		list: () => [...systemKeys.roles.all(), "list"] as const,
	},
	permissions: () => [...systemKeys.all, "permissions"] as const,
	users: {
		all: () => [...systemKeys.all, "users"] as const,
		list: (params: Record<string, unknown>) => [...systemKeys.users.all(), params] as const,
	},
} as const;
