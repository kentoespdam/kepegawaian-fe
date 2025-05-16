import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { BiodataMini } from "./biodata";
import type { JenisPelatihan } from "@_types/master/jenis_pelatihan";

export interface Pelatihan {
	id: number;
	biodata: BiodataMini;
	jenisPelatihan: JenisPelatihan;
	nama: string;
	nilai: number;
	lulus: boolean;
	tanggalMulai: string;
	tanggalSelesai: string;
	notes: string;
	disetujui: boolean;
}

export const PelatihanSchema = z.object({
	id: z.number(),
	biodataId: z.string().min(16, "Biodata wajib diisi"),
	jenisPelatihanId: z.number().min(1, "Jenis Pelatihan wajib diisi"),
	nama: z.string().min(3, "Pelatihan wajib diisi"),
	nilai: z.number(),
	lulus: z.boolean(),
	tanggalMulai: z.string().min(10, "Tgl. Mulai wajib diisi"),
	tanggalSelesai: z.string().min(10, "Tgl. Selesai wajib diisi"),
	notes: z.string(),
});

export type PelatihanSchema = z.infer<typeof PelatihanSchema>;

export const pelatihanTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "pelatihan", label: "Jenis Pelatihan" },
	{ id: "nama", label: "Nama Pelatihan" },
	{ id: "nilai", label: "Nilai" },
	{ id: "lulus", label: "Lulus" },
	{ id: "tanggalMulai", label: "Tgl. Mulai" },
	{ id: "tanggalSelesai", label: "Tgl. Selesai" },
	{ id: "disetujui", label: "Disetujui" },
	{ id: "notes", label: "Notes" },
];
