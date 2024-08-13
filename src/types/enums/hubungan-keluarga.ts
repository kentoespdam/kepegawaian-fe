import { z } from "zod";

export const HUBUNGAN_KELUARGA = [
	"SUAMI",
	"ISTRI",
	"AYAH",
	"IBU",
	"ANAK",
	"SAUDARA",
] as const;

export const HubunganKeluarga = z.enum(HUBUNGAN_KELUARGA);

export type HubunganKeluarga = z.infer<typeof HubunganKeluarga>;

export const findHubunganKeluargaIndex = (
	hubunganKeluarga?: HubunganKeluarga,
) => {
	if (!hubunganKeluarga) return 0;
	const result = HUBUNGAN_KELUARGA.findIndex((hub) => hub === hubunganKeluarga);
	return result === -1 ? 0 : result;
};
