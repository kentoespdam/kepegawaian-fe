import { z } from "zod";
import type { ProfilGaji } from "./profil";
import type { CustomColumnDef } from "..";

export interface KomponenGajiMini {
	kode: string;
	nama: string;
}

export interface KomponenGaji extends KomponenGajiMini {
	id: number;
	urut: number;
	profilGaji: ProfilGaji;
	jenisGaji: string;
	nilai: number;
	isReference: boolean;
	formula: string;
}

export const KomponenGajiSchema = z.object({
	id: z.number().optional().default(0),
	urut: z.number().default(1),
	profilGajiId: z.number().min(1, { message: "Profil Gaji Required" }),
	profilGajiName: z.string().min(1, { message: "Profil Gaji Required" }),
	kode: z.string().toUpperCase(),
	nama: z.string(),
	jenisGaji: z.string(),
	nilai: z.number(),
	isReference: z.boolean().default(false),
	formula: z.string().toUpperCase(),
});

export type KomponenGajiSchema = z.infer<typeof KomponenGajiSchema>;

export const komponentGajiColumns: CustomColumnDef[] = [
	{ id: "aksi", label: "Aksi" },
	{ id: "urut", label: "Urut" },
	{ id: "kode", label: "Kode" },
	{ id: "nama", label: "Nama" },
	{ id: "jenisGaji", label: "Jenis Gaji" },
	{ id: "nilai", label: "Nilai" },
	{ id: "formula", label: "Formula" },
];

export const jenisGajiString = (jenisGaji: string) => {
	switch (jenisGaji) {
		case "PEMASUKAN":
			return "Pemasukan";
		case "PENGELUARAN":
			return "Pengeluaran";
		default:
			return "-";
	}
};
