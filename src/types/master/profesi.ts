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
	id: z.optional(z.number()),
	levelId: z.number().min(1, "Level wajib diisi"),
	nama: z
		.string({ required_error: "Nama wajib diisi" })
		.min(3, { message: "Nama wajib diisi" }),
	detail: z
		.string({ required_error: "Detail wajib diisi" })
		.min(3, { message: "Detail wajib diisi" }),
	resiko: z
		.string({ required_error: "Resiko wajib diisi" })
		.min(3, { message: "Resiko wajib diisi" }),
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
		id: "aksi",
		label: "Aksi",
	},
];

export const findValue = (
	list: ProfesiMini[],
	id: string | number | null,
): ProfesiMini | undefined => list.find((row) => row.id === Number(id));
