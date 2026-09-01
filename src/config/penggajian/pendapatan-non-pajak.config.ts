import { z } from "zod";
import type {
	GajiPendapatanNonPajakPostRequest,
	GajiPendapatanNonPajakResponse,
} from "@/types/penggajian/pendapatan-non-pajak";
import { type EntityConfig, makeConfig } from "../master/_config-kit";

export const pendapatanNonPajakConfig: EntityConfig<GajiPendapatanNonPajakResponse, GajiPendapatanNonPajakPostRequest> =
	makeConfig<GajiPendapatanNonPajakResponse, GajiPendapatanNonPajakPostRequest>(
		z.object({
			kode: z.string().min(1, "Kode wajib diisi"),
			nominal: z.number().min(0, "Nominal tidak boleh negatif"),
			notes: z.string().optional(),
		}),
		[
			{ name: "kode", label: "Kode", required: true },
			{ name: "nominal", label: "Nominal", required: true, type: "number" },
			{ name: "notes", label: "Keterangan" },
		],
		[
			{ id: "kode", header: "Kode", sortable: true, primary: true, cell: (item) => String(item.kode ?? "") },
			{ id: "nominal", header: "Nominal", cell: (item) => `Rp ${Number(item.nominal ?? 0).toLocaleString("id-ID")}` },
			{ id: "notes", header: "Keterangan", cell: (item) => String(item.notes ?? "") },
		],
		"Pendapatan Non Pajak",
		{
			searchFields: [{ name: "kode", label: "Kode" }],
		},
	);
