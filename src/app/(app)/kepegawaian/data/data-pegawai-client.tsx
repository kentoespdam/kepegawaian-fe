"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { fromPage, toApiParams } from "@/lib/paging";
import type { PegawaiTableResponse } from "@/types/pegawai/pegawai";
import type { BiodataQuery } from "@/types/profil/biodata";

const TABS = [
	{ id: "aktif", label: "Aktif", endpoint: "/api/proxy/pegawai", filter: { statusKerja: "KARYAWAN_AKTIF" } },
	{ id: "nonaktif", label: "Non-aktif", endpoint: "/api/proxy/pegawai", filter: { statusKerja: "BERHENTI_OR_KELUAR" } },
	{ id: "nonpegawai", label: "Non-pegawai", endpoint: "/api/proxy/profil/biodata", filter: { isPegawai: "false" } },
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
	const router = useRouter();
	// ponytail: tab from URL = source of truth, no useState desync risk
	const tab = (sp.get("tab") as (typeof TABS)[number]["id"]) ?? "aktif";
	const activeTab = TABS.find((t) => t.id === tab)!;

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const sortBy = sp.get("sortBy") ?? undefined;
	const sortDir = sp.get("sortDirection") as "asc" | "desc" | undefined;

	const params = { ...activeTab.filter, ...toApiParams({ page, size, sortBy, sortDir }) };

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

	const pageView = fromPage(query.data);

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data?${p.toString()}`);
	};

	const isPegawaiTab = tab !== "nonpegawai";

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

			<DataTable
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
				getRowId={(i) => String((i as { id?: number; nik?: string }).id ?? (i as { nik?: string }).nik ?? "")}
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
	);
}
