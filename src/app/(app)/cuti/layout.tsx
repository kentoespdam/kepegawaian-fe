"use client";

import { CalendarPlus, CheckCheck, Gauge } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const RAIL_ITEMS = [
	{ id: "kuota", label: "Kuota Cuti", href: "/cuti/kuota", icon: Gauge },
	{ id: "pengajuan", label: "Pengajuan Cuti", href: "/cuti/pengajuan", icon: CalendarPlus },
	{ id: "persetujuan", label: "Persetujuan Cuti", href: "/cuti/persetujuan", icon: CheckCheck },
] as const;

export default function CutiLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	// ponytail: prefix match per item — tiap href unik, tanpa colliding prefix
	const current = RAIL_ITEMS.find((item) => pathname.startsWith(item.href))?.id ?? "pengajuan";

	return (
		<div className="flex gap-5 items-start">
			<div className="w-64 shrink-0 rounded-lg border bg-card shadow-sm p-4 sticky top-4">
				<div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
					<h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cuti</h2>
				</div>
				<nav className="space-y-0.5 w-full" aria-label="Menu Cuti">
					{RAIL_ITEMS.map((item) => {
						const isActive = current === item.id;
						const Icon = item.icon;

						return (
							<Link
								key={item.id}
								href={item.href}
								className={cn(
									"group relative flex items-center h-11 px-3 rounded-md text-sm font-medium transition-all duration-150",
									isActive
										? "bg-accent text-foreground"
										: "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
								)}
							>
								{/* Left border accent — active only */}
								<span
									className={cn(
										"absolute inset-y-0 left-0 w-0.5 bg-primary rounded-r transition-transform duration-150",
										isActive ? "scale-y-100" : "scale-y-0",
									)}
								/>
								<Icon
									className={cn(
										"size-5 shrink-0 mr-3 transition-colors duration-150",
										isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
									)}
								/>
								<span>{item.label}</span>
							</Link>
						);
					})}
				</nav>
			</div>
			<div className="flex-1 min-w-0">{children}</div>
		</div>
	);
}
