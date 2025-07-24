import type { CustomColumnDef } from "@_types/index";

export interface Kontrak {
	nipam: string;
	nama: string;
	nomor_kontrak: string;
	nama_organisasi: string;
	nama_jabatan: string;
	tanggal_mulai: string;
	tanggal_selesai: string;
	sisa_tahun: number;
	sisa_bulan: number;
}

export const filterKontrak = [
	{ id: "AKTIF", label: "Aktif" },
	{ id: "THIS_MONTH", label: "Bulan Ini" },
	{ id: "GTE_1_MONTH", label: "Berakhir 1 Bulan Lagi" },
	{ id: "GTE_2_MONTH", label: "Berakhir 2 Bulan Lagi" },
	{ id: "GTE_3_MONTH", label: "Berakhir 3 Bulan Lagi" },
	{ id: "ENDED", label: "Kontrak Telah Berakhir" },
];

export const getFilterLabelById = (filterId: string): string => {
	const matchingFilter = filterKontrak.find(({ id }) => id === filterId);
	return matchingFilter ? matchingFilter.label : "";
};


export const lapKotrakColumns: CustomColumnDef[] = [
    {id:"urut", label:"No"},
    {id:"nipam", label:"NIPAM"},
    {id:"nama", label:"Nama"},
    {id:"nomor_kontrak", label:"Nomor Kontrak"},
    {id:"nama_organisasi", label:"Organisasi"},
    {id:"nama_jabatan", label:"Jabatan"},
    {id:"tanggal_mulai", label:"Tgl. Mulai Kontrak"},
    {id:"tanggal_selesai", label:"Tgl. Akhir Kontrak"},
    {id:"sisa_masa_aktif", label:"Sisa Masa Aktif"},
]