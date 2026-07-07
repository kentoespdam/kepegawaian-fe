import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function MasterEntityPage({ params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const user = await verifySession();
  const roles = getRoles(user);

  if (!MASTER_ENTITY_CONFIGS[entity]) notFound();
  // ponytail: RBAC gate — unmount UI, BUKAN disabled
  if (!can(roles, "view", entity)) forbidden();

  return <MasterPageClient />;
}
