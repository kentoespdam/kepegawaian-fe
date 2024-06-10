import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface Golongan {
	id: number;
	golongan: string;
	pangkat: string;
}

export const GolonganSchema = z.object({
	id: z.number(),
	golongan: z.string(),
	pangkat: z.string(),
});

export const golonganTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "golongan", label: "Golongan", search: true, searchType: "text" },
	{ id: "pangkat", label: "Pangkat", search: true, searchType: "text" },
	{ id: "aksi", label: "Aksi" },
];
