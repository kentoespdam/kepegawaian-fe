import { z } from "zod";
import type { CustomColumnDef } from ".";
import type { Golongan } from "./master/golongan";
import type { Grade } from "./master/grade";
import { type JabatanMini, JabatanSchema } from "./master/jabatan";
import type { Organisasi } from "./master/organisasi";
import type { Profesi } from "./master/profesi";
import type { StatusKerja } from "./master/status_kerja";
import {
	type StatusPegawai,
	StatusPegawaiSchema,
} from "./master/status_pegawai";
import { type BiodataMini, BiodataSchema } from "./profil/biodata";

export interface Pegawai {
	id: number;
	nipam: string;
	biodata: BiodataMini;
	statusPegawai: StatusPegawai;
	jabatan: JabatanMini;
	organisasi: Organisasi;
	profesi: Profesi;
	golongan: Golongan;
	grade: Grade;
	statusKerja: StatusKerja;
	notes: string | null;
}

export const RefPegawai = z.object({
	referensi: z.literal("pegawai"),
	id: z.string().transform((val) => Number(val)),
	nipam: z.string(),
	nik: z.string(),
	noSk: z.string(),
	tanggalTmtSk: z.string(),
	statusPegawaiId: z
		.string()
		.min(1, "Status Pegawai wajib diisi")
		.transform((val) => Number(val)),
	jabatanId: z
		.string()
		.min(1, "Status Pegawai wajib diisi")
		.transform((val) => Number(val)),
	organisasiId: z
		.string()
		.min(1, "Status Pegawai wajib diisi")
		.transform((val) => Number(val)),
	profesiId: z
		.string()
		.min(1, "Status Pegawai wajib diisi")
		.transform((val) => Number(val)),
	golonganId: z
		.string()
		.min(1, "Status Pegawai wajib diisi")
		.transform((val) => Number(val)),
	gradeId: z
		.string()
		.min(1, "Status Pegawai wajib diisi")
		.transform((val) => Number(val)),
	statusKerjaId: z
		.string()
		.min(1, "Status Pegawai wajib diisi")
		.transform((val) => Number(val)),
});

export const BaseSchema = z.object({
	referensi: z.enum(["biodata", "pegawai"]),
});

export const ConditionalSchema = BaseSchema.extend({
	...z
		.object({
			nipam: z.string().optional(),
			nama: z.string().optional(),
		})
		.refine(
			(data) => {
				if (data.referensi === "biodata") {
					return !!data.nama && !data.nipam;
				} else if (data.referensi === "pegawai") {
					return !!data.nipam && !data.nama;
				}
				return false;
			},
			{
				message: "Invalid object structure",
				path: ["referensi"],
			},
		).shape,
});

export const RefNonPegawai = BiodataSchema.extend({
	referensi: z.literal("biodata"),
});

export const ReferensiPegawai = z.union([RefNonPegawai, RefPegawai]);
export type RefNonPegawai = z.infer<typeof RefNonPegawai>;
export type RefPegawai = z.infer<typeof RefPegawai>;
export type ReferensiPegawai = RefNonPegawai | RefPegawai;

export const pegawaiTableColumns: CustomColumnDef[] = [
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
		label: "J/K",
	},
	{
		id: "golonganId",
		label: "Gol.",
	},
	{
		id: "jabatanId",
		label: "Jabatan",
	},
	{
		id: "tglLahir",
		label: "Tgl Lahir",
	},
	// {
	// 	id: "tmtPensiun",
	// 	label: "TMT Pensiun",
	// },
	{
		id: "statusKawin",
		label: "Perkawinan",
	},
	{
		id: "kdPajak",
		label: "Kd. Pajak",
	},
	{
		id: "bpjs",
		label: "BPJS?",
	},
	{
		id: "statusPegawaiId",
		label: "Status Pegawai",
	},
	{
		id: "aksi",
		label: "Aksi",
	},
];
