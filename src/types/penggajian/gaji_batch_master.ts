import type { CustomColumnDef } from "..";

export interface GajiBatchMaster {
	id: number;
	rootBatchId: string;
	periode: string;
	pegawaiId: number;
	nipam: string;
	nama: string;
	statusPegawai: string;
	organisasiId: number;
	organisasiKode: string;
	namaOrganisasi: string;
	jabatanId: number;
	namaJabatan: string;
	levelId: number;
	namaLevel: string;
	golonganId: number;
	golongan: string;
	gajiProfilId: number;
	kodePajak: string;
	gajiPokok: number;
	phdp: number;
	statusKawin: string;
	jmlTanggungan: number;
	jmlJiwa: number;
	totalTambahan: number;
	penghasilanKotor: number;
	totalPotongan: number;
	totalAddTambahan: number;
	totalAddPotongan: number;
	penghasilanBersih: number;
	penghasilanBersih2: number;
	pembulatan: number;
	pembulatan2: number;
	penghasilanBersihFinal: number;
	penghasilanBersihFinal2: number;
	pajak: number;
	isDifferent: boolean;
}

export const gajiBatchMasterColumns: CustomColumnDef[] = [
	{ id: "id", label: "" },
	{ id: "nipam", label: "NIK" },
	{
		id: "nama",
		label: "Nama Pegawai",
		search: true,
		searchType: "text",
	},
	{ id: "golonganId", label: "golongan" },
	{ id: "jabatanId", label: "jabatan" },
	{ id: "jmlJiwa", label: "Jiwa" },
	{ id: "kodePajak", label: "PTKP" },
	{ id: "penghasilanKotor", label: "Penghasilan" },
	{ id: "totalPotongan", label: "Potongan" },
	{ id: "pembulatan", label: "Pembulatan" },
	{ id: "penghasilanBersih", label: "Net. Gaji" },
];

export const gajiBatchMasterColumnsDashboard: CustomColumnDef[] = [
	{ id: "id", label: "No" },
	{ id: "periode", label: "Periode" },
	{ id: "namaJabatan", label: "Jabatan" },
	{ id: "penghasilanKotor", label: "Penghasilan" },
	{ id: "totalPotongan", label: "Potongan" },
	{ id: "pembulatan", label: "Pembulatan" },
	{ id: "penghasilanBersih", label: "Sub Total" },
	{ id: "totalAddTambahan", label: "Penghasilan +" },
	{ id: "totalAddPotongan", label: "Potongan +" },
	{ id: "penghasilanBersihFinal", label: "THP" },
	{ id: "id", label: "Rincian" },
];
