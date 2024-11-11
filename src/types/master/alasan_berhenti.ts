import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface AlasanBerhenti {
	id: number;
	nama: string;
	notes: string;
}

export const AlasanBerhentiSchema = z.object({
	id: z.number(),
	nama: z
		.string({ required_error: "Nama Alasan Berhenti Wajib Diisi" })
		.min(3, { message: "Nama Alasan Berhenti Wajib Diisi" }),
	notes: z.string().optional(),
});

export type AlasanBerhentiSchema = z.infer<typeof AlasanBerhentiSchema>;

export const alasanBerhentiTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{
		id: "nama",
		label: "Nama Alasan Berhenti",
		search: true,
		searchType: "text",
	},
	{ id: "notes", label: "Notes" },
	{ id: "aksi", label: "Aksi" },
];
