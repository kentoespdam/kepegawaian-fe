import { forbidden, getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { TambahanClient } from "./tambahan-client";

export default async function TambahanPage() {
	const [, { roles, permissions }] = await Promise.all([verifySession(), getAccountSession()]);

	if (!hasPermission(permissions, PERMISSION.PENGGAJIAN_TAMBAHAN, roles)) {
		forbidden();
	}

	return <TambahanClient />;
}
