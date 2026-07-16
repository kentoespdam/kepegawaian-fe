import { z } from "zod";
import type { SanksiQuery } from "@/types/master/sanksi";
import { type EntityConfig, makeConfig } from "./_config-kit";

export const sanksiConfig: EntityConfig<SanksiQuery> = makeConfig<SanksiQuery>(
	z.object({}),
	[],
	[
		{ id: "kode", header: "Kode", cell: (item) => String(item.kode ?? "") },
		{ id: "keterangan", header: "Keterangan", cell: (item) => String(item.keterangan ?? "") },
		{ id: "jenisSp", header: "Jenis SP", cell: (item) => item.jenisSp?.nama ?? "-" },
	],
	"Sanksi",
	{
		container: "sheet",
		fkSources: [{ field: "jenisSpId", entity: "jenis-sp", label: "Jenis SP" }],
		searchFields: [
			{ name: "kode", label: "Kode" },
			{ name: "keterangan", label: "Keterangan" },
		],
	},
);
