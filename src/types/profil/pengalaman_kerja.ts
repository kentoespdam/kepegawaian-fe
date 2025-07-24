import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { BiodataMini } from "./biodata";

export interface PengalamanKerja {
	id: number;
	biodata: BiodataMini;
	namaPerusahaan: string;
	typePerusahaan: string;
	jabatan: string;
	lokasi: string;
	tahunMasuk: number;
	tahunKeluar: number;
	notes: string;
	disetujui: boolean;
}

export const PengalamanKerjaSchema = z.object({
	id: z.number().default(0),
	biodataId: z.string().min(16, "Biodata wajib diisi"),
	biodataName: z.string().optional(),
	namaPerusahaan: z.string().min(3, "Perusahaan wajib diisi"),
	typePerusahaan: z.string().min(3, "Type Perusahaan wajib diisi"),
	jabatan: z.string().min(3, "Jabatan wajib diisi"),
	lokasi: z.string().min(3, "Lokasi wajib diisi"),
	tahunMasuk: z.number().min(1945, "Tahun Masuk wajib diisi"),
	tahunKeluar: z.number().min(1945, "Tahun Masuk wajib diisi"),
	notes: z.string().optional(),
});

export type PengalamanKerjaSchema = z.infer<typeof PengalamanKerjaSchema>;

export const pengalamanKerjaTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{
		id: "namaPerusahaan",
		label: "Perusahaan",
		search: true,
		searchType: "text",
	},
	{
		id: "typePerusahaan",
		label: "Type Perusahaan",
		search: true,
		searchType: "text",
	},
	{ id: "jabatan", label: "Jabatan", search: true, searchType: "text" },
	{ id: "lokasi", label: "Lokasi", search: true, searchType: "text" },
	{ id: "tahunMasuk", label: "Tahun Masuk" },
	{ id: "tahunKeluar", label: "Tahun Keluar" },
	{ id: "notes", label: "Notes" },
	{ id: "disetujui", label: "Disetujui" },
];
