# CLAIM-ORDER: Penggajian Ikuti Pola Entity Master

**Epic:** `kepegawaian-fe-e40w` ✅ CLOSED
**Grilling:** 2026-09-01 (ponytail-audit)
**Selesai:** 2026-09-01
**Tujuan:** Refactor modul Penggajian agar mengikuti pola entity Master — lebih sedikit kode, lebih konsisten, lebih mudah maintain.

---

## Overview

Modul **Master** sudah mature: config-driven (`EntityConfig` + `makeConfig`), generic CRUD hook (`useResource`), single API client (`client.ts`), centralized columns, shared `CrudForm`. Modul **Penggajian** masih ad-hoc: raw `fetch`, inline mutations, duplicate API client, inline columns, duplicated UI.

Audit menemukan **~300 lines** yang bisa dikonsolidasi dan **5 file** yang bisa dihapus.

---

## Claim Order (Step-by-Step)

### Phase 1: API Client Unification ✅

> **Target:** Hapus duplikasi API client, buat single factory.
> **Status:** DONE — `kepegawaian-fe-e40w.1` closed.

- [x] **Step 1.1:** Baca `src/lib/api/client.ts` dan `src/lib/api/penggajian-client.ts`
- [x] **Step 1.2:** Extract `createApiClient(baseUrl)` factory di `client.ts` yang return `{ list, listAll, listBy, create, update, remove }`
- [x] **Step 1.3:** Update `penggajian-client.ts` → `import { createApiClient, handle } from "./client"` + spread baseClient
- [x] **Step 1.4:** Hapus `getById` dari `client.ts` (zero consumers, zero tests)
- [x] **Step 1.5:** `bun run build` — zero error ✅
- [x] **Step 1.6:** `bunx biome check` — zero lint error ✅
- [x] **Step 1.7:** `bun run test` — 260/260 pass ✅
- [x] **Step 1.8:** `bd close kepegawaian-fe-e40w.1` ✅

**Catatan:** `listBy` tetap dipertahankan (4 call sites + tests). `getUrut` tetap dipertahankan (1 consumer: `useKomponenForm`). `listKode` tetap dipertahankan (1 consumer).

---

### Phase 2: Resource Hook Unification ✅

> **Target:** Hapus `usePenggajianResource`, parameterize `useResource`.
> **Status:** DONE — `kepegawaian-fe-e40w.2` closed.

- [x] **Step 2.1:** Baca `src/hooks/useResource.ts` dan `src/hooks/penggajian/usePenggajianResource.ts`
- [x] **Step 2.2:** Grep identifikasi 3 consumer `usePenggajianResource`
- [x] **Step 2.3:** Tambah optional `apiClient` + `keyPrefix` params ke `useResource`
- [x] **Step 2.4:** Update 3 consumer → `useResource(entity, params, penggajianApi, ["penggajian"])`
- [x] **Step 2.5:** Hapus `src/hooks/penggajian/usePenggajianResource.ts`
- [x] **Step 2.6:** `useBatchList` tetap dipertahankan (query key structure beda + `batchKeys` export dipakai 3 mutation hooks)
- [x] **Step 2.7:** `bun run build` — zero error ✅
- [x] **Step 2.8:** `bunx biome check` — zero lint error ✅
- [x] **Step 2.9:** `bun run test` — 260/260 pass ✅
- [x] **Step 2.10:** `bd close kepegawaian-fe-e40w.2` ✅

---

### Phase 3: Delete Dead Hooks ✅

> **Target:** Hapus 3 one-off mutation hooks yang sudah punya general-purpose replacement.
> **Status:** DONE — `kepegawaian-fe-e40w.3` closed.

- [x] **Step 3.1:** Grep identifikasi consumer: `useVerify1` (1), `useCreateBatchMasterProses` (1), `useDeleteBatchMasterProses` (1)
- [x] **Step 3.2:** `useVerify1` → `useBatchAction(params.id, \`${params.id}/verify1\`)`
- [x] **Step 3.3:** `useCreateBatchMasterProses` → inline `useMutation` + `penggajianApi.create`
- [x] **Step 3.4:** `useDeleteBatchMasterProses` → inline `useMutation` + `penggajianApi.remove`
- [x] **Step 3.5:** Hapus 3 hook files + 4 test cases
- [x] **Step 3.6:** `bun run build` — zero error ✅
- [x] **Step 3.7:** `bunx biome check` — zero lint error ✅
- [x] **Step 3.8:** `bun run test` — 256/256 pass ✅
- [x] **Step 3.9:** `bd close kepegawaian-fe-e40w.3` ✅

---

### Phase 4: Extract Shared UI ✅

> **Target:** Deduplicate UI code, wire `EntityFormModal` container field.
> **Status:** DONE — `kepegawaian-fe-e40w.4` closed.

- [x] **Step 4.1:** Tambah `fmtRupiah` ke `src/lib/utils.ts` (wrapper atas `rupiah()`)
- [x] **Step 4.2:** Update import di `persetujuan-client.tsx`, `tambahan-client.tsx`, `verifikasi-1-client.tsx`
- [x] **Step 4.3:** `PegawaiGroupedList` — skipped (rendering logic beda antar halaman, premature extraction)
- [x] **Step 4.4:** Wire `EntityFormModal` container: `FormContainer` helper baca `cfg.container`
- [x] **Step 4.5:** `bun run build` — zero error ✅
- [x] **Step 4.6:** `bunx biome check` — zero lint error ✅
- [x] **Step 4.7:** `bun run test` — 256/256 pass ✅
- [x] **Step 4.8:** `bd close kepegawaian-fe-e40w.4` ✅

---

### Final Verification ✅

> **Status:** DONE — `kepegawaian-fe-e40w` (epic) closed.

- [x] **Step 5.1:** `bun run build` — zero error ✅
- [x] **Step 5.2:** `bunx biome check` — zero lint error ✅
- [x] **Step 5.3:** `bun run test` — 256/256 pass ✅
- [x] **Step 5.4:** `bd close kepegawaian-fe-e40w` (epic) ✅

---

## Files Changed

| File | Action | Phase |
|------|--------|-------|
| `src/lib/api/client.ts` | Extract `createApiClient` factory, export `handle`, remove `getById` | 1 |
| `src/lib/api/penggajian-client.ts` | Replace with `createApiClient` + spread, keep `listKode`+`getUrut` | 1 |
| `src/hooks/useResource.ts` | Add optional `apiClient` + `keyPrefix` params | 2 |
| `src/hooks/penggajian/usePenggajianResource.ts` | **DELETED** | 2 |
| `src/hooks/penggajian/useVerify1.ts` | **DELETED** | 3 |
| `src/hooks/penggajian/useCreateBatchMasterProses.ts` | **DELETED** | 3 |
| `src/hooks/penggajian/useDeleteBatchMasterProses.ts` | **DELETED** | 3 |
| `src/lib/utils.ts` | Add `fmtRupiah` export | 4 |
| `src/app/(app)/master/entity-form-modal.tsx` | `FormContainer` helper, wire `cfg.container` | 4 |
| `src/app/(app)/penggajian/setup/potongan-tkk/potongan-tkk-client.tsx` | `useResource(penggajianApi)` | 2 |
| `src/app/(app)/penggajian/setup/lain-lain/parameter-setting-client.tsx` | `useResource(penggajianApi)` | 2 |
| `src/app/(app)/penggajian/setup/pendapatan-non-pajak/pendapatan-non-pajak-client.tsx` | `useResource(penggajianApi)` | 2 |
| `src/app/(app)/penggajian/batch/[id]/verifikasi-1/verifikasi-1-client.tsx` | `useBatchAction` replaces `useVerify1` | 3 |
| `src/app/(app)/penggajian/batch/[id]/tambahan/tambahan-client.tsx` | Inline mutations + import `fmtRupiah` | 3+4 |
| `src/app/(app)/penggajian/batch/[id]/persetujuan/persetujuan-client.tsx` | Import `fmtRupiah` | 4 |
| `src/hooks/penggajian/penggajian-hooks.test.tsx` | Remove 4 test cases | 3 |
| `src/app/(app)/penggajian/batch/[id]/tambahan/tambahan-client.test.tsx` | Remove mocks | 3 |

---

## Final Metrics

| Metric | Sebelum | Sesudah | Delta |
|--------|---------|---------|-------|
| API client files | 2 (copy-paste) | 1 factory + 1 re-export | **-1 file** |
| Resource hooks | 2 (identik) | 1 (parameterized) | **-1 file** |
| Dead hooks | 3 | 0 | **-3 files** |
| `fmtRupiah` definitions | 3 (inline) | 1 (utils.ts) | **-2 dup** |
| EntityFormModal string-match | 2 branches | 0 (config-driven) | **config-driven** |
| **Net** | | | **-5 files, ~195 lines** |
