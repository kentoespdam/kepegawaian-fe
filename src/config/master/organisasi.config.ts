import { z } from "zod";
import type { OrganisasiQuery } from "@/types/master/organisasi";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";

export const organisasiConfig: EntityConfig<OrganisasiQuery> = makeConfig<OrganisasiQuery>(
	z.object({ nama: namaWajib }),
	[nameField],
	[
		{ id: "kode", header: "Kode", sortable: true, cell: (item) => String(item.kode ?? "") },
		{ id: "nama", header: "Nama", sortable: true, primary: true, cell: (item) => String(item.nama ?? "") },
		{ id: "parent", header: "Parent", cell: (item) => item.parent?.nama ?? "-" },
	],
	"Organisasi",
	{
		treeField: "parentId",
		searchFields: [
			{ name: "kode", label: "Kode" },
			{ name: "nama", label: "Nama" },
			{ name: "levelOrg", label: "Level", type: "number" },
			{ name: "category", label: "Kategori" },
		],
	},
);
