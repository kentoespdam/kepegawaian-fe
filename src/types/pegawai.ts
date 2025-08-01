import { z } from "zod";
import type { CustomColumnDef } from ".";
import type { RiwayatSk } from "./kepegawaian/riwayat_sk";
import type { Golongan } from "./master/golongan";
import type { Grade } from "./master/grade";
import type { JabatanMini } from "./master/jabatan";
import type { Organisasi, OrganisasiMini } from "./master/organisasi";
import type { Profesi } from "./master/profesi";
import type { RumahDinas } from "./master/rumah_dinas";
import type { PendapatanNonPajak } from "./penggajian/pendapatan_non_pajak";
import type { ProfilGaji } from "./penggajian/profil";
import {
	type Biodata,
	type BiodataMini,
	BiodataSchema,
} from "./profil/biodata";

export interface PegawaiMini {
	id: number;
	nipam: string;
	nama: string;
	statusPegawai: string;
	jabatan: string;
	organisasi: string;
}

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
	isAskes: boolean;
	kodePajak: PendapatanNonPajak | null;
	email: string;
	notes: string | null;
}

export interface PegawaiDetail extends BasePegawai {
	biodata: Biodata;
	skCapeg: RiwayatSk | null;
	skPegawai: RiwayatSk | null;
	skGolongan: RiwayatSk | null;
	skJabatan: RiwayatSk | null;
	skMutasi: RiwayatSk | null;
	skKontrak: RiwayatSk | null;
	skGajiBerkala: RiwayatSk | null;
	tanggalSk: string;
	tmtKontrakSelesai: string;
	gajiProfil: ProfilGaji | null;
	rumahDinas: RumahDinas | null;
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

export interface PegawaiList {
	id: number;
	nipam: string;
	nama: string;
	statusPegawai: string;
	organisasi: OrganisasiMini;
	jabatan: JabatanMini;
	golongan: Golongan;
}

export interface PegawaiRingkas {
	id: number;
	nipam: string;
	nama: string;
	jenisKelamin: string;
	tempatLahir: string;
	tanggalLahir: string;
	statusKawin: string;
	alamat: string;
	nik: string;
	agama: string;
	telp: string;
	email: string;
	kodePajak: string;
	ibuKandung: string;
	pendidikanTerakhir: string;
	lembagaPendidikan: string;
	tahunLulus: number;
	statusPegawai: string;
	pangkatGolongan: string;
	tmtGolongan: string;
	mkg: string;
	unitKerja: string;
	jabatan: string;
	profesi: string;
	grade: string;
	tmtKerja: string;
	tmtPegawai: string;
	tmtPensiun: string;
	isAskes: boolean | null;
	absesniId: number | null;
	noKontrak: string;
	noNpwp: string;
	noJamsostek: string;
	noBpjs: string;
	noIdCard: string;
}

export const PegawaiSchema = BiodataSchema.extend({
	statusPegawai: z.string().min(1, "Status Pegawai wajib diisi"),
	id: z.number().optional(),
	nipam: z.string().optional(),
	statusKerja: z.string().optional(),
	organisasiId: z.number().optional(),
	jabatanId: z.number().optional(),
	profesiId: z.number().optional(),
	kodePajakId: z.number().min(1, "Kode Pajak wajib diisi"),
	golonganId: z.number().optional(),
	nomorSk: z.string().optional(),
	tanggalSk: z.string().optional(),
	tmtBerlakuSk: z.string().optional(),
	tmtKontrakSelesai: z.string().optional(),
	gajiPokok: z.number().default(0),
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
		["CAPEG", "PEGAWAI"].includes(val.statusPegawai) &&
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
		id: "nipam",
		label: "NIK",
		search: true,
		searchType: "text",
		sortable: true,
	},
	{
		id: "nama",
		label: "Nama Lengkap",
		search: true,
		searchType: "text",
		sortable: true,
	},
	{
		id: "jenisKelamin",
		label: "J/K",
	},
	{
		id: "golonganId",
		label: "Gol.",
		search: true,
		searchType: "golongan",
		sortable: true,
	},
	{
		id: "organisasiId",
		label: "Organisasi",
		search: true,
		searchType: "organisasi",
		sortable: true,
	},
	{
		id: "jabatanId",
		label: "Jabatan",
		search: true,
		searchType: "jabatan",
		sortable: true,
	},
	{
		id: "profesiId",
		label: "Profesi",
		search: true,
		searchType: "profesi",
		sortable: true,
	},
	{
		id: "tglLahir",
		label: "Tgl. Lahir",
	},
	{
		id: "tmtPensiun",
		label: "TMT Pensiun",
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

export const ProfilGajiPegawaiSchema = z.object({
	id: z.number().default(0),
	nipam: z.string(),
	nama: z.string(),
	tmtKerja: z.string().min(10, "Tgl. Mulai Kerja wajib diisi"),
	tmtPegawai: z.string(),
	golonganName: z.string().optional(),
	tmtGolongan: z.string(),
	mkgTahun: z.number(),
	mkgBulan: z.number(),
	jabatanName: z.string(),
	tmtJabatan: z.string(),
	tmtPensiun: z.string(),
	statusPegawai: z.string().min(1, "Status Pegawai wajib diisi"),
	gajiPokok: z.number(),
	kodePajakId: z.number(),
	gajiProfilId: z.number(),
	rumahDinasId: z.number(),
	phdp: z.number(),
	isAskes: z.boolean(),
});

export type ProfilGajiPegawaiSchema = z.infer<typeof ProfilGajiPegawaiSchema>;

export const ProfilPribadiSchema = z.object({
	id: z.number().default(0),
	nipam: z.string().min(8, "NIPAM wajib diisi"),
	nama: z.string().min(3, "Nama wajib diisi"),
	jenisKelamin: z.string().min(1, "Jenis Kelamin wajib diisi"),
	statusKawin: z.string().min(1, "Status Kawin wajib diisi"),
	agama: z.string().min(1, "Agama wajib diisi"),
	tempatLahir: z.string(),
	tanggalLahir: z.string(),
	alamat: z.string(),
	ibuKandung: z.string(),
	telp: z.string(),
	golonganId: z.number(),
	organisasiId: z.number(),
	jabatanId: z.number(),
	profesiId: z.number().optional(),
	absensiId: z.number(),
});

export type ProfilPribadiSchema = z.infer<typeof ProfilPribadiSchema>;
