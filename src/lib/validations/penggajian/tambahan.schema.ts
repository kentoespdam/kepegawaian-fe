import { z } from "zod";

export const tambahanSchema = z.object({
	nama: z.string().min(1, "Nama wajib diisi"),
	jenisGaji: z.enum(["NONE", "PEMASUKAN", "POTONGAN"]),
	nilai: z.number().min(0, "Nilai tidak boleh negatif"),
});

export type TambahanForm = z.infer<typeof tambahanSchema>;
