import { forbidden, getAccountSession, getPegawaiSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { PersetujuanClient } from "./persetujuan-client";

export default async function PersetujuanPage() {
	const [{ user, pegawai }, { roles, permissions }] = await Promise.all([
		getPegawaiSession(),
		getAccountSession(),
		verifySession(),
	]);

	if (!hasPermission(permissions, PERMISSION.PENGGAJIAN_APPROVE, roles)) {
		forbidden();
	}

	return <PersetujuanClient userName={user.name} jabatanName={pegawai?.namaJabatan ?? undefined} />;
}
