import { z } from "zod";
import type { ApdQuery } from "@/types/master/apd";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";

export const apdConfig: EntityConfig<ApdQuery> = makeConfig<ApdQuery>(
	z.object({ nama: namaWajib }),
	[nameField, { name: "profesiId", label: "Profesi", type: "select", required: true }],
	[
		{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
		{ id: "_profesiName", header: "Profesi", cell: (item) => String(item._profesiName ?? "-") },
	],
	"APD",
	{ fkSources: [{ field: "profesiId", entity: "profesi", label: "Profesi" }] },
);
