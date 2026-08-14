import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function AlasanBerhentiPage() {
	await verifySession();

	if (!MASTER_ENTITY_CONFIGS["alasan-berhenti"]) notFound();

	return <MasterPageClient entity="alasan-berhenti" />;
}
