import { z } from "zod";

export const JENIS_LAMPIRAN_PROFIL = [
	"PROFIL_KELUARGA",
	"PROFIL_PENDIDIKAN",
	"PROFIL_PELATIHAN",
	"PROFIL_KEAHLIAN",
	"FOTO_PROFIL",
	"KARTU_IDENTITAS",
	"PROFIL_PENGALAMAN_KERJA",
] as const;

export const JenisLampiranProfil = z.enum(JENIS_LAMPIRAN_PROFIL);

export type JenisLampiranProfil = z.infer<typeof JenisLampiranProfil>;

export const findJenisLampiranProfilIndex = (jenisLampiranProfil?: string) => {
	if (!jenisLampiranProfil) return 0;
	const index = JENIS_LAMPIRAN_PROFIL.findIndex(
		(value) => value === jenisLampiranProfil,
	);
	return index < 0 ? 0 : index;
};
