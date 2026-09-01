import { z } from "zod";
import type { StatusKepegawaian } from "@/types/_shared";
import type { GajiPotonganTkkPostRequest, GajiPotonganTkkResponse } from "@/types/penggajian/potongan-tkk";
import { type EntityConfig, makeConfig } from "../master/_config-kit";

const STATUS_KEPEGAWAIAN_OPTIONS = [
	{ value: "KONTRAK", label: "Kontrak" },
	{ value: "CAPEG", label: "Capeg" },
	{ value: "PEGAWAI", label: "Pegawai" },
	{ value: "CALON_HONORER", label: "Calon Honorer" },
	{ value: "HONORER", label: "Honorer" },
	{ value: "NON_PEGAWAI", label: "Non Pegawai" },
];

export const potonganTkkConfig: EntityConfig<GajiPotonganTkkResponse, GajiPotonganTkkPostRequest> = makeConfig<
	GajiPotonganTkkResponse,
	GajiPotonganTkkPostRequest
>(
	z.object({
		statusPegawai: z.enum(["KONTRAK", "CAPEG", "PEGAWAI", "CALON_HONORER", "HONORER", "NON_PEGAWAI"], {
			message: "Status Pegawai wajib dipilih",
		}),
		nominal: z.number().min(0, "Nominal tidak boleh negatif"),
	}),
	[
		{
			name: "statusPegawai",
			label: "Status Pegawai",
			required: true,
			type: "select",
			options: STATUS_KEPEGAWAIAN_OPTIONS,
		},
		{ name: "nominal", label: "Nominal", required: true, type: "number" },
	],
	[
		{
			id: "statusPegawai",
			header: "Status Pegawai",
			sortable: true,
			primary: true,
			cell: (item) => {
				const status = item.statusPegawai as StatusKepegawaian | undefined;
				return STATUS_KEPEGAWAIAN_OPTIONS.find((o) => o.value === status)?.label ?? String(status ?? "");
			},
		},
		{ id: "nominal", header: "Nominal", cell: (item) => `Rp ${Number(item.nominal ?? 0).toLocaleString("id-ID")}` },
	],
	"Potongan TKK",
	{
		searchFields: [{ name: "statusPegawai", label: "Status Pegawai" }],
	},
);
