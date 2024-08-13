import type { JenisKitas } from "@_types/master/jenis_kitas";
import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { BiodataMini } from "./biodata";

export interface KartuIdentitas {
	id: number;
	biodata: BiodataMini;
	jenisKartu: JenisKitas;
	nomorKartu: string;
	tanggalExpired: string;
	tanggalTerima: string;
	notes: string;
}

export const KartuIdentitasSchema = z.object({
	id: z.number().default(0),
	nik: z.string().min(16, "Biodata wajib diisi"),
	jenisKartuId: z.number().min(1, "Jenis Kartu wajib diisi"),
	nomorKartu: z.string().min(3, "Nomor Kartu wajib diisi"),
	tanggalExpired: z.string().min(10, "Tgl. Expired wajib diisi"),
	tanggalTerima: z.string().min(10, "Tgl. Terima wajib diisi"),
	notes: z.string().optional(),
});

export type KartuIdentitasSchema = z.infer<typeof KartuIdentitasSchema>;

export const kartuIdentitasTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "jenisKartuId", label: "Jenis Kartu" },
	{ id: "nomorKartu", label: "Nomor Kartu" },
	{ id: "tanggalExpired", label: "Tgl. Expired" },
	{ id: "tanggalTerima", label: "Tgl. Terima" },
	{ id: "notes", label: "Notes" },
];
