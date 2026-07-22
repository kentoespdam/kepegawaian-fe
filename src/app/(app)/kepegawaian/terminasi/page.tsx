import { Suspense } from "react";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { TerminasiClient } from "./terminasi-client";

export default async function TerminasiPage() {
	const user = await verifySession();
	const roles = getRoles(user);
	if (!can(roles, "view", "pegawai")) forbidden();
	return (
		<Suspense fallback={<div className="p-6 text-muted-foreground">Memuat...</div>}>
			<TerminasiClient />
		</Suspense>
	);
}
