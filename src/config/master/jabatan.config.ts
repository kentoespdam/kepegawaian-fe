import { z } from "zod";
import type { JabatanQuery } from "@/types/master/jabatan";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";

export const jabatanConfig: EntityConfig<JabatanQuery> = makeConfig<JabatanQuery>(
	z.object({ nama: namaWajib }),
	[nameField],
	[
		{ id: "nama", header: "Nama", sortable: true, primary: true, cell: (item) => String(item.nama ?? "") },
		{ id: "parent", header: "Parent", cell: (item) => item.parent?.nama ?? "-" },
	],
	"Jabatan",
	{
		treeField: "parentId",
		searchFields: [
			{ name: "kode", label: "Kode" },
			{ name: "nama", label: "Nama" },
		],
	},
);
