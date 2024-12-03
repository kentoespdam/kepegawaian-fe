import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { AlatKerjaMini } from "./alat_kerja";
import type { Apd } from "./apd";
import type { Level } from "./level";
import type { JabatanMini } from "./jabatan";
import type { Grade } from "./grade";
import type { OrganisasiMini } from "./organisasi";

export interface ProfesiMini {
	id: number;
	nama: string;
}

export interface Profesi extends ProfesiMini {
	organisasi: OrganisasiMini;
	jabatan: JabatanMini;
	level: Level;
	grade: Grade;
	detail: string | null;
	resiko: string | null;
	apdList: Apd[] | null;
	alatKerjaList: AlatKerjaMini[] | null;
}

export const ProfesiSchema = z.object({
	id: z.number(),
	organisasiId: z.number().min(1, "Organisasi wajib diisi"),
	jabatanId: z.number().min(1, "Jabatan wajib diisi"),
	gradeId: z.number().min(1, "Grade wajib diisi"),
	nama: z
		.string({ required_error: "Nama wajib diisi" })
		.min(3, { message: "Nama wajib diisi" }),
	detail: z
		.string({ required_error: "Detail wajib diisi" })
		.min(1, { message: "Detail wajib diisi" }),
	resiko: z
		.string({ required_error: "Resiko wajib diisi" })
		.min(1, { message: "Resiko wajib diisi" }),
});

export type ProfesiSchema = z.infer<typeof ProfesiSchema>;

export const profesiTableColumns: CustomColumnDef[] = [
	{
		id: "urut",
		label: "No",
	},
	{
		id: "aksi",
		label: "Aksi",
	},
	{
		id: "nama",
		label: "Nama Profesi",
		search: true,
		searchType: "text",
	},
	{
		id: "organisasiId",
		label: "Organisasi",
		search: true,
		searchType: "organisasi",
	},
	{
		id: "jabatanId",
		label: "Jabatan",
		search: true,
		searchType: "jabatan",
	},
	{
		id: "levelId",
		label: "Level",
		search: true,
		searchType: "level",
	},
	{
		id: "gradeId",
		label: "Grade",
		search: true,
		searchType: "grade",
	},
	{
		id: "detail",
		label: "Detail",
	},
	{
		id: "resiko",
		label: "Resiko",
	},
	{
		id: "apdList",
		label: "Apd",
	},
	{
		id: "alatKerjaList",
		label: "Alat Kerja",
	},
];

export const findProfesiValue = (
	list: ProfesiMini[],
	id: string | number | null,
): ProfesiMini => {
	const cari = list.find((row) => row.id === Number(id));
	if (!cari)
		return {
			id: 0,
			nama: "Pilih Profesi",
		};

	return cari;
};
