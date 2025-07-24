import { z } from "zod";

export const STATUS_KAWIN = [
	"BELUM_KAWIN",
	"KAWIN",
	"JANDA_DUDA",
	"MENIKAH_SEKANTOR",
	"TIDAK_TAHU",
] as const;

export const StatusKawin = z.enum(STATUS_KAWIN);

export type StatusKawin = z.infer<typeof StatusKawin>;

export const findStatusKawinIndex = (statusKawin?: string) => {
	if (!statusKawin) return 0;
	const cari = STATUS_KAWIN.findIndex((row) => row === statusKawin);
	return cari < 0 ? 0 : cari;
};

export const getStatusKawinLabel = (statusKawin?: string) => {
	switch (statusKawin) {
		case "BELUM_KAWIN":
			return "Belum Menikah";
		case "KAWIN":
			return "Sudah Menikah";
		case "JANDA_DUDA":
			return "Janda/Duda";
		case "MENIKAH_SEKANTOR":
			return "Menikah Sekantor";
		case "TIDAK_TAHU":
			return "Tidak Tahu";
		default:
			return "";
	}
};
