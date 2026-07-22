import { cookies } from "next/headers";
import { AppShell } from "@/components/app-shell";
import { verifySession } from "@/lib/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	const user = await verifySession();
	const cookieStore = await cookies();
	const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";
	return (
		<AppShell user={user} defaultOpen={defaultOpen}>
			{children}
		</AppShell>
	);
}
