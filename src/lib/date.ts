export function formatDate(date: unknown): string {
	if (typeof date !== "string") return "-";
	if (!date) return "-";

	// Abaikan bagian time — cukup date-nya
	const dateOnly = date.split("T")[0];
	const parts = dateOnly.split("-");
	if (parts.length !== 3) return "-";

	const y = Number(parts[0]);
	const m = Number(parts[1]);
	const d = Number(parts[2]);

	if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return "-";
	if (m < 1 || m > 12 || d < 1 || d > 31) return "-";

	const parsed = new Date(y, m - 1, d);

	// Validasi tanggal real (mis. 30 Feb tetap lolos parseInt tapi ditolak Date)
	if (parsed.getMonth() !== m - 1 || parsed.getDate() !== d) return "-";

	return new Intl.DateTimeFormat("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(parsed);
}

export function formatDateTime(date: unknown): string {
	if (typeof date !== "string") return "-";
	if (!date) return "-";

	// Abaikan bagian time — cukup date-nya
	const dateOnly = date.split("T")[0];
	const parts = dateOnly.split("-");
	if (parts.length !== 3) return "-";

	const y = Number(parts[0]);
	const m = Number(parts[1]);
	const d = Number(parts[2]);

	if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return "-";
	if (m < 1 || m > 12 || d < 1 || d > 31) return "-";

	const parsed = new Date(y, m - 1, d);

	// Validasi tanggal real (mis. 30 Feb tetap lolos parseInt tapi ditolak Date)
	if (parsed.getMonth() !== m - 1 || parsed.getDate() !== d) return "-";

	return new Intl.DateTimeFormat("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(parsed);
}

export function formatDateCustom(date: unknown): string {
	if (typeof date !== "string") return "-";
	if (!date) return "-";

	const dateOnly = date.split("T")[0];
	const parts = dateOnly.split("-");
	if (parts.length !== 3) return "-";

	const y = Number(parts[0]);
	const m = Number(parts[1]);
	const d = Number(parts[2]);

	if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return "-";
	if (m < 1 || m > 12 || d < 1 || d > 31) return "-";

	const parsed = new Date(y, m - 1, d);
	if (parsed.getMonth() !== m - 1 || parsed.getDate() !== d) return "-";

	const dayStr = String(parsed.getDate());
	const months = [
		"januari",
		"februari",
		"maret",
		"april",
		"mei",
		"juni",
		"juli",
		"agustus",
		"september",
		"oktober",
		"november",
		"desember",
	];
	const monthStr = months[parsed.getMonth()];
	const yearStr = String(parsed.getFullYear());

	return `${dayStr}/${monthStr}/${yearStr}`;
}

export function formatDateDotted(date: unknown): string {
	if (typeof date !== "string") return "-";
	if (!date) return "-";

	const dateOnly = date.split("T")[0];
	const parts = dateOnly.split("-");
	if (parts.length !== 3) return "-";

	const y = Number(parts[0]);
	const m = Number(parts[1]);
	const d = Number(parts[2]);

	if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return "-";
	if (m < 1 || m > 12 || d < 1 || d > 31) return "-";

	const parsed = new Date(y, m - 1, d);
	if (parsed.getMonth() !== m - 1 || parsed.getDate() !== d) return "-";

	const dd = String(parsed.getDate()).padStart(2, "0");
	const mm = String(parsed.getMonth() + 1).padStart(2, "0");
	const yy = String(parsed.getFullYear()).slice(-2);

	return `${dd}.${mm}.${yy}`;
}
