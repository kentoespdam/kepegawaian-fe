import { z } from "zod";
import type { GajiTunjanganPostRequest, GajiTunjanganResponse } from "@/types/penggajian/tunjangan";
import { type EntityConfig, makeConfig } from "../master/_config-kit";

const JENIS_TUNJANGAN_OPTIONS = [
	{ value: "JABATAN", label: "Jabatan" },
	{ value: "KINERJA", label: "Kinerja" },
	{ value: "BERAS", label: "Beras" },
	{ value: "AIR", label: "Air" },
];

export const tunjanganConfig: EntityConfig<GajiTunjanganResponse, GajiTunjanganPostRequest> = makeConfig<
	GajiTunjanganResponse,
	GajiTunjanganPostRequest
>(
	z.object({
		jenisTunjangan: z.enum(["JABATAN", "KINERJA", "BERAS", "AIR"], {
			message: "Jenis Tunjangan wajib dipilih",
		}),
		nominal: z.number().min(0, "Nominal tidak boleh negatif"),
	}),
	[
		{
			name: "jenisTunjangan",
			label: "Jenis Tunjangan",
			required: true,
			type: "select",
			options: JENIS_TUNJANGAN_OPTIONS,
		},
		{ name: "nominal", label: "Nominal", required: true, type: "number" },
	],
	[
		{
			id: "jenisTunjangan",
			header: "Jenis",
			sortable: true,
			primary: true,
			cell: (item) =>
				JENIS_TUNJANGAN_OPTIONS.find((o) => o.value === item.jenisTunjangan)?.label ??
				String(item.jenisTunjangan ?? ""),
		},
		{
			id: "level",
			header: "Level",
			cell: (item) => String(item.level?.nama ?? "-"),
		},
		{
			id: "golongan",
			header: "Golongan",
			cell: (item) => String(item.golongan?.golongan ?? "-"),
		},
		{ id: "nominal", header: "Nominal", cell: (item) => `Rp ${Number(item.nominal ?? 0).toLocaleString("id-ID")}` },
	],
	"Tunjangan",
	{
		fkSources: [
			{ field: "jenisTunjangan", entity: "jenis-tunjangan", label: "Jenis Tunjangan" },
			{ field: "levelId", entity: "level", label: "Level" },
		],
		searchFields: [{ name: "jenisTunjangan", label: "Jenis Tunjangan" }],
	},
);
