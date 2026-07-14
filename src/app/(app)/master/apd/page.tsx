import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function ApdPage() {
	const user = await verifySession();
	const roles = getRoles(user);

	if (!MASTER_ENTITY_CONFIGS.apd) notFound();
	if (!can(roles, "view", "apd")) forbidden();

	return <MasterPageClient entity="apd" />;
}
