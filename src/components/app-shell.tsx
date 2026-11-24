"use client";

import {
	CalendarRange,
	ChevronDown,
	DollarSign,
	FileText,
	LayoutGrid,
	List,
	Settings,
	UserRound,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
	useSidebar,
} from "@/components/ui/sidebar";
import { UserMenu } from "@/components/user-menu";
import { MASTER_ENTITIES } from "@/config/entities";
import { AuthProvider } from "@/hooks/useAuth";
import { PERMISSION } from "@/lib/auth/permissions";
import { entityHref, filterVisibleEntities, MASTER_GATE, type SidebarEntity } from "@/lib/sidebar-utils";
import { cn } from "@/lib/utils";
import type { AppwriteUser } from "@/types/auth";

export interface SidebarSubGroup {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	entities: SidebarEntity[];
}

export interface SidebarModule {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	entities?: SidebarEntity[];
	subGroups?: SidebarSubGroup[];
}

type VisibleSidebarSubGroup = SidebarSubGroup & { visibleEntities: SidebarEntity[] };
type VisibleSidebarModule = SidebarModule & {
	visibleEntities: SidebarEntity[];
	visibleSubGroups?: VisibleSidebarSubGroup[];
};

const MODULES: SidebarModule[] = [
	{
		id: "cuti",
		label: "Cuti",
		icon: CalendarRange,
		entities: [
			// ponytail: kuota di-gate CUTI:WRITE (hanya Admin/HRD) — page tetap di-guard forbidden() juga;
			// pengajuan & persetujuan selalu tampil (CU-1/CU-2)
			{ id: "kuota", label: "Kuota Cuti", href: "/cuti/kuota", gate: PERMISSION.CUTI_WRITE },
			{ id: "pengajuan", label: "Pengajuan Cuti", href: "/cuti/pengajuan", gate: null },
			{ id: "persetujuan", label: "Persetujuan Cuti", href: "/cuti/persetujuan", gate: null },
		],
	},
	{
		id: "master",
		label: "Master",
		icon: LayoutGrid,
		entities: MASTER_ENTITIES.map((e) => ({
			...e,
			// Hanya yang bisa WRITE/DELETE yang melihat menu; READ (role `user`, referensi) disembunyikan
			gate: MASTER_GATE,
		})),
	},
	{
		id: "kepegawaian",
		label: "Kepegawaian",
		icon: Users,
		entities: [
			// ponytail: Dashboard = no gate (terbuka semua login)
			{ id: "dashboard", label: "Dashboard", href: "/kepegawaian/dashboard", gate: null },
			{
				id: "pegawai",
				label: "Data Pegawai",
				href: "/kepegawaian/data",
				gate: ["ADMIN", "HRD"],
			},
			{ id: "terminasi", label: "Terminasi", href: "/kepegawaian/terminasi", gate: ["ADMIN", "HRD"] },
		],
	},
	{
		id: "profil",
		label: "Profil",
		icon: UserRound,
		entities: [
			{
				id: "approval-profil",
				label: "Approval Profil",
				href: "/profil/approval",
				gate: PERMISSION.PROFIL_APPROVE,
			},
		],
	},
	{
		id: "laporan",
		label: "Laporan Kepegawaian",
		icon: FileText,
		entities: [
			{ id: "duk", label: "Daftar Urut Kepangkatan (DUK)", href: "/laporan/duk", gate: PERMISSION.LAPORAN_READ },
			{ id: "dnp", label: "Daftar Nominatif Pegawai (DNP)", href: "/laporan/dnp", gate: PERMISSION.LAPORAN_READ },
			{ id: "so", label: "Struktur Organisasi (SO)", href: "/laporan/so", gate: PERMISSION.LAPORAN_READ },
		],
	},
	{
		id: "penggajian",
		label: "Penggajian",
		icon: DollarSign,
		subGroups: [
			{
				id: "proses-batch",
				label: "Proses Batch",
				icon: List,
				entities: [
					{
						id: "kpi",
						label: "00. Input Data KPI",
						href: "/penggajian/kpi",
						gate: PERMISSION.PENGGAJIAN_SETUP,
					},
					{
						id: "proses-gaji",
						label: "01. Proses Gaji Bulanan",
						href: "/penggajian/proses-gaji",
						gate: PERMISSION.PENGGAJIAN_SETUP,
					},
					{
						id: "verifikasi",
						label: "02. Verifikasi Gapok, Tunjangan & Potongan",
						href: "/penggajian/verifikasi",
						gate: PERMISSION.PENGGAJIAN_VERIFY1,
					},
					{
						id: "tambahan",
						label: "03. Tambah Komponen Gaji",
						href: "/penggajian/tambahan",
						gate: PERMISSION.PENGGAJIAN_TAMBAHAN,
					},
					{
						id: "persetujuan",
						label: "04. Persetujuan Akhir",
						href: "/penggajian/persetujuan",
						gate: PERMISSION.PENGGAJIAN_APPROVE,
					},
				],
			},
			{
				id: "setting",
				label: "Setting",
				icon: Settings,
				entities: [
					{
						id: "komponen-gaji",
						label: "Setting Komponen Gaji",
						href: "/penggajian/setup/komponen",
						gate: PERMISSION.PENGGAJIAN_SETUP,
					},
					{
						id: "pendapatan-non-pajak",
						label: "Setting Pendapatan Non Pajak",
						href: "/penggajian/setup/pendapatan-non-pajak",
						gate: PERMISSION.PENGGAJIAN_SETUP,
					},
					{
						id: "tunjangan",
						label: "Setting Tunjangan",
						href: "/penggajian/setup/tunjangan",
						gate: PERMISSION.PENGGAJIAN_SETUP,
					},
					{
						id: "parameter-setting",
						label: "Setting Lain-lain",
						href: "/penggajian/setup/lain-lain",
						gate: PERMISSION.PENGGAJIAN_SETUP,
					},
					{
						id: "potongan-tkk",
						label: "Setting Ref Potongan TKK",
						href: "/penggajian/setup/potongan-tkk",
						gate: PERMISSION.PENGGAJIAN_SETUP,
					},
				],
			},
		],
	},
	{
		id: "sistem",
		label: "Sistem",
		icon: Settings,
		entities: [
			{ id: "roles", label: "Manajemen Role", href: "/sistem/roles", gate: ["SYSTEM"] },
			{ id: "users", label: "Manajemen User", href: "/sistem/users", gate: ["SYSTEM"] },
		],
	},
];

export const MODULE_ENTITY_MAP = MODULES.flatMap((m) => {
	const direct = (m.entities ?? []).map((e) => ({ ...e, moduleId: m.id }));
	const fromSubs = (m.subGroups ?? []).flatMap((sg) =>
		sg.entities.map((e) => ({ ...e, moduleId: m.id, subGroupId: sg.id })),
	);
	return [...direct, ...fromSubs];
});

function SidebarEntityLink({
	entity,
	pathname,
	onNavigate,
}: {
	entity: SidebarEntity;
	pathname: string;
	onNavigate?: () => void;
}) {
	const { setOpenMobile } = useSidebar();
	const href = entityHref(entity);
	const isActive = pathname === href;

	return (
		<SidebarMenuSubButton
			render={<Link href={href} />}
			isActive={isActive}
			aria-current={isActive ? "page" : undefined}
			onClick={() => {
				setOpenMobile(false);
				onNavigate?.();
			}}
			title={entity.label}
			className={cn(
				"h-auto min-h-11 border-l-2 border-transparent pl-2.5 py-2 text-sm leading-snug transition-colors",
				isActive && "border-l-primary font-semibold bg-primary/10 text-primary",
			)}
		>
			{entity.label}
		</SidebarMenuSubButton>
	);
}

function SidebarModuleNav({
	module,
	pathname,
	active,
	groupOpen,
	onToggleGroup,
	openSubGroups,
	onToggleSubGroup,
}: {
	module: VisibleSidebarModule;
	pathname: string;
	active: boolean;
	groupOpen: boolean;
	onToggleGroup: () => void;
	openSubGroups: Set<string>;
	onToggleSubGroup: (key: string) => void;
}) {
	const { state } = useSidebar();
	const [flyoutOpen, setFlyoutOpen] = useState(false);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const isCollapsed = state === "collapsed";

	const cancelClose = () => {
		if (closeTimer.current) clearTimeout(closeTimer.current);
		closeTimer.current = null;
	};
	const closeAfterPointerLeaves = () => {
		cancelClose();
		closeTimer.current = setTimeout(() => {
			const focused = document.activeElement;
			if (triggerRef.current?.contains(focused) || contentRef.current?.contains(focused)) return;
			setFlyoutOpen(false);
		}, 180);
	};
	const showFlyout = () => {
		cancelClose();
		setFlyoutOpen(true);
	};

	useEffect(
		() => () => {
			if (closeTimer.current) clearTimeout(closeTimer.current);
		},
		[],
	);

	const trigger = (
		<SidebarMenuButton
			ref={triggerRef}
			onClick={isCollapsed ? undefined : onToggleGroup}
			onPointerEnter={isCollapsed ? showFlyout : undefined}
			onPointerLeave={isCollapsed ? closeAfterPointerLeaves : undefined}
			onFocus={isCollapsed ? showFlyout : undefined}
			aria-label={module.label}
			aria-expanded={isCollapsed ? flyoutOpen : groupOpen}
			size="lg"
			isActive={active}
			className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto"
		>
			<module.icon className="size-5" />
			<span>{module.label}</span>
			<ChevronDown
				className={cn(
					"ml-auto size-5 transition-transform group-data-[collapsible=icon]:hidden",
					groupOpen && "rotate-180",
				)}
			/>
		</SidebarMenuButton>
	);

	return (
		<>
			{isCollapsed ? (
				<Popover open={flyoutOpen} onOpenChange={setFlyoutOpen}>
					<PopoverTrigger render={trigger} />
					<PopoverContent
						ref={contentRef}
						side="right"
						align="start"
						sideOffset={10}
						onPointerEnter={cancelClose}
						onPointerLeave={closeAfterPointerLeaves}
						onFocusCapture={cancelClose}
						onBlurCapture={closeAfterPointerLeaves}
						className="max-h-[min(70vh,32rem)] w-80 overflow-y-auto rounded-md border border-sidebar-border bg-sidebar p-2 text-sidebar-foreground shadow-md"
					>
						<div className="border-b border-sidebar-border px-2 pb-2 text-sm font-semibold">{module.label}</div>
						<div className="flex flex-col gap-1 pt-1">
							{module.visibleEntities.map((entity) => (
								<SidebarEntityLink
									key={entity.id}
									entity={entity}
									pathname={pathname}
									onNavigate={() => setFlyoutOpen(false)}
								/>
							))}
							{module.visibleSubGroups?.map((sub) => {
								const subKey = `${module.id}:${sub.id}`;
								const subOpen = openSubGroups.has(subKey);
								return (
									<div key={sub.id}>
										<button
											type="button"
											onClick={() => onToggleSubGroup(subKey)}
											aria-expanded={subOpen}
											className="flex min-h-11 w-full items-center justify-between rounded-md px-2 text-sm font-semibold hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
										>
											<span className="flex items-center gap-2">
												<sub.icon className="size-4 shrink-0" />
												{sub.label}
											</span>
											<ChevronDown className={cn("size-4", subOpen && "rotate-180")} />
										</button>
										{subOpen && (
											<div className="flex flex-col gap-1 pl-2">
												{sub.visibleEntities.map((entity) => (
													<SidebarEntityLink
														key={entity.id}
														entity={entity}
														pathname={pathname}
														onNavigate={() => setFlyoutOpen(false)}
													/>
												))}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</PopoverContent>
				</Popover>
			) : (
				trigger
			)}
		</>
	);
}

export function AppShell({
	user,
	roles,
	permissions,
	children,
	defaultOpen = true,
}: {
	user: AppwriteUser;
	roles: string[];
	permissions: string[];
	children: React.ReactNode;
	defaultOpen?: boolean;
}) {
	const pathname = usePathname();

	const activeEntity = MODULE_ENTITY_MAP.find((e) => pathname === entityHref(e));
	const activeModule = MODULES.find(
		(m) =>
			(m.entities ?? []).some((e) => pathname.startsWith(entityHref(e))) ||
			(m.subGroups ?? []).some((sg) => sg.entities.some((e) => pathname.startsWith(entityHref(e)))),
	);

	// Filter modules by RBAC — only show groups with at least one viewable entity
	const visibleModules = MODULES.map((mod) => {
		const visibleEntities = mod.entities ? filterVisibleEntities(mod.entities, permissions, roles) : [];
		const visibleSubGroups = mod.subGroups
			? mod.subGroups
					.map((sg) => ({
						...sg,
						visibleEntities: filterVisibleEntities(sg.entities, permissions, roles),
					}))
					.filter((sg) => sg.visibleEntities.length > 0)
			: undefined;

		return {
			...mod,
			visibleEntities,
			visibleSubGroups,
		};
	}).filter((mod) => mod.visibleEntities.length > 0 || (mod.visibleSubGroups && mod.visibleSubGroups.length > 0));

	// All visible groups default to open (tidak di-persist)
	const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(visibleModules.map((m) => m.id)));

	// Sub-groups default to open
	const allSubGroupKeys = visibleModules.flatMap((m) => m.visibleSubGroups?.map((sg) => `${m.id}:${sg.id}`) ?? []);
	const [openSubGroups, setOpenSubGroups] = useState<Set<string>>(() => new Set(allSubGroupKeys));

	const toggleGroup = (id: string) => {
		setOpenGroups((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	const toggleSubGroup = (key: string) => {
		setOpenSubGroups((prev) => {
			const next = new Set(prev);
			if (next.has(key)) next.delete(key);
			else next.add(key);
			return next;
		});
	};

	return (
		<AuthProvider roles={roles} permissions={permissions}>
			<SidebarProvider defaultOpen={defaultOpen}>
				<Sidebar collapsible="icon">
					<SidebarHeader>
						{/* h-auto: h-12 primitif adalah FLOOR (min-h-12), bukan langit-langit — konten brand 2 baris
						    (39px + p-2 = 55px) sebelumnya ter-clip ~3.5px atas/bawah oleh overflow-hidden */}
						<SidebarMenuButton size="lg" render={<Link href="/" />} className="h-auto min-h-12 gap-3">
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
								<span className="text-sm font-bold tracking-wide text-sidebar-foreground">TIRTA SATRIA</span>
								<span className="text-xs text-muted-foreground">Sistem Kepegawaian</span>
							</div>
						</SidebarMenuButton>
					</SidebarHeader>{" "}
					<SidebarContent className="gap-1.5 px-2 py-2">
						{visibleModules.map((mod) => (
							<SidebarMenu key={mod.id}>
								<SidebarMenuItem>
									<SidebarModuleNav
										module={mod}
										pathname={pathname}
										active={activeModule?.id === mod.id}
										groupOpen={openGroups.has(mod.id)}
										onToggleGroup={() => toggleGroup(mod.id)}
										openSubGroups={openSubGroups}
										onToggleSubGroup={toggleSubGroup}
									/>
									{openGroups.has(mod.id) && (
										<SidebarMenuSub>
											{mod.visibleEntities.map((entity) => (
												<SidebarEntityLink key={entity.id} entity={entity} pathname={pathname} />
											))}

											{mod.visibleSubGroups?.map((sub) => {
												const subKey = `${mod.id}:${sub.id}`;
												const isOpen = openSubGroups.has(subKey);
												const SubIcon = sub.icon;
												return (
													<div key={sub.id} className="py-1">
														<button
															type="button"
															onClick={() => toggleSubGroup(subKey)}
															aria-expanded={isOpen}
															className="flex min-h-11 w-full cursor-pointer items-center justify-between rounded-md px-2 text-xs font-semibold text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
														>
															<div className="flex items-center gap-2">
																<SubIcon className="size-4 shrink-0" />
																<span>{sub.label}</span>
															</div>
															<ChevronDown
																className={cn("size-4 shrink-0 transition-transform", isOpen && "rotate-180")}
															/>
														</button>
														{isOpen && (
															<div className="flex flex-col gap-1 pl-1.5 pt-0.5">
																{sub.visibleEntities.map((entity) => (
																	<SidebarEntityLink key={entity.id} entity={entity} pathname={pathname} />
																))}
															</div>
														)}
													</div>
												);
											})}
										</SidebarMenuSub>
									)}
								</SidebarMenuItem>
							</SidebarMenu>
						))}
					</SidebarContent>{" "}
					<SidebarFooter>
						<p className="group-data-[collapsible=icon]:hidden px-2 py-1 text-xs text-muted-foreground">
							© 2026 Perumdam Tirta Satria
						</p>
					</SidebarFooter>
				</Sidebar>
				<SidebarInset className="min-w-0" id="main-content" tabIndex={-1}>
					<header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card px-4 shrink-0">
						<div className="flex items-center gap-3">
							<SidebarTrigger />
							{activeEntity && activeModule ? (
								<nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm">
									<span className="hidden font-medium text-muted-foreground sm:inline">{activeModule.label}</span>
									<span aria-hidden="true" className="hidden text-muted-foreground sm:inline">
										/
									</span>
									<span aria-current="page" className="font-semibold text-foreground">
										{activeEntity.label}
									</span>
								</nav>
							) : (
								<h1 className="text-base font-semibold text-foreground">
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
		</AuthProvider>
	);
}
