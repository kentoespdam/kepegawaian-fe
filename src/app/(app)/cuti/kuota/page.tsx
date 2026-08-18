import { Suspense } from "react";
import { getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { forbidden } from "@/lib/auth/can";
import { KuotaPageClient } from "./kuota-page-client";

export default async function CutiKuotaPage() {
	const [, { permissions }] = await Promise.all([verifySession(), getAccountSession()]);
	// CU-2: Kuota Cuti = SDM only — CUTI:WRITE = "Kelola jenis/kuota cuti" (katalog BE)
	if (!hasPermission(permissions, PERMISSION.CUTI_WRITE)) forbidden();
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<KuotaPageClient />
		</Suspense>
	);
}
