import { z } from "zod"
import type { CustomColumnDef } from ".."

export interface Level {
	id: number
	nama: string
}

export const LevelSchema = z.object({
	id: z.number(),
	nama: z
		.string({ required_error: "Nama Wajib diisi" })
		.min(3, { message: "Nama Wajib diisi" }),
})

export const levelTableColumns: CustomColumnDef[] = [
	{
		id: "urut",
		label: "No",
	},
	{
		id: "nama",
		label: "Nama",
		search: true,
		searchType: "text",
	},
	{
		id: "aksi",
		label: "Aksi",
	},
]
