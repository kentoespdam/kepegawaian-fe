/** Query key factory for dashboard panel sections and biodata. */
export const dashboardKeys = {
	/** Base key for all dashboard section queries. */
	all: ["dashboard"] as const,
	/** Key for a specific section query. */
	section: (id: string, pegawaiId: number, nik: string | null, page: number, size: number) =>
		[...dashboardKeys.all, id, pegawaiId, nik, page, size] as const,
	/** Key for biodata query. */
	biodata: (nik: string | null) => [...dashboardKeys.all, "biodata", nik] as const,
};
