import { z } from "zod"
import type { CustomColumnDef } from ".."
import { Golongan } from "./golongan"
import type { Level } from "./level"
import { OrganisasiMini } from "./organisasi"
import { Pangkat } from "./pangkat"

export interface JabatanMini {
	id: number
	level: Level
	nama: string
}

export interface Jabatan extends JabatanMini {
	parent: JabatanMini
	organisasi: OrganisasiMini
	level: Level
	pangkat: Pangkat
	golongan: Golongan
}

export const JabatanSchema = z.object({
	id: z.optional(z.number()),
	parentId: z.optional(z.number()),
	organisasiId: z.number().min(1, "Organisasi harus disiis"),
	levelId: z.number().min(1, "Level wajib diisi"),
	nama: z
		.string({ required_error: "Nama Jabatan wajib diisi" })
		.min(3, { message: "Nama Jabatan wajib diisi" }),
})

export const jabatanTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "nama", label: "Nama", search: true, searchType: "text" },
	{ id: "parentId", label: "Induk", search: true, searchType: "jabatan" },
	{
		id: "organisasiId",
		label: "Organisasi",
		search: true,
		searchType: "organisasi",
	},
	{ id: "levelId", label: "Level", search: true, searchType: "level" },
	{ id: "aksi", label: "Aksi" },
]
