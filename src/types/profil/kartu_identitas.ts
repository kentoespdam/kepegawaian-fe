import type { JenisKitas } from "@_types/master/jenis_kitas";

export interface KartuIdentitas {
	id: number;
	jenisKartu: JenisKitas;
	nomorKartu: string;
}
