import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface JenisKeahlian {
	id: number;
	nama: string;
}

export const JenisKeahlianSchema = z.object({
	id: z.number(),
	nama: z
		.string({ required_error: "Nama Jenis Keahlian wajib diisi" })
		.min(3, { message: "Nama Jenis Keahlian wajib diisi" }),
});

export const jenisKeahlianTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{
		id: "nama",
		label: "Nama Jenis Keahlian",
		search: true,
		searchType: "text",
	},
	{ id: "aksi", label: "Aksi" },
];

export const findJenisKeahlianValue = (list: JenisKeahlian[], id: number) => {
	const result = list.find((row) => row.id === id);
	return !result ? { nama: "Pilih Keahlian" } : result;
};
