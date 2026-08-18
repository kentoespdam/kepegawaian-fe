"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fromPage, toApiParams } from "@/lib/paging";
import { throwIfNotOk } from "@/lib/utils";
import type { ListResultPrefRole, PrefRole } from "@/types/system/roles";
import type {
	AuthPostRequest,
	PageResultPageUserResponse,
	PageUserResponse,
	UserPatchStatusRequest,
	UserResponse,
} from "@/types/system/users";

function useAllRoles() {
	return useQuery({
		queryKey: ["system-roles-list"],
		queryFn: async () => {
			const res = await fetch("/api/proxy/system/roles/list");
			throwIfNotOk(res, "Gagal memuat role");
			const body = (await res.json()) as ListResultPrefRole;
			return body.data ?? [];
		},
		staleTime: 5 * 60_000,
	});
}

function makeColumns(onToggle: (r: UserResponse) => void): Column<UserResponse>[] {
	return [
		{ id: "nipam", header: "NIPAM", primary: true, cell: (r) => r.nipam ?? "—" },
		{ id: "nama", header: "Nama", cell: (r) => r.nama ?? "—" },
		{
			id: "roles",
			header: "Role",
			cell: (r) => (
				<div className="flex flex-wrap gap-1">
					{(r.prefs?.roles ?? []).map((role) => (
						<Badge key={role} variant="secondary">
							{role}
						</Badge>
					))}
				</div>
			),
		},
		{
			id: "isActive",
			header: "Status",
			cell: (r) =>
				r.isActive ? (
					<Badge variant="outline" className="text-success border-success/30 bg-success/10">
						Aktif
					</Badge>
				) : (
					<Badge variant="outline" className="text-muted-foreground">
						Nonaktif
					</Badge>
				),
		},
		{
			id: "statusToggle",
			header: "",
			align: "right",
			cell: (r) => (
				<Button
					variant={r.isActive ? "outline" : "secondary"}
					size="sm"
					onClick={(e) => {
						e.stopPropagation();
						onToggle(r);
					}}
				>
					{r.isActive ? "Nonaktifkan" : "Aktifkan"}
				</Button>
			),
		},
	];
}

export function UsersClient() {
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const nipam = sp.get("nipam") ?? "";
	const nama = sp.get("nama") ?? "";

	const [editingUser, setEditingUser] = useState<UserResponse | null>(null);
	const [toggleUser, setToggleUser] = useState<UserResponse | null>(null);
	const [toggleError, setToggleError] = useState<string | null>(null);
	const [createOpen, setCreateOpen] = useState(false);
	const [createError, setCreateError] = useState<string | null>(null);
	const [createNipam, setCreateNipam] = useState("");
	const [createNama, setCreateNama] = useState("");
	const [createPassword, setCreatePassword] = useState("");
	const [createRoles, setCreateRoles] = useState<Set<string>>(new Set());

	const rolesQuery = useAllRoles();
	const allRoles = rolesQuery.data ?? [];

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/sistem/users?${p.toString()}`);
	};

	const query = useQuery({
		queryKey: ["system-users", page, size, nipam, nama],
		queryFn: async () => {
			const params: Record<string, string> = toApiParams({ page, size });
			if (nipam) params.nipam = nipam;
			if (nama) params.nama = nama;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/system/users?${qs}`);
			throwIfNotOk(res, "Gagal memuat user");
			const body = (await res.json()) as PageResultPageUserResponse;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage<UserResponse>(query.data as PageUserResponse | undefined);

	const columns = makeColumns((r) => setToggleUser(r));

	const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());

	const openRoleDialog = (user: UserResponse) => {
		setEditingUser(user);
		setSelectedRoles(new Set(user.prefs?.roles ?? []));
	};

	const assignRolesMutation = useMutation({
		mutationFn: async ({ userId, roles }: { userId: string; roles: PrefRole[] }) => {
			const res = await fetch(`/api/proxy/system/users/pref/${userId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(roles),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal memperbarui role");
			}
		},
		onSuccess: () => {
			toast.success("Role user diperbarui");
			setEditingUser(null);
			qc.invalidateQueries({ queryKey: ["system-users"] });
		},
		onError: (e: Error) => toast.error(e.message),
	});

	const toggleStatusMutation = useMutation({
		mutationFn: async ({ userId, status }: { userId: string; status: boolean }) => {
			const payload: UserPatchStatusRequest = { status };
			const res = await fetch(`/api/proxy/system/users/${userId}/status`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal mengubah status");
			}
		},
		onSuccess: () => {
			toast.success("Status user diperbarui");
			setToggleUser(null);
			qc.invalidateQueries({ queryKey: ["system-users"] });
		},
		onError: (e: Error) => setToggleError(e.message),
	});

	const createUserMutation = useMutation({
		mutationFn: async (data: AuthPostRequest) => {
			const res = await fetch("/api/proxy/system/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				const body: { message?: string } = await res.json().catch(() => ({}));
				throw new Error(body.message ?? "Gagal membuat user");
			}
		},
		onSuccess: () => {
			toast.success("User dibuat");
			setCreateOpen(false);
			setCreateError(null);
			qc.invalidateQueries({ queryKey: ["system-users"] });
		},
		onError: (e: Error) => setCreateError(e.message),
	});

	const handleSaveRoles = () => {
		if (!editingUser?.id) return;
		assignRolesMutation.mutate({
			userId: String(editingUser.id),
			roles: [...selectedRoles].map((id) => ({ id })),
		});
	};

	const handleToggleStatus = async () => {
		if (!toggleUser?.id) return;
		setToggleError(null);
		try {
			toggleStatusMutation.mutate({
				userId: String(toggleUser.id),
				status: !toggleUser.isActive,
			});
		} catch {
			// error via mutation onError → setToggleError
		}
	};

	const hasActive = !!(nipam || nama);

	const createPayload = (): AuthPostRequest | null => {
		const nipamV = createNipam.trim();
		const namaV = createNama.trim();
		const passwordV = createPassword.trim();
		if (!nipamV || !namaV) {
			setCreateError("NIPAM dan nama wajib diisi");
			return null;
		}
		return {
			nipam: nipamV,
			nama: namaV,
			password: passwordV || undefined,
			roles: [...createRoles].map((id) => ({ id })),
		};
	};

	return (
		<>
			<DataTable<UserResponse>
				toolbar={
					<DataTableToolbar
						searchFields={[
							{ name: "nipam", label: "NIPAM" },
							{ name: "nama", label: "Nama" },
						]}
						values={{ nipam, nama }}
						onFilterChange={(key, val) => nav({ [key]: val, page: "1" })}
						hasActive={hasActive}
						onReset={() => router.replace("/sistem/users")}
					>
						<Button
							size="sm"
							onClick={() => {
								setCreateNipam("");
								setCreateNama("");
								setCreatePassword("");
								setCreateRoles(new Set());
								setCreateError(null);
								setCreateOpen(true);
							}}
						>
							<Plus className="mr-1.5 size-4" />
							Tambah user
						</Button>
					</DataTableToolbar>
				}
				columns={columns}
				data={pageView.rows ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				getRowId={(item) => String(item.id ?? "")}
				onEdit={(item) => openRoleDialog(item)}
				emptyMessage="Tidak ada user"
				isFiltered={hasActive}
				onResetFilter={() => router.replace("/sistem/users")}
				pagination={
					<DataTablePagination
						page={page}
						size={size}
						total={pageView.total}
						totalPages={pageView.totalPages}
						first={pageView.first}
						last={pageView.last}
						onPageChange={(p) => nav({ page: String(p) })}
						onSizeChange={(s) => nav({ size: String(s), page: "1" })}
					/>
				}
			/>

			{/* Assign role dialog */}
			<Dialog open={editingUser != null} onOpenChange={(v) => !v && setEditingUser(null)}>
				<DialogContent className="flex max-h-[85dvh] flex-col gap-0 p-0 sm:max-w-md">
					<DialogHeader className="shrink-0 border-b px-4 py-3">
						<DialogTitle>Role — {editingUser?.nama ?? editingUser?.nipam}</DialogTitle>
					</DialogHeader>
					<div className="flex-1 space-y-1.5 overflow-y-auto p-4">
						{rolesQuery.isPending && <p className="text-sm text-muted-foreground">Memuat role...</p>}
						{allRoles.map((role) => {
							const checked = selectedRoles.has(role.id);
							return (
								<label
									key={role.id}
									className="flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2"
								>
									<span className="text-sm font-medium">{role.id}</span>
									<input
										type="checkbox"
										checked={checked}
										onChange={() => {
											const next = new Set(selectedRoles);
											if (checked) next.delete(role.id);
											else next.add(role.id);
											setSelectedRoles(next);
										}}
										className="size-4 accent-primary"
									/>
								</label>
							);
						})}
					</div>
					<div className="flex shrink-0 justify-end gap-2 border-t px-4 py-3">
						<Button variant="outline" onClick={() => setEditingUser(null)}>
							Batal
						</Button>
						<Button onClick={handleSaveRoles} disabled={assignRolesMutation.isPending}>
							Simpan
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			{/* Create user dialog */}
			<Dialog open={createOpen} onOpenChange={(v) => !v && setCreateOpen(false)}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Tambah user</DialogTitle>
					</DialogHeader>
					<div className="space-y-3">
						<div className="space-y-1.5">
							<Label htmlFor="user-nipam">NIPAM</Label>
							<Input
								id="user-nipam"
								value={createNipam}
								onChange={(e) => setCreateNipam(e.target.value)}
								placeholder="Nomor pegawai"
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="user-nama">Nama</Label>
							<Input
								id="user-nama"
								value={createNama}
								onChange={(e) => setCreateNama(e.target.value)}
								placeholder="Nama lengkap"
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="user-password">Password</Label>
							<Input
								id="user-password"
								type="password"
								value={createPassword}
								onChange={(e) => setCreatePassword(e.target.value)}
								placeholder="Opsional"
							/>
						</div>
						<div className="space-y-1.5">
							<Label>Role</Label>
							<div className="flex max-h-40 flex-col gap-1 overflow-y-auto rounded-lg border p-2">
								{allRoles.length === 0 && <p className="text-sm text-muted-foreground">Tidak ada role</p>}
								{allRoles.map((role) => {
									const checked = createRoles.has(role.id);
									return (
										<label
											key={role.id}
											className="flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2"
										>
											<span className="text-sm font-medium">{role.id}</span>
											<input
												type="checkbox"
												checked={checked}
												onChange={() => {
													const next = new Set(createRoles);
													if (checked) next.delete(role.id);
													else next.add(role.id);
													setCreateRoles(next);
												}}
												className="size-4 accent-primary"
											/>
										</label>
									);
								})}
							</div>
						</div>
						{createError && <p className="text-sm text-destructive">{createError}</p>}
						<div className="flex justify-end gap-2">
							<Button variant="outline" onClick={() => setCreateOpen(false)}>
								Batal
							</Button>
							<Button
								onClick={() => {
									const payload = createPayload();
									if (payload) createUserMutation.mutate(payload);
								}}
								disabled={createUserMutation.isPending}
							>
								Simpan
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Toggle status confirm */}
			<AlertDialog
				open={toggleUser != null}
				onOpenChange={(v) => {
					if (!v) {
						setToggleUser(null);
						setToggleError(null);
					}
				}}
			>
				<AlertDialogContent size="sm">
					<AlertDialogHeader>
						<AlertDialogTitle>{toggleUser?.isActive ? "Nonaktifkan user?" : "Aktifkan user?"}</AlertDialogTitle>
						<AlertDialogDescription>
							{toggleUser?.isActive
								? `User ${toggleUser?.nama ?? toggleUser?.nipam ?? ""} tidak akan bisa login.`
								: `User ${toggleUser?.nama ?? toggleUser?.nipam ?? ""} akan diaktifkan kembali.`}
						</AlertDialogDescription>
					</AlertDialogHeader>
					{toggleError && <p className="text-sm text-destructive">{toggleError}</p>}
					<AlertDialogFooter>
						<AlertDialogCancel disabled={toggleStatusMutation.isPending}>Batal</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleToggleStatus}
							disabled={toggleStatusMutation.isPending}
							variant={toggleUser?.isActive ? "destructive" : "default"}
						>
							{toggleUser?.isActive ? "Nonaktifkan" : "Aktifkan"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
