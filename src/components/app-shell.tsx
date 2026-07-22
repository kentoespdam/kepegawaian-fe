"use client";

import { CalendarRange, ChevronDown, DollarSign, FileText, LayoutGrid, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserMenu } from "@/components/user-menu";
import { MASTER_ENTITIES } from "@/config/entities";
import { RolesProvider } from "@/hooks/useRoles";
import { can, getRoles } from "@/lib/auth/can";
import { cn } from "@/lib/utils";
import type { AppwriteUser } from "@/types/auth";

const MODULES = [
	{
		id: "master",
		label: "Master",
		icon: LayoutGrid,
		entities: MASTER_ENTITIES,
	},
	{ id: "kepegawaian", label: "Kepegawaian", icon: Users, entities: [] },
	{ id: "cuti", label: "Cuti", icon: CalendarRange, entities: [] },
	{ id: "laporan", label: "Laporan", icon: FileText, entities: [] },
	{ id: "penggajian", label: "Penggajian", icon: DollarSign, entities: [] },
	{ id: "sistem", label: "Sistem", icon: Settings, entities: [] },
];

export const MODULE_ENTITY_MAP = MODULES.flatMap((m) => m.entities.map((e) => ({ ...e, moduleId: m.id })));

export function AppShell({
	user,
	children,
	defaultOpen = true,
}: {
	user: AppwriteUser;
	children: React.ReactNode;
	defaultOpen?: boolean;
}) {
	const pathname = usePathname();
	const roles = getRoles(user);

	const activeEntity = MODULE_ENTITY_MAP.find((e) => pathname === `/master/${e.id}`);
	const activeModule = MODULES.find((m) => m.entities.some((e) => pathname.startsWith(`/master/${e.id}`)));

	// Filter modules by RBAC — only show groups with at least one viewable entity
	const visibleModules = MODULES.map((mod) => ({
		...mod,
		visibleEntities: mod.entities.filter((e) => can(roles, "view", e.id)),
	})).filter((mod) => mod.visibleEntities.length > 0);

	// All visible groups default to open (tidak di-persist)
	const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(visibleModules.map((m) => m.id)));

	const toggleGroup = (id: string) => {
		setOpenGroups((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	return (
		<RolesProvider roles={roles}>
			<SidebarProvider defaultOpen={defaultOpen}>
				<Sidebar collapsible="icon">
					<SidebarHeader>
						<SidebarMenuButton size="lg">
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
								K
							</div>
							<span className="font-semibold">Kepegawaian</span>
						</SidebarMenuButton>
					</SidebarHeader>
					<SidebarContent>
						{visibleModules.map((mod) => (
							<SidebarMenu key={mod.id}>
								<SidebarMenuItem>
									<SidebarMenuButton onClick={() => toggleGroup(mod.id)} tooltip={mod.label} size="lg" className="group-data-[collapsible=icon]:justify-center">
										<mod.icon className="size-5" />
										<span>{mod.label}</span>
									<ChevronDown
										className={cn("ml-auto size-5 transition-transform group-data-[collapsible=icon]:hidden", openGroups.has(mod.id) && "rotate-180")}
									/>
									</SidebarMenuButton>
									{openGroups.has(mod.id) && (
										<SidebarMenuSub>
											{mod.visibleEntities.map((entity) => {
												const isActive = pathname === `/master/${entity.id}`;
												return (
													<SidebarMenuSubButton
														key={entity.id}
														render={<Link href={`/master/${entity.id}`} />}
														isActive={isActive}
														className="min-h-11"
													>
														{entity.label}
													</SidebarMenuSubButton>
												);
											})}
										</SidebarMenuSub>
									)}
								</SidebarMenuItem>
							</SidebarMenu>
						))}
					</SidebarContent>
					<SidebarFooter />
				</Sidebar>
				<SidebarInset>
					<header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 shrink-0">
						<div className="flex items-center gap-3">
							<SidebarTrigger />
							{pathname.startsWith("/master/") && activeEntity ? (
								<nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm">
									<span className="text-muted-foreground">{activeModule?.label ?? "Master"}</span>
									<span className="text-muted-foreground">/</span>
									<span className="text-foreground font-medium">{activeEntity.label}</span>
								</nav>
							) : (
								<h1 className="text-sm font-medium text-foreground">
									{pathname === "/" && "Beranda"}
									{pathname === "/profil" && "Profil"}
								</h1>
							)}
						</div>
						<UserMenu user={user} />
					</header>
					<div className="flex-1 overflow-y-auto p-6">{children}</div>
					<footer className="bg-card border-t border-border py-3 text-center text-xs text-muted-foreground shrink-0">
						© Perumdam Tirta Satria 2026
					</footer>
				</SidebarInset>
			</SidebarProvider>
		</RolesProvider>
	);
}
