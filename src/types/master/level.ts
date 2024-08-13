import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface Level {
	id: number;
	nama: string;
}

export const LevelSchema = z.object({
	id: z.number(),
	nama: z
		.string({ required_error: "Nama Wajib diisi" })
		.min(3, { message: "Nama Wajib diisi" }),
});

export const levelTableColumns: CustomColumnDef[] = [
	{
		id: "urut",
		label: "No",
	},
	{
		id: "nama",
		label: "Nama",
		search: true,
		searchType: "text",
	},
	{
		id: "aksi",
		label: "Aksi",
	},
];

export const findLevelValue = (
	list: Level[],
	id: string | number | null,
): Level => {
	if (!id) return { id: 0, nama: "Pilih Level" };
	const cari = list.find((row) => row.id === Number(id));
	if (!cari) return { id: 0, nama: "Pilih Level" };
	return cari;
};
