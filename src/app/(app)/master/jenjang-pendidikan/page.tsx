import { notFound } from "next/navigation";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import { can, forbidden, getRoles, verifySession } from "@/lib/auth";
import { MasterPageClient } from "../master-client";

export default async function JenjangPendidikanPage() {
  const user = await verifySession();
  const roles = getRoles(user);

  if (!MASTER_ENTITY_CONFIGS["jenjang-pendidikan"]) notFound();
  if (!can(roles, "view", "jenjang-pendidikan")) forbidden();

  return <MasterPageClient entity="jenjang-pendidikan" />;
}
