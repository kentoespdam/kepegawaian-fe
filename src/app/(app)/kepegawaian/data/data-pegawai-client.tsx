"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { useAuth } from "@/hooks/useAuth";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import type { PegawaiResponseRingkasan, PegawaiTableResponse } from "@/types/pegawai/pegawai";
import type { BiodataQuery } from "@/types/profil/biodata";
import { DataPegawaiToolbar } from "./data-pegawai-toolbar";
import { SheetEditGaji } from "./edit-gaji-sheet";
import { SheetEditProfil } from "./edit-profil-sheet";
import { RingkasanPanel } from "./ringkasan-panel";

const TABS = [
	{ id: "aktif", label: "Aktif", endpoint: "/api/proxy/pegawai", filter: { statusKerja: "KARYAWAN_AKTIF" } },
	{ id: "nonaktif", label: "Non-aktif", endpoint: "/api/proxy/pegawai", filter: { statusKerja: "BERHENTI_OR_KELUAR" } },
	{ id: "nonpegawai", label: "Non-pegawai", endpoint: "/api/proxy/profil/biodata", filter: { isPegawai: "false" } },
] as const;

const FILTER_PARAMS = [
	"nama",
	"nipam",
	"nik",
	"statusPegawai",
	"jabatanId",
	"organisasiId",
	"profesiId",
	"golonganId",
	"gradeId",
	"statusKerja",
	"jenisKelamin",
] as const;

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
	const sp = useSearchParams();
	// Write pegawai (POST /pegawai, PATCH /pegawai/{id}/profil & /gaji) = dual-mode PEGAWAI:WRITE
	// (kontrak BE). Pembaca murni (role USER) tetap lihat data tapi tanpa tombol tulis.
	const { permissions } = useAuth();
	const canWrite = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const router = useRouter();
	const tab = (sp.get("tab") as (typeof TABS)[number]["id"]) ?? "aktif";
	const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const sortBy = sp.get("sortBy") ?? undefined;
	const sortDir = sp.get("sortDirection") as "asc" | "desc" | undefined;

	// Ambil filter values dari URL
	const filterValues = useMemo(() => {
		const v: Record<string, string> = {};
		for (const key of FILTER_PARAMS) {
			const val = sp.get(key);
			if (val) v[key] = val;
		}
		return v;
	}, [sp]);

	const hasActiveFilter = Object.keys(filterValues).length > 0;

	const params = {
		...activeTab.filter,
		...filterValues,
		...toApiParams({ page, size, sortBy, sortDir }),
	};

	const [selectedId, setSelectedId] = useState<string | number | null>(null);
	const [editProfilId, setEditProfilId] = useState<string | null>(null);
	const [editGajiId, setEditGajiId] = useState<string | null>(null);

	const query = useQuery({
		queryKey: [activeTab.endpoint, params],
		queryFn: async () => {
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`${activeTab.endpoint}?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat data");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const ringkasanQuery = useQuery({
		queryKey: ["ringkasan", selectedId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${selectedId}/ringkasan`);
			if (!res.ok) throw new Error("Gagal memuat ringkasan");
			const body = await res.json();
			return body.data as PegawaiResponseRingkasan;
		},
		enabled: !!selectedId,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);

	const nav = (updates: Record<string, string | undefined>) => {
		setSelectedId(null);
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		const p = new URLSearchParams();
		p.set("tab", tab);
		p.set("page", "1");
		p.set("size", String(size));
		router.replace(`/kepegawaian/data?${p.toString()}`);
	};

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
								onAddClick={canWrite ? () => router.push("/kepegawaian/data/tambah") : undefined}
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
							{/* Accent line — konsisten dengan topbar */}
							<div className="h-0.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40 rounded-t-lg" />
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
									onRiwayat={() => router.push(`/kepegawaian/data/${selectedId}/riwayat/mutasi`)}
									onPendukung={() => router.push(`/kepegawaian/data/${selectedId}/pendukung/pendidikan`)}
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
