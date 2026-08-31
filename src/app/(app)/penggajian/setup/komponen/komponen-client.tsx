"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { usePenggajianResource } from "@/hooks/penggajian/usePenggajianResource";
import { useAuth } from "@/hooks/useAuth";
import { useMasterSearchParams } from "@/hooks/useMasterSearchParams";
import { penggajianApi } from "@/lib/api/penggajian-client";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import type { GajiProfilResponse } from "@/types/_shared";
import type {
	GajiKomponenPostRequest,
	GajiKomponenResponse,
	PageResultPageGajiKomponenResponse,
} from "@/types/penggajian/komponen";

const ENTITY = "komponen";

const KOMPONEN_COLUMNS = [
	{
		id: "urut",
		header: "Urut",
		cell: (item: GajiKomponenResponse) => String(item.urut ?? ""),
	},
	{
		id: "kode",
		header: "Kode",
		cell: (item: GajiKomponenResponse) => String(item.kode ?? ""),
	},
	{
		id: "nama",
		header: "Nama",
		primary: true,
		cell: (item: GajiKomponenResponse) => String(item.nama ?? ""),
	},
	{
		id: "jenisGaji",
		header: "Jenis Gaji",
		cell: (item: GajiKomponenResponse) => String(item.jenisGaji ?? ""),
	},
	{
		id: "nilai",
		header: "Nilai",
		cell: (item: GajiKomponenResponse) => String(item.nilai ?? 0),
	},
	{
		id: "isReference",
		header: "Reference",
		cell: (item: GajiKomponenResponse) => (item.isReference ? "Ya" : "Tidak"),
	},
	{
		id: "formula",
		header: "Formula",
		cell: (item: GajiKomponenResponse) => (
			<code className="text-xs bg-muted px-1 py-0.5 rounded max-w-50 truncate block">{item.formula ?? "-"}</code>
		),
	},
];

const KOMPONEN_BASE = "/penggajian/setup/komponen";

export function KomponenClient() {
	const sp = useSearchParams();
	const router = useRouter();
	const { page, size, sortBy, sortDir, filters, setP, setFilter, resetAll } = useMasterSearchParams(
		ENTITY,
		KOMPONEN_BASE,
	);

	const { permissions } = useAuth();
	const canWrite = hasPermission(permissions, PERMISSION.PENGGAJIAN_SETUP);
	const canDelete = hasPermission(permissions, PERMISSION.PENGGAJIAN_SETUP);

	const [selectedProfilId, setSelectedProfilId] = useState<number | null>(() => {
		const urlProfilId = sp.get("profilId");
		return urlProfilId ? Number(urlProfilId) : null;
	});
	const [deletingKomponen, setDeletingKomponen] = useState<Record<string, unknown> | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	// ponytail: listAll → GET /penggajian/profil/list (unpaginated, sesuai issue kepegawaian-fe-wty1)
	const profilList = useQuery<GajiProfilResponse[]>({
		queryKey: ["penggajian", "profil", "list"],
		queryFn: () => penggajianApi.listAll<GajiProfilResponse[]>("profil"),
		staleTime: 5 * 60_000,
	});

	// Fetch komponen for selected profil
	const komponenList = usePenggajianResource<PageResultPageGajiKomponenResponse, GajiKomponenPostRequest>(
		`${ENTITY}/${selectedProfilId}/profil`,
		selectedProfilId ? toApiParams({ page, size, sortBy, sortDir, filters }) : undefined,
	);

	const profilData = profilList.data ?? [];
	const komponenPageView = fromPage(komponenList.list.data?.data);

	const handleProfilSelect = (profilId: number) => {
		setSelectedProfilId(profilId);
		// Sync profilId ke URL sebagai single source of truth
		const p = new URLSearchParams(sp.toString());
		p.set("profilId", String(profilId));
		p.set("page", "1");
		router.replace(`${KOMPONEN_BASE}?${p.toString()}`);
	};

	const handleFilterChange = (name: string, value: string | undefined) => {
		setFilter(name, value);
	};

	const openDelete = (item: GajiKomponenResponse) => {
		setDeletingKomponen(item as Record<string, unknown>);
		setDeleteError(null);
	};

	const handleDelete = async () => {
		if (!deletingKomponen) return;
		setDeleteError(null);
		try {
			await komponenList.remove.mutateAsync(String(deletingKomponen.id));
			toast.success("Komponen berhasil dihapus");
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Gagal menghapus");
			throw e;
		}
	};

	return (
		<div className="flex flex-col lg:flex-row gap-4">
			{/* Panel kiri: Daftar Profil */}
			<div className="w-full lg:w-64 shrink-0 rounded-lg border bg-card shadow-sm p-4">
				<div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
					<h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Profil Gaji</h2>
				</div>
				<div className="space-y-1">
					{profilList.isPending ? (
						<div className="space-y-2">
							{[1, 2, 3].map((i) => (
								<div key={i} className="h-10 bg-muted animate-pulse rounded" />
							))}
						</div>
					) : (
						profilData.map((profil) => (
							<button
								type="button"
								key={profil.id}
								onClick={() => {
									if (profil.id) handleProfilSelect(profil.id);
								}}
								className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
									selectedProfilId === profil.id
										? "bg-primary/10 text-primary font-medium"
										: "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
								}`}
							>
								{profil.nama ?? `Profil ${profil.id}`}
							</button>
						))
					)}
				</div>
			</div>

			{/* Panel kanan: Daftar Komponen */}
			<div className="flex-1 min-w-0">
				{selectedProfilId ? (
					<>
						<DataTableToolbar
							searchFields={[]}
							values={filters}
							onFilterChange={handleFilterChange}
							hasActive={Object.keys(filters).length > 0 || !!sortBy}
							onReset={resetAll}
						>
							{canWrite && (
								<Button className="h-11 px-4 text-sm font-semibold" disabled>
									+ Tambah Komponen
								</Button>
							)}
						</DataTableToolbar>

						<DataTable
							columns={KOMPONEN_COLUMNS}
							data={(komponenPageView.rows as GajiKomponenResponse[]) ?? []}
							isLoading={komponenList.list.isPending}
							isPlaceholder={komponenList.list.isPlaceholderData}
							isError={komponenList.list.isError}
							error={komponenList.list.error}
							onRetry={() => komponenList.list.refetch()}
							sortBy={sortBy}
							sortDirection={sortDir}
							onSort={(key) => {
								if (sortBy === key) setP("sortDirection", sortDir === "asc" ? "desc" : "asc");
								else setP({ sortBy: key, sortDirection: "asc" });
							}}
							onDelete={canDelete ? openDelete : undefined}
							getRowId={(i) => String((i as Record<string, unknown>).id ?? "")}
							pagination={
								<DataTablePagination
									page={page}
									size={size}
									total={komponenPageView.total}
									totalPages={komponenPageView.totalPages}
									first={komponenPageView.first}
									last={komponenPageView.last}
									onPageChange={(p) => setP("page", String(p))}
									onSizeChange={(s) => {
										setP("size", String(s));
										setP("page", "1");
									}}
								/>
							}
						/>
					</>
				) : (
					<div className="flex items-center justify-center h-64 text-muted-foreground">
						Pilih profil gaji di panel kiri
					</div>
				)}
			</div>

			<ConfirmDeleteDialog
				open={!!deletingKomponen}
				onOpenChange={(v) => {
					if (!v) {
						setDeletingKomponen(null);
						setDeleteError(null);
					}
				}}
				itemLabel="Komponen Gaji"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</div>
	);
}
