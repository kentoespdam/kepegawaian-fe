"use client";

import { useQuery } from "@tanstack/react-query";

import type { EntityConfig } from "@/config/master-config";
import { api } from "@/lib/api/client";
import { buildTreeOptions } from "@/lib/master/tree-utils";

import type { Resolved } from "@/types/master/_computed";

interface UseMasterTableOpts<TQuery extends Record<string, unknown>> {
	cfg: EntityConfig<TQuery>;
	listData: TQuery[] | undefined;
	treeItems: Record<string, unknown>[];
	editing: Record<string, unknown> | null;
}

// Helper: resolve label dari FK item, pakai formatLabel bila ada
function resolveFkLabel(
	fk: { formatLabel?: (item: Record<string, unknown>) => string },
	item: Record<string, unknown>,
): string {
	return fk.formatLabel ? fk.formatLabel(item) : String(item.nama ?? item.id ?? "");
}

/**
 * Orchestrates FK source queries, lookup maps, resolved table items,
 * and enriched form fields for a master entity CRUD page.
 */
export function useMasterTable<TQuery extends Record<string, unknown>>({
	cfg,
	listData,
	treeItems,
	editing,
}: UseMasterTableOpts<TQuery>) {
	const fkSources = cfg.fkSources ?? [];

	// ponytail: up to 3 FK queries — declared unconditionally, enabled per-entity
	const fkQ1 = useQuery({
		queryKey: [fkSources[0]?.entity, "list"],
		queryFn: () => api.listAll(fkSources[0]?.entity ?? ""),
		enabled: fkSources.length > 0,
		staleTime: 300_000,
	});
	const fkQ2 = useQuery({
		queryKey: [fkSources[1]?.entity, "list"],
		queryFn: () => api.listAll(fkSources[1]?.entity ?? ""),
		enabled: fkSources.length > 1,
		staleTime: 300_000,
	});
	const fkQ3 = useQuery({
		queryKey: [fkSources[2]?.entity, "list"],
		queryFn: () => api.listAll(fkSources[2]?.entity ?? ""),
		enabled: fkSources.length > 2,
		staleTime: 300_000,
	});

	const fkLookup = new Map<string, Map<string, Record<string, unknown>>>();
	const allData = [
		fkQ1.data as Record<string, unknown>[] | undefined,
		fkQ2.data as Record<string, unknown>[] | undefined,
		fkQ3.data as Record<string, unknown>[] | undefined,
	];
	for (let i = 0; i < fkSources.length; i++) {
		const data = allData[i] ?? [];
		const m = new Map<string, Record<string, unknown>>();
		for (const item of data) m.set(String(item.id), item);
		fkLookup.set(fkSources[i]?.field, m);
	}

	// Resolve FK display names + tree parent name in table items
	const resolvedItems = (Array.isArray(listData) ? listData : []).map((item) => {
		const e: Record<string, unknown> = { ...item } as Record<string, unknown>;
		if (cfg.treeField) {
			const pid = String(item[cfg.treeField] ?? "");
			e._parentName = pid
				? String((Array.isArray(treeItems) ? treeItems : []).find((x) => String(x.id) === pid)?.nama ?? pid)
				: "";
		}
		for (const fk of fkSources) {
			const fkId = String(item[fk.field] ?? "");
			const nameField = `_${fk.field.replace("Id", "")}Name`;
			const lookupMap = fkLookup.get(fk.field);
			if (lookupMap && fkId) {
				const fkItem = lookupMap.get(fkId);
				e[nameField] = fkItem ? resolveFkLabel(fk, fkItem) : fkId;
			}
		}
		return e as Resolved<TQuery>;
	}) as Resolved<TQuery>[];

	// Enrich form fields with tree parent + FK dropdown options
	const treeOpts = cfg.treeField
		? buildTreeOptions(treeItems, editing?.id as string | undefined, cfg.treeField)
		: undefined;
	const treeFieldEntry =
		treeOpts && cfg.treeField
			? [{ name: cfg.treeField, label: "Parent", type: "combobox" as const, options: treeOpts }]
			: [];
	const formFields = [...cfg.fields, ...treeFieldEntry].map((f) => {
		if (f.type !== "select" || f.options) return f;
		const fk = fkSources.find((s) => s.field === f.name);
		if (!fk) return f;
		const lm = fkLookup.get(fk.field);
		const opts = lm
			? [...lm.entries()].map(([value, item]) => ({
					value,
					label: fk.formatLabel ? fk.formatLabel(item) : String(item.nama ?? value),
				}))
			: [];
		return { ...f, type: "combobox" as const, options: opts };
	});

	// FK options for filter toolbar — keyed by FK field name
	const fkOptions: Record<string, { value: string; label: string }[]> = {};
	for (let i = 0; i < fkSources.length; i++) {
		const fk = fkSources[i];
		const lm = fkLookup.get(fk.field);
		fkOptions[fk.field] = lm
			? [...lm.entries()].map(([value, item]) => ({
					value,
					label: fk.formatLabel ? fk.formatLabel(item) : String(item.nama ?? value),
				}))
			: [];
	}

	return { resolvedItems, formFields, fkOptions };
}
