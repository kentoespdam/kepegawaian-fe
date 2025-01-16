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
