import { forbidden, getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { VerifikasiClient } from "./verifikasi-client";

export default async function VerifikasiPage() {
	const [, { roles, permissions }] = await Promise.all([verifySession(), getAccountSession()]);

	if (!hasPermission(permissions, PERMISSION.PENGGAJIAN_VERIFY1, roles)) {
		forbidden();
	}

	return <VerifikasiClient />;
}
