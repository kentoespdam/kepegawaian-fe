import { z } from "zod";

export const JENIS_PENGAJUAN_CUTI = ["PENGAJUAN_CUTI", "KLAIM_CUTI"] as const;

export const JenisPengajuanCuti = z.enum(JENIS_PENGAJUAN_CUTI);
export type JenisPengajuanCuti = z.infer<typeof JenisPengajuanCuti>;

export const getJenisPengajuanCutiLabel = (
	jenisPengajuanCuti: string,
): string => {
	switch (jenisPengajuanCuti) {
		case "PENGAJUAN_CUTI":
			return "Pengajuan Cuti";
		case "KLAIM_CUTI":
			return "Klaim Cuti";
		default:
			return "Jenis Pengajuan Cuti Tidak Dikenal";
	}
};
