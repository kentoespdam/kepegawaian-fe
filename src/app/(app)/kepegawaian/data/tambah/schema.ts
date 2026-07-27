import { z } from "zod";

export const schema = z
	.object({
		nik: z.string().min(1, "NIK wajib diisi"),
		nama: z.string().min(1, "Nama wajib diisi"),
		jenisKelamin: z.string().min(1, "Pilih jenis kelamin"),
		tempatLahir: z.string().min(1, "Tempat lahir wajib diisi"),
		tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
		alamat: z.string().min(1, "Alamat wajib diisi"),
		agama: z.string().min(1, "Pilih agama"),
		ibuKandung: z.string().min(1, "Ibu kandung wajib diisi"),
		nipam: z.string().min(1, "NIPAM wajib diisi"),
		telp: z.string().optional(),
		pendidikanTerakhirId: z.string().optional(),
		golonganDarah: z.string().optional(),
		statusKawin: z.string().optional(),
		email: z.string().optional(),
		notes: z.string().optional(),
		isPegawai: z.boolean().optional(),
		statusPegawai: z.string().min(1, "Pilih status pegawai"),
		statusKerja: z.string().optional(),
		jabatanId: z.string().optional(),
		organisasiId: z.string().optional(),
		profesiId: z.string().optional(),
		golonganId: z.string().optional(),
		kodePajakId: z.string().optional(),
		nomorSk: z.string().optional(),
		tanggalSk: z.string().optional(),
		tmtBerlakuSk: z.string().optional(),
		tmtKontrakSelesai: z.string().optional(),
		gajiPokok: z.string().optional(),
	})
	.superRefine((vals, ctx) => {
		if (vals.statusPegawai === "NON_PEGAWAI") return;
		if (!vals.jabatanId)
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Jabatan wajib diisi", path: ["jabatanId"] });
		if (!vals.organisasiId)
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Organisasi wajib diisi", path: ["organisasiId"] });
		if (!vals.kodePajakId)
			ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Kode pajak wajib diisi", path: ["kodePajakId"] });
	});

export type FormValues = z.infer<typeof schema>;
