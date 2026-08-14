import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function JenjangPendidikanPage() {
	await verifySession();

	if (!MASTER_ENTITY_CONFIGS["jenjang-pendidikan"]) notFound();

	return <MasterPageClient entity="jenjang-pendidikan" />;
}
