import type { BaseId } from "..";

export interface DasarGaji extends BaseId {
	deskripsi: string;
	tanggalMulai: string;
	tanggalAkhir: string;
	aktif: boolean;
}
