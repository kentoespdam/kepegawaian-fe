import type { Agama } from "@_types/enums/agama";
import type { StatusKawin } from "@_types/enums/status_kawin";
import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { KartuIdentitas } from "./kartu_identitas";
import type { PendidikanTerakhir } from "./pendidikan_terakhir";

export interface BiodataMini {
	nik: string;
	nama: string;
	jenisKelamin: string;
	tanggalLahir: string;
}

export interface Biodata extends BiodataMini {
	tempatLahir: string;
	alamat: string;
	telp: string;
	agama: Agama;
	ibuKandung: string;
	pendidikanTerakhir: PendidikanTerakhir;
	golonganDarah: string;
	statusKawin: StatusKawin;
	fotoProfil: string;
	notes: string;
	kartuIdentitas: KartuIdentitas;
}

export const BiodataSchema = z.object({
	nik: z.string({ message: "NIK wajib diisi" }),
	nama: z.string({ message: "Nama wajib diisi" }),
	jenisKelamin: z.string({ message: "Jenis Kelamin wajib diisi" }),
	tempatLahir: z.string({ message: "Tempat Lahir wajib diisi" }),
	tanggalLahir: z.string({ message: "Tanggal Lahir wajib diisi" }),
	alamat: z.string({ message: "Alamat wajib diisi" }),
	telp: z.string().optional(),
	agama: z.number(),
	ibuKandung: z.string({ message: "Ibu Kandung wajib diisi" }),
	pendidikanTerakhir: z
		.number()
		.min(1, { message: "Pendidikan Terakhir wajib diisi" }),
	golonganDarah: z.string().optional(),
	statusKawin: z.string(),
	notes: z.string(),
});

export type BiodataSchema = z.infer<typeof BiodataSchema>;

export const biodataTableColumns: CustomColumnDef[] = [
	{
		id: "urut",
		label: "No",
	},
	{
		id: "nik",
		label: "Nik",
		search: true,
		searchType: "text",
	},
	{
		id: "nama",
		label: "Nama",
		search: true,
		searchType: "text",
	},
	{
		id: "jenisKelamin",
		label: "Jenis Kelamin",
	},
	{
		id: "tempatLahir",
		label: "Tempat Lahir",
	},
	{
		id: "tanggalLahir",
		label: "Tanggal Lahir",
	},
	{
		id: "alamat",
		label: "Alamat",
	},
	{
		id: "telp",
		label: "Telp",
	},
	{
		id: "agama",
		label: "Agama",
	},
	{
		id: "ibuKandung",
		label: "Ibu Kandung",
	},
	{
		id: "pendidikanTerakhir",
		label: "Pendidikan Terakhir",
	},
	{
		id: "golonganDarah",
		label: "Golongan Darah",
	},
	{
		id: "statusKawin",
		label: "Status Kawin",
	},
	{
		id: "notes",
		label: "Notes",
	},
];
