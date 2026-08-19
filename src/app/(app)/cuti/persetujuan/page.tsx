import { Suspense } from "react";
import { getAccountSession, getPegawaiSession, verifySession } from "@/lib/auth";
import { forbidden } from "@/lib/auth/can";
import { PersetujuanPageClient } from "./persetujuan-page-client";

export default async function CutiPersetujuanPage() {
	const [, { isCutiApprover }] = await Promise.all([verifySession(), getAccountSession()]);
	// CU-18/ADR-0041: halaman hanya utk approver (punya anak buah) — unmount, bukan hide.
	if (!isCutiApprover) forbidden();
	const { pegawai } = await getPegawaiSession();
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<PersetujuanPageClient view="menunggu" pegawaiId={pegawai?.id ?? null} jabatanId={pegawai?.jabatan?.id ?? null} />
		</Suspense>
	);
}
