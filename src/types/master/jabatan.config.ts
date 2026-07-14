import { z } from "zod";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";
import type { JabatanQuery } from "./jabatan";

export const jabatanConfig: EntityConfig<JabatanQuery> = makeConfig<JabatanQuery>(
	z.object({ nama: namaWajib }),
	[nameField],
	[
		{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
		{ id: "parent", header: "Parent", cell: (item) => item.parent?.nama ?? "-" },
	],
	"Jabatan",
	{ treeField: "parentId" },
);
