import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface CutiJenis {
	id: number;
	parent: CutiJenis | null;
	nama: string;
	maxHari: number;
	potongKuotaTahunan: boolean;
}

export const CutiJenisSchema = z.object({
	id: z.number(),
	parentId: z.number(),
	nama: z.string(),
	maxHari: z.number(),
	potongKuotaTahunan: z.boolean(),
});

export type CutiJenisSchema = z.infer<typeof CutiJenisSchema>;

export const cutiJenisTableColumn: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "id", label: "Action" },
	{ id: "parentId", label: "Parent" },
	{ id: "nama", label: "Nama" },
	{ id: "maxHari", label: "Max Hari" },
	{ id: "potongKuotaTahunan", label: "Potong Kuota Tahunan" },
];
