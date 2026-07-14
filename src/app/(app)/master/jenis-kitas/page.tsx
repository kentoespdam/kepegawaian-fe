import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function JenisKitasPage() {
	const user = await verifySession();
	const roles = getRoles(user);

	if (!MASTER_ENTITY_CONFIGS["jenis-kitas"]) notFound();
	if (!can(roles, "view", "jenis-kitas")) forbidden();

	return <MasterPageClient entity="jenis-kitas" />;
}
