import { verifySession } from "@/lib/auth";
import { PersetujuanClient } from "./persetujuan-client";

export default async function PersetujuanPage() {
	await verifySession();

	return <PersetujuanClient />;
}
