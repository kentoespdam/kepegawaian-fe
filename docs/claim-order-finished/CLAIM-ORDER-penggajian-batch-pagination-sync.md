# Claim Order: Sync Batch List Response ke Paginated

> Issue: `kepegawaian-fe-d3cb`
> Status: ✅ Done
> Scope: Type sync — pola existing `fromPage()` + `DataTablePagination`

## Context

API update mengubah response type batch list dari flat list ke paginated:
- `ListResultGajiBatchRootResponse` (`Envelope<GajiBatchRootResponse[]>`) → **dihapus**
- `PageGajiBatchRootResponse` (`Page<GajiBatchRootResponse>`) → **baru**
- `PageResultPageGajiBatchRootResponse` (`PageEnvelope<GajiBatchRootResponse>`) → **baru**

`BatchSearchParams` juga berubah: `gajiBatchRootId` & `pegawaiId` dihapus, `search` ditambah.

## Referensi

- Pola existing: `src/app/(app)/master/master-client.tsx` (fromPage + DataTablePagination)
- Paging utility: `src/lib/paging.ts` — `fromPage()`, `toApiParams()`
- Pagination component: `src/components/data-table-pagination.tsx`

## Claim Order (urutan eksekusi)

### Step 1: Regenerate types
- [x] `node docs/api/extract-types.js` — sudah dijalankan saat grilling
- Verifikasi: `src/types/penggajian/batch.ts` berisi `PageGajiBatchRootResponse` & `PageResultPageGajiBatchRootResponse`

### Step 2: Update `useBatchList` hook
- [x] `src/hooks/penggajian/useBatchList.ts`
- [x] Return type: `useQuery<Page<GajiBatchRootResponse>>` (bukan `GajiBatchRootResponse[]`)
- [x] Import `Page` dari `@/lib/api/types`
- [x] Update `useBatchList.test.tsx` — mock response shape ke Page object

### Step 3: Update `proses-gaji-client.tsx`
- [x] Import `fromPage` dari `@/lib/paging`
- [x] Import `DataTablePagination` dari `@/components/data-table-pagination`
- [x] Ganti `rows = (list.data ?? []) as GajiBatchRootResponse[]` → `pageView = fromPage(list.data); rows = pageView.rows`
- [x] Tambah `pagination={<DataTablePagination ... />}` ke DataTable
- [x] Update "Menampilkan X batch" → "Menampilkan X dari Y batch"

### Step 4: Update 3 fase clients (satu pattern)
- [x] `persetujuan-client.tsx` — `batches?.[0]` → `batches?.content?.[0]`
- [x] `tambahan-client.tsx` — sama
- [x] `verifikasi-client.tsx` — sama

### Step 5: Update test mocks
- [x] `proses-gaji-client.test.tsx` — wrap mock data di `asPage()` helper
- [x] `tambahan-client.test.tsx` — wrap mock data di `asPage()` helper
- [x] `persetujuan-client.test.tsx` — wrap mock data di `asPage()` helper
- [x] `verifikasi-client.test.tsx` — wrap mock data di `asPage()` helper
- [x] `useBatchList.test.tsx` — update mock response shape ke Page object

### Step 6: Verifikasi
- [x] `bun run test` — all 259 tests green (42 files)
- [x] `bun run build` — zero error
