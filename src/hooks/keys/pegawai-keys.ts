/** Query key factory for pegawai (employee) data. */
export const pegawaiKeys = {
	/** Base key for all pegawai queries. */
	all: ["pegawai"] as const,
	/** Key for list queries. */
	lists: () => [...pegawaiKeys.all, "list"] as const,
	/** Key for a specific list with params. */
	list: (params: Record<string, unknown>) => [...pegawaiKeys.lists(), params] as const,
	/** Key for detail queries. */
	details: () => [...pegawaiKeys.all, "detail"] as const,
	/** Key for a specific detail query. */
	detail: (id: string | number | null) => [...pegawaiKeys.details(), id] as const,
	/** Key for ringkasan queries. */
	ringkasan: (id: string | number | null) => [...pegawaiKeys.all, "ringkasan", id] as const,
	/** Key for gaji profil list (penggajian). */
	gajiProfilList: () => [...pegawaiKeys.all, "gaji-profil", "list"] as const,
};
