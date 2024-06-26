import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface OrganisasiMini {
	id: number;
	nama: string;
}

export interface Organisasi extends OrganisasiMini {
	parent: OrganisasiMini | null;
	levelOrganisasi: number;
}

export const OrganisasiSchema = z.object({
	id: z.number(),
	parentId: z.optional(z.number()),
	levelOrganisasi: z
		.number()
		.min(1, { message: "Level Organisasi wajib diisi" }),
	nama: z
		.string({ required_error: "Nama Organisasi wajib diisi" })
		.min(3, { message: "Nama Organisasi wajib diisi" }),
});

export const organisasiTableColumns: CustomColumnDef[] = [
	{
		id: "urut",
		label: "No",
	},
	{
		id: "parentId",
		label: "Organisasi Induk",
		search: true,
		searchType: "organisasi",
	},
	{
		id: "levelOrganisasi",
		label: "Level Organisasi",
	},
	{
		id: "nama",
		label: "Nama Organisasi",
		search: true,
		searchType: "text",
	},
	{
		id: "aksi",
		label: "Aksi",
	},
];

export const findOrganisasiValue = (
	list: OrganisasiMini[],
	id: string | number | null,
): OrganisasiMini | undefined => list.find((row) => row.id === Number(id));
