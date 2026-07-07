import { z } from "zod";
import type { FormField } from "@/components/crud-form";
import type { Column } from "@/components/data-table";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export interface EntityConfig {
  label: string;
  columns: Column<Record<string, unknown>>[];
  fields: FormField[];
  schema: z.ZodType;
}

const namaWajib = z.string().min(1, "Nama wajib diisi");

const nameCol: Column<Record<string, unknown>> = {
  id: "nama",
  header: "Nama",
  sortable: true,
  cell: (item) => String(item.nama ?? ""),
};

const nameField: FormField = { name: "nama", label: "Nama", required: true };

const makeConfig = (
  schema: z.ZodType,
  fields: FormField[],
  columns: Column<Record<string, unknown>>[],
  label: string,
): EntityConfig => ({
  label,
  columns,
  fields,
  schema,
});

const simpleNameSchema = z.object({ nama: namaWajib });

export const MASTER_ENTITY_CONFIGS: Record<string, EntityConfig> = {
  "jenis-keahlian": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis Keahlian"),
  "jenis-pelatihan": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis Pelatihan"),
  "jenis-kitas": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis Kitas"),
  "jenis-sp": makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis SP"),
  "alasan-berhenti": makeConfig(simpleNameSchema, [nameField], [nameCol], "Alasan Berhenti"),
  "hari-libur": makeConfig(
    z.object({ nama: namaWajib, tanggal: z.string().min(1, "Tanggal wajib diisi") }),
    [
      { name: "nama", label: "Nama", required: true },
      { name: "tanggal", label: "Tanggal", required: true },
    ],
    [
      { id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
      { id: "tanggal", header: "Tanggal", cell: (item) => String(item.tanggal ?? "") },
    ],
    "Hari Libur",
  ),
  "rumah-dinas": makeConfig(
    z.object({ nama: namaWajib, alamat: z.string().min(1, "Alamat wajib diisi") }),
    [
      { name: "nama", label: "Nama", required: true },
      { name: "alamat", label: "Alamat", type: "textarea", required: true },
    ],
    [
      { id: "nama", header: "Nama", sortable: true, cell: (item) => String(item.nama ?? "") },
      { id: "alamat", header: "Alamat", cell: (item) => String(item.alamat ?? "") },
    ],
    "Rumah Dinas",
  ),
};
