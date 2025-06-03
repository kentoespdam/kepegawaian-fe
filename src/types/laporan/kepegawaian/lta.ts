import type { CustomColumnDef } from "@_types/index";

export interface LepasTanggunganAnak {
	id: number;
	nama_anak: string;
	jenis_kelamin: string;
	tanggal_lahir: string;
	umur: number;
	tanggungan: boolean;
	status_pendidikan: string;
	nama_karyawan: string;
	nipam: string;
	nama_jabatan: string;
}

export const lapLtaColumns: CustomColumnDef[] = [
	{ id: "id", label: "No" },
	{ id: "nama_anak", label: "Nama Anak" },
	{ id: "jenis_kelamin", label: "J/K" },
	{ id: "tanggal_lahir", label: "Tanggal Lahir" },
	{ id: "umur", label: "Umur" },
	{ id: "status_pendidikan", label: "Status Pendidikan" },
	{ id: "nama_karyawan", label: "Nama Karyawan" },
	{ id: "nipam", label: "Nipam" },
	{ id: "nama_jabatan", label: "Jabatan" },
];

export const filterLta = [
	{ id: "BULAN_INI", label: "Bulan Ini" },
	{ id: "GTE_1", label: "Bulan Depan" },
	{ id: "GTE_2", label: "2 Bulan Lagi" },
];

export const getFilterLabelById = (filterId: string): string => {
	const matchingFilter = filterLta.find(({ id }) => id === filterId);
	return matchingFilter ? matchingFilter.label : "";
};
