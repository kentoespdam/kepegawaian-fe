import { verifySession } from "@/lib/auth";
import { KomponenClient } from "./komponen-client";

export default async function KomponenPage() {
	await verifySession();

	return <KomponenClient />;
}
