import { z } from "zod";
import type { JenjangPendidikanResponse } from "@/types/master/jenjang-pendidikan";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";

export const jenjangPendidikanConfig: EntityConfig<JenjangPendidikanResponse> = makeConfig<JenjangPendidikanResponse>(
	z.object({
		nama: namaWajib,
		shortName: z.string().optional(),
		seq: z.coerce.number().optional(),
		isStatistik: z.coerce.boolean().optional(),
	}),
	[
		nameField,
		{ name: "shortName", label: "Nama Singkat" },
		{ name: "seq", label: "Urutan", type: "number" },
		{
			name: "isStatistik",
			label: "Statistik",
			type: "select",
			options: [
				{ value: "true", label: "Ya" },
				{ value: "false", label: "Tidak" },
			],
		},
	],
	[
		{ id: "nama", header: "Nama", sortable: true, primary: true, cell: (item) => item.nama ?? "" },
		{ id: "shortName", header: "Nama Singkat", cell: (item) => item.shortName ?? "-" },
		{ id: "seq", header: "Urutan", cell: (item) => String(item.seq ?? "") },
		{ id: "isStatistik", header: "Statistik", cell: (item) => String(item.isStatistik ?? "") },
	],
	"Jenjang Pendidikan",
	{ searchFields: [{ name: "nama", label: "Nama" }] },
);
