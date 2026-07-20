import { z } from "zod";
import { BadgeManager } from "@/components/badge-manager";
import type { ProfesiQuery } from "@/types/master/profesi";
import { type EntityConfig, makeConfig } from "./_config-kit";

export const profesiConfig: EntityConfig<ProfesiQuery> = makeConfig<ProfesiQuery>(
	z.object({}),
	[],
	[
		{ id: "nama", header: "Nama", sortable: true, primary: true, cell: (item) => String(item.nama ?? "") },
		{ id: "organisasi", header: "Organisasi", cell: (item) => item.organisasi?.nama ?? "-" },
		{ id: "jabatan", header: "Jabatan", cell: (item) => item.jabatan?.nama ?? "-" },
		{
			id: "apd",
			header: "APD",
			cell: (item) => (item.id ? <BadgeManager entity="apd" profesiId={item.id} items={item.apdList ?? []} /> : "-"),
		},
		{
			id: "alat-kerja",
			header: "Alat Kerja",
			cell: (item) =>
				item.id ? <BadgeManager entity="alat-kerja" profesiId={item.id} items={item.alatKerjaList ?? []} /> : "-",
		},
	],
	"Profesi",
	{
		container: "sheet",
		fkSources: [
			{ field: "organisasiId", entity: "organisasi", label: "Organisasi" },
			{ field: "jabatanId", entity: "jabatan", label: "Jabatan" },
			{
				field: "gradeId",
				entity: "grade",
				label: "Grade",
				formatLabel: (item) => `Grade ${item.grade}`,
			},
		],
		searchFields: [{ name: "nama", label: "Nama" }],
	},
);
