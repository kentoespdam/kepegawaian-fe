import { Suspense } from "react";
import { getPegawaiSession } from "@/lib/auth";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
	const { pegawai, nik } = await getPegawaiSession();
	// Pola sama dengan /cuti/pengajuan (CU-6): server pass data nullable,
	// pegawai null (akun belum terhubung) → client render empty state.
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat dashboard...</div>}>
			<DashboardClient pegawai={pegawai} nik={nik} />
		</Suspense>
	);
}
