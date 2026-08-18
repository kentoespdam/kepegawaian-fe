import { Suspense } from "react";
import { getPegawaiSession } from "@/lib/auth";
import { PengajuanPageClient } from "./pengajuan-page-client";

export default async function CutiPengajuanPage() {
	const { pegawai } = await getPegawaiSession();
	// CU-6: semua pegawai login bisa akses — tanpa gate RBAC khusus.
	// pegawai null (akun belum terhubung) → client render empty state.
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<PengajuanPageClient pegawaiId={pegawai?.id ?? null} />
		</Suspense>
	);
}
