import { z } from "zod";
import type { Sanksi, SanksiMini } from "./sanksi";
import type { CustomColumnDef } from "..";

interface BaseJenisSp {
	id: number;
	kode: string;
	nama: string;
}

export interface JenisSpMini extends BaseJenisSp {
	sanksiSp: SanksiMini[];
}

export interface JenisSp extends BaseJenisSp {
	sanksiSp: Sanksi[];
}

export const JenisSpSchema = z.object({
	id: z.number(),
	kode: z.string().toUpperCase(),
	nama: z.string(),
});

export type JenisSpSchema = z.infer<typeof JenisSpSchema>;

export const jenisSpTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "kode", label: "Kode", search: true, searchType: "text" },
	{ id: "nama", label: "Nama", search: true, searchType: "text" },
	{ id: "sanksiSp", label: "Sanksi" },
];

export const findJenisSp = (
	jenisSpList: JenisSp[] | JenisSpMini[],
	id: number,
) => {
	return jenisSpList.find((jenisSp) => jenisSp.id === id);
};

export const findJenisSpValue = (
	jenisSpList: JenisSp[] | JenisSpMini[],
	id: number,
) => {
	const jenisSp = findJenisSp(jenisSpList, id);
	if (!jenisSp) return "Pilih Jenis SP";
	return `${jenisSp.kode} : ${jenisSp.nama}`;
};
