import { z } from "zod";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";
import type { AlatKerjaQuery } from "./alat-kerja";

export const alatKerjaConfig: EntityConfig<AlatKerjaQuery> = makeConfig<AlatKerjaQuery>(
	z.object({ nama: namaWajib }),
	[nameField, { name: "profesiId", label: "Profesi", type: "select", required: true }],
	[
		{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
		{ id: "_profesiName", header: "Profesi", cell: (item) => String(item._profesiName ?? "-") },
	],
	"Alat Kerja",
	{ fkSources: [{ field: "profesiId", entity: "profesi", label: "Profesi" }] },
);
