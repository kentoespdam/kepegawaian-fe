import { Suspense } from "react";
import { forbidden, getAccountSession, hasPermission, PERMISSION, verifySession } from "@/lib/auth";
import { TerminasiClient } from "./terminasi-client";

export default async function TerminasiPage() {
	const [, { permissions }] = await Promise.all([verifySession(), getAccountSession()]);
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<TerminasiClient />
		</Suspense>
	);
}
