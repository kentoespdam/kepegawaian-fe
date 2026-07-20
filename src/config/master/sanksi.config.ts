import { z } from "zod";
import type { SanksiQuery } from "@/types/master/sanksi";
import { type EntityConfig, makeConfig } from "./_config-kit";

export const sanksiConfig: EntityConfig<SanksiQuery> = makeConfig<SanksiQuery>(
	z.object({}),
	[],
	[
		{ id: "kode", header: "Kode", primary: true, cell: (item) => String(item.kode ?? "") },
		{ id: "keterangan", header: "Keterangan", cell: (item) => String(item.keterangan ?? "") },
		{ id: "jenisSp", header: "Jenis SP", cell: (item) => item.jenisSp?.nama ?? "-" },
		{ id: "potTkk", header: "Pot. Tkk", align: "center" },
		{ id: "jmlPotTkk", header: "Pot. Tkk", align: "right" },
		{ id: "isPendingPangkat", header: "Penundaan Pangkat", align: "center" },
		{ id: "isPendingGaji", header: "Penundaan Gaji berkala", align: "center" },
		{ id: "isTurunPangkat", header: "Penurunan Pangkat", align: "center" },
		{ id: "isTurunJabatan", header: "Penurunan Jabatan", align: "center" },
		{ id: "isSuspension", header: "Dirumahkan", align: "center" },
		{ id: "isTerminateDh", header: "Pemberhentian Dengan Hormat", align: "center" },
		{ id: "isTerminateTh", header: "Pemberhentian dengan Tidak Hormat", align: "center" },
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
