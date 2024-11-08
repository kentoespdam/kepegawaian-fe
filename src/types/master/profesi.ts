import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { AlatKerjaMini } from "./alat_kerja";
import type { Apd } from "./apd";
import type { Level } from "./level";

export interface ProfesiMini {
	id: number;
	nama: string;
}

export interface Profesi extends ProfesiMini {
	level: Level;
	detail: string | null;
	resiko: string | null;
	apdList: Apd[] | null;
	alatKerjaList: AlatKerjaMini[] | null;
}

export const ProfesiSchema = z.object({
	id: z.number(),
	levelId: z.number().min(1, "Level wajib diisi"),
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

export const profesiTableColumns: CustomColumnDef[] = [
	{
		id: "urut",
		label: "No",
	},
	{
		id: "levelId",
		label: "Level",
		search: true,
		searchType: "level",
	},
	{
		id: "nama",
		label: "Nama",
		search: true,
		searchType: "text",
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
	{
		id: "aksi",
		label: "Aksi",
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
