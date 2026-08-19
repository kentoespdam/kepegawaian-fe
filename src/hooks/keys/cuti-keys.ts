/** Query key factory for cuti (leave) data. */
export const cutiKeys = {
	all: ["cuti"] as const,

	// Pengajuan
	pengajuan: {
		all: () => [...cutiKeys.all, "pengajuan"] as const,
		list: (params: Record<string, unknown>) => [...cutiKeys.pengajuan.all(), params] as const,
	},
	// Kuota
	kuota: {
		all: () => [...cutiKeys.all, "kuota"] as const,
		list: (params: Record<string, unknown>) => [...cutiKeys.kuota.all(), params] as const,
		detail: (pegawaiId: string | number | null, tahun: number) => [...cutiKeys.kuota.all(), pegawaiId, tahun] as const,
	},
	// Persetujuan
	persetujuan: {
		all: () => [...cutiKeys.all, "persetujuan"] as const,
		list: (params: Record<string, unknown>) => [...cutiKeys.persetujuan.all(), params] as const,
	},
	// Approval history
	approvalHistory: (cutiId: string | number) => [...cutiKeys.all, "approval-history", cutiId] as const,
	// Jenis list
	jenisList: () => [...cutiKeys.all, "jenis-list"] as const,
	// Total hari kerja
	totalHariKerja: (mulai: string, selesai: string) => [...cutiKeys.all, "total-hari-kerja", mulai, selesai] as const,
} as const;
