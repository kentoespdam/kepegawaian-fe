import { Loader2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PrefPermission } from "@/types/system/permissions";
import type { PrefRole } from "@/types/system/roles";
import { getActionBadgeInfo, resolveModuleConfig, resolvePermissionMeta } from "./permission-config";

type FilterStatus = "all" | "active" | "inactive";

// ── Derived data ──

export function parsePermissions(allPermissions: PrefPermission[]) {
	return allPermissions.map((p) => resolvePermissionMeta(p.name ?? "")).filter((p) => p.code.length > 0);
}

export function groupByModule(parsed: ReturnType<typeof parsePermissions>) {
	const groups: Record<
		string,
		{
			moduleKey: string;
			config: ReturnType<typeof resolveModuleConfig>;
			permissions: ReturnType<typeof resolvePermissionMeta>[];
		}
	> = {};
	for (const perm of parsed) {
		if (!groups[perm.moduleKey]) {
			groups[perm.moduleKey] = {
				moduleKey: perm.moduleKey,
				config: resolveModuleConfig(perm.moduleKey),
				permissions: [],
			};
		}
		groups[perm.moduleKey].permissions.push(perm);
	}
	return Object.values(groups);
}

export function filterGroups(
	groups: ReturnType<typeof groupByModule>,
	activePermSet: Set<string>,
	searchQuery: string,
	statusFilter: FilterStatus,
	selectedModule: string,
) {
	const query = searchQuery.trim().toLowerCase();
	return groups
		.filter((g) => selectedModule === "ALL" || g.moduleKey === selectedModule)
		.map((g) => ({
			...g,
			permissions: g.permissions.filter((p) => {
				const isActive = activePermSet.has(p.code);
				if (statusFilter === "active" && !isActive) return false;
				if (statusFilter === "inactive" && isActive) return false;
				if (!query) return true;
				return (
					p.code.toLowerCase().includes(query) ||
					p.name.toLowerCase().includes(query) ||
					p.description.toLowerCase().includes(query) ||
					g.config.title.toLowerCase().includes(query)
				);
			}),
		}))
		.filter((g) => g.permissions.length > 0);
}

// ── PermissionGroup component ──

interface PermissionGroupProps {
	group: ReturnType<typeof groupByModule>[number];
	activePermSet: Set<string>;
	pendingKeys: Set<string>;
	isBatchPending: boolean;
	onToggle: (permCode: string, currentlyActive: boolean) => void;
	onBatchToggle: (targetPerms: string[], assign: boolean) => void;
}

export function PermissionGroup({
	group,
	activePermSet,
	pendingKeys,
	isBatchPending,
	onToggle,
	onBatchToggle,
}: PermissionGroupProps) {
	const GroupIcon = group.config.icon;
	const totalInGroup = group.permissions.length;
	const activeInGroup = group.permissions.filter((p) => activePermSet.has(p.code)).length;
	const isAllGroupActive = totalInGroup > 0 && activeInGroup === totalInGroup;
	const isNoneGroupActive = activeInGroup === 0;

	return (
		<div className="overflow-hidden rounded-xl border bg-card shadow-xs transition-shadow hover:shadow-sm">
			{/* Module Group Header */}
			<div className="flex flex-col gap-2 border-b bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-2.5">
					<div className={cn("flex size-7 items-center justify-center rounded-lg border", group.config.badgeClass)}>
						<GroupIcon className="size-4" />
					</div>
					<div>
						<div className="flex items-center gap-2">
							<h4 className="text-sm font-semibold tracking-tight text-foreground">{group.config.title}</h4>
							<Badge
								variant="outline"
								className={cn(
									"text-[11px] font-medium",
									isAllGroupActive
										? "border-emerald-200 bg-emerald-500/10 text-emerald-700 dark:border-emerald-900/50 dark:text-emerald-400"
										: activeInGroup > 0
											? "border-amber-200 bg-amber-500/10 text-amber-700 dark:border-amber-900/50 dark:text-amber-400"
											: "border-border bg-muted/60 text-muted-foreground",
								)}
							>
								{activeInGroup} / {totalInGroup} Aktif
							</Badge>
						</div>
						<p className="text-[11px] text-muted-foreground">{group.config.description}</p>
					</div>
				</div>
				{/* Module Quick Batch Action */}
				<div className="flex items-center gap-1 self-end sm:self-auto">
					<Button
						variant="ghost"
						size="sm"
						className="h-7 text-[11px] text-muted-foreground hover:text-foreground"
						disabled={isBatchPending || isAllGroupActive}
						onClick={() => {
							const unassigned = group.permissions.filter((p) => !activePermSet.has(p.code)).map((p) => p.code);
							onBatchToggle(unassigned, true);
						}}
					>
						Pilih Semua Modul
					</Button>
					<span className="text-muted-foreground/40">|</span>
					<Button
						variant="ghost"
						size="sm"
						className="h-7 text-[11px] text-muted-foreground hover:text-destructive"
						disabled={isBatchPending || isNoneGroupActive}
						onClick={() => {
							const assigned = group.permissions.filter((p) => activePermSet.has(p.code)).map((p) => p.code);
							onBatchToggle(assigned, false);
						}}
					>
						Cabut Modul
					</Button>
				</div>
			</div>

			{/* Module Permissions List */}
			<div className="divide-y divide-border/60">
				{group.permissions.map((perm) => {
					const isActive = activePermSet.has(perm.code);
					const isItemPending = pendingKeys.has(perm.code);
					const badgeInfo = getActionBadgeInfo(perm.actionType);
					const inputId = `perm-switch-${perm.code.replace(/[^a-zA-Z0-9]/g, "-")}`;

					return (
						<label
							key={perm.code}
							htmlFor={inputId}
							className={cn(
								"group relative flex cursor-pointer items-center justify-between gap-4 px-4 py-3 transition-colors outline-none",
								"hover:bg-muted/40 focus-within:bg-muted/50",
								isActive && "bg-primary/2",
							)}
						>
							<div className="flex flex-1 items-start gap-3">
								<Badge
									variant="outline"
									className={cn(
										"mt-0.5 shrink-0 px-1.5 py-0 text-[10px] font-medium uppercase tracking-wider",
										badgeInfo.className,
									)}
								>
									{badgeInfo.label}
								</Badge>
								<div className="space-y-0.5">
									<div className="flex flex-wrap items-center gap-2">
										<span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors sm:text-sm">
											{perm.name}
										</span>
										<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
											{perm.code}
										</code>
									</div>
									<p className="text-xs text-muted-foreground line-clamp-1 sm:line-clamp-none">{perm.description}</p>
								</div>
							</div>
							<div className="flex shrink-0 items-center gap-2.5">
								<span
									className={cn(
										"hidden text-xs font-medium sm:inline-block",
										isActive ? "text-primary" : "text-muted-foreground",
									)}
								>
									{isActive ? "Aktif" : "Nonaktif"}
								</span>
								<input
									type="checkbox"
									id={inputId}
									checked={isActive}
									disabled={isItemPending || isBatchPending}
									onChange={() => onToggle(perm.code, isActive)}
									className="sr-only"
								/>
								<div
									aria-hidden="true"
									className={cn(
										"relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent transition-colors",
										"group-focus-within:ring-2 group-focus-within:ring-ring group-focus-within:ring-offset-2",
										(isItemPending || isBatchPending) && "opacity-50 cursor-not-allowed",
										isActive ? "bg-primary" : "bg-muted-foreground/30",
									)}
								>
									{isItemPending ? (
										<span className="flex size-4 items-center justify-center rounded-full bg-white shadow-xs">
											<Loader2 className="size-2.5 animate-spin text-primary" />
										</span>
									) : (
										<span
											className={cn(
												"pointer-events-none block size-4 rounded-full bg-white shadow-xs ring-0 transition-transform",
												isActive ? "translate-x-4" : "translate-x-0",
											)}
										/>
									)}
								</div>
							</div>
						</label>
					);
				})}
			</div>
		</div>
	);
}

// ── Dialog Header ──

interface DialogHeaderProps {
	role: PrefRole;
	activePermissionsCount: number;
	totalPermissionsCount: number;
	percentageActive: number;
}

export function PermissionDialogHeader({
	role,
	activePermissionsCount,
	totalPermissionsCount,
	percentageActive,
}: DialogHeaderProps) {
	return (
		<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
			<div>
				<div className="flex items-center gap-2.5">
					<div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<ShieldCheck className="size-5" />
					</div>
					<div>
						<div className="flex items-center gap-2">
							<h2 className="text-lg font-semibold tracking-tight">Kelola Hak Akses</h2>
							<Badge
								variant="outline"
								className="border-primary/30 bg-primary/10 font-mono text-xs font-semibold text-primary"
							>
								{role.id}
							</Badge>
						</div>
						<p className="text-xs text-muted-foreground">
							{role.description || "Konfigurasi izin dan hak akses modul untuk role ini."}
						</p>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-3 self-start md:self-auto">
				<div className="flex flex-col items-end gap-1">
					<div className="flex items-center gap-1.5 text-xs">
						<span className="text-muted-foreground">Status Akses:</span>
						<span className="font-semibold text-foreground">
							{activePermissionsCount} / {totalPermissionsCount} Aktif
						</span>
						<span className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
							{percentageActive}%
						</span>
					</div>
					<div className="h-1.5 w-36 overflow-hidden rounded-full bg-muted">
						<div
							className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
							style={{ width: `${percentageActive}%` }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
