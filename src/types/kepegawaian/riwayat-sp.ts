import type { JabatanMini } from "@_types/master/jabatan";
import type { JenisSp } from "@_types/master/jenis_sp";
import type { OrganisasiMini } from "@_types/master/organisasi";
import { z } from "zod";
import { ACCEPTED_FILE_TYPES, type CustomColumnDef, MAX_UPLOAD_SIZE } from "..";

export interface RiwayatSp {
	id: number;
	pegawaiId: number;
	nipam: string;
	nama: string;
	organisasi: OrganisasiMini;
	namaOrganisasi: string;
	jabatan: JabatanMini;
	namaJabatan: string;
	tanggalSp: string;
	nomorSp: string;
	jenisSp: string;
	tanggalMulai: string;
	tanggalSelesai: string;
	penandaTangan: string;
	jabatanPenandaTangan: string;
	fileName: string;
	mimeType: string;
	notes: string;
}

export const RiwayatSpSchema = z.object({
	id: z.number().default(0),
	nomorSp: z.string().min(5, "Nomor SP wajib diisi"),
	pegawaiId: z.number().min(1, "Pegawai wajib diisi"),
	nipam: z.string().optional(),
	nama: z.string().optional(),
	namaOrganisasi: z.string().optional(),
	namaJabatan: z.string().optional(),
	organisasiId: z.number().min(1, "Organisasi wajib diisi"),
	jabatanId: z.number().min(1, "Jabatan wajib diisi"),
	jenisSp: z.string().min(1, "Jenis SP wajib diisi"),
	tanggalSp: z.string().min(10, "Tgl. SP wajib diisi"),
	tanggalMulai: z.string().min(10, "Tgl. Mulai wajib diisi"),
	tanggalSelesai: z.string().min(10, "Tgl. Selesai wajib diisi"),
	penandaTangan: z.string().min(3, "Penanda Tangan wajib diisi"),
	jabatanPenandaTangan: z.string().min(3, "Jabatan Penanda Tangan wajib diisi"),
	fileName: z
		.any()
		.refine(
			(files) => Array.from(files).every((file) => file instanceof File),
			"File wajib diisi",
		)
		.refine(
			(files) =>
				Array.from(files).every(
					(file) =>
						file instanceof File && ACCEPTED_FILE_TYPES.includes(file.type),
				),
			"Invalid file type",
		)
		.refine(
			(files) =>
				Array.from(files).every(
					(file) => file instanceof File && file.size <= MAX_UPLOAD_SIZE,
				),
			"Maks File Upload 10 MB",
		)
		.optional(),
	notes: z.string().optional(),
});

export type RiwayatSpSchema = z.infer<typeof RiwayatSpSchema>;

export const riwayatSpTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "nomorSp", label: "Nomor SP", search: true, searchType: "text" },
	{ id: "tanggalSp", label: "Tgl. SP" },
	{ id: "jenisSp", label: "Jenis SP", search: true, searchType: "text" },
	{ id: "tanggalMulai", label: "Tgl. Mulai" },
	{ id: "tanggalSelesai", label: "Tgl. Selesai" },
	{ id: "notes", label: "Alasan Pemberian Peringatan" },
	{ id: "id", label: "Lampiran" },
];