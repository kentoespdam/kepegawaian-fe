import type { StatusBatch } from "@/types/penggajian/batch";

const STATUS_LABELS: Record<StatusBatch, string> = {
	PENDING: "Menunggu",
	PROSES: "Proses",
	WAIT_VERIFICATION_PHASE_1: "Verifikasi 1",
	WAIT_VERIFICATION_PHASE_2: "Verifikasi 2",
	WAIT_APPROVAL: "Menunggu Persetujuan",
	FINISHED: "Selesai",
	FAILED: "Gagal",
};

const STATUS_BADGE: Record<StatusBatch, string> = {
	PENDING: "bg-yellow-100 text-yellow-800",
	PROSES: "bg-blue-100 text-blue-800",
	WAIT_VERIFICATION_PHASE_1: "bg-purple-100 text-purple-800",
	WAIT_VERIFICATION_PHASE_2: "bg-purple-100 text-purple-800",
	WAIT_APPROVAL: "bg-orange-100 text-orange-800",
	FINISHED: "bg-green-100 text-green-800",
	FAILED: "bg-red-100 text-red-800",
};

export const BATCH_COLUMNS = [
	{
		id: "periode",
		header: "Periode",
		sortable: true,
		primary: true,
		cell: (item: Record<string, unknown>) => {
			const periode = item.periode as string | undefined;
			return periode ?? "-";
		},
	},
	{
		id: "status",
		header: "Status",
		sortable: true,
		cell: (item: Record<string, unknown>) => {
			const status = item.status as StatusBatch | undefined;
			if (!status) return "-";
			return (
				<span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_BADGE[status] ?? ""}`}>
					{STATUS_LABELS[status] ?? status}
				</span>
			);
		},
	},
	{
		id: "totalPegawai",
		header: "Total Pegawai",
		cell: (item: Record<string, unknown>) => String(item.totalPegawai ?? 0),
	},
	{
		id: "diProsesOleh",
		header: "Di Proses Oleh",
		cell: (item: Record<string, unknown>) => String(item.diProsesOleh ?? "-"),
	},
	{
		id: "tanggalProses",
		header: "Tanggal Proses",
		cell: (item: Record<string, unknown>) => {
			const t = item.tanggalProses as string | undefined;
			if (!t) return "-";
			try {
				return new Date(t).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
			} catch {
				return t;
			}
		},
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
