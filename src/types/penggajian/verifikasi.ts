import { z } from "zod";

export const VerifikasiSchema = z.object({
	batchId: z.string().min(1),
	nama: z.string().min(1),
	jabatan: z.string().min(1),
});

export type VerifikasiSchema = z.infer<typeof VerifikasiSchema>;
