import type { RiwayatSk } from "./riwayat_sk";

export interface RiwayatMutas {
	id: number;
	skMutasi: RiwayatSk;
	tmtBerlaku: string;
	tglBerakhir: string;
	namaOrganisasi: string;
	namaJabatan: string;
	namaOrganisasiLama: string;
	namaJabatanLama: string;
	notes: string;
}
