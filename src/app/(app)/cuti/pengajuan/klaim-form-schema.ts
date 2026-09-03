import { z } from "zod";
import type { CutiPengajuanResponse } from "@/types/cuti/pengajuan";

/** CU-25/26: Hitung jumlah hari (inklusi kedua ujung). */
export function hitungHari(mulai: string | undefined, selesai: string | undefined): number | null {
	if (!mulai || !selesai) return null;
	const a = new Date(`${mulai}T00:00:00`);
	const b = new Date(`${selesai}T00:00:00`);
	if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
	const diff = Math.round((b.getTime() - a.getTime()) / 86_400_000) + 1;
	return diff >= 1 ? diff : null;
}

/** CU-25: Generate listHari dari range (YYYY-MM-DD array, inklusif). */
export function generateListHari(mulai: string, selesai: string): string[] {
	const days: string[] = [];
	const current = new Date(`${mulai}T00:00:00`);
	const end = new Date(`${selesai}T00:00:00`);
	while (current <= end) {
		const y = current.getFullYear();
		const m = String(current.getMonth() + 1).padStart(2, "0");
		const d = String(current.getDate()).padStart(2, "0");
		days.push(`${y}-${m}-${d}`);
		current.setDate(current.getDate() + 1);
	}
	return days;
}

/**
 * CU-25/26: Zod schema untuk form klaim.
 * Validasi rentang mengacu pada pengajuan asal (tanggalMulai..tanggalSelesai):
 * - tanggalMulai ≥ tanggalMulai pengajuan asal
 * - tanggalSelesai ≤ tanggalSelesai pengajuan asal
 * - tanggalSelesai ≥ tanggalMulai klaim
 */
export type KlaimFormValues = z.infer<ReturnType<typeof klaimFormSchema>>;

export function klaimFormSchema(
	asal: Pick<CutiPengajuanResponse, "tanggalMulai" | "tanggalSelesai"> | null | undefined,
) {
	const minMulai = asal?.tanggalMulai;
	const maxSelesai = asal?.tanggalSelesai;

	return z
		.object({
			tanggalMulai: z.string().min(1, "Tanggal mulai wajib"),
			tanggalSelesai: z.string().min(1, "Tanggal selesai wajib"),
			keterangan: z.string().optional(),
		})
		.superRefine((v, ctx) => {
			// tanggalSelesai >= tanggalMulai klaim
			if (v.tanggalMulai && v.tanggalSelesai && v.tanggalSelesai < v.tanggalMulai) {
				ctx.addIssue({
					code: "custom",
					path: ["tanggalSelesai"],
					message: "Tanggal selesai tidak boleh sebelum tanggal mulai",
				});
			}
			// tanggalMulai dalam rentang pengajuan asal (≥ tanggalMulai, ≤ tanggalSelesai)
			if (v.tanggalMulai) {
				if (minMulai && v.tanggalMulai < minMulai) {
					ctx.addIssue({
						code: "custom",
						path: ["tanggalMulai"],
						message: "Tanggal mulai tidak boleh sebelum tanggal pengajuan asal",
					});
				}
				if (maxSelesai && v.tanggalMulai > maxSelesai) {
					ctx.addIssue({
						code: "custom",
						path: ["tanggalMulai"],
						message: "Tanggal mulai tidak boleh melewati tanggal pengajuan asal",
					});
				}
			}
			// tanggalSelesai ≤ tanggalSelesai pengajuan asal
			if (maxSelesai && v.tanggalSelesai && v.tanggalSelesai > maxSelesai) {
				ctx.addIssue({
					code: "custom",
					path: ["tanggalSelesai"],
					message: "Tanggal selesai tidak boleh melewati tanggal pengajuan asal",
				});
			}
		});
}
