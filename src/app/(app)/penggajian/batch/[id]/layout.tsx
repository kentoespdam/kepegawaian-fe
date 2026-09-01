import { verifySession } from "@/lib/auth";
import { BatchLayoutClient } from "./batch-layout-client";

export default async function BatchLayout({
	params,
	children,
}: {
	params: Promise<{ id: string }>;
	children: React.ReactNode;
}) {
	const [{ id }] = await Promise.all([params, verifySession()]);

	return <BatchLayoutClient batchId={id}>{children}</BatchLayoutClient>;
}
