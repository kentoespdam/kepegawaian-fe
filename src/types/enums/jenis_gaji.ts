import { z } from "zod";

export const JENIS_GAJI = {
	NONE: "-",
	PEMASUKAN: "Pemasukan",
	POTONGAN: "Potongan",
} as const;

export const JenisGaji = z.nativeEnum(JENIS_GAJI);

export type JenisGaji = z.infer<typeof JenisGaji>;

export const getKeyJenisGaji = (jenis: JenisGaji): string => {
	return (
		Object.entries(JENIS_GAJI).find(([, value]) => value === jenis)?.[0] ?? ""
	);
};
