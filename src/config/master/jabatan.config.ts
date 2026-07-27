import { z } from "zod";
import type { JabatanPostRequest, JabatanQuery } from "@/types/master/jabatan";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";

export const jabatanConfig: EntityConfig<JabatanQuery, JabatanPostRequest> = makeConfig<
	JabatanQuery,
	JabatanPostRequest
>(
	z.object({ kode: z.string().min(1, "Kode wajib diisi"), nama: namaWajib }),
	[{ name: "kode", label: "Kode", required: true }, nameField],
	[
		{ id: "kode", header: "Kode", sortable: true, cell: (item) => item.kode ?? "" },
		{ id: "nama", header: "Nama", sortable: true, primary: true, cell: (item) => item.nama ?? "" },
		{ id: "levelId", header: "Level", sortable: true, cell: (item) => item.level?.nama ?? "-" },
		{ id: "parentId", header: "Induk", sortable: true, cell: (item) => item.parent?.nama ?? "-" },
		{ id: "organisasiId", header: "Organisasi", sortable: true, cell: (item) => item.organisasi?.nama ?? "-" },
	],
	"Jabatan",
	{
		treeField: "parentId",
		searchFields: [
			{ name: "kode", label: "Kode" },
			{ name: "nama", label: "Nama" },
		],
		fkSources: [
			{ field: "parentId", entity: "jabatan", label: "Parent" },
			{ field: "organisasiId", entity: "organisasi", label: "Organisasi" },
			{ field: "levelId", entity: "level", label: "Level" },
		],
	},
);
