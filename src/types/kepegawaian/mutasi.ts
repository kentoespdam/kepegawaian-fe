import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface Mutasi {
	jenis_mutasi: string;
	nipam: string;
	nama: string;
	tmt_berlaku: string;
	nama_organisasi_lama: string;
	nama_jabatan_lama: string;
	nama_golongan_lama: string;
	nama_organisasi: string;
	nama_jabatan: string;
	nama_golongan: string;
	notes: string;
}

export const FilterMutasiSchema = z.object({
	jenisMutasi: z.string().optional(),
	tglAwal: z.string(),
	tglAkhir: z.string(),
});

export type FilterMutasiSchema = z.infer<typeof FilterMutasiSchema>;

export const lapMutasiColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "jenisMutasi", label: "Jenis Mutasi" },
	{ id: "nipam", label: "NIK" },
	{ id: "nama", label: "Nama Karyawan" },
	{ id: "tmtBerlaku", label: "Tgl. Efektif" },
	{ id: "organisasiLama", label: "Organisasi Lama" },
	{ id: "jabatanLama", label: "Jabatan Lama" },
	{ id: "golonganLama", label: "Golongan Lama" },
	{ id: "organisasi", label: "Organisasi" },
	{ id: "jabatan", label: "Jabatan" },
	{ id: "golongan", label: "Golongan" },
	{ id: "notes", label: "Keterangan" },
];
