import type { PageResultPageGajiBatchMasterResponse } from "@/types/penggajian/batch";
import type { GajiKpiUploadResponse } from "@/types/penggajian/kpi";
import { createApiClient, handle } from "./client";

const BASE = "/api/proxy/penggajian";

const baseClient = createApiClient(BASE);

export const penggajianApi = {
	...baseClient,

	// --- komponen special endpoints (path-param, bukan standard CRUD) ---

	/** GET /penggajian/komponen/{profilId}/kode — daftar kode yang tersedia untuk formula */
	listKode: <T>(profilId: number) => fetch(`${BASE}/komponen/${profilId}/kode`).then(handle<T>),

	/** GET /penggajian/komponen/{profilId}/profil/urut — urutan berikutnya (auto-fill) */
	getUrut: <T>(profilId: number) => fetch(`${BASE}/komponen/${profilId}/profil/urut`).then(handle<T>),

	/** GET /penggajian/batch/master/self — riwayat penggajian milik sendiri (self-service) */
	getRiwayatPenggajianSelf: (params?: {
		periode?: string;
		search?: string;
		status?: string;
		page?: number;
		size?: number;
		sortBy?: string;
		sortDirection?: string;
	}) => {
		const searchParams = new URLSearchParams();
		if (params?.periode) searchParams.set("periode", params.periode);
		if (params?.search) searchParams.set("search", params.search);
		if (params?.status) searchParams.set("status", params.status);
		if (params?.page != null) searchParams.set("page", String(params.page));
		if (params?.size != null) searchParams.set("size", String(params.size));
		if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
		if (params?.sortDirection) searchParams.set("sortDirection", params.sortDirection);
		const query = searchParams.toString();
		const url = `${BASE}/batch/master/self${query ? `?${query}` : ""}`;
		return fetch(url).then(handle<PageResultPageGajiBatchMasterResponse>);
	},

	/** GET /penggajian/batch/master/{id}/slip-gaji — download slip gaji PDF */
	downloadSlipGaji: async (id: number | string) => {
		const res = await fetch(`${BASE}/batch/master/${id}/slip-gaji`);
		if (!res.ok) throw new Error(`Gagal mengunduh slip gaji (${res.status})`);
		return res.blob();
	},

	/** POST /penggajian/kpi/upload?periode=YYYYMM — upload batch Excel */
	uploadKpi: (file: File, periode: string) => {
		const form = new FormData();
		form.append("file", file);
		return fetch(`${BASE}/kpi/upload?periode=${periode}`, {
			method: "POST",
			body: form,
		}).then(handle<GajiKpiUploadResponse>);
	},

	/** GET /penggajian/kpi/template/download — download template Excel */
	downloadKpiTemplate: () => {
		window.location.href = `${BASE}/kpi/template/download`;
	},
};
