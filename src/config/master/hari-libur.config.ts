import { z } from "zod";
import { formatDate } from "@/lib/utils";
import type { HariLiburPostRequest, HariLiburQuery } from "@/types/master/hari-libur";
import { type EntityConfig, makeConfig } from "./_config-kit";

export const hariLiburConfig: EntityConfig<HariLiburQuery, HariLiburPostRequest> = makeConfig<
	HariLiburQuery,
	HariLiburPostRequest
>(
	z.object({
		tanggal: z.string().min(1, "Tanggal wajib diisi"),
		jenisLibur: z.enum(["LIBUR_NASIONAL", "CUTI_BERSAMA"], "Jenis libur wajib diisi"),
		notes: z.string().optional(),
	}),
	[
		{ name: "tanggal", label: "Tanggal", type: "date", required: true },
		{
			name: "jenisLibur",
			label: "Jenis Libur",
			type: "select",
			required: true,
			options: [
				{ value: "LIBUR_NASIONAL", label: "Libur Nasional" },
				{ value: "CUTI_BERSAMA", label: "Cuti Bersama" },
			],
		},
		{ name: "notes", label: "Catatan", type: "textarea" },
	],
	[
		{ id: "tanggal", header: "Tanggal", sortable: true, primary: true, cell: (item) => formatDate(item.tanggal) },
		{
			id: "jenisLibur",
			header: "Jenis Libur",
			cell: (item) => {
				const labelMap: Record<string, string> = {
					LIBUR_NASIONAL: "Libur Nasional",
					CUTI_BERSAMA: "Cuti Bersama",
				};
				return labelMap[String(item.jenisLibur)] ?? String(item.jenisLibur ?? "-");
			},
		},
		{ id: "notes", header: "Catatan", cell: (item) => item.notes ?? "-" },
	],
	"Hari Libur",
	{
		searchFields: [
			{ name: "tahun", label: "Tahun", type: "number" },
			{ name: "bulan", label: "Bulan", type: "number" },
			{ name: "jenisLibur", label: "Jenis Libur" },
		],
	},
);
