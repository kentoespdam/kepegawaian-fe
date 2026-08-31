import { verifySession } from "@/lib/auth";
import { BatchListClient } from "./batch-list-client";

export default async function BatchPage() {
	await verifySession();

	return <BatchListClient />;
}
