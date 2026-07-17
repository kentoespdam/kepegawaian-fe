/**
 * _config-kit — primitif bersama untuk config entitas Master.
 *
 * DITULIS MANUAL, bukan hasil generate (prefix `_` → aman dari extract-types.js).
 *
 * Berisi interface `EntityConfig`, factory `makeConfig`, dan helper umum
 * (`namaWajib`, `nameCol`, `nameField`, `simpleNameSchema`). Modul leaf ini
 * diimpor tiap `{entity}.config.ts` tanpa memicu circular dependency dengan
 * `@/config/master-config`.
 */

import { z } from "zod";
import type { FormField } from "@/components/crud-form";
import type { Column } from "@/components/data-table";
import type { Resolved } from "@/types/master/_computed";

/** FK Source — menautkan kolom ke entitas referensi untuk dropdown / filter. */
export interface FKSource {
	field: string;
	entity: string;
	label: string;
	/**
	 * Custom label formatter untuk opsi dropdown.
	 * Default: `item.nama ?? item.id`. Contoh: grade tidak punya `nama`, pakai `(item) => \`Grade ${item.grade}\``
	 */
	formatLabel?: (item: Record<string, unknown>) => string;
}

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
	fkSources?: FKSource[];
	/** Filter teks/number di toolbar — dirender sebagai input debounced + ditulis ke URL. */
	searchFields?: { name: string; label: string; type?: "text" | "number" }[];
}

export const namaWajib = z.string().min(1, "Nama wajib diisi");

export const nameCol: Column<Record<string, unknown>> = {
	id: "nama",
	header: "Nama",
	sortable: true,
	primary: true,
	cell: (item) => String(item.nama ?? ""),
};

export const nameField: FormField = { name: "nama", label: "Nama", required: true };

export const simpleNameSchema = z.object({ nama: namaWajib });

/** Factory dengan inferensi tipe — panggil tanpa type arg untuk untyped, atau supply <TQuery>. */
export function makeConfig<TQuery, _TReq = TQuery>(
	schema: z.ZodType,
	fields: FormField[],
	columns: Column<Resolved<TQuery>>[],
	label: string,
	opts?: {
		container?: "dialog" | "sheet";
		treeField?: string;
		fkSources?: FKSource[];
		searchFields?: { name: string; label: string; type?: "text" | "number" }[];
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
		searchFields: opts?.searchFields,
	};
}
