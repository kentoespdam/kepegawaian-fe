import { forbidden, getAccountSession, getPegawaiSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { ProsesGajiClient } from "./proses-gaji-client";

export default async function ProsesGajiPage() {
	const [{ user, pegawai }, { roles, permissions }] = await Promise.all([
		getPegawaiSession(),
		getAccountSession(),
		verifySession(),
	]);

	if (!hasPermission(permissions, PERMISSION.PENGGAJIAN_SETUP, roles)) {
		forbidden();
	}

	return <ProsesGajiClient userName={user.name} jabatanName={pegawai?.namaJabatan ?? undefined} />;
}
