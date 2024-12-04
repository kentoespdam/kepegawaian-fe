import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface Phdp {
	id: number;
	urut: number;
	kondisi: string;
	formula: string;
}

export const PhdpSchema = z.object({
	id: z.number(),
	urut: z.number().default(1),
	kondisi: z.string(),
	formula: z.string(),
});

export type PhdpSchema = z.infer<typeof PhdpSchema>;

export const phdpTableColumns: CustomColumnDef[] = [
	{ id: "no", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "urut", label: "Urut" },
	{ id: "kondisi", label: "Kondisi", search: true, searchType: "text" },
	{ id: "formula", label: "Formula" },
];
