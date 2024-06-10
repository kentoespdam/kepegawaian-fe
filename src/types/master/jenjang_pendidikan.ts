import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface JenjangPendidikan {
	id: number;
	nama: string;
	seq: number;
}

export const JenjangPendidikanSchema = z.object({
	id: z.number(),
	nama: z.string({
		required_error: "Nama Jenis Kitas Wajib Diisi",
	}),
	seq: z.number().min(1, "Urut Wajib Diisi"),
});

export const jenjangPendidikanTableColumn: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{
		id: "nama",
		label: "Nama Jenjang Pendidikan",
		search: true,
		searchType: "text",
	},
	{ id: "seq", label: "Urut" },
	{ id: "aksi", label: "Aksi" },
];
