import type { Golongan } from "@_types/master/golongan";
import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface RiwayatSk {
	id: number;
	nomorSk: string;
	jenisSk: string;
	tanggalSk: string;
	tmtBerlaku: string;
	golongan: Golongan | null;
	gajiPokok: number;
	mkgTahun: number;
	mkgBulan: number;
	kenaikanBerikutnya: string;
	mkgbTahun: number;
	mkgbBulan: number;
	updateMaster: boolean;
	notes: string;
}

export const BaseRiwayatSkSchema = z.object({
	id: z.number().optional().default(0),
	pegawaiId: z.number().min(1, "Unknown Pegawai"),
	nomorSk: z.string().min(3, "Nomor SK wajib diisi"),
	jenisSk: z.string().min(3, "Jenis SK wajib diisi"),
	tanggalSk: z.string().min(10, "Tgl. SK wajib diisi"),
	tmtBerlaku: z.string().min(10, "Tgl. Berlaku wajib diisi"),
	golonganId: z.number().optional(),
	gajiPokok: z.number().default(0),
	mkgTahun: z.number().default(0),
	mkgBulan: z.number().default(0),
	kenaikanBerikutnya: z.string(),
	mkgbTahun: z.number().default(0),
	mkgbBulan: z.number().default(0),
	updateMaster: z.boolean().default(false),
	notes: z.string(),
});

export const RiwayatSkSchema = BaseRiwayatSkSchema.superRefine((val, ctx) => {
	const { tanggalSk, tmtBerlaku, updateMaster, gajiPokok } = val;
	if (new Date(tanggalSk) > new Date(tmtBerlaku)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Tgl. SK harus lebih kecil dari Tgl. Berlaku",
			path: ["tmtBerlaku"],
		});
	}
	if (updateMaster && !gajiPokok) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Gaji Pokok wajib diisi",
			path: ["gajiPokok"],
		});
	}
});

export type RiwayatSkSchema = z.infer<typeof RiwayatSkSchema>;

export const riwayatSkTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "nomorSk", label: "Nomor SK", search: true, searchType: "text" },
	{ id: "jenisSk", label: "Jenis SK", search: true, searchType: "jenisSk" },
	{ id: "tanggalSk", label: "Tgl. SK" },
	{ id: "tmtBerlaku", label: "Tgl. Berlaku" },
	{ id: "golongan", label: "Golongan" },
	{ id: "gajiPokok", label: "Gaji Pokok" },
	{ id: "mkgTahun", label: "MKG" },
	{ id: "kenaikanBerikutnya", label: "Kenaikan Berikutnya" },
	{ id: "mkgbTahun", label: "MKGB" },
	{ id: "notes", label: "Notes" },
];

export const riwayatSkTableColumnsDashboard: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "nomorSk", label: "Nomor SK", search: true, searchType: "text" },
	{ id: "jenisSk", label: "Jenis SK", search: true, searchType: "jenisSk" },
	{ id: "tanggalSk", label: "Tgl. SK" },
	{ id: "tmtBerlaku", label: "Tgl. Berlaku" },
	{ id: "golongan", label: "Golongan" },
	{ id: "gajiPokok", label: "Gaji Pokok" },
	{ id: "mkgTahun", label: "MKG" },
	{ id: "kenaikanBerikutnya", label: "Kenaikan Berikutnya" },
	{ id: "mkgbTahun", label: "MKGB" },
	{ id: "notes", label: "Notes" },
];
