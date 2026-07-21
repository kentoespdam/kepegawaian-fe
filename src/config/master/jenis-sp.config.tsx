import { z } from "zod";
import { SanksiManager } from "@/components/sanksi-manager";
import type { JenisSpQuery } from "@/types/master/jenis-sp";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";

export const jenisSpConfig: EntityConfig<JenisSpQuery> = makeConfig<JenisSpQuery>(
	z.object({ kode: z.string().min(1, "Kode wajib diisi"), nama: namaWajib }),
	[{ name: "kode", label: "Kode", required: true }, nameField],
	[
		{ id: "kode", header: "Kode", sortable: true, cell: (item) => item.kode ?? "" },
		{ id: "nama", header: "Nama", sortable: true, primary: true, cell: (item) => item.nama ?? "" },
		{
			id: "sanksi",
			header: "Sanksi",
			cell: (item) => (item.id ? <SanksiManager jenisSpId={item.id} items={item.sanksiList ?? []} /> : "-"),
		},
	],
	"Jenis SP",
	{
		searchFields: [
			{ name: "kode", label: "Kode" },
			{ name: "nama", label: "Nama" },
		],
	},
);
