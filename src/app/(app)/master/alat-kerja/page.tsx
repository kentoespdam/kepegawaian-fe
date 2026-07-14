import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function AlatKerjaPage() {
  const user = await verifySession();
  const roles = getRoles(user);

  if (!MASTER_ENTITY_CONFIGS["alat-kerja"]) notFound();
  if (!can(roles, "view", "alat-kerja")) forbidden();

  return <MasterPageClient entity="alat-kerja" />;
}
