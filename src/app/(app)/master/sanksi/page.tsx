import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function SanksiPage() {
  const user = await verifySession();
  const roles = getRoles(user);

  if (!MASTER_ENTITY_CONFIGS.sanksi) notFound();
  if (!can(roles, "view", "sanksi")) forbidden();

  return <MasterPageClient entity="sanksi" />;
}
