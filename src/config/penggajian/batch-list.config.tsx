import { Badge } from "@/components/ui/badge";
import type { StatusBatch } from "@/types/penggajian/batch";

const STATUS_LABELS: Record<StatusBatch, string> = {
	PENDING: "Pending",
	PROSES: "Sedang diproses",
	WAIT_VERIFICATION_PHASE_1: "Verifikasi Tahap 1",
	WAIT_VERIFICATION_PHASE_2: "Verifikasi Tahap 2",
	WAIT_APPROVAL: "Menunggu Persetujuan",
	FINISHED: "Selesai",
	FAILED: "Gagal",
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
