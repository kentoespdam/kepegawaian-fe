import { forbidden, getAccountSession, getPegawaiSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { VerifikasiClient } from "./verifikasi-client";

export default async function VerifikasiPage() {
	const [{ user, pegawai }, { roles, permissions }] = await Promise.all([
		getPegawaiSession(),
		getAccountSession(),
		verifySession(),
	]);

	if (!hasPermission(permissions, PERMISSION.PENGGAJIAN_VERIFY1, roles)) {
		forbidden();
	}

	return <VerifikasiClient userName={user.name} jabatanName={pegawai?.jabatan?.nama ?? undefined} />;
}
