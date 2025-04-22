import type { Golongan } from "@_types/master/golongan";
import { JabatanMiniSchema, type Jabatan } from "@_types/master/jabatan";
import type { Organisasi } from "@_types/master/organisasi";
import type { Profesi } from "@_types/master/profesi";
import { z } from "zod";
import type { CustomColumnDef } from "..";
import { BaseRiwayatSkSchema, type RiwayatSk } from "./riwayat_sk";

export interface RiwayatMutasi {
	id: number;
	skMutasi: RiwayatSk;
	tmtBerlaku: string;
	tanggalBerakhir: string;
	jenisMutasi: string;
	golongan: Golongan | null;
	organisasi: Organisasi | null;
	jabatan: Jabatan | null;
	profesi: Profesi | null;
	golonganLama: Golongan | null;
	organisasiLamaId: number;
	namaOrganisasiLama: string;
	jabatanLamaId: number;
	namaJabatanLama: string;
	profesiLama: Profesi | null;
	notes: string;
}

export const RiwayatMutasiSchema = BaseRiwayatSkSchema.extend({
	nipam: z.string(),
	nama: z.string(),
	tanggalBerakhir: z.string().optional(),
	jenisMutasi: z.string().min(3, "Jenis Mutasi wajib diisi"),
	organisasiId: z.number().optional(),
	jabatan: JabatanMiniSchema.optional(),
	jabatanId: z.number().optional(),
	organisasiLamaId: z.number().optional().default(0),
	namaOrganisasiLama: z.string().optional().default(""),
	jabatanLamaId: z.number().default(0),
	namaJabatanLama: z.string().default(""),
	profesiId: z.number().optional(),
	profesiLamaId: z.number().default(0),
	namaProfesiLama: z.string().default(""),
	golonganLamaId: z.number().optional().default(0),
	namaGolonganLama: z.string().optional().default(""),
	notes: z.string(),
}).superRefine((val, ctx) => {
	const { tanggalSk, tmtBerlaku, nipam, golonganLamaId } = val;
	if (!nipam.startsWith("KO-") && golonganLamaId <= 0) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Golongan wajib diisi",
			path: ["golonganLamaId"],
		});
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Golongan wajib diisi",
			path: ["namaGolonganLama"],
		});
	}
	if (new Date(tanggalSk) > new Date(tmtBerlaku)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Tgl. SK harus lebih kecil dari Tgl. Berlaku",
			path: ["tmtBerlaku"],
		});
	}

	// if (new Date(tglBerakhir) < new Date(tmtBerlaku)) {
	// 	ctx.addIssue({
	// 		code: z.ZodIssueCode.custom,
	// 		message: "Tgl. Berakhir harus lebih besar dari Tgl. Berlaku",
	// 		path: ["tglBerakhir"],
	// 	});
	// }

	if (["MUTASI_LOKER", "MUTASI_JABATAN"].includes(val.jenisMutasi)) {
		if (!val.organisasiId || val.organisasiId <= 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Unit Kerja wajib diisi",
				path: ["organisasiId"],
			});
		}

		if (!val.jabatanId || val.jabatanId <= 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Jabatan wajib diisi",
				path: ["jabatanId"],
			});
		}

		if (!val.profesiId || val.profesiId <= 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Profesi wajib diisi",
				path: ["profesiId"],
			});
		}
	}

	if (
		["MUTASI_GOLONGAN", "MUTASI_GAJI", "MUTASI_GAJI_BERKALA"].includes(
			val.jenisMutasi,
		)
	) {
		if (!val.golonganId || val.golonganId <= 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Golongan wajib diisi",
				path: ["golonganId"],
			});
		}

		if (["MUTASI_GAJI", "MUTASI_GAJI_BERKALA"].includes(val.jenisMutasi)) {
			if (!val.gajiPokok || val.gajiPokok <= 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Gaji Pokok wajib diisi",
					path: ["gajiPokok"],
				});
			}
		}
		switch (val.jenisMutasi) {
			case "MUTASI_GOLONGAN":
				val.jenisSk = "SK_KENAIKAN_PANGKAT_GOLONGAN";
				break;
			case "MUTASI_GAJI":
				val.jenisSk = "SK_PENYESUAIAN_GAJI";
				break;
			case "MUTASI_GAJI_BERKALA":
				val.jenisSk = "SK_KENAIKAN_GAJI_BERKALA";
				break;
		}
	}
});

export type RiwayatMutasiSchema = z.infer<typeof RiwayatMutasiSchema>;

export const riwayatMutasiTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "nomorSk", label: "SK", search: true, searchType: "text" },
	{
		id: "jenisMutasi",
		label: "Jenis Mutasi",
		search: true,
		searchType: "jenisMutasi",
	},
	// { id: "tmtBerlaku", label: "Tgl. Berlaku" },
	// { id: "tglBerakhir", label: "Tgl. Berakhir" },
	// { id: "namaOrganisasi", label: "Organisasi" },
	// { id: "namaJabatan", label: "Jabatan" },
	// { id: "namaOrganisasiLama", label: "Organisasi Lama" },
	// { id: "namaJabatanLama", label: "Jabatan Lama" },
	{ id: "golonganId", label: "Golongan" },
	{ id: "organisasiId", label: "Unit Kerja" },
	{ id: "jabatanId", label: "Jabatan" },
	{ id: "notes", label: "Notes" },
];
