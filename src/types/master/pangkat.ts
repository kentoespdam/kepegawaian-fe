import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface Pangkat {
	id: number;
	nama: string;
}

export const PangkatSchema = z.object({
	id: z.number(),
	nama: z
		.string({
			required_error: "Nama Pangkat Wajib Diisi",
		})
		.min(3, { message: "Nama Pangkat Wajib Diisi" }),
});

export const pangkatTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "nama", label: "Nama" },
	{ id: "aksi", label: "Aksi" },
];
