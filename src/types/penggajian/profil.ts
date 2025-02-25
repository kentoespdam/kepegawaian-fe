import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface ProfilGaji {
	id: number;
	nama: string;
}

export const ProfilGajiSchema = z.object({
	id: z.number().optional().default(0),
	nama: z.string(),
});

export type ProfilGajiSchema = z.infer<typeof ProfilGajiSchema>;

export const profilGajiColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "nama", label: "Nama", search: true, searchType: "text" },
	{ id: "aksi", label: "Aksi" },
];

export const findKode = (list: ProfilGaji[], id: number | string) => {
	const cari = list.find((row) => row.id === id);
	if (!cari)
		return {
			id: 0,
			nama: "Pilih Profil Gaji",
		};

	return cari;
};
