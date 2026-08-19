"use client";

import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { useAuth } from "@/hooks/useAuth";
import { TABS, useDataPegawai } from "@/hooks/useDataPegawai";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import type { PegawaiTableResponse } from "@/types/pegawai/pegawai";
import type { BiodataQuery } from "@/types/profil/biodata";
import { DataPegawaiToolbar } from "./data-pegawai-toolbar";
import { SheetEditGaji } from "./edit-gaji-sheet";
import { SheetEditProfil } from "./edit-profil-sheet";
import { RingkasanPanel } from "./ringkasan-panel";

const pegawaiColumns = [
	{
		id: "nipam",
		header: "NIPAM",
		sortable: true,
		primary: true,
		cell: (i: PegawaiTableResponse) => String(i.nipam ?? ""),
	},
	{ id: "nama", header: "Nama", sortable: true, cell: (i: PegawaiTableResponse) => String(i.nama ?? "") },
	{ id: "organisasi", header: "Organisasi", cell: (i: PegawaiTableResponse) => String(i.organisasi?.nama ?? "") },
	{ id: "jabatan", header: "Jabatan", cell: (i: PegawaiTableResponse) => String(i.jabatan?.nama ?? "") },
	{ id: "profesi", header: "Profesi", cell: (i: PegawaiTableResponse) => String(i.profesi?.nama ?? "") },
	{ id: "golongan", header: "Golongan/Pangkat", cell: (i: PegawaiTableResponse) => String(i.pangkatGolongan ?? "") },
	{ id: "statusPegawai", header: "Status Pegawai", cell: (i: PegawaiTableResponse) => String(i.statusPegawai ?? "") },
] as const;

const biodataColumns = [
	{ id: "nik", header: "NIK", sortable: true, primary: true, cell: (i: BiodataQuery) => String(i.nik ?? "") },
	{ id: "nama", header: "Nama", sortable: true, cell: (i: BiodataQuery) => String(i.nama ?? "") },
	{ id: "jenisKelamin", header: "Jenis Kelamin", cell: (i: BiodataQuery) => String(i.jenisKelamin ?? "") },
	{ id: "pendidikan", header: "Pendidikan", cell: (i: BiodataQuery) => String(i.pendidikanTerakhir?.nama ?? "") },
] as const;

export function DataPegawaiClient() {
	const { permissions } = useAuth();
	const canWrite = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const [editProfilId, setEditProfilId] = useState<string | null>(null);
	const [editGajiId, setEditGajiId] = useState<string | null>(null);

	const {
		tab,
		page,
		size,
		sortBy,
		sortDir,
		filterValues,
		hasActiveFilter,
		selectedId,
		setSelectedId,
		query,
		ringkasanQuery,
		pageView,
		nav,
		onFilterChange,
		onReset,
	} = useDataPegawai();

	const isPegawaiTab = tab !== "nonpegawai";
	const getRowId = (i: unknown) => String((i as { id?: number; nik?: string }).id ?? (i as { nik?: string }).nik ?? "");

	return (
		<div>
			<div className="flex gap-1 mb-4 border-b">
				{TABS.map((t) => (
					<button
						key={t.id}
						type="button"
						onClick={() => nav({ tab: t.id, page: "1" })}
						className={`px-4 py-2 text-sm font-medium -mb-px border-b-2 transition-colors ${
							tab === t.id
								? "border-primary text-foreground"
								: "border-transparent text-muted-foreground hover:text-foreground"
						}`}
					>
						{t.label}
					</button>
				))}
			</div>
			<div className="flex flex-col lg:flex-row gap-4">
				<div className="lg:flex-1 min-w-0">
					<DataTable
						toolbar={
							<DataPegawaiToolbar
								values={filterValues}
								onFilterChange={onFilterChange}
								onReset={onReset}
								hasActive={hasActiveFilter}
								onAddClick={canWrite ? () => nav({ tab, page: "1" }) : undefined}
							/>
						}
						columns={(isPegawaiTab ? pegawaiColumns : biodataColumns) as never}
						data={(pageView.rows as never[]) ?? []}
						isLoading={query.isPending}
						isPlaceholder={query.isPlaceholderData}
						isError={query.isError}
						error={query.error}
						onRetry={() => query.refetch()}
						sortBy={sortBy}
						sortDirection={sortDir}
						onSort={(key) => {
							if (sortBy === key) nav({ sortDirection: sortDir === "asc" ? "desc" : "asc" });
							else nav({ sortBy: key, sortDirection: "asc" });
						}}
						{...(isPegawaiTab
							? {
									onRowClick: (i: never) => setSelectedId(getRowId(i)),
									selectedRowId: selectedId ?? undefined,
								}
							: {})}
						getRowId={getRowId}
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
				</div>
				{isPegawaiTab && (
					<div className="lg:w-95 shrink-0">
						<div className="rounded-lg border bg-card shadow-md sticky top-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
							<div className="h-0.5 bg-linear-to-r from-primary/40 via-primary to-primary/40 rounded-t-lg" />
							<div className="p-4">
								<h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
									Ringkasan Data Karyawan
								</h2>
								<RingkasanPanel
									selectedId={selectedId}
									isPending={ringkasanQuery.isPending}
									isError={ringkasanQuery.isError}
									error={ringkasanQuery.error}
									data={ringkasanQuery.data}
									onRetry={() => ringkasanQuery.refetch()}
									onEditProfil={canWrite ? () => setEditProfilId(String(selectedId)) : undefined}
									onEditGaji={canWrite ? () => setEditGajiId(String(selectedId)) : undefined}
									onRiwayat={() => nav({ tab })}
									onPendukung={() => nav({ tab })}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
			<SheetEditProfil pegawaiId={editProfilId} onClose={() => setEditProfilId(null)} />
			<SheetEditGaji pegawaiId={editGajiId} onClose={() => setEditGajiId(null)} />
		</div>
	);
}
