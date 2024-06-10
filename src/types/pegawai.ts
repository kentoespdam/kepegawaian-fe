import type { CustomColumnDef } from ".";
import type { Golongan } from "./master/golongan";
import type { Grade } from "./master/grade";
import type { JabatanMini } from "./master/jabatan";
import type { Organisasi } from "./master/organisasi";
import type { Profesi } from "./master/profesi";
import type { StatusKerja } from "./master/status_kerja";
import type { StatusPegawai } from "./master/status_pegawai";
import type { BiodataMini } from "./profil/biodata";

export interface Pegawai {
	id: number;
	nipam: string;
	biodata: BiodataMini;
	statusPegawai: StatusPegawai;
	jabatan: JabatanMini;
	organisasi: Organisasi;
	profesi: Profesi;
	golongan: Golongan;
	grade: Grade;
	statusKerja: StatusKerja;
	notes: string | null;
}

export const pegawaiTableColumns: CustomColumnDef[] = [
	{
		id: "urut",
		label: "No",
	},
	{
		id: "nik",
		label: "Nik",
		search: true,
		searchType: "text",
	},
	{
		id: "nama",
		label: "Nama",
		search: true,
		searchType: "text",
	},
	{
		id: "jenisKelamin",
		label: "J/K",
	},
	{
		id: "golonganId",
		label: "Gol.",
	},
	{
		id: "jabatanId",
		label: "Jabatan",
	},
	{
		id: "tglLahir",
		label: "Tgl Lahir",
	},
	// {
	// 	id: "tmtPensiun",
	// 	label: "TMT Pensiun",
	// },
	{
		id: "statusKawin",
		label: "Perkawinan",
	},
	{
		id: "kdPajak",
		label: "Kd. Pajak",
	},
	{
		id: "bpjs",
		label: "BPJS?",
	},
	{
		id: "statusPegawaiId",
		label: "Status Pegawai",
	},
	{
		id: "aksi",
		label: "Aksi",
	},
];
