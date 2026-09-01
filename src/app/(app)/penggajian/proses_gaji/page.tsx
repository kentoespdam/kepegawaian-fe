import { getPegawaiSession } from "@/lib/auth";
import { ProsesGajiClient } from "./proses-gaji-client";

export default async function ProsesGajiPage() {
	const { user } = await getPegawaiSession();

	return <ProsesGajiClient userName={user.name} />;
}
