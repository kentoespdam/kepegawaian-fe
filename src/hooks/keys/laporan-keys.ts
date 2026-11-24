export interface LaporanSoParams {
	maxLevel?: number;
	format?: "flat" | "tree";
}

export const laporanKeys = {
	all: ["laporan"] as const,
	duk: () => [...laporanKeys.all, "duk"] as const,
	dnp: () => [...laporanKeys.all, "dnp"] as const,
	so: (params?: LaporanSoParams) => [...laporanKeys.all, "so", params] as const,
};
