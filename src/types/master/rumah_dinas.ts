import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface RumahDinas {
	id: number;
	nama: string;
	nilai: number;
}

export const RumahDinasSchema = z.object({
    id: z.number().default(0),
    nama: z.string().min(3, "Rumah Dinas wajib diisi"),
    nilai: z.number(),
});

export type RumahDinasSchema= z.infer<typeof RumahDinasSchema>;

export const rumahDinasTableColumns: CustomColumnDef[] = [
    { id: "urut", label: "No" },
    { id: "aksi", label: "Aksi" },
    { id: "nama", label: "Rumah Dinas", search: true, searchType: "text" },
    { id: "nilai", label: "Nilai" },
];