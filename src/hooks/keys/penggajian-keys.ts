/** Query key factory for penggajian (payroll) data. */
export const penggajianKeys = {
	all: ["penggajian"] as const,

	batch: {
		all: () => [...penggajianKeys.all, "batch"] as const,
		list: (params?: Record<string, string>) => [...penggajianKeys.batch.all(), "list", params] as const,
		detail: (id: string) => [...penggajianKeys.batch.all(), "detail", id] as const,
		master: (id: string, status?: string) =>
			[...penggajianKeys.batch.all(), id, "master", ...(status ? [status] : [])] as const,
		pegawai: (id: string) => [...penggajianKeys.batch.all(), "pegawai", id] as const,
		pegawaiProses: (id: string) => [...penggajianKeys.batch.all(), "pegawai", id, "proses"] as const,
	},

	profil: {
		all: () => [...penggajianKeys.all, "profil"] as const,
		list: () => [...penggajianKeys.profil.all(), "list"] as const,
	},

	komponen: {
		all: () => [...penggajianKeys.all, "komponen"] as const,
		kode: (profilId: number | null) => [...penggajianKeys.komponen.all(), profilId, "kode"] as const,
		urut: (profilId: number | null) => [...penggajianKeys.komponen.all(), profilId, "urut"] as const,
	},

	tunjangan: {
		all: () => [...penggajianKeys.all, "tunjangan"] as const,
		list: (jenis: string, params?: Record<string, string>) =>
			[...penggajianKeys.tunjangan.all(), jenis, params] as const,
		listAll: (jenis: string) => [...penggajianKeys.tunjangan.all(), jenis, "list"] as const,
	},
} as const;
