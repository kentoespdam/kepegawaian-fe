import { z } from "zod";
import type { ProfesiQuery } from "@/types/master/profesi";
import { type EntityConfig, makeConfig } from "./_config-kit";

export const profesiConfig: EntityConfig<ProfesiQuery> = makeConfig<ProfesiQuery>(
	z.object({}),
	[],
	[
		{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
		{ id: "organisasi", header: "Organisasi", cell: (item) => item.organisasi?.nama ?? "-" },
		{ id: "jabatan", header: "Jabatan", cell: (item) => item.jabatan?.nama ?? "-" },
	],
	"Profesi",
	{
		container: "sheet",
		fkSources: [
			{ field: "organisasiId", entity: "organisasi", label: "Organisasi" },
			{ field: "jabatanId", entity: "jabatan", label: "Jabatan" },
			{ field: "gradeId", entity: "grade", label: "Grade" },
		],
		searchFields: [{ name: "nama", label: "Nama" }],
	},
);
