import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface StatusKerja {
	id: number;
	nama: string;
}

export const StatusKerjaSchema = z.object({
	id: z.number(),
	nama: z
		.string({
			required_error: "Nama wajib diisi",
		})
		.min(3, { message: "Nama wajib diisi" }),
});

export const statusKerjaTableColumns: CustomColumnDef[] = [
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

export const findStatusKerjaValue = (
	list: StatusKerja[],
	id: number | string,
) => {
	const statusKerja = list.find((statusKerja) => statusKerja.id === Number(id));
	if (!statusKerja)
		return {
			id: 0,
			nama: "Pilih Status Kerja",
		};
	return statusKerja;
};
