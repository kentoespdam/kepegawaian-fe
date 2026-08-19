/** Query key factory for profil (profile sub-data) queries. */
export const profilKeys = {
	all: ["profil"] as const,

	// Pengalaman kerja
	pengalamanKerja: {
		all: () => [...profilKeys.all, "pengalaman-kerja"] as const,
		list: (pegawaiId: string | number, params: Record<string, unknown>) =>
			[...profilKeys.pengalamanKerja.all(), pegawaiId, params] as const,
		detail: (editingId: string | null) => [...profilKeys.pengalamanKerja.all(), "detail", editingId] as const,
	},
	// Pelatihan
	pelatihan: {
		all: () => [...profilKeys.all, "pelatihan"] as const,
		list: (pegawaiId: string | number, params: Record<string, unknown>) =>
			[...profilKeys.pelatihan.all(), pegawaiId, params] as const,
		detail: (editingId: string | null) => [...profilKeys.pelatihan.all(), "detail", editingId] as const,
	},
	// Keluarga
	keluarga: {
		all: () => [...profilKeys.all, "keluarga"] as const,
		list: (pegawaiId: string | number, params: Record<string, unknown>) =>
			[...profilKeys.keluarga.all(), pegawaiId, params] as const,
		detail: (editingId: string | null) => [...profilKeys.keluarga.all(), "detail", editingId] as const,
	},
	// Kartu identitas
	kartuIdentitas: {
		all: () => [...profilKeys.all, "kartu-identitas"] as const,
		list: (pegawaiId: string | number, params: Record<string, unknown>) =>
			[...profilKeys.kartuIdentitas.all(), pegawaiId, params] as const,
		detail: (editingId: string | null) => [...profilKeys.kartuIdentitas.all(), "detail", editingId] as const,
	},
	// Pendidikan
	pendidikan: {
		all: () => [...profilKeys.all, "pendidikan"] as const,
		list: (pegawaiId: string | number, params: Record<string, unknown>) =>
			[...profilKeys.pendidikan.all(), pegawaiId, params] as const,
		detail: (editingId: string | null) => [...profilKeys.pendidikan.all(), "detail", editingId] as const,
	},
	// Keahlian
	keahlian: {
		all: () => [...profilKeys.all, "keahlian"] as const,
		list: (pegawaiId: string | number, params: Record<string, unknown>) =>
			[...profilKeys.keahlian.all(), pegawaiId, params] as const,
		detail: (editingId: string | null) => [...profilKeys.keahlian.all(), "detail", editingId] as const,
	},
	// Profil update approval
	update: {
		all: () => [...profilKeys.all, "update"] as const,
		list: (params: Record<string, unknown>) => [...profilKeys.update.all(), params] as const,
		detail: (selectedId: string | number | null) => [...profilKeys.update.all(), "detail", selectedId] as const,
	},
} as const;
