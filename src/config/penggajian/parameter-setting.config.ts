import { z } from "zod";
import type {
	GajiParameterSettingPostRequest,
	GajiParameterSettingResponse,
} from "@/types/penggajian/parameter-setting";
import { type EntityConfig, makeConfig } from "../master/_config-kit";

export const parameterSettingConfig: EntityConfig<GajiParameterSettingResponse, GajiParameterSettingPostRequest> =
	makeConfig<GajiParameterSettingResponse, GajiParameterSettingPostRequest>(
		z.object({
			kode: z.string().min(1, "Kode wajib diisi"),
			nominal: z.number().min(0, "Nominal tidak boleh negatif"),
		}),
		[
			{ name: "kode", label: "Kode", required: true },
			{ name: "nominal", label: "Nominal", required: true, type: "number" },
		],
		[
			{ id: "kode", header: "Kode", sortable: true, primary: true, cell: (item) => String(item.kode ?? "") },
			{ id: "nominal", header: "Nominal", cell: (item) => `Rp ${Number(item.nominal ?? 0).toLocaleString("id-ID")}` },
		],
		"Lain-lain",
		{
			searchFields: [{ name: "kode", label: "Kode" }],
		},
	);
