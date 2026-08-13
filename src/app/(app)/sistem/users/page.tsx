import { getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { forbidden } from "@/lib/auth/can";
import { UsersClient } from "./users-client";

export default async function SistemUsersPage() {
	const [, { permissions }] = await Promise.all([verifySession(), getAccountSession()]);

	if (!hasPermission(permissions, PERMISSION.SYSTEM_MANAGE_USER)) forbidden();

	return <UsersClient />;
}
