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

> **Status:** ✅ SELESAI 2026-09-06. Semua step dikerjakan di sesi sebelumnya (komit
> penggajian sidebar restructure) dan diverifikasi pada sesi ini.

### Step 1: Update Sidebar Menu Structure
- [x] Modify `src/components/app-shell.tsx`
- [x] Add collapsible sub-headers for "Setting" and "Proses Batch"
- [x] Update menu items with new labels and icons
- [x] Set both groups to default open

### Step 2: Remove Existing Batch Pages
- [x] Delete `src/app/(app)/penggajian/batch/page.tsx`
- [x] Delete `src/app/(app)/penggajian/batch/[id]/layout.tsx`
- [x] Delete `src/app/(app)/penggajian/batch/[id]/` directory

### Step 3: Create New Phase Pages
- [x] Create `/penggajian/proses-gaji/page.tsx` (01)
- [x] Create `/penggajian/verifikasi/page.tsx` (02)
- [x] Create `/penggajian/tambahan/page.tsx` (03)
- [x] Create `/penggajian/persetujuan/page.tsx` (04)

### Step 4: Implement Proses Gaji Page (01)
- [x] Add filter for period (via shared `PeriodeSelect` year+month combobox, bukan text input)
- [x] Add status select filter
- [x] Add "Buat Proses Gaji Baru" button
- [x] Implement batch creation dialog
- [x] Display batch list + info (periode, status, total pegawai) saat batch ada

### Step 5: Implement Phase Pages (02-04)
- [x] Add year combobox filter (`PeriodeSelect`)
- [x] Add month combobox filter (`PeriodeSelect`)
- [x] Add search input for name/NIPAM (di `PegawaiOrganisasiTable`, client-side)
- [x] Add Verifikasi button (disabled saat tidak ada batch)
- [x] Add Proses Ulang button (disabled saat tidak ada batch)
- [x] Implement empty state message ("Belum ada proses gaji untuk periode ini")
- [x] Display batch info at top (status badge + total pegawai di toolbar)

### Step 6: Update RBAC Gates
- [x] Update permission gates for new menu structure
- [x] Ensure Setting items use `penggajian.setup` permission
- [x] Ensure Proses Batch items use per-phase permissions (`verify1`/`tambahan`/`approve`)

### Step 7: Testing & Validation
- [x] Test sidebar menu with sub-groups
- [x] Test all filters on each page
- [x] Test batch creation flow
- [x] Test Verifikasi and Proses Ulang buttons
- [x] Test empty states
- [x] Test RBAC permissions
- [x] Run `bun run build` to verify no errors

## Catatan Sesi Finalisasi (2026-09-06)

- **Batch info card**: komponen `_components/batch-info-card.tsx` ternyata **tidak dipakai**
  (dead code) — toolbar phase pages sudah menampilkan status badge + total pegawai. Komponen
  dihapus (ponytail: deletion over addition).
- **Deviations dari spec awal** (semua sudah diverifikasi sesuai kebutuhan aktual):
  - Proses Gaji (01) pakai `PeriodeSelect` (year+month combobox) menggantikan text input period —
    konsisten dengan phase pages lain, reuse komponen bersama.
  - Tombol Verifikasi/Proses Ulang **disabled** (bukan hidden) saat tidak ada batch — state
    kosong tetap ditampilkan.
- **Verifikasi sesi ini**: `bunx biome check` ✓ · `bun run test` 327/327 ✓ · `bun run build` ✓.

## Dependencies

- Backend must support period-based batch lookup (year+month instead of batch ID)
- Backend `PATCH /penggajian/batch/{id}/reprocess` endpoint must handle rollback logic

## References

- [CONTEXT-MAP.md](../CONTEXT-MAP.md) - Core glossary and conventions
- [docs/context/penggajian.md](../context/penggajian.md) - Penggajian module context
- [ADR-0016](../adr/0016-penggajian-sub-modul-rbac-workflow.md) - Penggajian RBAC workflow
