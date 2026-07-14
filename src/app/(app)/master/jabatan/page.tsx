import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function JabatanPage() {
  const user = await verifySession();
  const roles = getRoles(user);

  if (!MASTER_ENTITY_CONFIGS.jabatan) notFound();
  if (!can(roles, "view", "jabatan")) forbidden();

  return <MasterPageClient entity="jabatan" />;
}
