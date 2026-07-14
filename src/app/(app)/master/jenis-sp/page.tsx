import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function JenisSpPage() {
	const user = await verifySession();
	const roles = getRoles(user);

	if (!MASTER_ENTITY_CONFIGS["jenis-sp"]) notFound();
	if (!can(roles, "view", "jenis-sp")) forbidden();

	return <MasterPageClient entity="jenis-sp" />;
}
