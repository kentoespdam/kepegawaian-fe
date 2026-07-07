import { AppShell } from "@/components/app-shell";
import { verifySession } from "@/lib/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await verifySession();
  return <AppShell user={user}>{children}</AppShell>;
}
