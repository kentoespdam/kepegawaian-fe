import { z } from "zod";

export const STATUS_KAWIN = [
	"BELUM_KAWIN",
	"KAWIN",
	"CERAI_HIDUP",
	"CERAI_MATI",
] as const;

export const StatusKawin = z.enum(STATUS_KAWIN);

export type StatusKawin = z.infer<typeof StatusKawin>;
