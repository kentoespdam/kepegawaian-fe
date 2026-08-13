import { getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { forbidden } from "@/lib/auth/can";
import { RolesClient } from "./roles-client";

export default async function SistemRolesPage() {
	const [, { permissions }] = await Promise.all([verifySession(), getAccountSession()]);

	if (!hasPermission(permissions, PERMISSION.SYSTEM_MANAGE_ROLE)) forbidden();

	return <RolesClient />;
}
