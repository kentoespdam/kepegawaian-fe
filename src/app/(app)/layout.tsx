import { cookies } from "next/headers";
import { AppShell } from "@/components/app-shell";
import { getAccountSession, verifySession } from "@/lib/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	const [user, { permissions }] = await Promise.all([
		verifySession(),
		getAccountSession().catch(() => ({ permissions: [] })),
	]);
	const cookieStore = await cookies();
	const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";
	return (
		<AppShell user={user} permissions={permissions} defaultOpen={defaultOpen}>
			{children}
		</AppShell>
	);
}
