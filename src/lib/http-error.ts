/**
 * Ambil pesan error dari body respons API.
 *
 * BE Spring Boot mengembalikan **RFC-7807 ProblemDetails** (`detail`, `title`)
 * untuk error terstruktur (mis. 413 "Maximum upload size exceeded"), sementara
 * envelope lama memakai `message`. Helper ini membaca ketiganya dengan urutan
 * prioritas: `detail` → `title` → `message` → `fallback`.
 */
export function apiErrorMessage(body: unknown, fallback: string): string {
	if (typeof body !== "object" || body === null) return fallback;
	const b = body as Record<string, unknown>;
	const detail = typeof b.detail === "string" ? b.detail : undefined;
	const title = typeof b.title === "string" ? b.title : undefined;
	const message = typeof b.message === "string" ? b.message : undefined;
	return detail ?? title ?? message ?? fallback;
}

/**
 * Error HTTP dengan status — biar UI bisa membedakan 404 (data memang tidak ada)
 * dari kegagalan lain (5xx / network) saat menampilkan state error.
 */
export class HttpError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super(message);
		this.name = "HttpError";
		this.status = status;
	}
}

/** True bila error berasal dari respons HTTP 404 (resource tidak ditemukan). */
export function isNotFound(err: unknown): boolean {
	return err instanceof HttpError && err.status === 404;
}

/**
 * Lempar HttpError bila respons tidak ok — status HTTP ikut terbawa sehingga UI
 * bisa menampilkan "Data tidak ditemukan" (404) vs "Gagal memuat data" (lainnya).
 */
export function throwIfNotOk(res: Response, fallback: string): Response {
	if (!res.ok) throw new HttpError(res.status, fallback);
	return res;
}
