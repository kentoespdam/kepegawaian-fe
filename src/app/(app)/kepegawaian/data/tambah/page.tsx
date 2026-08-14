import { Suspense } from "react";
import { forbidden, getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { TambahPegawaiForm } from "./tambah-form";

export default async function TambahPegawaiPage() {
	const [, { permissions }] = await Promise.all([verifySession(), getAccountSession()]);
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_WRITE)) forbidden();
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<TambahPegawaiForm />
		</Suspense>
	);
}
