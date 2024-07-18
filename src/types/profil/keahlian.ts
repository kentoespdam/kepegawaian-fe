import type { JenisKeahlian } from "@_types/master/jenis_keahlian";
import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { BiodataMini } from "./biodata";

export interface Keahlian {
	id: number;
	biodata: BiodataMini;
	jenisKeahlian: JenisKeahlian;
	kualifikasi: string;
	sertifikasi: boolean;
	institusi: string;
	tahun: number;
	masaBerlaku: string | null;
	disetujui: boolean;
}

export const KeahlianSchema = z.object({
	id: z.number().default(0),
	biodataId: z.string().min(16, "Biodata wajib diisi"),
	keahlianId: z.number().min(1, "Jenis Keahlian wajib diisi"),
	kualifikasi: z.string().min(3, "Kualifikasi wajib diisi"),
	sertifikasi: z.boolean().default(false),
	institusi: z.string().min(3, "Institusi wajib diisi"),
	tahun: z.number(),
	masaBerlaku: z.string().optional(),
});

export type KeahlianSchema = z.infer<typeof KeahlianSchema>;

export const keahlianTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "keahlian", label: "Keahlian" },
	{ id: "kualifikasi", label: "Kualifikasi" },
	{ id: "sertifikasi", label: "Sertifikasi" },
	{ id: "institusi", label: "Institusi" },
	{ id: "tahun", label: "Tahun" },
	{ id: "masaBerlaku", label: "Masa Berlaku" },
	{ id: "disetujui", label: "Disetujui" },
];
