import { z } from "zod";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";
import type { RumahDinasQuery } from "./rumah-dinas";

export const rumahDinasConfig: EntityConfig<RumahDinasQuery> = makeConfig<RumahDinasQuery>(
	z.object({ nama: namaWajib, nilai: z.coerce.number().min(0, "Nilai wajib diisi") }),
	[nameField, { name: "nilai", label: "Nilai", type: "number", required: true }],
	[
		{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
		{ id: "nilai", header: "Nilai", cell: (item) => String(item.nilai ?? "") },
	],
	"Rumah Dinas",
);
