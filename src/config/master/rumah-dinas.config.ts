import { z } from "zod";
import { rupiah } from "@/lib/utils";
import type { RumahDinasQuery } from "@/types/master/rumah-dinas";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";

export const rumahDinasConfig: EntityConfig<RumahDinasQuery> = makeConfig<RumahDinasQuery>(
	z.object({ nama: namaWajib, nilai: z.coerce.number().min(0, "Nilai wajib diisi") }),
	[nameField, { name: "nilai", label: "Nilai", type: "number", required: true }],
	[
		{ id: "nama", header: "Nama", sortable: true, primary: true, cell: (item) => String(item.nama ?? "") },
		{ id: "nilai", header: "Nilai", align: "right", cell: (item) => rupiah(item.nilai) },
	],
	"Rumah Dinas",
	{ searchFields: [{ name: "nama", label: "Nama" }] },
);
