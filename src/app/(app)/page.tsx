import Link from "next/link";
import { MASTER_ENTITIES } from "@/config/entities";
import { can, getRoles, verifySession } from "@/lib/auth";

export default async function Home() {
	const user = await verifySession();
	const roles = getRoles(user);
	const visible = MASTER_ENTITIES.filter((e) => can(roles, "view", e.id));

	return (
		<div className="mx-auto max-w-4xl">
			<div className="mb-8">
				<h1 className="text-xl font-semibold text-foreground">Selamat datang, {user.name}</h1>
				<p className="mt-1 text-sm text-muted-foreground">Modul Master &middot; data referensi kepegawaian</p>
			</div>

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
				{visible.map((entity) => (
					<Link
						key={entity.id}
						href={`/master/${entity.id}`}
						className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
					>
						{entity.label}
					</Link>
				))}
			</div>

			<div className="mt-12 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
				Modul lain akan hadir
			</div>
		</div>
	);
}
