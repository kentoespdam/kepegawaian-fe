import { Suspense } from "react";
import { getAccountSession, getPegawaiSession, verifySession } from "@/lib/auth";
import { forbidden } from "@/lib/auth/can";
import { PersetujuanPageClient } from "../persetujuan-page-client";

export default async function CutiPersetujuanRiwayatPage() {
	const [, { isCutiApprover }] = await Promise.all([verifySession(), getAccountSession()]);
	// CU-18/ADR-0041: halaman hanya utk approver (punya anak buah) — unmount, bukan hide.
	if (!isCutiApprover) forbidden();
	const { pegawai } = await getPegawaiSession();
	// pegawai/jabatan null (gate lolos tapi sesi tak ter-resolve = inkonsistensi BE) → client render empty state (D5).
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<PersetujuanPageClient view="riwayat" pegawaiId={pegawai?.id ?? null} jabatanId={pegawai?.jabatan?.id ?? null} />
		</Suspense>
	);
}
