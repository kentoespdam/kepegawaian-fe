import { z } from "zod";

export const terminasiSchema = z.object({
	pegawaiId: z.number().min(1, "Pegawai wajib dipilih"),
	nipam: z.string().min(1, "NIPAM wajib"),
	nama: z.string().min(1, "Nama wajib"),
	organisasiId: z.number().min(1, "Organisasi wajib"),
	jabatanId: z.number().min(1, "Jabatan wajib"),
	golonganId: z.number().optional(),
	alasanTerminasiId: z.string().min(1, "Alasan terminasi wajib"),
	nomorSk: z.string().min(1, "Nomor SK wajib"),
	tanggalSk: z.string().min(1, "Tanggal SK wajib"),
	tmtBerlaku: z.string().min(1, "TMT Berlaku wajib"),
	notes: z.string().optional(),
});

export type TerminasiFormValues = z.infer<typeof terminasiSchema>;
