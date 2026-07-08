"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { EntityConfig } from "@/config/master-config";
import { api } from "@/lib/api/client";
import { buildTreeOptions } from "@/lib/master/tree-utils";

interface UseMasterTableOpts {
  cfg: EntityConfig;
  listData: Record<string, unknown>[] | undefined;
  treeItems: Record<string, unknown>[];
  editing: Record<string, unknown> | null;
}

/**
 * Orchestrates FK source queries, lookup maps, resolved table items,
 * and enriched form fields for a master entity CRUD page.
 */
export function useMasterTable({ cfg, listData, treeItems, editing }: UseMasterTableOpts) {
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

  // Build FK lookup map: field → Map<id, item>
  const fkLookup = useMemo(() => {
    const map = new Map<string, Map<string, Record<string, unknown>>>();
    const allData = [
      fkQ1.data as Record<string, unknown>[] | undefined,
      fkQ2.data as Record<string, unknown>[] | undefined,
      fkQ3.data as Record<string, unknown>[] | undefined,
    ];
    for (let i = 0; i < fkSources.length; i++) {
      const data = allData[i] ?? [];
      const m = new Map<string, Record<string, unknown>>();
      for (const item of data) m.set(String(item.$id), item);
      map.set(fkSources[i]?.field, m);
    }
    return map;
  }, [fkSources, fkQ1.data, fkQ2.data, fkQ3.data]);

  // Resolve FK display names + tree parent name in table items
  const resolvedItems = useMemo(
    () =>
      (Array.isArray(listData) ? listData : []).map((item) => {
        const e = { ...item };
        if (cfg.treeField) {
          const pid = String(item[cfg.treeField] ?? "");
          e._parentName = pid
            ? String((Array.isArray(treeItems) ? treeItems : []).find((x) => String(x.$id) === pid)?.nama ?? pid)
            : "";
        }
        for (const fk of fkSources) {
          const fkId = String(item[fk.field] ?? "");
          const nameField = `_${fk.field.replace("Id", "")}Name`;
          const lookupMap = fkLookup.get(fk.field);
          if (lookupMap && fkId) e[nameField] = String(lookupMap.get(fkId)?.nama ?? fkId);
        }
        return e;
      }),
    [listData, treeItems, cfg.treeField, fkSources, fkLookup],
  );

  // Enrich form fields with tree parent + FK dropdown options
  const formFields = useMemo(() => {
    let ff = [...cfg.fields];
    if (cfg.treeField) {
      const opts = buildTreeOptions(treeItems, editing?.$id as string | undefined, cfg.treeField);
      ff = [...ff, { name: cfg.treeField, label: "Parent", type: "select" as const, options: opts }];
    }
    return ff.map((f) => {
      if (f.type !== "select" || f.options) return f;
      const fk = fkSources.find((s) => s.field === f.name);
      if (!fk) return f;
      const lm = fkLookup.get(fk.field);
      const opts = lm ? [...lm.entries()].map(([value, item]) => ({ value, label: String(item.nama ?? value) })) : [];
      return { ...f, options: opts };
    });
  }, [cfg.fields, cfg.treeField, treeItems, editing, fkSources, fkLookup]);

  return { resolvedItems, formFields };
}
