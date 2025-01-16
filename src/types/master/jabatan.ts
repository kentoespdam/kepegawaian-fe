import { z } from "zod";
import type { CustomColumnDef } from "..";
import { LevelSchema, type Level } from "./level";
import type { OrganisasiMini } from "./organisasi";

export interface JabatanMini {
	id: number;
	kode: string;
	level: Level;
	nama: string;
}

export interface Jabatan extends JabatanMini {
	parent: JabatanMini | null;
	organisasi: OrganisasiMini;
}

export const JabatanMiniSchema = z.object({
	id: z.number(),
	kode: z.string(),
	level: LevelSchema,
	nama: z.string(),
});

export type JabatanMiniSchema = z.infer<typeof JabatanMiniSchema>;

export const JabatanSchema = z.object({
	id: z.number(),
	kode: z.string(),
	parentId: z.optional(z.number()),
	organisasiId: z.number().min(1, "Organisasi harus disiis"),
	levelId: z.number().min(1, "Level wajib diisi"),
	nama: z
		.string({ required_error: "Nama Jabatan wajib diisi" })
		.min(3, { message: "Nama Jabatan wajib diisi" }),
});

export type JabatanSchema = z.infer<typeof JabatanSchema>;

export const jabatanTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "kode", label: "Kode", search: true, searchType: "text" },
	{ id: "nama", label: "Nama", search: true, searchType: "text" },
	{ id: "parentId", label: "Induk", search: true, searchType: "jabatan" },
	{
		id: "organisasiId",
		label: "Organisasi",
		search: true,
		searchType: "organisasi",
	},
	{ id: "levelId", label: "Level", search: true, searchType: "level" },
	{ id: "aksi", label: "Aksi" },
];

export const findJabatanValue = (
	list: JabatanMini[],
	id: string | number | null,
): JabatanMini => {
	const cari = list.find((row) => row.id === Number(id));
	if (!cari)
		return {
			id: 0,
			kode: "",
			level: { id: 0, nama: "" },
			nama: "Pilih Jabatan",
		};
	return cari;
};
