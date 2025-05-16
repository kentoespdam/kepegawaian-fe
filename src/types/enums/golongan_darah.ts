import { z } from "zod";

export const GOLONGAN_DARAH = {
	A: "A",
	B: "B",
	AB: "AB",
	O: "O",
};

export const GolonganDarah = z.nativeEnum(GOLONGAN_DARAH);

export type GolonganDarah = z.infer<typeof GolonganDarah>;
