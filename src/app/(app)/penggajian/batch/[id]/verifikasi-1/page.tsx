import { verifySession } from "@/lib/auth";
import { Verifikasi1Client } from "./verifikasi-1-client";

export default async function Verifikasi1Page() {
	await verifySession();

	return <Verifikasi1Client />;
}
