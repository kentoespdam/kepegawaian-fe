"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCheck, Filter, Loader2, RotateCcw, Search, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { systemKeys } from "@/hooks/keys/system-keys";
import { cn } from "@/lib/utils";
import type { PrefPermission } from "@/types/system/permissions";
import type { PrefRole } from "@/types/system/roles";
import {
	filterGroups,
	groupByModule,
	PermissionDialogHeader,
	PermissionGroup,
	parsePermissions,
} from "./permission-group";

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

	const activePermSet = new Set((role?.permissions ?? []).map((p) => p.name).filter(Boolean) as string[]);
	const parsedPermissions = parsePermissions(allPermissions);
	const groupedModules = groupByModule(parsedPermissions);
	const filteredGroups = filterGroups(groupedModules, activePermSet, searchQuery, statusFilter, selectedModule);

	const totalPermissionsCount = parsedPermissions.length;
	const activePermissionsCount = parsedPermissions.filter((p) => activePermSet.has(p.code)).length;
	const inactivePermissionsCount = totalPermissionsCount - activePermissionsCount;
	const percentageActive =
		totalPermissionsCount > 0 ? Math.round((activePermissionsCount / totalPermissionsCount) * 100) : 0;

	// ── Toggle mutations ──

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
		onError: (e: Error) => toast.error(e.message),
		onSettled: (_d, _e, { permName }) => {
			setPendingKeys((prev) => {
				const next = new Set(prev);
				next.delete(permName);
				return next;
			});
		},
	});

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
				<DialogHeader className="shrink-0 border-b bg-card px-6 py-4">
					<PermissionDialogHeader
						role={role}
						activePermissionsCount={activePermissionsCount}
						totalPermissionsCount={totalPermissionsCount}
						percentageActive={percentageActive}
					/>
				</DialogHeader>

				{/* Toolbar */}
				<div className="shrink-0 space-y-3 border-b bg-muted/20 px-6 py-3">
					<div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
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
						<div className="flex shrink-0 items-center gap-1 rounded-lg border bg-background p-1 text-xs">
							{(["all", "active", "inactive"] as const).map((f) => (
								<button
									key={f}
									type="button"
									onClick={() => setStatusFilter(f)}
									className={cn(
										"rounded px-2.5 py-1 font-medium transition-colors",
										statusFilter === f
											? "bg-primary text-primary-foreground shadow-xs"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{f === "all" ? "Semua" : f === "active" ? "Aktif" : "Nonaktif"} (
									{f === "all"
										? totalPermissionsCount
										: f === "active"
											? activePermissionsCount
											: inactivePermissionsCount}
									)
								</button>
							))}
						</div>
					</div>

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
						<div className="flex items-center gap-1.5 ml-auto">
							<Button
								variant="ghost"
								size="sm"
								className="h-7 text-xs text-muted-foreground hover:text-foreground"
								disabled={isBatchPending || activePermissionsCount === totalPermissionsCount}
								onClick={() =>
									handleBatchToggle(
										parsedPermissions.filter((p) => !activePermSet.has(p.code)).map((p) => p.code),
										true,
									)
								}
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
								onClick={() => handleBatchToggle(Array.from(activePermSet), false)}
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

				{/* Scrollable Content */}
				<div className="flex-1 overflow-y-auto px-6 py-5">
					{isLoadingPermissions ? (
						<div className="flex h-48 flex-col items-center justify-center gap-2 text-muted-foreground">
							<Loader2 className="size-6 animate-spin text-primary" />
							<p className="text-sm">Memuat katalog permission...</p>
						</div>
					) : filteredGroups.length === 0 ? (
						<div className="flex h-56 flex-col items-center justify-center gap-3 text-center">
							<div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
								<span className="text-lg">📋</span>
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
					) : (
						<div className="space-y-6">
							{filteredGroups.map((group) => (
								<PermissionGroup
									key={group.moduleKey}
									group={group}
									activePermSet={activePermSet}
									pendingKeys={pendingKeys}
									isBatchPending={isBatchPending}
									onToggle={handleTogglePermission}
									onBatchToggle={handleBatchToggle}
								/>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
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
