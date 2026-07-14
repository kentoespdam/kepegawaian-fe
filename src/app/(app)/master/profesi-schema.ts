import { z } from "zod";

export const profesiSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  detail: z.string().min(1, "Detail wajib diisi"),
  resiko: z.string().min(1, "Resiko wajib diisi"),
  organisasiId: z.coerce.number().optional(),
  jabatanId: z.coerce.number().optional(),
  gradeId: z.coerce.number().optional(),
});

export type ProfesiFormValues = z.infer<typeof profesiSchema>;

/** Default values untuk edit. */
export function profesiDefaults(editing: Record<string, unknown> | null): ProfesiFormValues {
  return {
    nama: String(editing?.nama ?? ""),
    detail: String(editing?.detail ?? ""),
    resiko: String(editing?.resiko ?? ""),
    organisasiId: Number(editing?.organisasiId ?? 0) || undefined,
    jabatanId: Number(editing?.jabatanId ?? 0) || undefined,
    gradeId: Number(editing?.gradeId ?? 0) || undefined,
  };
}
