import { Suspense } from "react";
import { getPegawaiSession } from "@/lib/auth";
import { PersetujuanPageClient } from "./persetujuan-page-client";

export default async function CutiPersetujuanPage() {
	const { pegawai } = await getPegawaiSession();
	// CU-10: semua pegawai login bisa akses — tanpa gate RBAC khusus.
	// pegawai null → client render empty state.
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<PersetujuanPageClient pegawaiId={pegawai?.id ?? null} />
		</Suspense>
	);
}
