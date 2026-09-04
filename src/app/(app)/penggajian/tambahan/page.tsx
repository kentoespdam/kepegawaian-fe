import { forbidden, getAccountSession, getPegawaiSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { TambahanClient } from "./tambahan-client";

export default async function TambahanPage() {
	const [{ user, pegawai }, { roles, permissions }] = await Promise.all([
		getPegawaiSession(),
		getAccountSession(),
		verifySession(),
	]);

	if (!hasPermission(permissions, PERMISSION.PENGGAJIAN_TAMBAHAN, roles)) {
		forbidden();
	}

	return <TambahanClient userName={user.name} jabatanName={pegawai?.namaJabatan ?? undefined} />;
}
