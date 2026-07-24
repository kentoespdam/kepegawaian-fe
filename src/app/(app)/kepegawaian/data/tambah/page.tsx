import { Suspense } from "react";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { TambahPegawaiForm } from "./tambah-form";

export default async function TambahPegawaiPage() {
	const user = await verifySession();
	const roles = getRoles(user);
	if (!can(roles, "create", "pegawai")) forbidden();
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<TambahPegawaiForm />
		</Suspense>
	);
}
