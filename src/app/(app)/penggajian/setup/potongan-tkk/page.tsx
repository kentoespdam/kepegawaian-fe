import { verifySession } from "@/lib/auth";
import { PotonganTkkClient } from "./potongan-tkk-client";

export default async function PotonganTkkPage() {
	await verifySession();

	return <PotonganTkkClient />;
}
