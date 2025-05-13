import type { CustomColumnDef } from "@_types/index";

export interface DUK {
	nama: string;
	nipam: string;
	golongan: string | null;
	pangkat: string | null;
	tmt_golongan: string | null;
	nama_jabatan: string;
	tmt_jabatan: string;
	tmt_kerja: string;
	mk_tahun: number;
	mk_bulan: number;
	usia: number;
	jurusan: string;
	tahun_lulus: number;
	tingkat_pendidikan: string;
	status_pegawai: string;
}

export const dukColumns: CustomColumnDef[] = [
	{ id: "nama", label: "Nama" },
	{ id: "nipam", label: "NIPAM" },
	{ id: "golongan", label: "Golongan" },
	{ id: "pangkat", label: "Pangkat" },
	{ id: "tmt_golongan", label: "TMT Golongan" },
	{ id: "nama_jabatan", label: "Jabatan" },
	{ id: "tmt_jabatan", label: "TMT Jabatan" },
	{ id: "tmt_kerja", label: "TMT Kerja" },
	{ id: "mk_tahun", label: "MK Tahun" },
	{ id: "mk_bulan", label: "MK Bulan" },
	{ id: "usia", label: "Usia" },
	{ id: "jurusan", label: "Jurusan" },
	{ id: "tahun_lulus", label: "Tahun Lulus" },
	{ id: "tingkat_pendidikan", label: "Tingkat Pendidikan" },
	{ id: "status_pegawai", label: "Status Pegawai" },
];
