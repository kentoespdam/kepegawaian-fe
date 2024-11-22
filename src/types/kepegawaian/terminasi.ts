import type { Pegawai } from "@_types/pegawai";
import { BaseRiwayatSkSchema, type RiwayatSk } from "./riwayat_sk";
import type { OrganisasiMini } from "@_types/master/organisasi";
import type { JabatanMini } from "@_types/master/jabatan";
import type { Golongan } from "@_types/master/golongan";
import { z } from "zod";
import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE, type CustomColumnDef } from "..";
import type { LampiranSk } from "./lampiran_sk";
import type { AlasanBerhenti } from "@_types/master/alasan_berhenti";

export interface RiwayatTerminasi {
	id: number;
	alasanTerminasi: AlasanBerhenti
	pegawai: Pegawai;
	nipam: string;
	nama: string;
	nomorSk: string;
	skTerminasi: RiwayatSk;
	lampiranSkTerminasi: LampiranSk;
	organisasi: OrganisasiMini;
	namaOrganisasi: string;
	jabatan: JabatanMini;
	namaJabatan: string;
	golongan: Golongan;
	namaGolongan: string;
	tanggalTerminasi: string;
	masaKerja: number;
	notes: string;
}

export const RiwayatTerminasiSchema = BaseRiwayatSkSchema.extend({
	alasanTerminasiId: z.number().min(1, "Alasan Terminasi wajib diisi"),
	nipam: z.string().min(5, "NIPAM wajib diisi"),
	nama: z.string().min(3, "Nama. wajib diisi"),
	organisasiId: z.number().min(1, "Organisasi wajib diisi"),
	namaOrganisasi: z.string().optional(),
	jabatanId: z.number().min(1, "Jabatan wajib diisi"),
	namaJabatan: z.string().optional(),
	golonganId: z.number().min(1, "Golongan wajib diisi").optional(),
	namaGolongan: z.string().optional(),
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

export type RiwayatTerminasiSchema = z.infer<typeof RiwayatTerminasiSchema>;

export const calonPensiunColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "tanggalTerminasi", label: "Tgl. Pensiun", sortable: true },
	{ id: "nipam", label: "NIPAM", search: true, searchType: "text" },
	{
		id: "nama",
		label: "Nama",
		search: true,
		searchType: "text",
		sortable: true,
		baseSort: "Biodata",
	},
	{ id: "organisasiId", label: "Organisasi" },
	{ id: "jabatanId", label: "Jabatan" },
	{ id: "golonganId", label: "Golongan" },
	{ id: "masaKerja", label: "Masa Kerja" },
];

export const riwayatTerminasiColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "tanggalPensiun", label: "Tgl. Pensiun" },
	{ id: "alasanTerminasiId", label: "Alasan Terminasi", search: true, searchType: "alasanTerminasi" },
	{ id: "nipam", label: "NIPAM", search: true, searchType: "text" },
	{ id: "nama", label: "Nama", search: true, searchType: "text" },
	{ id: "nomorSk", label: "Nomor SK" },
	{ id: "tanggalSk", label: "Tgl. SK" },
	{ id: "organisasiId", label: "Organisasi" },
	{ id: "jabatanId", label: "Jabatan" },
	{ id: "golonganId", label: "Golongan" },
	{ id: "masaKerja", label: "Masa Kerja" },
	{ id: "fileName", label: "Lampiran" },
	{ id: "notes", label: "Notes" },
];
