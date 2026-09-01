const BASE = "/api/proxy/penggajian";

class ApiError extends Error {
	status: number;

	constructor(status: number, message?: string) {
		super(message ?? `HTTP ${status}`);
		this.status = status;
	}
}

async function handle<T>(res: Response): Promise<T> {
	if (!res.ok) {
		const body = (await res.json().catch(() => ({}))) as {
			errors: string | string[];
			message?: string;
		} & { error?: string };
		throw new ApiError(res.status, body.message ?? body.error);
	}
	if (res.status === 204) return undefined as T;
	const body = (await res.json()) as { data: T };
	return body.data;
}

export const penggajianApi = {
	list: <T>(entity: string, params?: Record<string, string>) => {
		const qs = params ? `?${new URLSearchParams(params)}` : "";
		return fetch(`${BASE}/${entity}${qs}`).then(handle<T>);
	},

	listAll: <T>(entity: string) => fetch(`${BASE}/${entity}/list`).then(handle<T>),

	create: <T>(entity: string, data: unknown) =>
		fetch(`${BASE}/${entity}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then(handle<T>),

	update: <T>(entity: string, id: string, data: unknown) =>
		fetch(`${BASE}/${entity}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then(handle<T>),

	remove: (entity: string, id: string) => fetch(`${BASE}/${entity}/${id}`, { method: "DELETE" }).then(handle<void>),

	// --- komponen special endpoints (path-param, bukan standard CRUD) ---

	/** GET /penggajian/komponen/{profilId}/kode — daftar kode yang tersedia untuk formula */
	listKode: <T>(profilId: number) => fetch(`${BASE}/komponen/${profilId}/kode`).then(handle<T>),

	/** GET /penggajian/komponen/{profilId}/profil/urut — urutan berikutnya (auto-fill) */
	getUrut: <T>(profilId: number) => fetch(`${BASE}/komponen/${profilId}/profil/urut`).then(handle<T>),
};
