import { Suspense } from "react";
import { getPegawaiSession } from "@/lib/auth";
import { PersetujuanPageClient } from "../persetujuan-page-client";

export default async function CutiPersetujuanRiwayatPage() {
	const { pegawai } = await getPegawaiSession();
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<PersetujuanPageClient view="riwayat" pegawaiId={pegawai?.id ?? null} jabatanId={pegawai?.jabatan?.id ?? null} />
		</Suspense>
	);
}
