import { z } from "zod";

export const JENIS_TUNJANGAN = ["JABATAN", "KINERJA", "BERAS", "AIR"] as const;

export const JenisTunjangan = z.enum(JENIS_TUNJANGAN);
export type JenisTunjangan = z.infer<typeof JenisTunjangan>;
