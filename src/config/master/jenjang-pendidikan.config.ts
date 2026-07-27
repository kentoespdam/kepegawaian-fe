import { z } from "zod";
import type { JenjangPendidikanPostRequest, JenjangPendidikanResponse } from "@/types/master/jenjang-pendidikan";
import { type EntityConfig, makeConfig, namaWajib, nameField } from "./_config-kit";

export const jenjangPendidikanConfig: EntityConfig<JenjangPendidikanResponse, JenjangPendidikanPostRequest> =
	makeConfig<JenjangPendidikanResponse, JenjangPendidikanPostRequest>(
		z.object({
			nama: namaWajib,
			shortName: z.string().optional(),
			seq: z.coerce.number().optional(),
			isStatistik: z.coerce.boolean().optional(),
		}),
		[
			nameField,
			{ name: "shortName", label: "Nama Singkat" },
			{ name: "seq", label: "Urutan", type: "number" },
			{
				name: "isStatistik",
				label: "Statistik",
				type: "select",
				options: [
					{ value: "true", label: "Ya" },
					{ value: "false", label: "Tidak" },
				],
			},
		],
		[
			{ id: "nama", header: "Nama", sortable: true, primary: true, cell: (item) => item.nama ?? "" },
			{ id: "shortName", header: "Nama Singkat", cell: (item) => item.shortName ?? "-" },
			{ id: "seq", header: "Urutan", align: "right", cell: (item) => String(item.seq ?? "") },
			{ id: "isStatistik", header: "Statistik", align: "center" },
		],
		"Jenjang Pendidikan",
		{ searchFields: [{ name: "nama", label: "Nama" }] },
	);
