import { z } from "zod";

export const AGAMA = [
	"TIDAK_TAHU",
	"ISLAM",
	"KRISTEN",
	"KATOLIK",
	"HINDU",
	"BUDHA",
	"KONGHUCHU",
	"ALIRAN_KEPERCAYAAN",
	"LAINNYA",
] as const;

export const Agama = z.enum(AGAMA);

export type Agama = z.infer<typeof Agama>;

export const findAgamaIndex = (searchAgama?: string): number => {
	if (!searchAgama) return 0;
	const idx = AGAMA.findIndex((agama) => agama === searchAgama);
	return idx < 0 ? 0 : idx;
};
