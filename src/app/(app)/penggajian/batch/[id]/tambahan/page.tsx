import { verifySession } from "@/lib/auth";
import { TambahanClient } from "./tambahan-client";

export default async function TambahanPage() {
	await verifySession();

	return <TambahanClient />;
}
