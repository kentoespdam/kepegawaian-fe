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
};
