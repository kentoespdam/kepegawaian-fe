import { z } from "zod";
import type { CustomColumnDef } from ".";
import type { Golongan } from "./master/golongan";
import type { Grade } from "./master/grade";
import type { JabatanMini } from "./master/jabatan";
import type { Organisasi } from "./master/organisasi";
import type { Profesi } from "./master/profesi";
import type { StatusKerja } from "./master/status_kerja";
import type { StatusPegawai } from "./master/status_pegawai";
import { BiodataSchema, type BiodataMini } from "./profil/biodata";

export interface Pegawai {
	id: number;
	nipam: string;
	noSk: string;
	tanggalTmtSk: string;
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

export const RefNonPegawai = BiodataSchema.extend({
	referensi: z.literal("biodata"),
	updateBio: z.boolean().optional().default(false),
});

export const RefPegawai = BiodataSchema.extend({
	referensi: z.literal("pegawai"),
	updateBio: z.boolean().optional().default(false),
	updatePegawai: z.boolean().optional().default(false),
	id: z
		.number()
		.optional(),
	nipam: z.string().min(8, { message: "NIPAM wajib diisi" }),
	noSk: z.string().min(3, { message: "Nomor SK wajib diisi" }),
	tanggalTmtSk: z.string().min(10, { message: "Tgl SK wajib diisi" }),
	statusPegawaiId: z.number().min(1, { message: "Status Pegawai wajib diisi" }),
	organisasiId: z.number().min(1, { message: "Status Pegawai wajib diisi" }),
	jabatanId: z.number().min(1, { message: "Status Pegawai wajib diisi" }),
	profesiId: z.number().optional(),
	golonganId: z.number().min(1, { message: "Status Pegawai wajib diisi" }),
	gradeId: z.number().min(1, { message: "Grade wajib diisi" }).optional(),
	statusKerjaId: z.number().min(1, { message: "Status Pegawai wajib diisi" }),
});

export const ConditionalSchema = z.discriminatedUnion("referensi", [
	RefNonPegawai,
	RefPegawai,
]);

export const pegawaiTableColumns: CustomColumnDef[] = [
	{
		id: "urut",
		label: "No",
	},
	{
		id: "aksi",
		label: "Aksi",
	},
	{
		id: "nama",
		label: "Nama",
		search: true,
		searchType: "text",
	},
	{
		id: "nipam",
		label: "Nipam",
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
	
];
