import { z } from "zod";

export const JENIS_GAJI = {
	NONE: "-",
	PEMASUKAN: "Pemasukan",
	POTONGAN: "Potongan",
} as const;

export const JenisGaji = z.nativeEnum(JENIS_GAJI);

export type JenisGaji = z.infer<typeof JenisGaji>;

export const getKeyJenisGaji = (jenis: JenisGaji): string => {
	const keys = Object.keys(JENIS_GAJI) as (keyof typeof JENIS_GAJI)[];
	for (const key of keys) {
		if (JENIS_GAJI[key] === jenis) {
			return key;
		}
	}
	return "";
};
