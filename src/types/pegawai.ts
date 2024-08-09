import { z } from "zod";
import type { CustomColumnDef } from ".";
import type { RiwayatSk } from "./kepegawaian/riwayat_sk";
import type { Golongan } from "./master/golongan";
import type { Grade } from "./master/grade";
import type { JabatanMini } from "./master/jabatan";
import type { Organisasi } from "./master/organisasi";
import type { Profesi } from "./master/profesi";
import type { StatusKerja } from "./master/status_kerja";
import { BiodataSchema, type BiodataMini } from "./profil/biodata";

export interface BasePegawai {
	id: number;
	nipam: string;
	nomorSk: string;
	tanggalSk: string;
	biodata: BiodataMini;
	statusPegawai: string;
	organisasi: Organisasi;
	jabatan: JabatanMini;
	profesi: Profesi;
	golongan: Golongan;
	grade: Grade;
	statusKerja: StatusKerja;
	tmtPensiun: string;
	gajiPokok: number;
	phdp: number;
	jmlTanggungan: number;
	mkgTahun: number;
	mkgBulan: number;
	absensiId: number;
	notes: string | null;
}

export interface PegawaiDetail extends BasePegawai {
	skCapeg: RiwayatSk;
	skPegawai: RiwayatSk;
	skGolongan: RiwayatSk;
	skJabatan: RiwayatSk;
	skMutasi: RiwayatSk;
}

export interface Pegawai extends BasePegawai {
	refSkCapegId: number;
	tmtKerja: string;
	tmtPensiun: string;
	refSkPegawaiId: number;
	tmtPegawai: string;
	refSkGolonganId: number;
	tmtGolongan: string;
	refSkJabatanId: number;
	tmtJabatan: string;
	refSkMutasiId: number;
	tmtMutasi: string;
}

export const RefNonPegawai = BiodataSchema.extend({
	referensi: z.literal("BIODATA"),
	updateBio: z.boolean().optional().default(false),
});

export const RefPegawai = BiodataSchema.extend({
	referensi: z.literal("PEGAWAI"),
	updateBio: z.boolean().optional().default(false),
	updatePegawai: z.boolean().optional().default(false),
	id: z.number().optional(),
	nipam: z.string().min(8, { message: "NIPAM wajib diisi" }),
	nomorSk: z.string().min(3, { message: "Nomor SK wajib diisi" }),
	tanggalSk: z.string().min(10, { message: "Tgl SK wajib diisi" }),
	statusPegawai: z.string().min(1, { message: "Status Pegawai wajib diisi" }),
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
