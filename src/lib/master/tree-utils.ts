/**
 * Compute all descendant IDs (subtree) starting from startId.
 * Used to disable self + descendants in the parent picker to prevent cycles.
 */
export function computeSubtreeIds(items: Record<string, unknown>[], startId: string, pf: string): Set<string> {
  const ids = new Set([startId]);
  for (const i of items)
    if (String(i[pf] ?? "") === startId) {
      for (const id of computeSubtreeIds(items, String(i.id), pf)) ids.add(id);
    }
  return ids;
}

/**
 * Build a flat tree option list with indentation for the parent picker.
 * Disables the subtree of the currently-edited node to prevent cycles.
 */
export function buildTreeOptions(
  items: Record<string, unknown>[],
  editingId: string | undefined,
  pf: string,
): { value: string; label: string; disabled: boolean }[] {
  const excluded = editingId ? computeSubtreeIds(items, editingId, pf) : new Set<string>();
  const out: { value: string; label: string; disabled: boolean }[] = [
    { value: "", label: "Tanpa parent (root)", disabled: false },
  ];
  const add = (pid: string, d: number) => {
    for (const i of items
      .filter((x) => String(x[pf] ?? "") === pid)
      .sort((a, b) => String(a.nama ?? "").localeCompare(String(b.nama ?? "")))) {
      const id = String(i.id);
      out.push({
        value: id,
        label: "\u00A0\u00A0".repeat(d) + String(i.nama ?? ""),
        disabled: excluded.has(id),
      });
      add(id, d + 1);
    }
  };
  add("", 0);
  return out;
}
