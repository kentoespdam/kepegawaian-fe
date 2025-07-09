import type { JabatanMini } from "@_types/master/jabatan";
import type { CutiJenis } from "./jenis";
import type { OrganisasiMini } from "@_types/master/organisasi";
import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface CutiPegawai {
	id: number;
	pegawaiId: number;
	nama: string;
	nipam: string;
	organisasi: OrganisasiMini | null;
	jabatan: OrganisasiMini | null;
	tanggalPengajuan: string;
	jenisPengajuanCuti: string;
	approvalCutiStatus: string;
	approvalLevel: number;
	jenisCuti: CutiJenis;
	subJenisCuti: CutiJenis | null;
	tanggalMulai: string;
	tanggalSelesai: string;
	alasan: string;
	jumlahHari: number;
	jumlahHariKerja: number;
	picSaatIni: JabatanMini | null;
}

export const CutiPegawaiSchema = z.object({
	csrfToken: z.string().min(1, "CSRF Token tidak boleh Kosong!"),
	id: z.number(),
	pegawaiId: z.number().min(1, "Pegawai tidak boleh Kosong!"),
	nipam: z.string(),
	nama: z.string(),
	pangkatGolongan: z.string(),
	organisasi: z.string(),
	jabatan: z.string(),
	jenisCutiId: z.number().min(1, "Jenis Cuti tidak boleh Kosong!"),
	subJenisCutiId: z.number(),
	tanggalMulai: z.string().min(10, "Tanggal Awal tidak boleh Kosong!"),
	tanggalSelesai: z.string().min(10, "Tanggal Akhir tidak boleh Kosong!"),
	jumlahHari: z.number(),
	jumlahHariKerja: z.number().min(1, "Jumlah Hari Kerja tidak boleh Kosong!"),
	alasan: z.string().min(3, "Alasan tidak boleh Kosong!"),
});

export type CutiPegawaiSchema = z.infer<typeof CutiPegawaiSchema>;

export const BatalCutiPegawaiSchema = z.object({
	id: z.string().startsWith("BATAL-", {
		message: "Invalid batal cuti code!",
	}),
	unique: z.string().optional(),
});

export type BatalCutiPegawaiSchema = z.infer<typeof BatalCutiPegawaiSchema>;

export const cutiPegawaiColumns: CustomColumnDef[] = [
	{ id: "id", label: "No" },
	{ id: "id", label: "Action" },
	{
		id: "tahun",
		label: "Tgl. Pengajuan",
		search: true,
		searchType: "tahun",
	},
	{ id: "jenisPengajuanCuti", label: "Jenis Pengajuan" },
	{ id: "approvalCutiStatus", label: "Status" },
	{ id: "jenisCuti.id", label: "Jenis Cuti" },
	{ id: "subJenisCuti.id", label: "Sub Jenis Cuti" },
	{ id: "nipam", label: "NIK" },
	{ id: "nama", label: "Nama Karyawan" },
	{ id: "organisasi", label: "Unit Kerja" },
	{ id: "jabatan", label: "Jabatan" },
	{ id: "tanggalMulai", label: "Awal Cuti" },
	{ id: "tanggalSelesai", label: "Akhir Cuti" },
	{ id: "jmlHariKerja", label: "Jml. Hari Kerja" },
	{ id: "alasan", label: "Alasan" },
	{ id: "picSaatIni", label: "PIC Saat Ini" },
];
