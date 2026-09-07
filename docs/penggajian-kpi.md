# Penggajian — KPI: Claim Order & Implementation Plan

> Dibuat: 2026-09-07 | Status: ready-for-agent

## Konteks

Modul baru `penggajian/kpi` untuk mengelola data **Tunjangan Kinerja (tunkin)** dan **PPh 21 TER** per pegawai per periode.
Endpoint BE sudah tersedia. Fitur ini adalah **pre-proses gaji** — harus diisi sebelum "01. Proses Gaji Bulanan".

### Keputusan Desain (ADR)

| # | Keputusan | Nilai |
|---|-----------|-------|
| 1 | Label sidebar | `00. Input Data KPI` — di atas `01. Proses Gaji Bulanan` |
| 2 | Gate RBAC | `PENGGAJIAN_SETUP` (reuse dari Proses Gaji Bulanan) |
| 3 | Mode UI | Tabel paginasi + Upload Dialog (Excel) + Edit/Delete per baris |
| 4 | Filter periode | `<PeriodeSelect>` → format `YYYYMM` via `usePeriodeFilter` |
| 5 | Upload periode | Auto-fill dari filter aktif halaman (bukan picker terpisah di dialog) |
| 6 | Input NIPAM di form | Picker dialog inline (pola terminasi) — search pegawai aktif, ekstrak `nipam` |
| 7 | Format `tunkin` | Currency IDR (Rp) |
| 8 | Format `pph21Ter` | Currency IDR (Rp) — nominal potongan, bukan rate |

---

## Referensi Pola

| Pola | Referensi File |
|------|---------------|
| Upload dialog | `src/app/(app)/penggajian/tambahan/_components/upload-potongan-dialog.tsx` |
| Client component | `src/app/(app)/penggajian/tambahan/tambahan-client.tsx` |
| Periode filter | `src/components/periode-filter.tsx` + `src/hooks/usePeriodeFilter.ts` |
| Picker pegawai | `src/app/(app)/kepegawaian/terminasi/terminasi-form-sheet.tsx` + `src/hooks/useTerminasiForm.ts` |
| Sidebar entry | `src/components/app-shell.tsx` baris 108–182 |
| Query keys | `src/hooks/keys/penggajian-keys.ts` |
| API client | `src/lib/api/penggajian-client.ts` |

---

## Endpoints BE

| Method | Path | Keterangan |
|--------|------|-----------|
| `GET` | `/penggajian/kpi` | List paginated — query: `nipam`, `periode`, `page`, `size`, `sortBy`, `sortDirection` |
| `POST` | `/penggajian/kpi` | Create — body: `GajiKpiPostRequest` |
| `GET` | `/penggajian/kpi/{id}` | Detail by ID |
| `PUT` | `/penggajian/kpi/{id}` | Update — body: `GajiKpiPutRequest` |
| `DELETE` | `/penggajian/kpi/{id}` | Delete |
| `POST` | `/penggajian/kpi/upload?periode=YYYYMM` | Upload batch Excel — multipart `file` |
| `GET` | `/penggajian/kpi/template/download` | Download template Excel |
| `GET` | `/penggajian/kpi/list` | Semua data non-paginated — query: `nipam`, `periode` |

---

## Claim Order (Urutan Kerjakan)

### Step 1 — Types ✅ SUDAH ADA

File: `src/types/penggajian/kpi.ts` — sudah di-generate oleh `extract-types.js`.

Types yang tersedia: `GajiKpiResponse`, `GajiKpiPostRequest`, `GajiKpiPutRequest`,
`GajiKpiUploadResponse`, `KpiSearchParams`, `PageResultPageGajiKpiResponse`,
`SingleResultGajiKpiResponse`, `SingleResultGajiKpiUploadResponse`.

---

### Step 2 — Query Keys

**File:** `src/hooks/keys/penggajian-keys.ts`

Tambahkan section `kpi` ke object `penggajianKeys`:

```ts
kpi: {
  all: () => [...penggajianKeys.all, "kpi"],
  list: (params: KpiSearchParams) => [...penggajianKeys.kpi.all(), "list", params],
  detail: (id: number) => [...penggajianKeys.kpi.all(), "detail", id],
},
```

---

### Step 3 — API Client Extensions

**File:** `src/lib/api/penggajian-client.ts`

Tambahkan dua method ke `penggajianApi`:

```ts
uploadKpi: (file: File, periode: string) => {
  const form = new FormData();
  form.append("file", file);
  return fetch(`${BASE}/kpi/upload?periode=${periode}`, { method: "POST", body: form }).then(handle<SingleResultGajiKpiUploadResponse>);
},
downloadKpiTemplate: () => {
  window.location.href = `${BASE}/kpi/template/download`;
},
```

---

### Step 4 — Hook: useKpiList

**File (baru):** `src/hooks/penggajian/useKpiList.ts`

- Gunakan `usePeriodeFilter()` untuk `periode` (format `YYYYMM`)
- Gunakan URL param `?nipam=` untuk filter nipam
- Query key: `penggajianKeys.kpi.list(params)`
- Endpoint: `GET /api/proxy/penggajian/kpi?periode=&nipam=&page=&size=`
- `staleTime: 30_000`, `gcTime: 300_000`

---

### Step 5 — Hook: useKpiMutations

**File (baru):** `src/hooks/penggajian/useKpiMutations.ts`

Ekspor 4 hooks terpisah (pola ponytail — satu hook satu mutation):

| Hook | Mutation | On Success |
|------|----------|-----------|
| `useCreateKpi` | `POST /kpi` | `invalidateQueries(kpi.all)` + toast |
| `useUpdateKpi` | `PUT /kpi/{id}` | `invalidateQueries(kpi.all)` + toast |
| `useDeleteKpi` | `DELETE /kpi/{id}` | `invalidateQueries(kpi.all)` + toast |
| `useUploadKpi` | `POST /kpi/upload` | `invalidateQueries(kpi.all)` + toast ringkasan `{ inserted, updated }` |

---

### Step 6 — Config

**File (baru):** `src/config/penggajian/kpi.config.ts`

```ts
// Kolom tabel
export const KPI_COLUMNS: ColumnDef<GajiKpiResponse>[] = [
  { accessorKey: "nipam", header: "NIPAM" },
  { accessorKey: "periode", header: "Periode" },
  { accessorKey: "tunkin", header: "Tunjangan Kinerja",
    cell: ({ getValue }) => formatRupiah(getValue<number>()) },
  { accessorKey: "pph21Ter", header: "PPh 21 TER",
    cell: ({ getValue }) => formatRupiah(getValue<number>()) },
  // kolom actions (edit, delete)
];

// Zod schema untuk Create/Edit
export const kpiSchema = z.object({
  nipam: z.string().min(1, "NIPAM wajib diisi"),
  periode: z.string().min(6, "Periode wajib diisi"),  // YYYYMM
  tunkin: z.number({ required_error: "Tunjangan kinerja wajib diisi" }).positive(),
  pph21Ter: z.number().optional(),
});
```

---

### Step 7 — Upload Dialog

**File (baru):** `src/app/(app)/penggajian/kpi/_components/upload-kpi-dialog.tsx`

Ikuti pola `upload-potongan-dialog.tsx`:
- Props: `{ isOpen, onClose, periode: string }` — periode dari filter aktif, bukan picker sendiri
- Template download button → `penggajianApi.downloadKpiTemplate()`
- File input → FormData → `penggajianApi.uploadKpi(file, periode)`
- On success: toast ringkasan `"Berhasil upload {totalRows} baris — {inserted} baru, {updated} diperbarui"`
- On error: toast error dari `envelope.errors`

---

### Step 8 — Picker Pegawai (Inline di Form)

Ikuti pola `terminasi-form-sheet.tsx` + `useTerminasiForm.ts` (bukan komponen terpisah):

**State lokal di kpi-client.tsx atau hook useKpiForm:**
- `isPickerOpen: boolean`
- `searchQuery: string` (debounce 300ms, enabled >= 2 karakter)
- `selectedPegawai: PegawaiListResponse | null`

**Endpoint:** `GET /api/proxy/pegawai/list?search={query}&statusKerja=KARYAWAN_AKTIF`

**On select:** ekstrak hanya `nipam` → set ke RHF field `nipam`.

---

### Step 9 — Client Component

**File (baru):** `src/app/(app)/penggajian/kpi/kpi-client.tsx`

Struktur (maks ~120 baris, split jika lebih):

```
KpiClient
├── usePeriodeFilter()      ← periode filter (URL state)
├── <PeriodeSelect>         ← toolbar: filter bulan + tahun
├── <Input nipam filter>    ← toolbar: filter nipam (URL state)
├── <Button Upload>         ← buka UploadKpiDialog
├── <Button Download Template> ← penggajianApi.downloadKpiTemplate()
├── <DataTable>             ← kolom dari KPI_COLUMNS
├── <CrudForm / Sheet>      ← create + edit, dengan picker pegawai inline
├── <ConfirmDeleteDialog>   ← type "HAPUS" untuk delete
└── <UploadKpiDialog>       ← dialog upload Excel
```

---

### Step 10 — Page

**File (baru):** `src/app/(app)/penggajian/kpi/page.tsx`

```tsx
// Server component tipis
export default function KpiPage() {
  return <KpiClient />;
}
```

---

### Step 11 — Sidebar

**File:** `src/components/app-shell.tsx`

Tambahkan entry baru di subGroup "Proses Batch" **sebelum** item `proses-gaji`:

```ts
{
  id: "kpi",
  label: "00. Input Data KPI",
  href: "/penggajian/kpi",
  gate: "PENGGAJIAN_SETUP",
},
```

---

## Pre-Ship Checklist

- [ ] `bun run test` — semua green
- [ ] `bun run build` — zero error
- [ ] `bunx biome check` — zero lint error
- [ ] `npx gitnexus analyze` — refresh index
- [ ] `/graphify . --update` — update knowledge graph
- [ ] Sidebar entry tampil di atas "01. Proses Gaji Bulanan"
- [ ] Upload dialog menggunakan periode dari filter aktif
- [ ] Picker pegawai: search, pilih, tampil card, bisa clear
- [ ] tunkin & pph21Ter tampil sebagai Rp (bukan angka mentah)
- [ ] Download template bekerja (file terunduh)
