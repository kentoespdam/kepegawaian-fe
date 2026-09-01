export class ApiError extends Error {
	status: number;

	constructor(status: number, message?: string) {
		super(message ?? `HTTP ${status}`);
		this.status = status;
	}
}

/**
 * Unwrap amplop backend: SEMUA endpoint dibungkus amplop {@link Envelope}.
 * Narrow union manual: `!res.ok` → cabang error (errors required);
 * `res.ok` (≈2xx) → cabang sukses (data required).
 * Kembalikan `.data` → pemanggil `api.*` bicara payload asli, bukan amplop.
 */
export async function handle<T>(res: Response): Promise<T> {
	if (!res.ok) {
		const body = (await res.json().catch(() => ({}))) as {
			/** Required di cabang error — akses tanpa `?.` */
			errors: string | string[];
			message?: string;
		} & { error?: string };
		throw new ApiError(res.status, body.message ?? body.error);
	}
	if (res.status === 204) return undefined as T;
	const body = (await res.json()) as { data: T };
	return body.data;
}

/**
 * Factory untuk API client berbasis base URL.
 * Dipakai oleh client.ts (master) dan penggajian-client.ts.
 */
export function createApiClient(BASE: string) {
	return {
		list: <T>(entity: string, params?: Record<string, string>) => {
			const qs = params ? `?${new URLSearchParams(params)}` : "";
			return fetch(`${BASE}/${entity}${qs}`).then(handle<T>);
		},

		listAll: <T>(entity: string) => fetch(`${BASE}/${entity}/list`).then(handle<T>),

		listBy: <T>(entity: string, key: string, id: string) => fetch(`${BASE}/${entity}/${key}/${id}`).then(handle<T>),

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
	};
}

export const api = createApiClient("/api/proxy/master");
