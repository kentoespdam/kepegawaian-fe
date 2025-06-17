import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { BiodataMini } from "./biodata";
import type { JenisPelatihan } from "@_types/master/jenis_pelatihan";

export interface Pelatihan {
	id: number;
	biodata: BiodataMini;
	jenisPelatihan: JenisPelatihan;
	nama: string;
	lembaga: string;
	nilai: number;
	lulus: boolean;
	tanggalMulai: string;
	tanggalSelesai: string;
	ikatanDinas:boolean;
	tanggalAkhirIkatan?:string;
	notes: string;
	disetujui: boolean;
}

export const PelatihanSchema = z.object({
	id: z.number().default(0),
	biodataId: z.string().min(16, "Biodata wajib diisi"),
	jenisPelatihanId: z.number().min(1, "Jenis Pelatihan wajib diisi"),
	nama: z.string().min(3, "Pelatihan wajib diisi"),
	lembaga: z.string(),
	nilai: z.number(),
	lulus: z.boolean().default(true),
	tanggalMulai: z.string().min(10, "Tgl. Mulai wajib diisi"),
	tanggalSelesai: z.string().min(10, "Tgl. Selesai wajib diisi"),
	ikatanDinas: z.boolean().default(false),
	tanggalAkhirIkatan: z.string().optional(),
	notes: z.string().optional(),
});

export type PelatihanSchema = z.infer<typeof PelatihanSchema>;

export const pelatihanTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "pelatihan", label: "Jenis Pelatihan" },
	{ id: "nama", label: "Nama Pelatihan" },
	{ id: "lembaga", label: "Lembaga" },
	{ id: "nilai", label: "Nilai" },
	{ id: "lulus", label: "Lulus" },
	{ id: "tanggalMulai", label: "Tgl. Mulai" },
	{ id: "tanggalSelesai", label: "Tgl. Selesai" },
	{ id: "ikatanDinas", label: "Ikatan Dinas" },
	{ id: "tanggalAkhirIkatan", label: "Tgl. Akhir Ikatan" },
	{ id: "disetujui", label: "Disetujui" },
	{ id: "notes", label: "Notes" },
];
