import type { Metadata } from "next";
import { Suspense } from "react";
import { getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { forbidden } from "@/lib/auth/can";
import { SoPageClient } from "./so-page-client";
import { SoPageSkeleton } from "./so-page-skeleton";

export const metadata: Metadata = {
	title: "Struktur Organisasi | Perumdam Tirta Satria",
	description: "Bagan visual hierarki struktur organisasi dan sebaran pejabat aktif Perumdam Tirta Satria.",
};

export default async function StrukturOrganisasiReportPage() {
	const [, { permissions, roles }] = await Promise.all([verifySession(), getAccountSession()]);
	if (!hasPermission(permissions, PERMISSION.LAPORAN_READ, roles)) {
		forbidden();
	}

	return (
		<Suspense fallback={<SoPageSkeleton />}>
			<SoPageClient />
		</Suspense>
	);
}
