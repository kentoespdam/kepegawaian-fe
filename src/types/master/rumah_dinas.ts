import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface RumahDinas {
	id: number;
	nama: string;
	nilai: number;
}

export const RumahDinasSchema = z.object({
    id: z.number(),
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

export const findRumahDinas = (list: RumahDinas[], id: number|string) => {
    const cari= list.find((row) => row.id === Number(id));
    if (!cari) return { id: 0, nama: "Pilih Rumah Dinas", nilai: 0 };
    return cari;
}