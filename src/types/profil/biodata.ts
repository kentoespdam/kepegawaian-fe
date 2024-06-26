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
	nik: z.string().min(16, { message: "NIK wajib diisi" }),
	nama: z.string().min(3, { message: "Nama wajib diisi" }),
	jenisKelamin: z.string().min(1, { message: "Jenis Kelamin wajib diisi" }),
	tempatLahir: z.string().min(3, { message: "Tempat Lahir wajib diisi" }),
	tanggalLahir: z.string().min(10, { message: "Tanggal Lahir wajib diisi" }),
	alamat: z.string().min(3, { message: "Alamat wajib diisi" }),
	telp: z.string(),
	agama: z.number().min(0, { message: "Agama wajib diisi" }),
	ibuKandung: z.string().min(3, { message: "Ibu Kandung wajib diisi" }),
	pendidikanTerakhirId: z
		.number()
		.min(1, { message: "Pendidikan Terakhir wajib diisi" }),
	golonganDarah: z.string(),
	statusKawin: z.number().default(0),
	notes: z.string(),
});

export type BiodataSchema = z.infer<typeof BiodataSchema>;

export type TypeBiodataSchema = z.infer<typeof BiodataSchema>;

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
