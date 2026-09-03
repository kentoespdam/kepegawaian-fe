import { Badge } from "@/components/ui/badge";
import type { StatusBatch } from "@/types/penggajian/batch";

export const STATUS_LABELS: Record<StatusBatch, string> = {
	PENDING: "Pending",
	PROSES: "Sedang diproses",
	WAIT_VERIFICATION_PHASE_1: "Verifikasi Tahap 1",
	WAIT_VERIFICATION_PHASE_2: "Verifikasi Tahap 2",
	WAIT_APPROVAL: "Menunggu Persetujuan",
	FINISHED: "Selesai",
	FAILED: "Gagal",
};

export const STATUS_BADGE: Record<StatusBatch, string> = {
	PENDING: "bg-amber-100 text-amber-800 border-amber-300/60 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
	PROSES: "bg-blue-100 text-blue-800 border-blue-300/60 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
	WAIT_VERIFICATION_PHASE_1: "bg-purple-100 text-purple-800 border-purple-300/60 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
	WAIT_VERIFICATION_PHASE_2: "bg-violet-100 text-violet-800 border-violet-300/60 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800",
	WAIT_APPROVAL: "bg-orange-100 text-orange-800 border-orange-300/60 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800",
	FINISHED: "bg-emerald-100 text-emerald-800 border-emerald-300/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
	FAILED: "bg-rose-100 text-rose-800 border-rose-300/60 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
};

export const BATCH_COLUMNS = [
	{
		id: "periode",
		header: "Periode",
		sortable: true,
	},
	{
		id: "id",
		header: "Batch ID",
		sortable: true,
		primary: true,
	},
	{
		id: "status",
		header: "Status",
		sortable: true,
		cell: (item: Record<string, unknown>) => {
			const status = item.status as StatusBatch | undefined;
			if (!status) return "-";
			return <Badge>{STATUS_LABELS[status] ?? status}</Badge>;
		},
	},
	{
		id: "notes",
		header: "Notes",
	},
	{
		id: "totalPegawai",
		header: "Total Pegawai",
		cell: (item: Record<string, unknown>) => String(item.totalPegawai ?? 0),
	},
	{
		id: "diProsesOleh",
		header: "Di Proses Oleh",
	},
	{
		id: "tanggalProses",
		header: "Tanggal Proses",
	},
];

export const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label }));

// ponytail: periode options = 3 tahun terakhir x 12 bulan
export function getPeriodeOptions(): { value: string; label: string }[] {
	const now = new Date();
	const options: { value: string; label: string }[] = [];
	const currentYear = now.getFullYear();
	for (let y = currentYear; y >= currentYear - 2; y--) {
		for (let m = 1; m <= 12; m++) {
			const month = String(m).padStart(2, "0");
			const val = `${y}-${month}`;
			options.push({ value: val, label: val });
		}
	}
	return options;
}
