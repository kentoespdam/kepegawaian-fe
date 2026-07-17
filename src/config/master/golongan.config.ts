import { z } from "zod";
import type { GolonganQuery } from "@/types/master/golongan";
import { type EntityConfig, makeConfig, namaWajib } from "./_config-kit";

export const golonganConfig: EntityConfig<GolonganQuery> = makeConfig<GolonganQuery>(
	z.object({ golongan: namaWajib, pangkat: z.string().min(1, "Pangkat wajib diisi") }),
	[
		{ name: "golongan", label: "Golongan", required: true },
		{ name: "pangkat", label: "Pangkat", required: true },
	],
	[
		{ id: "golongan", header: "Golongan", sortable: true, primary: true, cell: (item) => String(item.golongan ?? "") },
		{ id: "pangkat", header: "Pangkat", cell: (item) => String(item.pangkat ?? "") },
	],
	"Golongan",
	{
		searchFields: [
			{ name: "golongan", label: "Golongan" },
			{ name: "pangkat", label: "Pangkat" },
		],
	},
);
