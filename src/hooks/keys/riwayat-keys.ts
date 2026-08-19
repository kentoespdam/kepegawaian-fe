/** Query key factory for riwayat (history) data. */
export const riwayatKeys = {
	all: ["riwayat"] as const,

	// SK
	sk: {
		all: () => [...riwayatKeys.all, "sk"] as const,
		list: (pegawaiId: string | number, params: Record<string, unknown>) =>
			[...riwayatKeys.sk.all(), pegawaiId, params] as const,
		detail: (editingId: string | number | null) => [...riwayatKeys.sk.all(), "detail", editingId] as const,
	},
	// Mutasi
	mutasi: {
		all: () => [...riwayatKeys.all, "mutasi"] as const,
		list: (pegawaiId: string | number, params: Record<string, unknown>) =>
			[...riwayatKeys.mutasi.all(), pegawaiId, params] as const,
		detail: (editingId: string | number | null) => [...riwayatKeys.mutasi.all(), "detail", editingId] as const,
	},
	// SP
	sp: {
		all: () => [...riwayatKeys.all, "sp"] as const,
		list: (pegawaiId: string | number, params: Record<string, unknown>) =>
			[...riwayatKeys.sp.all(), pegawaiId, params] as const,
		detail: (editingId: string | number | null) => [...riwayatKeys.sp.all(), "detail", editingId] as const,
	},
	// Kontrak
	kontrak: {
		all: () => [...riwayatKeys.all, "kontrak"] as const,
		list: (pegawaiId: string | number, params: Record<string, unknown>) =>
			[...riwayatKeys.kontrak.all(), pegawaiId, params] as const,
		detail: (editingId: string | number | null) => [...riwayatKeys.kontrak.all(), "detail", editingId] as const,
	},
	// Cuti riwayat
	cuti: {
		all: () => [...riwayatKeys.all, "cuti"] as const,
		list: (pegawaiId: string | number, params: Record<string, unknown>) =>
			[...riwayatKeys.cuti.all(), pegawaiId, params] as const,
	},
	// Pegawai session (used in layouts)
	session: (pegawaiId: string | number) => ["pegawai-session", pegawaiId] as const,
	// Mutasi context
	mutasiContext: (pegawaiId: string | number) => ["pegawai-mutasi-context", pegawaiId] as const,
} as const;
