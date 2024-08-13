import type { Golongan } from "@_types/master/golongan";

export interface RiwayatSk {
	id: number;
	nomorSk: string;
	jenisSk: string;
	tanggalSk: string;
	tmtBerlaku: string;
	golongan: Golongan;
	gajiPokok: number;
	mkgTahun: number;
	mkgBulan: number;
	kenaikanBerikutnya: string;
	mkgbTahun: number;
	mkgbBulan: number;
	updateMaster: boolean;
}
