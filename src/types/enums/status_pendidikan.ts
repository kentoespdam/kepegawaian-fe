import { z } from "zod";

export const STATUS_PENDIDIKAN = [
	"BELUM_SEKOLAH",
	"SEKOLAH",
	"SELESAI_SEKOLAH",
] as const;
export const StatusPendidikan=z.enum(STATUS_PENDIDIKAN);
export type StatusPendidikan=z.infer<typeof StatusPendidikan>;