import { z } from "zod";
import type { AlasanBerhentiPostRequest, AlasanBerhentiQuery } from "@/types/master/alasan-berhenti";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";

export const alasanBerhentiConfig: EntityConfig<AlasanBerhentiQuery, AlasanBerhentiPostRequest> = makeConfig<
	AlasanBerhentiQuery,
	AlasanBerhentiPostRequest
>(
	z.object({ nama: namaWajib, notes: z.string().optional() }),
	[nameField, { name: "notes", label: "Catatan", type: "textarea" }],
	[
		{ id: "nama", header: "Nama", sortable: true, primary: true, cell: (item) => item.nama ?? "" },
		{ id: "notes", header: "Catatan", cell: (item) => item.notes ?? "-" },
	],
	"Alasan Berhenti",
	{ searchFields: [{ name: "nama", label: "Nama" }] },
);
