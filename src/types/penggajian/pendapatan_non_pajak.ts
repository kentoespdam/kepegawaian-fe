import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface PendapatanNonPajak {
	id: number;
	kode: string;
	nominal: number;
	notes: string;
}

export const PendapatanNonPajakSchema = z.object({
	id: z.number(),
	kode: z.string(),
	nominal: z.number(),
	notes: z.string(),
	isUpdate: z.boolean(),
});

export type PendapatanNonPajakSchema = z.infer<typeof PendapatanNonPajakSchema>;

export const pendapatanNonPajakColumns: CustomColumnDef[] = [
	{ id: "aksi", label: "Aksi" },
	{ id: "kode", label: "Kode", search: true, searchType: "text" },
	{ id: "nominal", label: "Nominal" },
	{ id: "notes", label: "Notes" },
];

export const findKode = (
	list: PendapatanNonPajak[],
	id: number | string,
) => {
	const cari = list.find((row) => row.id === id);
	if (!cari)
		return {
			id: 0,
			kode: "Pilih Kode Pajak",
		};

	return cari;
};
