import { z } from "zod";
import type { HariLiburQuery } from "@/types/master/hari-libur";
import { type EntityConfig, makeConfig } from "./_config-kit";

export const hariLiburConfig: EntityConfig<HariLiburQuery> = makeConfig<HariLiburQuery>(
	z.object({
		tanggal: z.string().min(1, "Tanggal wajib diisi"),
		jenisLibur: z.string().min(1, "Jenis libur wajib diisi"),
	}),
	[
		{ name: "tanggal", label: "Tanggal", required: true },
		{ name: "jenisLibur", label: "Jenis Libur", required: true },
	],
	[
		{ id: "tanggal", header: "Tanggal", sortable: true, cell: (item) => String(item.tanggal ?? "") },
		{ id: "jenisLibur", header: "Jenis Libur", cell: (item) => String(item.jenisLibur ?? "-") },
	],
	"Hari Libur",
);
