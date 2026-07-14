import { z } from "zod";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";
import type { OrganisasiQuery } from "./organisasi";

export const organisasiConfig: EntityConfig<OrganisasiQuery> = makeConfig<OrganisasiQuery>(
	z.object({ nama: namaWajib }),
	[nameField],
	[
		{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
		{ id: "parent", header: "Parent", cell: (item) => item.parent?.nama ?? "-" },
	],
	"Organisasi",
	{ treeField: "parentId" },
);
