import { z } from "zod";

export const GajiBatchMasterProsesSchema = z.object({
	batchMasterId: z.number(),
	nama: z.string().min(3, "Nama wajib diisi"),
	jenisGaji: z.string().min(3, "Jenis Gaji wajib diisi"),
	nilai: z.number(),
});

export type GajiBatchMasterProsesSchema = z.infer<typeof GajiBatchMasterProsesSchema>;