import { Suspense } from "react";
import { getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { forbidden } from "@/lib/auth/can";
import { DnpPageClient } from "./dnp-page-client";

export default async function DNPReportPage() {
	const [, { permissions }] = await Promise.all([verifySession(), getAccountSession()]);
	if (!hasPermission(permissions, PERMISSION.LAPORAN_READ)) forbidden();

	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<DnpPageClient />
		</Suspense>
	);
}
