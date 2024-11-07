import type { Pegawai } from "@_types/pegawai";
import { BaseRiwayatSkSchema, type RiwayatSk } from "./riwayat_sk";
import type { OrganisasiMini } from "@_types/master/organisasi";
import type { JabatanMini } from "@_types/master/jabatan";
import type { Golongan } from "@_types/master/golongan";
import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface RiwayatTerminasi {
	id: number;
	pegawai: Pegawai;
	nipam: string;
	nama: string;
	nomorSk: string;
	skTerminasi: RiwayatSk;
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
	nipam: z.string().min(5, "NIPAM wajib diisi"),
	nama: z.string().min(3, "Nama. wajib diisi"),
	organisasiId: z.number().min(1, "Organisasi wajib diisi"),
	namaOrganisasi: z.string().optional(),
	jabatanId: z.number().min(1, "Jabatan wajib diisi"),
	namaJabatan: z.string().optional(),
	golonganId: z.number().min(1, "Golongan wajib diisi").optional(),
	namaGolongan: z.string().optional(),
	notes: z.string().optional(),
});

export type RiwayatTerminasiSchema = z.infer<typeof RiwayatTerminasiSchema>;

export const calonPensiunColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "tanggalTerminasi", label: "Tgl. Pensiun", sortable: true },
	{ id: "nipam", label: "NIPAM", search: true, searchType: "text" },
	{ id: "nama", label: "Nama", search: true, searchType: "text", sortable: true, baseSort: "Biodata" },
	{ id: "organisasiId", label: "Organisasi" },
	{ id: "jabatanId", label: "Jabatan" },
	{ id: "golonganId", label: "Golongan" },
	{ id: "masaKerja", label: "Masa Kerja" },
];

export const riwayatTerminasiColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "tanggalPensiun", label: "Tgl. Pensiun" },
	{ id: "nipam", label: "NIPAM", search: true, searchType: "text" },
	{ id: "nama", label: "Nama", search: true, searchType: "text" },
	{ id: "nomorSk", label: "Nomor SK" },
	{ id: "tanggalSk", label: "Tgl. SK" },
	{ id: "organisasiId", label: "Organisasi" },
	{ id: "jabatanId", label: "Jabatan" },
	{ id: "golonganId", label: "Golongan" },
	{ id: "masaKerja", label: "Masa Kerja" },
	{ id: "notes", label: "Notes" },
];
