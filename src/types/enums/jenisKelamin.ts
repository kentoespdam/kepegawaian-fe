import { z } from "zod";

export const JENIS_KELAMIN = ["LAKI_LAKI", "PEREMPUAN"] as const;
export const JenisKelamin = z.enum(JENIS_KELAMIN);
export type JenisKelamin = z.infer<typeof JenisKelamin>;

export const findJenisKelaminIndex = (jk?: JenisKelamin): number => {
	if (!jk) return 0;
	const result = JENIS_KELAMIN.findIndex((jeniskel) => jeniskel === jk);
	return result > 0 ? result : 0;
};
