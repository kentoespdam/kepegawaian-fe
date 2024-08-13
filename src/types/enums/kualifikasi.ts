import { z } from "zod";

export const KUALIFIKASI = ["BAIK", "CUKUP", "KURANG"] as const;

export const Kualifikasi = z.enum(KUALIFIKASI);

export type Kualifikasi = z.infer<typeof Kualifikasi>;
