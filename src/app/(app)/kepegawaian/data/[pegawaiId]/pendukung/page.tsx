import { redirect } from "next/navigation";
import { forbidden, getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";

export default async function PendukungPage() {
	// Guard konsisten dgn halaman tujuan (pendidikan) — biar redirect tak bocor ke user tanpa PEGAWAI:READ
	const [, { permissions }] = await Promise.all([verifySession(), getAccountSession()]);
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();
	redirect("./pendidikan");
}
