export const laporanKeys = {
	all: ["laporan"] as const,
	duk: () => [...laporanKeys.all, "duk"] as const,
	dnp: () => [...laporanKeys.all, "dnp"] as const,
};
