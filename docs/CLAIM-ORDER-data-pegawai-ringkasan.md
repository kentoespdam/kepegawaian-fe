# Claim Order — Data Pegawai: master-detail panel Ringkasan

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**,
> bukan file ini. File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Tujuan.** Halaman Data Pegawai jadi **master-detail 2-panel**: tabel kiri, panel
**"Ringkasan Data Karyawan"** di kanan yang terisi saat sebuah baris pegawai di-klik.
Follow-up dari `kepegawaian-fe-p9g` (row-click yang sebelumnya di-defer / OUT OF SCOPE).

**Dua file yang berubah:**
1. `src/components/data-table.tsx` — tambah prop `onRowClick` + `selectedRowId` (generik, dipakai balik semua tabel).
2. `src/app/(app)/kepegawaian/data/data-pegawai-client.tsx` — state seleksi, query ringkasan, layout 2-panel + komponen panel.

> Panel ringkasan boleh jadi komponen ke-3 (`ringkasan-panel.tsx`) di folder yang sama bila
> `data-pegawai-client.tsx` jadi >120 baris — lihat aturan baris ≤120 di coding-rules.

## Keputusan desain (hasil grill — DIKUNCI, jangan re-litigasi)

1. **Trigger seleksi = klik SELURUH baris.** `DataTable` dapat dua prop baru:
   `onRowClick?(item)` dan `selectedRowId?` (string|number, dibandingkan `String()`-wise
   dengan `getRowId(item)`). Baris terpilih di-highlight (bg + mungkin ring kiri).
   **Tanpa tombol mata (👁).** Kolom Aksi (edit/hapus) tetap; tombolnya WAJIB
   `e.stopPropagation()` biar klik tombol tak ikut men-trigger `onRowClick`.
2. **Data panel = `useQuery` KEDUA** (independen dari query tabel):
   - key `["ringkasan", selectedId]`, `enabled: !!selectedId`, `staleTime: 30_000`.
   - fetch `/api/proxy/pegawai/${selectedId}/ringkasan` → `body.data` (`PegawaiResponseRingkasan`).
   - **`proxy.ts` catch-all sudah meneruskan ke backend — TAK perlu bikin route API baru.**
3. **Panel HANYA di tab Aktif & Non-aktif.** Tab **Non-pegawai** = tabel **full-width**,
   `onRowClick`/`selectedRowId` **tidak** dipasang (biodata tak punya endpoint ringkasan pegawai).
4. **`selectedId` = `useState` lokal**, **BUKAN** URL. Di-**reset ke `null`** saat ganti
   tab atau ganti page (baris lama tak ada di dataset baru). Sort/size juga aman di-reset.
5. **Empty-state panel** (belum ada seleksi): placeholder tengah — ikon + teks
   *"Pilih pegawai untuk melihat ringkasan"*. Pola sama empty-state `DataTable`
   (`FileX2` / ikon lain + teks `text-muted-foreground`).
6. **Responsif:** side-by-side desktop / stacked mobile, **tanpa drawer/modal**.
   Pakai breakpoint `lg:` (mis. tabel `lg:flex-1`, panel `lg:w-[380px]` atau `lg:w-2/5`).
   Proporsi lebar & `sticky` panel = detail CSS bebas implementer.

## Pemetaan panel → `PegawaiResponseRingkasan` (flat, semua optional)

Semua field flat (`string`/`number`/`boolean`), render apa adanya (`?? "-"`).
Susun jadi **3 section** sesuai mock:

- **Informasi Umum:** `nipam`, `nama`, `jenisKelamin`, `tempatLahir`, `tanggalLahir`,
  `statusKawin`, `nik`, `agama`, `alamat`, `telp`, `email`, `ibuKandung`, `kodePajak`.
- **Informasi Akademik:** `pendidikanTerakhir`, `lembagaPendidikan`, `tahunLulus`.
- **Informasi Kepegawaian:** `statusPegawai`, `pangkatGolongan`, `tmtGolongan`, `mkg`,
  `unitKerja`, `jabatan`, `profesi`, `grade`, `tmtKerja`, `tmtPegawai`, `tmtPensiun`,
  `noKontrak`, `noNpwp`, `noJamsostek`, `noBpjs`, `noIdCard`, `absensiId`, `isAskes`.

> Field `*date` (`tanggalLahir`, `tmt*`) datang sebagai string ISO — render string apa adanya
> (jangan bikin formatter baru kecuali sudah ada util tanggal di repo; cek dulu, YAGNI).
> `isAskes` boolean → boleh reuse pola ikon check/uncheck `cellContent` di data-table, atau "Ya/Tidak".

## Prasyarat (baca sebelum ngoding)

1. [`docs/design/coding-rules.md`](./design/coding-rules.md) — aturan wajib (baris ≤120).
2. `src/components/data-table.tsx` — tambah `onRowClick`/`selectedRowId` (lihat §1 di bawah).
3. `src/app/(app)/kepegawaian/data/data-pegawai-client.tsx` — file utama fitur.
4. `src/types/pegawai/pegawai.ts` — `PegawaiResponseRingkasan` (generated, **JANGAN diedit**).
5. `src/proxy.ts` — konfirmasi catch-all `/api/proxy/*` → backend (tak perlu route baru).

## Urutan claim

### 1. `kepegawaian-fe-5ip` — master-detail panel Ringkasan Data Karyawan
**← depends on:** `kepegawaian-fe-p9g` (tabel sudah pakai `PegawaiTableResponse`) — sudah closed, siap dikerjakan.

**A. `data-table.tsx` (prop generik baru):**
- [x] `gitnexus_impact({target:"DataTable", direction:"upstream"})` — laporkan blast radius (dipakai banyak tabel; prop OPSIONAL jadi non-breaking).
- [x] Tambah ke `DataTableProps<T>`: `onRowClick?: (item: T) => void;` + `selectedRowId?: string | number;`.
- [x] `<tr>` data: `onClick={() => onRowClick?.(item)}`, tambah `cursor-pointer` bila `onRowClick` ada, dan highlight bila `getRowId(item)` == `selectedRowId` (bandingkan `String()`-wise). Highlight menang atas zebra, kalah/koeksis dgn hover.
- [x] Tombol Aksi (`onEdit`/`onDelete`) → bungkus handler dengan `e.stopPropagation()`.
- [x] **JANGAN** ubah signature prop lain / hapus apa pun (harus non-breaking untuk semua caller lain).

**B. `data-pegawai-client.tsx` (fitur):**
- [x] `gitnexus_impact({target:"DataPegawaiClient", direction:"upstream"})` sebelum edit.
- [x] `const [selectedId, setSelectedId] = useState<string | number | null>(null)`.
- [x] `useQuery` ringkasan: key `["ringkasan", selectedId]`, `enabled: !!selectedId`, `staleTime: 30_000`, fetch `/api/proxy/pegawai/${selectedId}/ringkasan` → `body.data`.
- [x] Di `nav()` (atau di handler ganti tab & page): `setSelectedId(null)` saat tab/page berubah.
- [x] Pasang `onRowClick={(i)=>setSelectedId(getRowId(i))}` + `selectedRowId={selectedId ?? undefined}` **hanya** saat `isPegawaiTab`.
- [x] Layout: bungkus tabel + panel dalam `flex flex-col lg:flex-row gap-4`. Panel dirender **hanya** saat `isPegawaiTab`.
- [x] Panel Ringkasan (inline atau `ringkasan-panel.tsx`): empty-state bila `!selectedId`; skeleton/loader saat `isPending`; error state; 3 section sesuai pemetaan di atas.
- [x] `gitnexus_detect_changes()` sebelum commit (harus hanya file yang diharapkan: data-table.tsx, data-pegawai-client.tsx, ringkasan-panel.tsx).
- [x] Quality gate: `bun run tsc --noEmit` + `bunx biome check`.
- [x] `bd close kepegawaian-fe-5ip` — commit & push.

## Definition of Done

- [x] Klik baris (tab Aktif/Non-aktif) memuat ringkasan & mengisi panel kanan; baris terpilih ter-highlight.
- [x] Tab Non-pegawai tetap tabel full-width, tak bisa di-klik-select, tanpa panel.
- [x] Ganti tab / ganti page mereset seleksi → panel balik ke empty-state.
- [x] Empty-state "Pilih pegawai untuk melihat ringkasan" tampil sebelum ada seleksi.
- [x] Layout side-by-side di `lg`, menumpuk di mobile.
- [x] Prop `DataTable` baru opsional & non-breaking untuk caller lain.
- [x] `tsc --noEmit` & `biome check` lolos.

## Invarian yang tak boleh dilanggar

- **Tipe generated** (`src/types/pegawai/pegawai.ts`) TIDAK diedit manual.
- **`paging.ts`** TIDAK berubah.
- **`selectedId` TIDAK masuk URL** — state lokal saja (keputusan #4).
- **Tak bikin route `/api/proxy/...` baru** — catch-all `proxy.ts` sudah menangani.
- **Prop `DataTable` baru WAJIB opsional** — jangan pecahkan caller tabel lain (master, terminasi, dll).
- **Tab Non-pegawai** TIDAK dapat panel / row-select.
