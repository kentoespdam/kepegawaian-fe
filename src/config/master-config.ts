import { z } from "zod";
import type { FormField } from "@/components/crud-form";
import type { Column } from "@/components/data-table";
import type { Resolved } from "@/types/master/_computed";
import type { GradeQuery } from "@/types/master/grade";
import type { OrganisasiQuery } from "@/types/master/organisasi";
import type { JabatanQuery } from "@/types/master/jabatan";
import type { SanksiQuery } from "@/types/master/sanksi";
import type { ProfesiQuery } from "@/types/master/profesi";

export type { Page } from "@/lib/api/types";

/**
 * Generic config untuk satu entitas Master.
 * @template TQuery — tipe response query (paginated / single) — dipakai di `columns`.
 * @template _TReq — cadangan untuk request body (create/update). Default = TQuery.
 */
export interface EntityConfig<TQuery = Record<string, unknown>, _TReq = TQuery> {
	label: string;
	columns: Column<Resolved<TQuery>>[];
	fields: FormField[];
	schema: z.ZodType;
	container?: "dialog" | "sheet";
	treeField?: string;
	fkSources?: { field: string; entity: string; label: string }[];
}

const namaWajib = z.string().min(1, "Nama wajib diisi");

const nameCol: Column<Record<string, unknown>> = {
	id: "nama",
	header: "Nama",
	sortable: true,
	cell: (item) => String(item.nama ?? ""),
};

const nameField: FormField = { name: "nama", label: "Nama", required: true };

/** Factory dengan inferensi tipe — panggil tanpa type arg untuk untyped, atau supply <TQuery>. */
function makeConfig<TQuery, _TReq = TQuery>(
	schema: z.ZodType,
	fields: FormField[],
	columns: Column<Resolved<TQuery>>[],
	label: string,
	opts?: {
		container?: "dialog" | "sheet";
		treeField?: string;
		fkSources?: { field: string; entity: string; label: string }[];
	},
): EntityConfig<TQuery, _TReq> {
	return {
		label,
		columns,
		fields,
		schema,
		container: opts?.container,
		treeField: opts?.treeField,
		fkSources: opts?.fkSources,
	};
}

const simpleNameSchema = z.object({ nama: namaWajib });

// ponytail: map di-widen ke default type — tanpa switch, index via string key
export const MASTER_ENTITY_CONFIGS: Record<string, EntityConfig<any>> = {
	// — Flat entities —
	golongan: makeConfig(
		z.object({ golongan: namaWajib, pangkat: z.string().min(1, "Pangkat wajib diisi") }),
		[
			{ name: "golongan", label: "Golongan", required: true },
			{ name: "pangkat", label: "Pangkat", required: true },
		],
		[
			{ id: "golongan", header: "Golongan", sortable: true, cell: (item) => String(item.golongan ?? "") },
			{ id: "pangkat", header: "Pangkat", cell: (item) => String(item.pangkat ?? "") },
		],
		"Golongan",
	),
	level: makeConfig(simpleNameSchema, [nameField], [nameCol], "Level"),
	"jenjang-pendidikan": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenjang Pendidikan"),
	"jenis-keahlian": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis Keahlian"),
	"jenis-pelatihan": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis Pelatihan"),
	"jenis-kitas": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis Kitas"),
	"jenis-sp": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis SP"),
	"alasan-berhenti": makeConfig(simpleNameSchema, [nameField], [nameCol], "Alasan Berhenti"),

	"hari-libur": makeConfig(
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
	),

	"rumah-dinas": makeConfig(
		z.object({ nama: namaWajib, alamat: z.string().min(1, "Alamat wajib diisi") }),
		[nameField, { name: "alamat", label: "Alamat", type: "textarea", required: true }],
		[
			{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
			{ id: "alamat", header: "Alamat", cell: (item) => String(item.alamat ?? "") },
		],
		"Rumah Dinas",
	),

	// — Tree entities (parentId) —
	organisasi: makeConfig<OrganisasiQuery>(
		z.object({ nama: namaWajib }),
		[nameField],
		[
			{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
			{ id: "parent", header: "Parent", cell: (item) => item.parent?.nama ?? "-" },
		],
		"Organisasi",
		{ treeField: "parentId" },
	),

	jabatan: makeConfig<JabatanQuery>(
		z.object({ nama: namaWajib }),
		[nameField],
		[
			{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
			{ id: "parent", header: "Parent", cell: (item) => item.parent?.nama ?? "-" },
		],
		"Jabatan",
		{ treeField: "parentId" },
	),

	// — FK entities —
	grade: makeConfig<GradeQuery>(
		z.object({
			grade: z.coerce.number().min(1, "Grade wajib diisi"),
			tukin: z.coerce.number().min(100000, "Tukin minimal 100.000"),
			levelId: z.coerce.number(),
		}),
		[
			{ name: "grade", label: "Grade", type: "number", required: true },
			{ name: "tukin", label: "Tukin", type: "number", required: true },
			{ name: "levelId", label: "Level", type: "select", required: true },
		],
		[
			{ id: "grade", header: "Grade", sortable: true, cell: (item) => `Grade ${item.grade}` },
			{ id: "level", header: "Level", cell: (item) => item.level?.nama ?? "-" },
		],
		"Grade",
		{ fkSources: [{ field: "levelId", entity: "level", label: "Level" }] },
	),

	apd: makeConfig(
		z.object({ nama: namaWajib }),
		[nameField, { name: "profesiId", label: "Profesi", type: "select", required: true }],
		[
			{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
			{ id: "_profesiName", header: "Profesi", cell: (item) => String(item._profesiName ?? "-") },
		],
		"APD",
		{ fkSources: [{ field: "profesiId", entity: "profesi", label: "Profesi" }] },
	),

	"alat-kerja": makeConfig(
		z.object({ nama: namaWajib }),
		[nameField, { name: "profesiId", label: "Profesi", type: "select", required: true }],
		[
			{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
			{ id: "_profesiName", header: "Profesi", cell: (item) => String(item._profesiName ?? "-") },
		],
		"Alat Kerja",
		{ fkSources: [{ field: "profesiId", entity: "profesi", label: "Profesi" }] },
	),

	// — Heavy-form entities (Sheet) —
	sanksi: makeConfig<SanksiQuery>(
		z.object({}),
		[],
		[
			{ id: "kode", header: "Kode", cell: (item) => String(item.kode ?? "") },
			{ id: "keterangan", header: "Keterangan", cell: (item) => String(item.keterangan ?? "") },
			{ id: "jenisSp", header: "Jenis SP", cell: (item) => item.jenisSp?.nama ?? "-" },
		],
		"Sanksi",
		{ container: "sheet", fkSources: [{ field: "jenisSpId", entity: "jenis-sp", label: "Jenis SP" }] },
	),

	profesi: makeConfig<ProfesiQuery>(
		z.object({}),
		[],
		[
			{ id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
			{ id: "organisasi", header: "Organisasi", cell: (item) => item.organisasi?.nama ?? "-" },
			{ id: "jabatan", header: "Jabatan", cell: (item) => item.jabatan?.nama ?? "-" },
		],
		"Profesi",
		{
			container: "sheet",
			fkSources: [
				{ field: "organisasiId", entity: "organisasi", label: "Organisasi" },
				{ field: "jabatanId", entity: "jabatan", label: "Jabatan" },
				{ field: "gradeId", entity: "grade", label: "Grade" },
			],
		},
	),
};
