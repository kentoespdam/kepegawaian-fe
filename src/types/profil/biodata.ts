import type { Agama } from "@_types/enums/agama";
import type { StatusKawin } from "@_types/enums/status_kawin";
import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { KartuIdentitas } from "./kartu_identitas";
import type { PendidikanTerakhir } from "./pendidikan_terakhir";
import { useMutationState, useQueryClient } from "@tanstack/react-query";
import { JenisKelamin } from "@_types/enums/jenisKelamin";

export interface BiodataMini {
	nik: string;
	nama: string;
	jenisKelamin: JenisKelamin;
	tanggalLahir: string;
	statusKawin: StatusKawin;
}

export interface Biodata extends BiodataMini {
	tempatLahir: string;
	alamat: string;
	telp: string;
	agama: Agama;
	ibuKandung: string;
	pendidikanTerakhir: PendidikanTerakhir;
	golonganDarah: string;
	fotoProfil: string;
	notes: string;
	kartuIdentitas: KartuIdentitas;
}

export const BiodataSchema = z.object({
	nik: z.string().min(16, { message: "NIK wajib diisi" }),
	nama: z.string().min(3, { message: "Nama wajib diisi" }),
	jenisKelamin: JenisKelamin,
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
		id: "",
		label: "Aksi",
	},
	{
		id: "nama",
		label: "Nama",
		search: true,
		searchType: "text",
	},
	{
		id: "nik",
		label: "Nik",
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
