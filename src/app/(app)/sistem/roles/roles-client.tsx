"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KeyRound, Pencil, Plus, Search, Shield, ShieldCheck, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { systemKeys } from "@/hooks/keys/system-keys";
import { useAllPermissions } from "@/hooks/useSystemPermissions";
import { useAllRoles } from "@/hooks/useSystemRoles";
import { cn } from "@/lib/utils";
import type { PrefRole } from "@/types/system/roles";
import { RolePermissionDialog } from "./role-permission-dialog";

/** Dialog buat/edit role — POST saat create, PUT saat edit. */
function RoleFormDialog({
	open,
	onOpenChange,
	role,
	onSubmit,
	isPending,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	role: PrefRole | null;
	onSubmit: (data: { id: string; description?: string }) => void;
	isPending: boolean;
}) {
	const [id, setId] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (open) {
			setId(role?.id ?? "");
			setDescription(role?.description ?? "");
		}
	}, [open, role]);

	const submit = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		if (role === null && !id.trim()) return;
		onSubmit({ id: role?.id ?? id.trim(), description: description.trim() || undefined });
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Shield className="size-4 text-primary" />
						{role === null ? "Tambah Role Baru" : `Edit Role — ${role.id}`}
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={submit} className="space-y-4 pt-2">
					{role === null && (
						<div className="space-y-1.5">
							<Label htmlFor="role-id" className="text-xs font-semibold">
								ID / Kode Role <span className="text-destructive">*</span>
							</Label>
							<Input
								id="role-id"
								value={id}
								onChange={(e) => setId(e.target.value)}
								placeholder="mis. HRD, ADMIN_UNIT, STAF"
								className="font-mono text-sm"
								autoFocus
							/>
							<p className="text-[11px] text-muted-foreground">
								Gunakan huruf kapital dan garis bawah tanpa spasi (contoh: KEPALA_BAGIAN).
							</p>
						</div>
					)}
					<div className="space-y-1.5">
						<Label htmlFor="role-desc" className="text-xs font-semibold">
							Deskripsi Role
						</Label>
						<Input
							id="role-desc"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Keterangan singkat fungsi atau cakupan wewenang role"
						/>
					</div>
					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
							Batal
						</Button>
						<Button type="submit" size="sm" disabled={isPending || (role === null && !id.trim())}>
							{isPending ? "Menyimpan..." : role === null ? "Buat Role" : "Simpan Perubahan"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export function RolesClient() {
	const qc = useQueryClient();
	const rolesQuery = useAllRoles();
	const permsQuery = useAllPermissions();

	const roles = rolesQuery.data ?? [];
	const allPerms = permsQuery.data ?? [];

	const [tableSearch, setTableSearch] = useState("");
	const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
	const [roleForm, setRoleForm] = useState<{ open: boolean; role: PrefRole | null }>({ open: false, role: null });
	const [deleteRole, setDeleteRole] = useState<PrefRole | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	// Reactive selected role derived from live queries
	const selectedRole = (() => {
		if (!selectedRoleId) return null;
		return roles.find((r) => r.id === selectedRoleId) ?? null;
	})();

	const deleteRoleMutation = useMutation({
		mutationFn: async (roleId: string) => {
			const res = await fetch(`/api/proxy/system/roles/${roleId}`, { method: "DELETE" });
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal menghapus role");
			}
		},
		onSuccess: () => {
			toast.success("Role berhasil dihapus");
			setDeleteRole(null);
			setDeleteError(null);
			qc.invalidateQueries({ queryKey: systemKeys.roles.all() });
		},
		onError: (e: Error) => setDeleteError(e.message),
	});

	const saveRoleMutation = useMutation({
		mutationFn: async (data: { id: string; description?: string }) => {
			const res = await fetch(`/api/proxy/system/roles${roleForm.role ? `/${roleForm.role.id}` : ""}`, {
				method: roleForm.role ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(roleForm.role ? { description: data.description } : data),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal menyimpan role");
			}
		},
		onSuccess: () => {
			toast.success(roleForm.role ? "Role berhasil diperbarui" : "Role baru berhasil dibuat");
			setRoleForm({ open: false, role: null });
			qc.invalidateQueries({ queryKey: systemKeys.roles.all() });
		},
		onError: (e: Error) => toast.error(e.message),
	});

	// Filtered roles based on table search
	const filteredRoles = (() => {
		const q = tableSearch.trim().toLowerCase();
		if (!q) return roles;
		return roles.filter((r) => r.id.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q));
	})();

	const totalCatalogPermCount = allPerms.length;

	return (
		<>
			<div className="space-y-4">
				{/* Top Actions & Search Bar */}
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h3 className="text-base font-semibold tracking-tight text-foreground">Manajemen Role & Hak Akses</h3>
						<p className="text-xs text-muted-foreground">
							Kelola wewenang dan izin akses pengguna berdasarkan perannya dalam sistem.
						</p>
					</div>

					<div className="flex items-center gap-2">
						<Button size="sm" onClick={() => setRoleForm({ open: true, role: null })} className="gap-1.5 shadow-xs">
							<Plus className="size-4" />
							Tambah Role
						</Button>
					</div>
				</div>

				{/* Search & Statistics Filter Bar */}
				<div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
					<div className="relative w-full max-w-sm">
						<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Cari ID role atau deskripsi..."
							value={tableSearch}
							onChange={(e) => setTableSearch(e.target.value)}
							className="h-9 pl-9 pr-8 text-xs sm:text-sm"
						/>
						{tableSearch && (
							<button
								type="button"
								onClick={() => setTableSearch("")}
								className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								aria-label="Bersihkan pencarian"
							>
								<X className="size-3.5" />
							</button>
						)}
					</div>

					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<span>
							Total: <strong className="text-foreground">{roles.length}</strong> Role
						</span>
						<span>•</span>
						<span>
							Katalog: <strong className="text-foreground">{totalCatalogPermCount}</strong> Permission
						</span>
					</div>
				</div>

				{/* Loading & Error States */}
				{rolesQuery.isPending && (
					<div className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground">
						Memuat daftar role sistem...
					</div>
				)}

				{rolesQuery.isError && (
					<div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center text-sm text-destructive">
						Gagal memuat role.{" "}
						<Button variant="link" size="sm" className="h-auto p-0 font-medium" onClick={() => rolesQuery.refetch()}>
							Coba lagi
						</Button>
					</div>
				)}

				{/* Roles Data Table */}
				{!rolesQuery.isPending && !rolesQuery.isError && (
					<div className="overflow-hidden rounded-xl border bg-card shadow-xs">
						<table className="w-full text-sm">
							<thead className="border-b bg-muted/40 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								<tr>
									<th className="px-5 py-3">Role</th>
									<th className="px-5 py-3">Deskripsi Wewenang</th>
									<th className="px-5 py-3">Hak Akses (Permission)</th>
									<th className="px-5 py-3 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border/60">
								{filteredRoles.length === 0 ? (
									<tr>
										<td colSpan={4} className="px-5 py-8 text-center text-xs text-muted-foreground">
											{tableSearch
												? `Tidak ditemukan role yang cocok dengan "${tableSearch}".`
												: "Belum ada role yang terdaftar dalam sistem."}
										</td>
									</tr>
								) : (
									filteredRoles.map((role) => {
										const permCount = (role.permissions ?? []).length;

										return (
											<tr key={role.id} className="group transition-colors hover:bg-muted/30">
												{/* Role ID */}
												<td className="px-5 py-3.5">
													<div className="flex items-center gap-2">
														<div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
															<ShieldCheck className="size-4" />
														</div>
														<span className="font-mono text-xs font-semibold text-foreground">{role.id}</span>
													</div>
												</td>

												{/* Description */}
												<td className="max-w-xs px-5 py-3.5 text-xs text-muted-foreground">
													{role.description || "—"}
												</td>

												{/* Permission Count & Quick Button */}
												<td className="px-5 py-3.5">
													<Button
														variant="outline"
														size="sm"
														className="h-8 gap-2 border-border/80 text-xs font-medium hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
														onClick={() => setSelectedRoleId(role.id)}
														aria-label={`Kelola hak akses role ${role.id}`}
													>
														<KeyRound className="size-3.5 text-muted-foreground group-hover:text-primary" />
														<span>Kelola Permission</span>
														<Badge
															variant="secondary"
															className={cn(
																"ml-1 font-mono text-[11px]",
																permCount > 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
															)}
														>
															{permCount} / {totalCatalogPermCount}
														</Badge>
													</Button>
												</td>

												{/* Actions */}
												<td className="px-5 py-3.5 text-right">
													<div className="flex justify-end gap-1">
														<Button
															variant="ghost"
															size="icon-sm"
															className="size-8 text-muted-foreground hover:text-foreground"
															onClick={() => setRoleForm({ open: true, role })}
															aria-label={`Edit role ${role.id}`}
															title="Edit role"
														>
															<Pencil className="size-3.5" />
														</Button>
														<Button
															variant="ghost"
															size="icon-sm"
															className="size-8 text-muted-foreground hover:text-destructive"
															onClick={() => {
																setDeleteError(null);
																setDeleteRole(role);
															}}
															aria-label={`Hapus role ${role.id}`}
															title="Hapus role"
														>
															<Trash2 className="size-3.5" />
														</Button>
													</div>
												</td>
											</tr>
										);
									})
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{/* Comprehensive Role Permission Management Dialog */}
			<RolePermissionDialog
				open={selectedRoleId !== null}
				onOpenChange={(v) => {
					if (!v) setSelectedRoleId(null);
				}}
				role={selectedRole}
				allPermissions={allPerms}
				isLoadingPermissions={permsQuery.isPending}
			/>

			{/* Role Create / Edit Dialog */}
			<RoleFormDialog
				open={roleForm.open}
				onOpenChange={(v) => !v && setRoleForm({ open: false, role: null })}
				role={roleForm.role}
				onSubmit={(data) => saveRoleMutation.mutate(data)}
				isPending={saveRoleMutation.isPending}
			/>

			{/* Role Delete Confirmation Dialog */}
			<ConfirmDeleteDialog
				open={deleteRole != null}
				onOpenChange={(v) => !v && setDeleteRole(null)}
				itemLabel={`role ${deleteRole?.id ?? ""}`}
				onConfirm={() => deleteRoleMutation.mutateAsync(deleteRole?.id ?? "")}
				error={deleteError}
			/>
		</>
	);
}
