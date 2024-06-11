import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface StatusPegawai {
	id: number;
	nama: string;
}

export const StatusPegawaiSchema = z.object({
	id: z.number(),
	nama: z
		.string({
			required_error: "Nama wajib diisi",
		})
		.min(3, { message: "Nama wajib diisi" }),
});

export type StatusPegawaiSchema = z.infer<typeof StatusPegawaiSchema>;

export const statusPegawaiTableColumns: CustomColumnDef[] = [
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
