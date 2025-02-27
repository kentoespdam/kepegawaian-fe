import {
	STATUS_PROSES_GAJI,
	StatusProseGaji,
} from "@_types/enums/status_proses_gaji";
import { z } from "zod";

export const VerifikasiSchema = z
	.object({
		batchId: z.string().min(1),
		nama: z.string().min(1),
		jabatan: z.string().min(1),
		phase: z.enum(["verify1", "verify2", "accept", "reprocess"]),
	})

export type VerifikasiSchema = z.infer<typeof VerifikasiSchema>;
