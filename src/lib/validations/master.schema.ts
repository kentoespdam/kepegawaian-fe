import { z } from "zod";

export const namaWajib = z.string().min(1, "Nama wajib diisi");

export const simpleNameSchema = z.object({
	nama: namaWajib,
});

export const profesiSchema = z.object({
	organisasiId: z.string().min(1, "Organisasi wajib diisi"),
	jabatanId: z.string().min(1, "Jabatan wajib diisi"),
	gradeId: z.string().min(1, "Grade wajib diisi"),
});

export type SimpleNameInput = z.infer<typeof simpleNameSchema>;
export type ProfesiInput = z.infer<typeof profesiSchema>;
