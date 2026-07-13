import { z } from "zod";
import type { FormField } from "@/components/crud-form";
import type { Column } from "@/components/data-table";

export type { Page } from "@/lib/api/types";

/**
 * Generic config untuk satu entitas Master.
 * @template TQuery — tipe response query (paginated / single) — dipakai di `columns`.
 * @template _TReq — cadangan untuk request body (create/update). Default = TQuery.
 */
export interface EntityConfig<TQuery = Record<string, unknown>, _TReq = TQuery> {
  label: string;
  columns: Column<TQuery>[];
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
  columns: Column<TQuery>[],
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
export const MASTER_ENTITY_CONFIGS: Record<string, EntityConfig> = {
  // — Flat entities (name only) —
  golongan: makeConfig(simpleNameSchema, [nameField], [nameCol], "Golongan"),
  level: makeConfig(simpleNameSchema, [nameField], [nameCol], "Level"),
  "jenjang-pendidikan": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenjang Pendidikan"),
  "jenis-keahlian": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis Keahlian"),
  "jenis-pelatihan": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis Pelatihan"),
  "jenis-kitas": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis Kitas"),
  "jenis-sp": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis SP"),
  "alasan-berhenti": makeConfig(simpleNameSchema, [nameField], [nameCol], "Alasan Berhenti"),

  "hari-libur": makeConfig(
    z.object({ nama: namaWajib, tanggal: z.string().min(1, "Tanggal wajib diisi") }),
    [nameField, { name: "tanggal", label: "Tanggal", required: true }],
    [
      { id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
      { id: "tanggal", header: "Tanggal", cell: (item) => String(item.tanggal ?? "") },
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
  organisasi: makeConfig(
    z.object({ nama: namaWajib }),
    [nameField],
    [
      { id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
      { id: "_parentName", header: "Parent", cell: (item) => String(item._parentName ?? "-") },
    ],
    "Organisasi",
    { treeField: "parentId" },
  ),

  jabatan: makeConfig(
    z.object({ nama: namaWajib }),
    [nameField],
    [
      { id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
      { id: "_parentName", header: "Parent", cell: (item) => String(item._parentName ?? "-") },
    ],
    "Jabatan",
    { treeField: "parentId" },
  ),

  // — FK entities —
  grade: makeConfig(
    z.object({ nama: namaWajib }),
    [nameField, { name: "levelId", label: "Level", type: "select", required: true }],
    [
      { id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
      { id: "_levelName", header: "Level", cell: (item) => String(item._levelName ?? "-") },
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
  sanksi: makeConfig(
    z.object({}),
    [],
    [
      { id: "kode", header: "Kode", cell: (item) => String(item.kode ?? "") },
      { id: "keterangan", header: "Keterangan", cell: (item) => String(item.keterangan ?? "") },
      { id: "_jenisSpName", header: "Jenis SP", cell: (item) => String(item._jenisSpName ?? "-") },
    ],
    "Sanksi",
    { container: "sheet", fkSources: [{ field: "jenisSpId", entity: "jenis-sp", label: "Jenis SP" }] },
  ),

  profesi: makeConfig(
    z.object({}),
    [],
    [
      { id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
      { id: "_orgName", header: "Organisasi", cell: (item) => String(item._orgName ?? "-") },
      { id: "_jabatanName", header: "Jabatan", cell: (item) => String(item._jabatanName ?? "-") },
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
