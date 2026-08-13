import { getAccountSession, getPegawaiSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { forbidden } from "@/lib/auth/can";
import { ApprovalClient } from "./approval-client";

export default async function ApprovalProfilPage() {
	const [, { permissions }, { pegawai }] = await Promise.all([
		verifySession(),
		getAccountSession(),
		getPegawaiSession(),
	]);

	if (!hasPermission(permissions, PERMISSION.PROFIL_APPROVE)) forbidden();

	return <ApprovalClient pegawaiId={pegawai?.id ?? null} />;
}
