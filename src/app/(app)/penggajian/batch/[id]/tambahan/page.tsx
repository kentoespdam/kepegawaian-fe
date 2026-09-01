import { getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { forbidden } from "@/lib/auth/can";
import { TambahanClient } from "./tambahan-client";

export default async function TambahanPage() {
	const [, { permissions }] = await Promise.all([verifySession(), getAccountSession()]);

	if (!hasPermission(permissions, PERMISSION.PENGGAJIAN_TAMBAHAN)) forbidden();

	return <TambahanClient />;
}
