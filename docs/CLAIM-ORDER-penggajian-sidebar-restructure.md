# Claim Order: Penggajian Sidebar Menu Restructure

> **Issue:** kepegawaian-fe-2k2y
> **Status:** Ready for implementation
> **Created:** 2026-09-02

## Overview

Restructure the Penggajian sidebar menu to have two collapsible sub-groups (Setting + Proses Batch) and convert the batch workflow phases into standalone pages with period-based filtering.

## Decisions Made

| Aspect | Decision |
|--------|----------|
| Structure | Two collapsible sub-groups: "Setting" + "Proses Batch" |
| Process steps | Separate standalone pages (no batch ID dependency) |
| Proses Gaji (01) filter | Text input (period) + status select |
| Phases 02-04 filters | Year + month comboboxes + search (name/NIPAM) |
| Sub-groups display | Collapsible sub-headers, default open |
| Menu labels | Match image: "Setting Komponen Gaji", "01. Proses Gaji Bulanan", etc. |
| Icons | Gear for Setting, List for Proses Batch |
| Routes | Flat under /penggajian/ |
| Batch creation | On Proses Gaji page only |
| Phase 02-04 buttons | Verifikasi + Proses Ulang (hidden when no batch) |
| Existing pages | Remove batch list and detail layout |
| Empty state | "Belum ada proses gaji untuk periode ini" |
| Proses Ulang | Backend decides rollback target |
| Batch info | Top of each phase page when batch exists |

## Implementation Steps

### Step 1: Update Sidebar Menu Structure
- [ ] Modify `src/components/app-shell.tsx`
- [ ] Add collapsible sub-headers for "Setting" and "Proses Batch"
- [ ] Update menu items with new labels and icons
- [ ] Set both groups to default open

### Step 2: Remove Existing Batch Pages
- [ ] Delete `src/app/(app)/penggajian/batch/page.tsx`
- [ ] Delete `src/app/(app)/penggajian/batch/[id]/layout.tsx`
- [ ] Delete `src/app/(app)/penggajian/batch/[id]/` directory

### Step 3: Create New Phase Pages
- [ ] Create `/penggajian/proses-gaji/page.tsx` (01)
- [ ] Create `/penggajian/verifikasi/page.tsx` (02)
- [ ] Create `/penggajian/tambahan/page.tsx` (03)
- [ ] Create `/penggajian/persetujuan/page.tsx` (04)

### Step 4: Implement Proses Gaji Page (01)
- [ ] Add text input filter for period
- [ ] Add status select filter
- [ ] Add "Buat Proses Gaji Baru" button
- [ ] Implement batch creation dialog
- [ ] Display batch info at top when batch exists

### Step 5: Implement Phase Pages (02-04)
- [ ] Add year combobox filter
- [ ] Add month combobox filter
- [ ] Add search input for name/NIPAM
- [ ] Add Verifikasi button (hidden when no batch)
- [ ] Add Proses Ulang button (hidden when no batch)
- [ ] Implement empty state message
- [ ] Display batch info at top when batch exists

### Step 6: Update RBAC Gates
- [ ] Update permission gates for new menu structure
- [ ] Ensure Setting items use `penggajian.setup` permission
- [ ] Ensure Proses Batch items use per-phase permissions

### Step 7: Testing & Validation
- [ ] Test sidebar menu with sub-groups
- [ ] Test all filters on each page
- [ ] Test batch creation flow
- [ ] Test Verifikasi and Proses Ulang buttons
- [ ] Test empty states
- [ ] Test RBAC permissions
- [ ] Run `bun run build` to verify no errors

## Dependencies

- Backend must support period-based batch lookup (year+month instead of batch ID)
- Backend `PATCH /penggajian/batch/{id}/reprocess` endpoint must handle rollback logic

## References

- [CONTEXT-MAP.md](../CONTEXT-MAP.md) - Core glossary and conventions
- [docs/context/penggajian.md](../context/penggajian.md) - Penggajian module context
- [ADR-0016](../adr/0016-penggajian-sub-modul-rbac-workflow.md) - Penggajian RBAC workflow
