import { z } from "zod";

export const biodataFormSchema = z.object({
	nik: z.string().optional(),
	nama: z.string().min(1, "Nama wajib diisi"),
	jenisKelamin: z.string().optional(),
	tempatLahir: z.string().optional(),
	tanggalLahir: z.string().optional(),
	agama: z.string().optional(),
	statusKawin: z.string().optional(),
	ibuKandung: z.string().optional(),
	telp: z
		.string()
		.optional()
		.refine((v) => !v || /^[0-9+\-\s()]{7,20}$/.test(v), "Format nomor telepon tidak valid"),
	alamat: z.string().optional(),
});

export const keluargaFormSchema = z.object({
	nama: z.string().min(1, "Nama wajib diisi"),
	hubungan: z.string().min(1, "Hubungan wajib diisi"),
	tanggalLahir: z.string().optional(),
	pendidikan: z.string().optional(),
	pekerjaan: z.string().optional(),
	statusTanggungan: z.string().optional(),
});

export const keahlianFormSchema = z.object({
	jenisKeahlianId: z.string().min(1, "Jenis keahlian wajib diisi"),
	keterangan: z.string().optional(),
	sertifikat: z.string().optional(),
	tahun: z.coerce.number().optional(),
});

export const pelatihanFormSchema = z.object({
	jenisPelatihanId: z.string().min(1, "Jenis pelatihan wajib diisi"),
	nama: z.string().min(1, "Nama pelatihan wajib diisi"),
	penyelenggara: z.string().optional(),
	tahun: z.coerce.number().optional(),
	durasiJam: z.coerce.number().optional(),
	sertifikat: z.string().optional(),
});

export const pendidikanFormSchema = z.object({
	jenjangId: z.string().min(1, "Jenjang pendidikan wajib diisi"),
	institusi: z.string().min(1, "Institusi wajib diisi"),
	jurusan: z.string().optional(),
	tahunLulus: z.coerce.number().min(1900, "Tahun tidak valid").max(2100, "Tahun tidak valid"),
	gelar: z.string().optional(),
});

export const pengalamanKerjaFormSchema = z.object({
	perusahaan: z.string().min(1, "Perusahaan wajib diisi"),
	jabatan: z.string().min(1, "Jabatan wajib diisi"),
	tahunMulai: z.coerce.number().optional(),
	tahunSelesai: z.coerce.number().optional(),
	deskripsi: z.string().optional(),
});

export type BiodataFormInput = z.infer<typeof biodataFormSchema>;
export type KeluargaFormInput = z.infer<typeof keluargaFormSchema>;
export type KeahlianFormInput = z.infer<typeof keahlianFormSchema>;
export type PelatihanFormInput = z.infer<typeof pelatihanFormSchema>;
export type PendidikanFormInput = z.infer<typeof pendidikanFormSchema>;
export type PengalamanKerjaFormInput = z.infer<typeof pengalamanKerjaFormSchema>;
