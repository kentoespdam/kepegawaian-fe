import { Suspense } from "react";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { DataPegawaiClient } from "./data-pegawai-client";

export default async function DataPegawaiPage() {
	const user = await verifySession();
	const roles = getRoles(user);
	if (!can(roles, "view", "pegawai")) forbidden();
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<DataPegawaiClient />
		</Suspense>
	);
}
