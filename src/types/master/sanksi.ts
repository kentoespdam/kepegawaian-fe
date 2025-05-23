import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface SanksiMini {
	id: number;
	kode: string;
	keterangan: string;
	jenisSpId: number;
}

export interface Sanksi extends SanksiMini {
	potTkk: boolean;
	jmlPotTkk: number;
	isPendingPangkat: boolean;
	isPendingGaji: boolean;
	isTurunPangkat: boolean;
	isTurunJabatan: boolean;
	isSuspension: boolean;
	isTerminateDh: boolean;
	isTerminateTh: boolean;
}

export const SanksiSchema = z.object({
	id: z.number().optional().default(0),
	jenisSpId: z.number().min(1, "Jenis Sanksi wajib diisi"),
	kode: z.string(),
	keterangan: z.string(),
	potTkk: z.boolean().default(false),
	jmlPotTkk: z.number().default(0),
	isPendingPangkat: z.boolean().default(false),
	isPendingGaji: z.boolean().default(false),
	isTurunPangkat: z.boolean().default(false),
	isTurunJabatan: z.boolean().default(false),
	isSuspension: z.boolean().default(false),
	isTerminateDh: z.boolean().default(false),
	isTerminateTh: z.boolean().default(false),
});

export type SanksiSchema = z.infer<typeof SanksiSchema>;

export const PatchSanksiJenisSpSchema = z.object({
	id: z.number().min(1, "Sanksi wajib diisi"),
	jenisSpId: z.number().optional(),
});

export type PatchSanksiJenisSpSchema = z.infer<typeof PatchSanksiJenisSpSchema>;

export const sanksiTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "kode", label: "Kode", search: true, searchType: "text" },
	{ id: "keterangan", label: "Keterangan" },
	{ id: "potTkk", label: "Potensi TKK", width: 2 },
	{ id: "jmlPotTkk", label: "Jumlah Potongan TKK", width: 2 },
	{ id: "isPendingPangkat", label: "Penundaan Kenaikan Pangkat", width: 2 },
	{ id: "isPendingGaji", label: "Penundaan Kenaikan Gaji", width: 2 },
	{ id: "isTurunPangkat", label: "Penurunan Pangkat", width: 2 },
	{ id: "isTurunJabatan", label: "Penurunan Jabatan", width: 2 },
	{ id: "isSuspension", label: "Pemberhentian Sementara", width: 2 },
	{ id: "isTerminateDh", label: "Pemberhentian Dengan Hormat", width: 2 },
	{ id: "isTerminateTh", label: "Pemberhentian Dengan Tidak Hormat", width: 2 },
];

export const findSanksi = (sanksiList: SanksiMini[], id: number) => {
	return sanksiList.find((s) => s.id === id);
};

export const findSanksiValue = (sanksiList: SanksiMini[], id: number) => {
	const sanksi = findSanksi(sanksiList, id);
	if (!sanksi) return "Pilih Sanksi";
	return `${sanksi.kode} : ${sanksi.keterangan}`;
};
