import { getPegawaiSession } from "@/lib/auth";
import { BatchListClient } from "./batch-list-client";

export default async function BatchPage() {
	const { user, pegawai } = await getPegawaiSession();

	return <BatchListClient userName={user.name} jabatanNama={pegawai?.jabatan?.nama} />;
}
