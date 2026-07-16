import type { ApiEnvelope } from "@/lib/api/types";

const BASE = "/api/proxy/master";

export class ApiError extends Error {
	status: number;

	constructor(status: number, message?: string) {
		super(message ?? `HTTP ${status}`);
		this.status = status;
	}
}

/**
 * Unwrap amplop backend: SEMUA endpoint dibungkus { data, message, ... }.
 * Mengembalikan `.data` → pemanggil `api.*` bicara payload asli, bukan amplop.
 */
async function handle<T>(res: Response): Promise<T> {
	if (!res.ok) {
		const body = (await res.json().catch(() => ({}))) as Partial<ApiEnvelope<unknown>> & { error?: string };
		throw new ApiError(res.status, body.message ?? body.error);
	}
	if (res.status === 204) return undefined as T;
	const body = (await res.json()) as ApiEnvelope<T>;
	return body.data as T;
}

export const api = {
	list: <T>(entity: string, params?: Record<string, string>) => {
		const qs = params ? `?${new URLSearchParams(params)}` : "";
		return fetch(`${BASE}/${entity}${qs}`).then(handle<T>);
	},

	listAll: <T>(entity: string) => fetch(`${BASE}/${entity}/list`).then(handle<T>),

	getById: <T>(entity: string, id: string) => fetch(`${BASE}/${entity}/${id}`).then(handle<T>),

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
