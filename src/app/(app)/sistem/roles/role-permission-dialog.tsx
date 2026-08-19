"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCheck, Filter, Layers, Loader2, RotateCcw, Search, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { systemKeys } from "@/hooks/keys/system-keys";
import { cn } from "@/lib/utils";
import type { PrefPermission } from "@/types/system/permissions";
import type { PrefRole } from "@/types/system/roles";
import { getActionBadgeInfo, resolveModuleConfig, resolvePermissionMeta } from "./permission-config";

interface RolePermissionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	role: PrefRole | null;
	allPermissions: PrefPermission[];
	isLoadingPermissions?: boolean;
}

type FilterStatus = "all" | "active" | "inactive";

export function RolePermissionDialog({
	open,
	onOpenChange,
	role,
	allPermissions,
	isLoadingPermissions = false,
}: RolePermissionDialogProps) {
	const qc = useQueryClient();
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
	const [selectedModule, setSelectedModule] = useState<string>("ALL");
	const [pendingKeys, setPendingKeys] = useState<Set<string>>(new Set());
	const [isBatchPending, setIsBatchPending] = useState(false);

	// Parse current permissions of the role into a fast Set
	const activePermSet = (() => {
		return new Set((role?.permissions ?? []).map((p) => p.name).filter(Boolean) as string[]);
	})();

	// Transform all available permissions with metadata
	const parsedPermissions = (() => {
		return allPermissions.map((p) => resolvePermissionMeta(p.name ?? "")).filter((p) => p.code.length > 0);
	})();

	// Group permissions by module
	const groupedModules = (() => {
		const groups: Record<
			string,
			{
				moduleKey: string;
				config: ReturnType<typeof resolveModuleConfig>;
				permissions: ReturnType<typeof resolvePermissionMeta>[];
			}
		> = {};

		for (const perm of parsedPermissions) {
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
	})();

	// Filtered list based on search, status filter, and module filter
	const filteredGroups = (() => {
		const query = searchQuery.trim().toLowerCase();

		return groupedModules
			.filter((group) => selectedModule === "ALL" || group.moduleKey === selectedModule)
			.map((group) => {
				const filteredPerms = group.permissions.filter((perm) => {
					const isActive = activePermSet.has(perm.code);

					// Status filter
					if (statusFilter === "active" && !isActive) return false;
					if (statusFilter === "inactive" && isActive) return false;

					// Search query filter
					if (!query) return true;

					const matchCode = perm.code.toLowerCase().includes(query);
					const matchName = perm.name.toLowerCase().includes(query);
					const matchDesc = perm.description.toLowerCase().includes(query);
					const matchModule = group.config.title.toLowerCase().includes(query);

					return matchCode || matchName || matchDesc || matchModule;
				});

				return {
					...group,
					permissions: filteredPerms,
				};
			})
			.filter((group) => group.permissions.length > 0);
	})();

	// Global metrics
	const totalPermissionsCount = parsedPermissions.length;
	const activePermissionsCount = parsedPermissions.filter((p) => activePermSet.has(p.code)).length;
	const inactivePermissionsCount = totalPermissionsCount - activePermissionsCount;
	const percentageActive =
		totalPermissionsCount > 0 ? Math.round((activePermissionsCount / totalPermissionsCount) * 100) : 0;

	// Single toggle mutation
	const toggleSingleMutation = useMutation({
		mutationFn: async ({ permName, assign }: { permName: string; assign: boolean }) => {
			if (!role) return;
			setPendingKeys((prev) => new Set(prev).add(permName));

			const res = await fetch(`/api/proxy/system/roles/${role.id}/permissions/${permName}`, {
				method: assign ? "POST" : "DELETE",
			});

			if (!res.ok && res.status !== 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? (assign ? "Gagal menetapkan permission" : "Gagal mencabut permission"));
			}
		},
		onSuccess: (_d, { permName, assign }) => {
			toast.success(
				assign
					? `Hak akses ${permName} berhasil diberikan ke role ${role?.id}`
					: `Hak akses ${permName} berhasil dicabut dari role ${role?.id}`,
			);
			qc.invalidateQueries({ queryKey: systemKeys.roles.all() });
		},
		onError: (e: Error) => {
			toast.error(e.message);
		},
		onSettled: (_d, _e, { permName }) => {
			setPendingKeys((prev) => {
				const next = new Set(prev);
				next.delete(permName);
				return next;
			});
		},
	});

	// Batch toggle for module or all
	const handleBatchToggle = async (targetPerms: string[], assign: boolean) => {
		if (!role || targetPerms.length === 0) return;
		setIsBatchPending(true);

		try {
			const promises = targetPerms.map(async (permName) => {
				const res = await fetch(`/api/proxy/system/roles/${role.id}/permissions/${permName}`, {
					method: assign ? "POST" : "DELETE",
				});
				if (!res.ok && res.status !== 409) {
					const body = await res.json().catch(() => ({}));
					throw new Error(body.message ?? `Gagal memperbarui ${permName}`);
				}
			});

			await Promise.all(promises);
			toast.success(
				assign
					? `${targetPerms.length} hak akses berhasil diaktifkan untuk role ${role.id}`
					: `${targetPerms.length} hak akses berhasil dicabut dari role ${role.id}`,
			);
			qc.invalidateQueries({ queryKey: systemKeys.roles.all() });
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : "Gagal memproses perubahan batch";
			toast.error(msg);
			qc.invalidateQueries({ queryKey: systemKeys.roles.all() });
		} finally {
			setIsBatchPending(false);
		}
	};

	const handleTogglePermission = (permCode: string, currentlyActive: boolean) => {
		if (pendingKeys.has(permCode) || isBatchPending || !role) return;
		toggleSingleMutation.mutate({ permName: permCode, assign: !currentlyActive });
	};

	if (!role) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="flex h-[90dvh] max-h-225 w-full max-w-4xl flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
				{/* Dialog Header */}
				<DialogHeader className="shrink-0 border-b bg-card px-6 py-4">
					<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
						<div>
							<div className="flex items-center gap-2.5">
								<div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<ShieldCheck className="size-5" />
								</div>
								<div>
									<div className="flex items-center gap-2">
										<DialogTitle className="text-lg font-semibold tracking-tight">Kelola Hak Akses</DialogTitle>
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

						{/* Metric Stat Pill */}
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
								{/* Mini progress bar */}
								<div className="h-1.5 w-36 overflow-hidden rounded-full bg-muted">
									<div
										className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
										style={{ width: `${percentageActive}%` }}
									/>
								</div>
							</div>
						</div>
					</div>
				</DialogHeader>

				{/* Toolbar / Search & Filter Controls */}
				<div className="shrink-0 space-y-3 border-b bg-muted/20 px-6 py-3">
					<div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
						{/* Search Input */}
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Cari permission, modul, atau aksi (mis. cuti, pegawai, edit, hapus)..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="h-9 pl-9 pr-8 text-xs sm:text-sm"
							/>
							{searchQuery && (
								<button
									type="button"
									onClick={() => setSearchQuery("")}
									className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
									aria-label="Bersihkan pencarian"
								>
									<X className="size-3.5" />
								</button>
							)}
						</div>

						{/* Filter Tabs */}
						<div className="flex shrink-0 items-center gap-1 rounded-lg border bg-background p-1 text-xs">
							<button
								type="button"
								onClick={() => setStatusFilter("all")}
								className={cn(
									"rounded px-2.5 py-1 font-medium transition-colors",
									statusFilter === "all"
										? "bg-primary text-primary-foreground shadow-xs"
										: "text-muted-foreground hover:text-foreground",
								)}
							>
								Semua ({totalPermissionsCount})
							</button>
							<button
								type="button"
								onClick={() => setStatusFilter("active")}
								className={cn(
									"rounded px-2.5 py-1 font-medium transition-colors",
									statusFilter === "active"
										? "bg-primary text-primary-foreground shadow-xs"
										: "text-muted-foreground hover:text-foreground",
								)}
							>
								Aktif ({activePermissionsCount})
							</button>
							<button
								type="button"
								onClick={() => setStatusFilter("inactive")}
								className={cn(
									"rounded px-2.5 py-1 font-medium transition-colors",
									statusFilter === "inactive"
										? "bg-primary text-primary-foreground shadow-xs"
										: "text-muted-foreground hover:text-foreground",
								)}
							>
								Nonaktif ({inactivePermissionsCount})
							</button>
						</div>
					</div>

					{/* Module selector pills & Global Quick Actions */}
					<div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
						<div className="flex flex-wrap items-center gap-1.5 overflow-x-auto text-xs">
							<span className="flex items-center gap-1 text-muted-foreground mr-1">
								<Filter className="size-3" /> Modul:
							</span>
							<button
								type="button"
								onClick={() => setSelectedModule("ALL")}
								className={cn(
									"h-6 rounded-full border px-2.5 text-[11px] font-medium transition-all",
									selectedModule === "ALL"
										? "border-primary bg-primary/10 text-primary font-semibold"
										: "border-transparent bg-background text-muted-foreground hover:border-border hover:text-foreground",
								)}
							>
								Semua Modul
							</button>
							{groupedModules.map((grp) => (
								<button
									key={grp.moduleKey}
									type="button"
									onClick={() => setSelectedModule(grp.moduleKey)}
									className={cn(
										"h-6 rounded-full border px-2.5 text-[11px] font-medium transition-all",
										selectedModule === grp.moduleKey
											? "border-primary bg-primary/10 text-primary font-semibold"
											: "border-transparent bg-background text-muted-foreground hover:border-border hover:text-foreground",
									)}
								>
									{grp.config.title.replace("Modul ", "")}
								</button>
							))}
						</div>

						{/* Global Bulk Buttons */}
						<div className="flex items-center gap-1.5 ml-auto">
							<Button
								variant="ghost"
								size="sm"
								className="h-7 text-xs text-muted-foreground hover:text-foreground"
								disabled={isBatchPending || activePermissionsCount === totalPermissionsCount}
								onClick={() => {
									const unassigned = parsedPermissions.filter((p) => !activePermSet.has(p.code)).map((p) => p.code);
									handleBatchToggle(unassigned, true);
								}}
							>
								{isBatchPending ? (
									<Loader2 className="mr-1 size-3 animate-spin" />
								) : (
									<CheckCheck className="mr-1 size-3 text-primary" />
								)}
								Aktifkan Semua
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="h-7 text-xs text-muted-foreground hover:text-destructive"
								disabled={isBatchPending || activePermissionsCount === 0}
								onClick={() => {
									const assigned = Array.from(activePermSet);
									handleBatchToggle(assigned, false);
								}}
							>
								{isBatchPending ? (
									<Loader2 className="mr-1 size-3 animate-spin" />
								) : (
									<RotateCcw className="mr-1 size-3" />
								)}
								Cabut Semua
							</Button>
						</div>
					</div>
				</div>

				{/* Scrollable Content Body */}
				<div className="flex-1 overflow-y-auto px-6 py-5">
					{isLoadingPermissions && (
						<div className="flex h-48 flex-col items-center justify-center gap-2 text-muted-foreground">
							<Loader2 className="size-6 animate-spin text-primary" />
							<p className="text-sm">Memuat katalog permission...</p>
						</div>
					)}

					{!isLoadingPermissions && filteredGroups.length === 0 && (
						<div className="flex h-56 flex-col items-center justify-center gap-3 text-center">
							<div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
								<Layers className="size-6" />
							</div>
							<div className="space-y-1">
								<p className="text-sm font-medium text-foreground">Tidak ada permission yang cocok</p>
								<p className="text-xs text-muted-foreground">
									{searchQuery
										? `Pencarian "${searchQuery}" tidak menghasilkan permission yang sesuai.`
										: "Tidak ada permission dengan filter status yang dipilih."}
								</p>
							</div>
							{(searchQuery || statusFilter !== "all" || selectedModule !== "ALL") && (
								<Button
									variant="outline"
									size="sm"
									className="text-xs"
									onClick={() => {
										setSearchQuery("");
										setStatusFilter("all");
										setSelectedModule("ALL");
									}}
								>
									Reset Filter & Pencarian
								</Button>
							)}
						</div>
					)}

					{!isLoadingPermissions && filteredGroups.length > 0 && (
						<div className="space-y-6">
							{filteredGroups.map((group) => {
								const GroupIcon = group.config.icon;
								const totalInGroup = group.permissions.length;
								const activeInGroup = group.permissions.filter((p) => activePermSet.has(p.code)).length;
								const isAllGroupActive = totalInGroup > 0 && activeInGroup === totalInGroup;
								const isNoneGroupActive = activeInGroup === 0;

								return (
									<div
										key={group.moduleKey}
										className="overflow-hidden rounded-xl border bg-card shadow-xs transition-shadow hover:shadow-sm"
									>
										{/* Module Group Header */}
										<div className="flex flex-col gap-2 border-b bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
											<div className="flex items-center gap-2.5">
												<div
													className={cn(
														"flex size-7 items-center justify-center rounded-lg border",
														group.config.badgeClass,
													)}
												>
													<GroupIcon className="size-4" />
												</div>
												<div>
													<div className="flex items-center gap-2">
														<h4 className="text-sm font-semibold tracking-tight text-foreground">
															{group.config.title}
														</h4>
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
														const unassignedInGroup = group.permissions
															.filter((p) => !activePermSet.has(p.code))
															.map((p) => p.code);
														handleBatchToggle(unassignedInGroup, true);
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
														const assignedInGroup = group.permissions
															.filter((p) => activePermSet.has(p.code))
															.map((p) => p.code);
														handleBatchToggle(assignedInGroup, false);
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
														{/* Left Column: Action badge + Name & Description */}
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
																<p className="text-xs text-muted-foreground line-clamp-1 sm:line-clamp-none">
																	{perm.description}
																</p>
															</div>
														</div>

														{/* Right Column: Interactive Switch & State Label */}
														<div className="flex shrink-0 items-center gap-2.5">
															<span
																className={cn(
																	"hidden text-xs font-medium sm:inline-block",
																	isActive ? "text-primary" : "text-muted-foreground",
																)}
															>
																{isActive ? "Aktif" : "Nonaktif"}
															</span>

															{/* Hidden Accessible Checkbox Input */}
															<input
																type="checkbox"
																id={inputId}
																checked={isActive}
																disabled={isItemPending || isBatchPending}
																onChange={() => handleTogglePermission(perm.code, isActive)}
																className="sr-only"
															/>

															{/* Custom Switch Visual */}
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
							})}
						</div>
					)}
				</div>

				{/* Dialog Footer */}
				<div className="shrink-0 border-t bg-card px-6 py-3">
					<div className="flex items-center justify-between">
						<p className="text-xs text-muted-foreground">Perubahan hak akses disimpan otomatis ke server.</p>
						<Button
							variant="default"
							size="sm"
							onClick={() => onOpenChange(false)}
							className="px-5 text-xs font-medium"
						>
							Selesai
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
