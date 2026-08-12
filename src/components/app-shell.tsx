"use client";

import { CalendarRange, ChevronDown, DollarSign, FileText, LayoutGrid, Settings, Users } from "lucide-react";
import Image from "next/image";
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
import { entityGate, entityHref } from "@/lib/sidebar-utils";
import { cn } from "@/lib/utils";
import type { AppwriteUser } from "@/types/auth";

const MODULES = [
	{
		id: "master",
		label: "Master",
		icon: LayoutGrid,
		entities: MASTER_ENTITIES,
	},
	{
		id: "kepegawaian",
		label: "Kepegawaian",
		icon: Users,
		entities: [
			// ponytail: Dashboard = no gate (terbuka semua login)
			{ id: "dashboard", label: "Dashboard", href: "/kepegawaian/dashboard", gate: null },
			{ id: "pegawai", label: "Data Pegawai", href: "/kepegawaian/data", gate: "pegawai" },
			{ id: "terminasi", label: "Terminasi", href: "/kepegawaian/terminasi", gate: "pegawai" },
		],
	},
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

	const activeEntity = MODULE_ENTITY_MAP.find((e) => pathname === entityHref(e));
	const activeModule = MODULES.find((m) => m.entities.some((e) => pathname.startsWith(entityHref(e))));

	// Filter modules by RBAC — only show groups with at least one viewable entity
	const visibleModules = MODULES.map((mod) => ({
		...mod,
		visibleEntities: mod.entities.filter((e) => {
			const gate = entityGate(e);
			// null = no gate (always visible), otherwise check permission
			return gate === null || can(roles, "view", gate);
		}),
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
						<SidebarMenuButton size="lg" className="gap-3 py-3">
							<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-sm ring-1 ring-border/40">
								<Image
									src="/logo_pdam.svg"
									alt="Logo Perumdam Tirta Satria"
									width={28}
									height={28}
									className="size-6 object-contain"
								/>
							</div>
							<div className="flex flex-col leading-tight">
								<span className="text-xs font-bold tracking-wide text-sidebar-foreground">TIRTA SATRIA</span>
								<span className="text-[0.65rem] text-muted-foreground">Sistem Kepegawaian</span>
							</div>
						</SidebarMenuButton>
					</SidebarHeader>
					<SidebarContent>
						{visibleModules.map((mod) => (
							<SidebarMenu key={mod.id}>
								<SidebarMenuItem>
									<SidebarMenuButton
										onClick={() => toggleGroup(mod.id)}
										tooltip={mod.label}
										size="lg"
										className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto"
									>
										<mod.icon className="size-5" />
										<span>{mod.label}</span>
										<ChevronDown
											className={cn(
												"ml-auto size-5 transition-transform group-data-[collapsible=icon]:hidden",
												openGroups.has(mod.id) && "rotate-180",
											)}
										/>
									</SidebarMenuButton>
									{openGroups.has(mod.id) && (
										<SidebarMenuSub>
											{mod.visibleEntities.map((entity) => {
												const href = entityHref(entity);
												const isActive = pathname === href;
												return (
													<SidebarMenuSubButton
														key={entity.id}
														render={<Link href={href} />}
														isActive={isActive}
														className={cn(
															"min-h-11 border-l-2 border-transparent pl-[calc(0.75rem-2px)] transition-colors",
															isActive && "border-l-primary font-medium",
														)}
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
					<SidebarFooter>
						<p className="px-2 py-1 text-[0.65rem] text-sidebar-foreground/40">© 2026 Perumdam Tirta Satria</p>
					</SidebarFooter>
				</Sidebar>
				<SidebarInset className="min-w-0">
					<header className="relative flex h-16 items-center justify-between border-b border-border bg-card px-4 shadow-sm shrink-0">
						{/* R11: brand accent line — garis identitas tipis di atas topbar */}
						<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
						<div className="flex items-center gap-3">
							<SidebarTrigger />
							{activeEntity && activeModule ? (
								<nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm">
									<span className="text-muted-foreground">{activeModule.label}</span>
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
					<div className="flex-1 overflow-y-auto p-6 min-w-0">{children}</div>
				</SidebarInset>
			</SidebarProvider>
		</RolesProvider>
	);
}
