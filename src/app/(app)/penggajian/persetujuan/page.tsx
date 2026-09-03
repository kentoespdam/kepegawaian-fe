import { forbidden, getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { PersetujuanClient } from "./persetujuan-client";

export default async function PersetujuanPage() {
	const [, { roles, permissions }] = await Promise.all([verifySession(), getAccountSession()]);

	if (!hasPermission(permissions, PERMISSION.PENGGAJIAN_APPROVE, roles)) {
		forbidden();
	}

	return <PersetujuanClient />;
}
