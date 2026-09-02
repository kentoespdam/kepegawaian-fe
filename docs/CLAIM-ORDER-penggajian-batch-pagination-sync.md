# Claim Order: Sync Batch List Response ke Paginated

> Issue: `kepegawaian-fe-d3cb`
> Status: Ready for agent
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
- [ ] `src/hooks/penggajian/useBatchList.ts`
- [ ] Return type: `useQuery<Page<GajiBatchRootResponse>>` (bukan `GajiBatchRootResponse[]`)
- [ ] Import `Page` dari `@/lib/api/types`
- [ ] Update `useBatchList.test.tsx` — mock response shape ke Page object

### Step 3: Update `proses-gaji-client.tsx`
- [ ] Import `fromPage` dari `@/lib/paging`
- [ ] Import `DataTablePagination` dari `@/components/data-table-pagination`
- [ ] Ganti `rows = (list.data ?? []) as GajiBatchRootResponse[]` → `pageView = fromPage(list.data); rows = pageView.rows`
- [ ] Tambah `pagination={<DataTablePagination ... />}` ke DataTable
- [ ] Update "Menampilkan X batch" → "Menampilkan X dari Y batch"

### Step 4: Update 3 fase clients (satu pattern)
- [ ] `persetujuan-client.tsx` — `batches?.[0]` → `batches?.content?.[0]`
- [ ] `tambahan-client.tsx` — sama
- [ ] `verifikasi-client.tsx` — sama

### Step 5: Update test mocks
- [ ] `proses-gaji-client.test.tsx` — wrap mock data di `asPage()` helper

### Step 6: Verifikasi
- [ ] `bun run test` — all green
- [ ] `bun run build` — zero error
