import { z } from "zod";
import type { OrganisasiQuery } from "@/types/master/organisasi";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";

export const organisasiConfig: EntityConfig<OrganisasiQuery> = makeConfig<OrganisasiQuery>(
	z.object({
		nama: namaWajib,
		kode: z.string().optional(),
		levelOrganisasi: z.coerce.number().optional(),
		shortName: z.string().optional(),
		category: z.string().optional(),
	}),
	[
		nameField,
		{ name: "kode", label: "Kode" },
		{ name: "levelOrganisasi", label: "Level Organisasi", type: "number" },
		{ name: "shortName", label: "Kode Kantor" },
		{ name: "category", label: "Kategori" },
	],
	[
		{ id: "kode", header: "Kode", sortable: true, cell: (item) => String(item.kode ?? "") },
		{ id: "nama", header: "Nama", sortable: true, primary: true, cell: (item) => String(item.nama ?? "") },
		{ id: "levelOrganisasi", header: "Level", align: "center", cell: (item) => item.levelOrganisasi ?? "-" },
		{ id: "parent", header: "Induk", sortable: true, cell: (item) => item.parent?.nama ?? "-" },
		{ id: "shortName", header: "Kode Kantor", cell: (item) => item.shortName ?? "-" },
		{ id: "category", header: "Kategori", sortable: true, cell: (item) => item.category ?? "-" },
	],
	"Organisasi",
	{
		treeField: "parent",
		searchFields: [
			{ name: "kode", label: "Kode" },
			{ name: "nama", label: "Nama" },
			{ name: "category", label: "Kategori" },
		],
		fkSources: [{ field: "parentId", entity: "organisasi", label: "Parent" }],
	},
);
