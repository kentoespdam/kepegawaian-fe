import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface Golongan {
	id: number;
	golongan: string;
	pangkat: string;
}

export const GolonganSchema = z.object({
	id: z.number(),
	golongan: z
		.string({ required_error: "Golongan wajib diisi" })
		.min(3, { message: "Golongan wajib diisi" }),
	pangkat: z
		.string({ required_error: "Pangkat wajib diisi" })
		.min(3, { message: "Pangkat wajib diisi" }),
});

export const golonganTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "golongan", label: "Golongan", search: true, searchType: "text" },
	{ id: "pangkat", label: "Pangkat", search: true, searchType: "text" },
	{ id: "aksi", label: "Aksi" },
];

export const findGolonganValue = (
	list: Golongan[],
	id: string | number | null,
): Golongan => {
	const cari = list.find((row) => row.id === Number(id));
	if (!cari)
		return { id: 0, golongan: "Pilih Golongan", pangkat: "Pilih Pangkat" };

	return cari;
};

export const golonganCodeToNumber=(golongan: string)=> {
	return Number(golongan.split(".")[1]);
}