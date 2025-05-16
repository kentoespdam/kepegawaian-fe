import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface JenjangPendidikan {
	id: number;
	nama: string;
	seq: number;
}

export const JenjangPendidikanSchema = z.object({
	id: z.number(),
	nama: z.string().min(2, { message: "Nama Jenjang Pendidikan Wajib Diisi" }),
	seq: z.number().min(1, "Urut Wajib Diisi"),
});

export const jenjangPendidikanTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{
		id: "nama",
		label: "Nama Jenjang Pendidikan",
		search: true,
		searchType: "text",
	},
	{ id: "seq", label: "Urut Jenjang Pendidikan" },
	{ id: "aksi", label: "Aksi" },
];

export const findJenjangPendidikanValue = (
	list: JenjangPendidikan[],
	id: number | string | null,
) => {
	const result = list.find((row) => row.id === Number(id));
	return !result ? { nama: "Pilih Pendidikan Terakhir" } : result;
};
