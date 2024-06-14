import { z } from "zod"
import type { CustomColumnDef } from ".."

export interface JenisPelatihan {
	id: number
	nama: string
}

export const JenisPelatihanSchema = z.object({
	id: z.number(),
	nama: z
		.string({
			required_error: "Nama Jenis Kartu identitas Wajib Diisi",
		})
		.min(3, { message: "Nama Jenis Kartu identitas Wajib Diisi" }),
})

export const jenisPelatihanTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{
		id: "nama",
		label: "Nama Jenis Pelatihan",
		search: true,
		searchType: "text",
	},
	{ id: "aksi", label: "Aksi" },
]
