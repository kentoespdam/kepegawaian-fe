import type { ReactNode } from "react";
import { can } from "@/lib/auth/can";
import type { Action } from "@/types/auth";

export function Can({
	roles,
	action,
	entity,
	children,
	fallback = null,
}: {
	roles: string[];
	action: Action;
	entity: string;
	children: ReactNode;
	fallback?: ReactNode;
}) {
	if (can(roles, action, entity)) return children;
	return fallback;
}
