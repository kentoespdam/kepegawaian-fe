import { z } from "zod";

export const AGAMA = [
	"TIDAK_TAHU",
	"ISLAM",
	"KRISTEN",
	"KATOLIK",
	"HINDU",
	"BUDHA",
	"LAINNYA",
] as const;

export const Agama = z.enum(AGAMA);

export type Agama = z.infer<typeof Agama>;
