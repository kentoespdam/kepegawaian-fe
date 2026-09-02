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
import { systemKeys } from "@/hooks/keys/system-keys";
import { useAllRoles } from "@/hooks/useSystemRoles";
import { fromPage, toApiParams } from "@/lib/paging";
import { throwIfNotOk } from "@/lib/utils";
import type {
	PageResultPageUserResponse,
	PageUserResponse,
	UserPatchStatusRequest,
	UserResponse,
} from "@/types/system/users";
import { CreateUserDialog } from "./create-user-dialog";
import { RoleAssignmentDialog } from "./role-assignment-dialog";

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
		queryKey: systemKeys.users.list({ page, size, nipam, nama }),
		queryFn: async () => {
			const params: Record<string, string> = toApiParams({ page, size });
			if (nipam) params.nipam = nipam;
			if (nama) params.nama = nama;
			const res = await fetch(`/api/proxy/system/users?${new URLSearchParams(params).toString()}`);
			throwIfNotOk(res, "Gagal memuat user");
			return ((await res.json()) as PageResultPageUserResponse).data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage<UserResponse>(query.data as PageUserResponse | undefined);
	const columns = makeColumns((r) => setToggleUser(r));

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
			qc.invalidateQueries({ queryKey: systemKeys.users.all() });
		},
		onError: (e: Error) => setToggleError(e.message),
	});

	const handleToggleStatus = () => {
		if (!toggleUser?.id) return;
		setToggleError(null);
		toggleStatusMutation.mutate({ userId: String(toggleUser.id), status: !toggleUser.isActive });
	};

	const hasActive = !!(nipam || nama);

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
						<Button size="sm" onClick={() => setCreateOpen(true)}>
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
				onEdit={(item) => {
					setEditingUser(item);
				}}
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

			<RoleAssignmentDialog
				user={editingUser}
				allRoles={allRoles}
				isLoadingRoles={rolesQuery.isPending}
				onClose={() => setEditingUser(null)}
			/>
			<CreateUserDialog open={createOpen} onOpenChange={setCreateOpen} allRoles={allRoles} />

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
