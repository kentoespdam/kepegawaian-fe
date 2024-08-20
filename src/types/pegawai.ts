import { z } from "zod";
import type { CustomColumnDef } from ".";
import type { RiwayatSk } from "./kepegawaian/riwayat_sk";
import type { Golongan } from "./master/golongan";
import type { Grade } from "./master/grade";
import type { JabatanMini } from "./master/jabatan";
import type { Organisasi } from "./master/organisasi";
import type { Profesi } from "./master/profesi";
import { BiodataSchema, type BiodataMini } from "./profil/biodata";

export interface BasePegawai {
	id: number;
	nipam: string;
	statusPegawai: string;
	statusKerja: string;
	nomorSk: string;
	tmtKerja: string | null;
	biodata: BiodataMini;
	organisasi: Organisasi;
	jabatan: JabatanMini;
	profesi: Profesi;
	golongan: Golongan;
	grade: Grade;
	tmtPensiun: string | null;
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
	tanggalSk: string;
	tmtKontrakSelesai: string;
}

export interface Pegawai extends BasePegawai {
	refSkCapegId: number;
	tmtKerja: string | null;
	tmtPensiun: string | null;
	refSkPegawaiId: number;
	tmtPegawai: string | null;
	refSkGolonganId: number;
	tmtGolongan: string | null;
	refSkJabatanId: number;
	tmtJabatan: string | null;
	refSkMutasiId: number;
	tmtMutasi: string | null;
}

export const PegawaiSchema = BiodataSchema.extend({
	statusPegawai: z.string().min(1, "Status Pegawai wajib diisi"),
	id: z.number().optional(),
	nipam: z.string().optional(),
	statusKerja: z.string().optional(),
	organisasiId: z.number().optional(),
	jabatanId: z.number().optional(),
	profesiId: z.number().optional(),
	gradeId: z.number().optional(),
	golonganId: z.number().optional(),
	nomorSk: z.string().optional(),
	tmtBerlakuSk: z.string().optional(),
	tanggalSk: z.string().optional(),
	tmtKontrakSelesai: z.string().optional(),
	gajiPokok: z.number().optional().default(0),
}).superRefine((val, ctx) => {
	if (val.statusPegawai === "NON_PEGAWAI") return;

	if (!val.nipam || val.nipam === "")
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Nipam wajib diisi",
			path: ["nipam"],
		});

	if (!val.organisasiId || val.organisasiId <= 1)
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Organisasi wajib diisi",
			path: ["organisasiId"],
		});

	if (!val.jabatanId || val.jabatanId <= 1)
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Jabatan wajib diisi",
			path: ["jabatanId"],
		});

	if (!val.profesiId || val.profesiId <= 1)
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Profesi wajib diisi",
			path: ["profesiId"],
		});

	if (!val.gradeId || val.gradeId <= 1)
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Grade wajib diisi",
			path: ["gradeId"],
		});

	if (!val.nomorSk || val.nomorSk === "")
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Nomor SK wajib diisi",
			path: ["nomorSk"],
		});

	if (!val.tmtBerlakuSk || val.tmtBerlakuSk === "")
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Tgl. Berlaku wajib diisi",
			path: ["tmtBerlaku"],
		});

	if (!val.tanggalSk || val.tanggalSk === "")
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Tgl. SK wajib diisi",
			path: ["tanggalSk"],
		});

	if (
		["CAPEG", "PEGAWAI", "CALON_HONORER", "HONORER"].includes(
			val.statusPegawai,
		) &&
		(!val.golonganId || val.golonganId < 1)
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Golongan wajib diisi",
			path: ["golonganId"],
		});
	}
	if (val.statusPegawai === "KONTRAK" && !val.tmtKontrakSelesai) {
		if (!val.tmtKontrakSelesai) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Tgl. Kontrak Selesai wajib diisi",
				path: ["tmtKontrakSelesai"],
			});
		}
	}
});

export type PegawaiSchema = z.infer<typeof PegawaiSchema>;

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
