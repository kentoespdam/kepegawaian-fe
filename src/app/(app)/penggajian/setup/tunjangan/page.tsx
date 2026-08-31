import { verifySession } from "@/lib/auth";
import { TunjanganClient } from "./tunjangan-client";

export default async function TunjanganPage() {
	await verifySession();

	return <TunjanganClient />;
}
