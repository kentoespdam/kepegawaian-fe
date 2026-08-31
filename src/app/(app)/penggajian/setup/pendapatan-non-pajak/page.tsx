import { verifySession } from "@/lib/auth";
import { PendapatanNonPajakClient } from "./pendapatan-non-pajak-client";

export default async function PendapatanNonPajakPage() {
	await verifySession();

	return <PendapatanNonPajakClient />;
}
