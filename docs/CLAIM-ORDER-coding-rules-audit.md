# CLAIM-ORDER: Coding Rules Audit — Ekstrak Logic, Konsolidasi Hooks, Split File

**Epic:** `kepegawaian-fe-5tvj` (open)
**Audit:** 2026-09-01 (ponytail-audit)
**Tujuan:** Perbaiki violation coding-rules §2.3 (separasi logic/presentasi), §2.2 (ukuran file), §5.1 (query key factory), dan hapus dead code.

---

## Overview

Ponytail-audit seluruh `src/` terhadap `docs/design/coding-rules.md` menemukan **14 finding** dengan potongan bersih **~2,800 lines**, **-8 deps**, dan **-15 hardcoded query key arrays**. Temuan terbesar: logic fetch/mutation hidup di dalam komponen (§2.3), file melebihi ceiling ukuran (§2.2), dan query key factory tidak lengkap (§5.1).

---

## Claim Order (Step-by-Step)

### Phase 1: Konsolidasi Hooks Duplikat ✅→○

> **Target:** Hapus duplikasi useAllRoles + useAllPermissions.
> **Issue:** `kepegawaian-fe-nj1q` (open)
> **Estimasi:** ~30 menit

- [ ] **Step 1.1:** Baca `src/app/(app)/sistem/roles/roles-client.tsx` (line 103-130) dan `src/app/(app)/sistem/users/users-client.tsx` (line 38-50)
- [ ] **Step 1.2:** Buat `src/hooks/useSystemRoles.ts` — return `useQuery({ queryKey: systemKeys.roles.all(), ... })`
- [ ] **Step 1.3:** Buat `src/hooks/useSystemPermissions.ts` — return `useQuery({ queryKey: systemKeys.permissions(), ... })`
- [ ] **Step 1.4:** Update `roles-client.tsx` — hapus `useAllRoles()` + `useAllPermissions()`, import dari hooks
- [ ] **Step 1.5:** Update `users-client.tsx` — hapus `useAllRoles()`, import dari hooks. Konsolidasi queryKey ke `systemKeys.roles.all()` (satu fetch, satu cache)
- [ ] **Step 1.6:** `bun run build` — zero error ✅
- [ ] **Step 1.7:** `bunx biome check` — zero lint error ✅
- [ ] **Step 1.8:** `bd close kepegawaian-fe-nj1q` ✅

**Files berubah:**
| File | Action |
|------|--------|
| `src/hooks/useSystemRoles.ts` | **BARU** |
| `src/hooks/useSystemPermissions.ts` | **BARU** |
| `src/app/(app)/sistem/roles/roles-client.tsx` | Hapus 2 inline hooks, import dari hooks |
| `src/app/(app)/sistem/users/users-client.tsx` | Hapus 1 inline hook, import dari hooks |

---

### Phase 2: Lengkapi Penggajian Query Key Factory ✅→○

> **Target:** Ganti 18+ hardcoded `["penggajian", ...]` arrays dengan factory.
> **Issue:** `kepegawaian-fe-sv2r` (open)
> **Estimasi:** ~45 menit

- [ ] **Step 2.1:** Baca `src/hooks/keys/penggajian-keys.ts` — hanya 2 keys (batch.all, batch.detail)
- [ ] **Step 2.2:** Lengkapi factory dengan keys: `batch.master`, `batch.pegawai`, `batch.pegawaiProses`, `batch.detailById`, `setup.all`, `setup.profil`, `setup.profilList`, `setup.komponen`, `level.list`
- [ ] **Step 2.3:** Ganti 7 hardcoded arrays di `komponen-client.tsx`
- [ ] **Step 2.4:** Ganti 4 hardcoded arrays di `tambahan-client.tsx`
- [ ] **Step 2.5:** Ganti 2 hardcoded arrays di `verifikasi-1-client.tsx`
- [ ] **Step 2.6:** Ganti 2 hardcoded arrays di `setting-client.tsx`
- [ ] **Step 2.7:** Ganti 3 hardcoded arrays di `persetujuan-client.tsx`
- [ ] **Step 2.8:** Ganti 1 hardcoded array di `tunjangan-client.tsx`
- [ ] **Step 2.9:** `bun run build` — zero error ✅
- [ ] **Step 2.10:** `bunx biome check` — zero lint error ✅
- [ ] **Step 2.11:** `bd close kepegawaian-fe-sv2r` ✅

**Files berubah:**
| File | Action |
|------|--------|
| `src/hooks/keys/penggajian-keys.ts` | Tambah 9+ key methods |
| 6 penggajian component files | Ganti inline arrays → factory |

---

### Phase 3: Ekstrak Page-Level Hooks (10+ page.tsx) ✅→○

> **Target:** Pindahkan useQuery/useMutation dari page.tsx ke hooks terpisah.
> **Issue:** `kepegawaian-fe-02sj` (open)
> **Estimasi:** ~3 jam (11 page files)

**Sub-phase 3A: Pendukung pages (6 files) — ~1.5 jam**

- [ ] **Step 3A.1:** Buat `src/hooks/useKeluargaTable.ts` — extract dari `keluarga/page.tsx`
- [ ] **Step 3A.2:** Buat `src/hooks/useKeahlianTable.ts` — extract dari `keahlian/page.tsx`
- [ ] **Step 3A.3:** Buat `src/hooks/usePendidikanTable.ts` — extract dari `pendidikan/page.tsx`
- [ ] **Step 3A.4:** Buat `src/hooks/usePelatihanTable.ts` — extract dari `pelatihan/page.tsx`
- [ ] **Step 3A.5:** Buat `src/hooks/useKartuIdentitasTable.ts` — extract dari `kartu-identitas/page.tsx`
- [ ] **Step 3A.6:** Buat `src/hooks/usePengalamanKerjaTable.ts` — extract dari `pengalaman-kerja/page.tsx`
- [ ] **Step 3A.7:** Update 6 page.tsx → panggil hook, render thin

**Sub-phase 3B: Riwayat pages (5 files) — ~1.5 jam**

- [ ] **Step 3B.1:** Buat `src/hooks/useKontrakTable.ts` — extract dari `kontrak/page.tsx`
- [ ] **Step 3B.2:** Buat `src/hooks/useSkTable.ts` — extract dari `sk/page.tsx`
- [ ] **Step 3B.3:** Buat `src/hooks/useSpTable.ts` — extract dari `sp/page.tsx`
- [ ] **Step 3B.4:** Buat `src/hooks/useMutasiTable.ts` — extract dari `mutasi/page.tsx`
- [ ] **Step 3B.5:** Buat `src/hooks/useCutiTable.ts` — extract dari `cuti/page.tsx`
- [ ] **Step 3B.6:** Update 5 page.tsx → panggil hook, render thin

**Verification:**

- [ ] **Step 3C.1:** Semua 11 page.tsx <80 lines
- [ ] **Step 3C.2:** Semua 11 hook files <150 lines
- [ ] **Step 3C.3:** `bun run build` — zero error ✅
- [ ] **Step 3C.4:** `bunx biome check` — zero lint error ✅
- [ ] **Step 3C.5:** `bun run test` — all pass ✅
- [ ] **Step 3C.6:** `bd close kepegawaian-fe-02sj` ✅

---

### Phase 4: Split 5 Oversized Files ✅→○

> **Target:** Kurangi 5 files dari >300 lines menjadi <300 lines.
> **Issue:** `kepegawaian-fe-yo96` (open)
> **Depends on:** Phase 1 (useAllRoles consolidated) untuk users-client.tsx
> **Estimasi:** ~2.5 jam

- [ ] **Step 4.1:** `role-permission-dialog.tsx` (620→~200) — extract `PermissionGroup` component + `useRolePermissions` hook
- [ ] **Step 4.2:** `mutasi-form-sheet.tsx` (608→~200) — extract `useMutasiFormOptions` hook + `useRiwayatDetail` hook
- [ ] **Step 4.3:** `users-client.tsx` (477→~150) — extract `CreateUserDialog` + `RoleAssignmentDialog` + `useSystemUsers` hook (depends on Phase 1)
- [ ] **Step 4.4:** `komponen-client.tsx` (523→~200) — extract `KomponenPanel` + `ProfilGajiPanel` + `useKomponenForm` hook
- [ ] **Step 4.5:** `sp-form-sheet.tsx` (484→~200) — extract `useSpFormQueries` hook + inline derived state
- [ ] **Step 4.6:** `bun run build` — zero error ✅
- [ ] **Step 4.7:** `bunx biome check` — zero lint error ✅
- [ ] **Step 4.8:** `bun run test` — all pass ✅
- [ ] **Step 4.9:** `bd close kepegawaian-fe-yo96` ✅

---

### Phase 5: Cleanup + Derived State ✅→○

> **Target:** Hapus use-mobile.ts + fix useEffect derived state.
> **Issue:** `kepegawaian-fe-6xc0` (open)
> **Estimasi:** ~30 menit

- [ ] **Step 5.1:** Grep consumers `use-mobile.ts` — hapus file + import
- [ ] **Step 5.2:** Fix `kuota-form-sheet.tsx` — ganti useEffect derived state → inline
- [ ] **Step 5.3:** Fix `data-pegawai-toolbar.tsx` — ganti useEffect derived state → inline
- [ ] **Step 5.4:** Fix `sp-form-sheet.tsx` — ganti useEffect derived state → inline
- [ ] **Step 5.5:** `bun run build` — zero error ✅
- [ ] **Step 5.6:** `bunx biome check` — zero lint error ✅
- [ ] **Step 5.7:** `bd close kepegawaian-fe-6xc0` ✅

---

### Phase 6: Split _shared.ts ✅→○

> **Target:** Split monolithic types file (633 lines) per-domain.
> **Issue:** `kepegawaian-fe-rlx2` (open)
> **Estimasi:** ~1 jam

- [ ] **Step 6.1:** Grep semua import dari `_shared.ts` di src/
- [ ] **Step 6.2:** Buat `_shared/auth.ts` — authentication types
- [ ] **Step 6.3:** Buat `_shared/master.ts` — master entity base types
- [ ] **Step 6.4:** Buat `_shared/enums.ts` — enum types
- [ ] **Step 6.5:** Buat `_shared/api.ts` — API envelope types
- [ ] **Step 6.6:** Update semua imports ke sub-path baru
- [ ] **Step 6.7:** _shared.ts jadi re-export barrel (gradual cleanup)
- [ ] **Step 6.8:** `bun run build` — zero error ✅
- [ ] **Step 6.9:** `bunx biome check` — zero lint error ✅
- [ ] **Step 6.10:** `bd close kepegawaian-fe-rlx2` ✅

---

### Final Verification ✅→○

> **Issue:** `kepegawaian-fe-5tvj` (epic, close last)

- [ ] **Step 7.1:** `bun run build` — zero error ✅
- [ ] **Step 7.2:** `bunx biome check` — zero lint error ✅
- [ ] **Step 7.3:** `bun run test` — all pass ✅
- [ ] **Step 7.4:** `npx gitnexus analyze` — reindex ✅
- [ ] **Step 7.5:** `bd close kepegawaian-fe-5tvj` (epic) ✅

---

## Dependency Graph

```
Phase 1 (useAllRoles) ─────┐
                            ├── Phase 4 (split oversized files)
Phase 2 (penggajian keys) ─┤
                            │
Phase 3 (page hooks) ──────┤
                            │
Phase 5 (cleanup) ─────────┤
                            │
Phase 6 (_shared split) ───┘
                            │
                        Phase 7 (final verify)
```

Phase 1, 2, 3, 5, 6 bisa jalan **paralel**. Phase 4 depends on Phase 1 (untuk users-client.tsx). Phase 7 menunggu semua selesai.

---

## Files Changed (Summary)

| Phase | New Files | Modified Files | Deleted Files |
|-------|-----------|----------------|---------------|
| 1 | 2 hooks | 2 component files | 0 |
| 2 | 0 | 7 files (keys + 6 consumers) | 0 |
| 3 | 11 hooks | 11 page.tsx files | 0 |
| 4 | 8 components + 5 hooks | 5 oversized files | 0 |
| 5 | 0 | 4 files | 1 (use-mobile.ts) |
| 6 | 4 type files | 1 barrel + N consumers | 0 |
| **Total** | **~25 new** | **~29 modified** | **1 deleted** |

---

## Final Metrics

| Metric | Sebelum | Sesudah | Delta |
|--------|---------|---------|-------|
| Inline logic di page.tsx | 11 files | 0 | **-11** |
| Inline mutations di components | 5+ files | 0 | **-5+** |
| Files >300 lines | 5 files | 0 | **-5** |
| Duplicate hooks | 2 (useAllRoles) | 0 | **-2** |
| Hardcoded query key arrays | 18+ | 0 | **-18+** |
| Monolithic _shared.ts | 633 lines | <200 lines | **-433 lines** |
| use-mobile.ts | 1 (dead) | 0 | **-1 file** |
| useEffect for derived state | 6 occurrences | 0 | **-6** |
| **Net** | | | **~-2,800 lines, -1 file, -8 deps** |
