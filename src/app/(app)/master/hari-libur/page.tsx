import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function HariLiburPage() {
	const user = await verifySession();
	const roles = getRoles(user);

	if (!MASTER_ENTITY_CONFIGS["hari-libur"]) notFound();
	if (!can(roles, "view", "hari-libur")) forbidden();

	return <MasterPageClient entity="hari-libur" />;
}
