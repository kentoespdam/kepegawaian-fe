import { z } from "zod";
import type { SanksiPostRequest, SanksiQuery } from "@/types/master/sanksi";
import { type EntityConfig, makeConfig } from "./_config-kit";

const boolOpt = z.preprocess((v) => (v === "true" ? true : v === "false" ? false : v), z.coerce.boolean().optional());

export const sanksiConfig: EntityConfig<SanksiQuery, SanksiPostRequest> = makeConfig<SanksiQuery, SanksiPostRequest>(
	z.object({
		kode: z.string().min(1, "Kode wajib diisi"),
		keterangan: z.string().min(1, "Keterangan wajib diisi"),
		potTkk: boolOpt,
		jmlPotTkk: z.coerce.number().optional(),
		isPendingPangkat: boolOpt,
		isPendingGaji: boolOpt,
		isTurunPangkat: boolOpt,
		isTurunJabatan: boolOpt,
		isSuspension: boolOpt,
		isTerminateDh: boolOpt,
		isTerminateTh: boolOpt,
	}),
	[
		{ name: "kode", label: "Kode", required: true },
		{ name: "keterangan", label: "Keterangan", type: "textarea", required: true },
		{
			name: "potTkk",
			label: "Pot. Tkk",
			type: "select",
			options: [
				{ value: "true", label: "Ya" },
				{ value: "false", label: "Tidak" },
			],
		},
		{ name: "jmlPotTkk", label: "Jml. Pot. Tkk", type: "number" },
		{
			name: "isPendingPangkat",
			label: "Penundaan Pangkat",
			type: "select",
			options: [
				{ value: "true", label: "Ya" },
				{ value: "false", label: "Tidak" },
			],
		},
		{
			name: "isPendingGaji",
			label: "Penundaan Gaji Berkala",
			type: "select",
			options: [
				{ value: "true", label: "Ya" },
				{ value: "false", label: "Tidak" },
			],
		},
		{
			name: "isTurunPangkat",
			label: "Penurunan Pangkat",
			type: "select",
			options: [
				{ value: "true", label: "Ya" },
				{ value: "false", label: "Tidak" },
			],
		},
		{
			name: "isTurunJabatan",
			label: "Penurunan Jabatan",
			type: "select",
			options: [
				{ value: "true", label: "Ya" },
				{ value: "false", label: "Tidak" },
			],
		},
		{
			name: "isSuspension",
			label: "Dirumahkan",
			type: "select",
			options: [
				{ value: "true", label: "Ya" },
				{ value: "false", label: "Tidak" },
			],
		},
		{
			name: "isTerminateDh",
			label: "PHK Dengan Hormat",
			type: "select",
			options: [
				{ value: "true", label: "Ya" },
				{ value: "false", label: "Tidak" },
			],
		},
		{
			name: "isTerminateTh",
			label: "PHK Tidak Hormat",
			type: "select",
			options: [
				{ value: "true", label: "Ya" },
				{ value: "false", label: "Tidak" },
			],
		},
	],
	[
		{ id: "kode", header: "Kode", primary: true, cell: (item) => String(item.kode ?? "") },
		{ id: "keterangan", header: "Keterangan", cell: (item) => String(item.keterangan ?? "") },
		{ id: "jenisSp", header: "Jenis SP", cell: (item) => item.jenisSp?.nama ?? "-" },
		{ id: "potTkk", header: "Pot. Tkk", align: "center" },
		{ id: "jmlPotTkk", header: "Jml. Pot. Tkk", align: "right" },
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
