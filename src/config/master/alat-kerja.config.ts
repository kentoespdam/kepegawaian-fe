import { z } from "zod";
import type { AlatKerjaQuery } from "@/types/master/alat-kerja";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";

export const alatKerjaConfig: EntityConfig<AlatKerjaQuery> = makeConfig<AlatKerjaQuery>(
	z.object({ nama: namaWajib }),
	[nameField, { name: "profesiId", label: "Profesi", type: "select", required: true }],
	[
		{ id: "nama", header: "Nama", sortable: true, primary: true, cell: (item) => String(item.nama ?? "") },
		{ id: "_profesiName", header: "Profesi", cell: (item) => String(item._profesiName ?? "-") },
	],
	"Alat Kerja",
	{ fkSources: [{ field: "profesiId", entity: "profesi", label: "Profesi" }] },
);
