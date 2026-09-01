"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BATCH_COLUMNS, getPeriodeOptions, STATUS_OPTIONS } from "@/config/penggajian/batch-list.config";
import { useBatchList } from "@/hooks/penggajian/useBatchList";
import { useMasterSearchParams } from "@/hooks/useMasterSearchParams";
import { toApiParams } from "@/lib/paging";
import type { StatusBatch } from "@/types/penggajian/batch";

const ENTITY = "batch";
const BASE = "/penggajian/proses_gaji";

const STATUS_BADGE: Record<StatusBatch, string> = {
	PENDING: "bg-yellow-100 text-yellow-800",
	PROSES: "bg-blue-100 text-blue-800",
	WAIT_VERIFICATION_PHASE_1: "bg-purple-100 text-purple-800",
	WAIT_VERIFICATION_PHASE_2: "bg-purple-100 text-purple-800",
	WAIT_APPROVAL: "bg-orange-100 text-orange-800",
	FINISHED: "bg-green-100 text-green-800",
	FAILED: "bg-red-100 text-red-800",
};

const STATUS_LABELS: Record<StatusBatch, string> = {
	PENDING: "Menunggu",
	PROSES: "Proses",
	WAIT_VERIFICATION_PHASE_1: "Verifikasi 1",
	WAIT_VERIFICATION_PHASE_2: "Verifikasi 2",
	WAIT_APPROVAL: "Menunggu Persetujuan",
	FINISHED: "Selesai",
	FAILED: "Gagal",
};

function formatDate(v: unknown): string {
	const t = v as string | undefined;
	if (!t) return "-";
	try {
		return new Date(t).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
	} catch {
		return t;
	}
}

const COLUMNS = [
	{
		id: "periode",
		header: "Periode",
		sortable: true,
		primary: true,
		cell: (item: Record<string, unknown>) => String(item.periode ?? "-"),
	},
	{
		id: "id",
		header: "Batch ID",
		sortable: true,
		cell: (item: Record<string, unknown>) => String(item.id ?? "-"),
	},
	{
		id: "status",
		header: "Status",
		sortable: true,
		cell: (item: Record<string, unknown>) => {
			const s = item.status as StatusBatch | undefined;
			if (!s) return "-";
			return (
				<span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_BADGE[s] ?? ""}`}>
					{STATUS_LABELS[s] ?? s}
				</span>
			);
		},
	},
	{
		id: "notes",
		header: "Notes",
		cell: (item: Record<string, unknown>) => String(item.notes ?? "-"),
	},
	{
		id: "tanggalProses",
		header: "Tanggal Proses",
		sortable: true,
		cell: (item: Record<string, unknown>) => formatDate(item.tanggalProses),
	},
	{
		id: "totalPegawai",
		header: "Total Pegawai",
		cell: (item: Record<string, unknown>) => String(item.totalPegawai ?? 0),
	},
	{
		id: "tanggalVerifikasiTahap1",
		header: "Verifikasi Tahap 1",
		cell: (item: Record<string, unknown>) => formatDate(item.tanggalVerifikasiTahap1),
	},
	{
		id: "tanggalVerifikasiTahap2",
		header: "Verifikasi Tahap 2",
		cell: (item: Record<string, unknown>) => formatDate(item.tanggalVerifikasiTahap2),
	},
	{
		id: "tanggalPersetujuan",
		header: "Persetujuan",
		cell: (item: Record<string, unknown>) => formatDate(item.tanggalPersetujuan),
	},
];

interface ProsesGajiClientProps {
	userName?: string;
}

export function ProsesGajiClient({ userName }: ProsesGajiClientProps) {
	const router = useRouter();
	const { page, size, sortBy, sortDir, filters, setP, setFilter, resetAll } = useMasterSearchParams(ENTITY, BASE);

	const list = useBatchList(toApiParams({ page, size, sortBy, sortDir, filters }));
	const rows = list.data ?? [];

	const handleFilterChange = (name: string, value: string | undefined) => {
		setFilter(name, value);
	};

	return (
		<div>
			<DataTableToolbar
				searchFields={[]}
				values={filters}
				onFilterChange={handleFilterChange}
				hasActive={Object.keys(filters).length > 0 || !!sortBy}
				onReset={resetAll}
			/>

			<div className="flex gap-2 mb-4">
				<Select
					value={(filters.periode as string) ?? ""}
					onValueChange={(v) => handleFilterChange("periode", v || undefined)}
				>
					<SelectTrigger className="w-40 h-9">
						<SelectValue placeholder="Semua Periode" />
					</SelectTrigger>
					<SelectContent>
						{getPeriodeOptions().map((o) => (
							<SelectItem key={o.value} value={o.value}>
								{o.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					value={(filters.status as string) ?? ""}
					onValueChange={(v) => handleFilterChange("status", v || undefined)}
				>
					<SelectTrigger className="w-48 h-9">
						<SelectValue placeholder="Semua Status" />
					</SelectTrigger>
					<SelectContent>
						{STATUS_OPTIONS.map((o) => (
							<SelectItem key={o.value} value={o.value}>
								{o.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<DataTable
				columns={COLUMNS}
				data={(rows as Record<string, unknown>[]) ?? []}
				isLoading={list.isPending}
				isPlaceholder={list.isPlaceholderData}
				isError={list.isError}
				error={list.error}
				onRetry={() => list.refetch()}
				sortBy={sortBy}
				sortDirection={sortDir}
				onSort={(key) => {
					if (sortBy === key) setP("sortDirection", sortDir === "asc" ? "desc" : "asc");
					else setP({ sortBy: key, sortDirection: "asc" });
				}}
				onRowClick={(item) => {
					const id = item.id as string;
					if (id) router.push(`/penggajian/batch/${id}/setup`);
				}}
				getRowId={(i) => String((i as Record<string, unknown>).id ?? "")}
			/>
		</div>
	);
}
