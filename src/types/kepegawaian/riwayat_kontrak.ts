import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface RiwayatKontrak {
	id: number;
	jenisKontrak: string;
	nipam: string;
	nama: string;
	nomorKontrak: string;
	tanggalSk: string;
	tanggalMulai: string;
	tanggalSelesai: string;
	gajiPokok: number;
	notes: string;
}

export const RiwayatKontrakSchema = z
	.object({
		id: z.number().optional().default(0),
		jenisKontrak: z.string().min(3, "Jenis Kontrak wajib diisi"),
		pegawaiId: z.number().min(1, "Pegawai wajib diisi"),
		nipam: z.string().min(6, "NIPAM wajib diisi"),
		nama: z.string().min(3, "Nama wajib diisi"),
		unitKerja: z.string().optional(),
		jabatan: z.string().optional(),
		nomorKontrak: z.string().min(3, "Nomor Kontrak wajib diisi"),
		tanggalSk: z.string().min(10, "Tgl. SK wajib diisi"),
		tanggalMulai: z.string().min(10, "Tgl. Mulai wajib diisi"),
		tanggalSelesai: z.string().optional(),
		gajiPokok: z.number().optional().default(0),
		golonganId: z.number().optional(),
		notes: z.string().optional(),
	})
	.superRefine((val, ctx) => {
		const { jenisKontrak, tanggalSk, tanggalMulai } = val;
		if (new Date(tanggalSk) > new Date(tanggalMulai)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Tgl. SK harus lebih kecil dari Tgl. Mulai",
				path: ["tanggalMulai"],
			});
		}
		if (jenisKontrak === "PERPANJANGAN") {
			const { tanggalSelesai } = val;
			if (!tanggalSelesai) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Tgl. Selesai wajib diisi",
					path: ["tanggalSelesai"],
				});
			}
			if (tanggalSelesai && new Date(tanggalSk) > new Date(tanggalSelesai)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Tgl. SK harus lebih kecil dari Tgl. Selesai",
					path: ["tanggalSelesai"],
				});
			}
		}
		if (jenisKontrak === "PENGANGKATAN") {
			if (!val.golonganId) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Golongan wajib diisi",
					path: ["golonganId"],
				});
			}
		}
	});

export type RiwayatKontrakSchema = z.infer<typeof RiwayatKontrakSchema>;

export const riwayatKontrakTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	// { id: "nipam", label: "NIPAM" },
	{
		id: "nomorKontrak",
		label: "Nomor Kontrak",
		search: true,
		searchType: "text",
	},
	{ id: "tanggalSk", label: "Tgl. SK" },
	{ id: "tanggalMulai", label: "Tgl. Mulai" },
	{ id: "tanggalSelesai", label: "Tgl. Selesai" },
	{ id: "notes", label: "Notes" },
];
