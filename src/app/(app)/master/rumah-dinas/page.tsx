import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function RumahDinasPage() {
  const user = await verifySession();
  const roles = getRoles(user);

  if (!MASTER_ENTITY_CONFIGS["rumah-dinas"]) notFound();
  if (!can(roles, "view", "rumah-dinas")) forbidden();

  return <MasterPageClient entity="rumah-dinas" />;
}
