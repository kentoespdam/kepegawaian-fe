import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function AlasanBerhentiPage() {
	const user = await verifySession();
	const roles = getRoles(user);

	if (!MASTER_ENTITY_CONFIGS["alasan-berhenti"]) notFound();
	if (!can(roles, "view", "alasan-berhenti")) forbidden();

	return <MasterPageClient entity="alasan-berhenti" />;
}
