"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { fromPage, toApiParams } from "@/lib/paging";
import { formatDate } from "@/lib/utils";
import type { RiwayatTerminasiQuery } from "@/types/kepegawaian/riwayat";

const TABS = [
	{ id: "calon-pensiun", label: "Calon Pensiun", endpoint: "/api/proxy/kepegawaian/riwayat/terminasi/calon-pensiun" },
	{ id: "terminasi", label: "Sudah Terminasi", endpoint: "/api/proxy/kepegawaian/riwayat/terminasi" },
] as const;

const columns = [
	{
		id: "nipam",
		header: "NIPAM",
		sortable: true,
		primary: true,
		cell: (i: RiwayatTerminasiQuery) => String(i.nipam ?? ""),
	},
	{ id: "nama", header: "Nama", sortable: true, cell: (i: RiwayatTerminasiQuery) => String(i.nama ?? "") },
	{ id: "organisasi", header: "Organisasi", cell: (i: RiwayatTerminasiQuery) => String(i.namaOrganisasi ?? "") },
	{ id: "jabatan", header: "Jabatan", cell: (i: RiwayatTerminasiQuery) => String(i.namaJabatan ?? "") },
	{ id: "tanggal", header: "Tgl. Terminasi", cell: (i: RiwayatTerminasiQuery) => formatDate(i.tanggalTerminasi) },
	{ id: "alasan", header: "Alasan", cell: (i: RiwayatTerminasiQuery) => String(i.alasanTerminasi?.nama ?? "") },
] as const;

export function TerminasiClient() {
	const sp = useSearchParams();
	const router = useRouter();
	// ponytail: tab from URL = source of truth
	const tab = (sp.get("tab") as (typeof TABS)[number]["id"]) ?? "calon-pensiun";
	const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const sortBy = sp.get("sortBy") ?? undefined;
	const sortDir = sp.get("sortDirection") as "asc" | "desc" | undefined;
	const tahunPensiun = sp.get("tahunPensiun") ?? String(new Date().getFullYear());
	const alasanTerminasiId = sp.get("alasanTerminasiId") ?? undefined;

	const filter: Record<string, string> = {};
	if (tab === "calon-pensiun") filter.tahunPensiun = tahunPensiun;
	if (tab === "terminasi") {
		filter.tahunTerminasi = tahunPensiun;
		if (alasanTerminasiId) filter.alasanTerminasiId = alasanTerminasiId;
	}

	const params = { ...filter, ...toApiParams({ page, size, sortBy, sortDir }) };

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
		router.replace(`/kepegawaian/terminasi?${p.toString()}`);
	};

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

			<div className="flex gap-4 mb-4 flex-wrap">
				<div>
					<label htmlFor="tahun-filter" className="text-sm font-medium mr-2">
						{tab === "calon-pensiun" ? "Tahun Pensiun" : "Tahun Terminasi"}
					</label>
					<select
						id="tahun-filter"
						value={tahunPensiun}
						onChange={(e) => nav({ tahunPensiun: e.target.value, page: "1" })}
						className="h-11 rounded-lg border border-input bg-transparent px-3 text-sm"
					>
						{Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() - 2 + i)).map((y) => (
							<option key={y} value={y}>
								{y}
							</option>
						))}
					</select>
				</div>
				{tab === "terminasi" && (
					<div>
						<label htmlFor="alasan-filter" className="text-sm font-medium mr-2">
							Alasan Terminasi
						</label>
						<select
							id="alasan-filter"
							value={alasanTerminasiId ?? ""}
							onChange={(e) => nav({ alasanTerminasiId: e.target.value || undefined, page: "1" })}
							className="h-11 rounded-lg border border-input bg-transparent px-3 text-sm min-w-40"
						>
							<option value="">Semua</option>
							{/* ponytail: static seed — full list from API when alasan-berhenti master is ready */}
							<option value="1">Pensiun</option>
							<option value="2">Mengundurkan Diri</option>
							<option value="3">PHK</option>
							<option value="4">Meninggal Dunia</option>
						</select>
					</div>
				)}
			</div>

			<DataTable
				columns={columns as never}
				data={(pageView.rows as unknown as RiwayatTerminasiQuery[]) ?? []}
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
				getRowId={(i) => String((i as { id?: number }).id ?? "")}
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
