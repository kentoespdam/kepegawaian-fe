import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface JenisKitas {
	id: number;
	nama: string;
}

export const JenisKitasSchema = z.object({
	id: z.number(),
	nama: z
		.string({ required_error: "Nama Jenis Kitas Wajib Diisi" })
		.min(3, { message: "Nama Jenis Kitas Wajib Diisi" }),
});

export const jenisKitasTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{
		id: "nama",
		label: "Nama Jenis Kartu",
		search: true,
		searchType: "text",
	},
	{ id: "aksi", label: "Aksi" },
];

export const findJenisJenisKitasValue = (list: JenisKitas[], id: number) => {
	const result = list.find((row) => row.id === id);
	return !result ? { nama: "Pilih Jenis Kartu Identitas" } : result;
};
