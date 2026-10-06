# CLAIM-ORDER: Coding Rules Gap Audit 2026-10-05

**Epic:** `kepegawaian-fe-t6at` — coding-rules: audit gap 2026-10-05
**Audit:** 2026-10-05 (re-audit `src/` vs `docs/design/coding-rules.md`)
**Tujuan:** Tutup gap rule-compliance sisa + temuan baru. **Bukan** bug fungsional — semua quality gate saat audit hijau.

**Baseline quality gate (2026-10-05, sebelum perbaikan):**

| Gate | Hasil |
|------|-------|
| `bun run test` | ✅ 55 files / 341 tests pass |
| `bunx tsc --noEmit` | ✅ 0 error |
| `bunx biome check` | ⚠️ 0 error, 16 warning |

> **Catatan:** audit sebelumnya `kepegawaian-fe-5tvj` (lihat `docs/claim-order-finished/CLAIM-ORDER-coding-rules-audit.md`) sudah menutup sebagian §2.3/§5.1/§2.2. Dokumen ini adalah **sisa + temuan baru**.

---

## Ringkasan Temuan → Issue

| # | Sev | Rule | Temuan | Issue |
|---|-----|------|--------|-------|
| 1 | 🔴 | §10.1 / A16 | 11 `page.tsx` pakai `"use client"` | `kepegawaian-fe-ulg9` |
| 2 | 🔴 | §2.3 / §5.2 | 60 `useQuery`/`useMutation` inline di 42 file `src/app/**` | `kepegawaian-fe-ktm3` |
| 3 | 🔴 | §5.1 | ≥25 query key literal, bukan factory | `kepegawaian-fe-7t24` |
| 4 | 🔴 | §8 / A7 | 9 `disabled={!canX}` untuk permission, bukan unmount | `kepegawaian-fe-8zo7` |
| 5 | 🟡 | §4.1 | 105 warna palet Tailwind mentah di 9 file | `kepegawaian-fe-t7a5` |
| 6 | 🟡 | §1.1 / A9 | `useMemo`/`useCallback` defensif + `<Context.Provider>` | `kepegawaian-fe-orx3` |
| 7 | 🟡 | §2.2 | File melebihi ceiling (komponen/hook) | `kepegawaian-fe-vlgw` |
| 8 | 🟡 | §2.5 | Zod schema tidak terkonsolidasi di `src/lib/validations/` | `kepegawaian-fe-mp1n` |
| 9 | 🟡 | §11.1 | Hook hasil ekstraksi §2.3 belum ber-test | `kepegawaian-fe-i7kv` |
| 10 | ⚪ | §12.1 | 16 warning Biome (non-blocking) | digabung ke `kepegawaian-fe-mp1n` |

### Bukti per temuan (file:line)

**#1 — 11 `page.tsx` `"use client"` (`kepegawaian-fe-ulg9`):**
`src/app/(app)/kepegawaian/data/[pegawaiId]/pendukung/{kartu-identitas,keahlian,keluarga,pelatihan,pendidikan,pengalaman-kerja}/page.tsx`,
`.../riwayat/{cuti,kontrak,mutasi,sk,sp}/page.tsx`

**#2 — inline `useQuery`/`useMutation`, 60 call / 42 file (`kepegawaian-fe-ktm3`).** Terparah:
`penggajian/proses-gaji/proses-gaji-client.tsx` (529 baris), `penggajian/verifikasi/verifikasi-client.tsx`,
`penggajian/persetujuan/persetujuan-client.tsx`, `penggajian/tambahan/tambahan-client.tsx`,
semua `*form-sheet.tsx`, dan 11 `page.tsx` di #1.

**#3 — query key literal (`kepegawaian-fe-7t24`):**
`signer-picker.tsx:30`, `kuota-form-sheet.tsx:74`, `sp-form-sheet.tsx:119`, `useKpiForm.ts:78`,
`tunjangan-client.tsx:107`, `useAdminBiodataMutation.ts:24`, `komponen-client.tsx:94,99,111`, dst.

**#4 — `disabled={!canX}` (`kepegawaian-fe-8zo7`):**
`components/rincian-gaji-panel.tsx:227`, `penggajian/verifikasi/verifikasi-client.tsx:174`,
`penggajian/persetujuan/persetujuan-client.tsx:152,169,194`,
`penggajian/tambahan/tambahan-client.tsx:171,185,212,241`.
(Pola benar `{canEdit && <Button>}` sudah ada di file yang sama → inkonsisten.)

**#5 — warna palet mentah (`kepegawaian-fe-t7a5`):** `bg-amber-500`, `text-rose-600`, `border-rose-300/60`, `text-white`, dll (105×) di
`tambahan-client.tsx`, `verifikasi-client.tsx`, `proses-gaji-client.tsx`, `rincian-gaji-panel.tsx`,
`pegawai-organisasi-table.tsx`, `permission-group.tsx`, `pengajuan-page-client.tsx`,
`upload-potongan-dialog.tsx`, `batch-list.config.tsx`.

**#6 — React 19 hygiene (`kepegawaian-fe-orx3`):** `useMemo` di `proses-gaji-client.tsx:254`, `klaim-form-sheet.tsx:30`,
`usePeriodeFilter.ts:49`; `useCallback` di `usePeriodeFilter.ts:51,62,69,76`;
`<Context.Provider>` di `hooks/BatchContext.tsx:19`, `hooks/useAuth.tsx:13`.

**#7 — file size (`kepegawaian-fe-vlgw`):** komponen `app-shell.tsx` 429, `data-table.tsx` 361 (ceiling ~250 shared primitive / 300 komponen);
hook `useTerminasiForm.ts` 237, `useDashboardSections.tsx` 180, `useKpiForm.ts` 166, `useEditProfilPegawai.ts` 154.
(`types/kepegawaian/riwayat.ts` 426 & `types/pegawai/pegawai.ts` 377 = DTO generated → **exempt**.)

**#8 — Zod schema (`kepegawaian-fe-mp1n`):** `src/lib/validations/` hanya berisi `terminasi.schema.ts` + `penggajian/`;
schema lain inline di `src/config/master/*.config.ts` & `*form-sheet.tsx`. `auth.schema.ts`/`master.schema.ts`/
`employee.schema.ts` yang didokumentasikan §2.5 tidak ada.

---

## Dependency Graph (terpasang di Beads)

```
                     ┌───────────────────────────────┐
                     │ kepegawaian-fe-7t24  (§5.1)   │  READY
                     └──────────────┬────────────────┘
                          blocks    │
                                    ▼
                     ┌───────────────────────────────┐
                     │ kepegawaian-fe-ktm3 (§2.3/5.2)│  ← inti, BLOCKED by 7t24
                     └───┬────────┬────────┬─────────┘
                blocks   │        │        │   blocks
             ┌───────────┘        │        └────────────┐
             ▼                    ▼                     ▼
  ┌────────────────────┐ ┌─────────────────┐ ┌──────────────────┐
  │ -ulg9 (§10.1/A16)  │ │ -vlgw (§2.2)    │ │ -i7kv (§11.1)    │
  └────────────────────┘ └─────────────────┘ └──────────────────┘

  READY / independen: -8zo7 (§8/A7), -orx3 (§1.1/A9), -t7a5 (§4.1), -mp1n (§2.5/§12.1)
```

**Aturan dependency:**
- `kepegawaian-fe-7t24` **mem-blocks** `kepegawaian-fe-ktm3` — factory harus lengkap dulu agar hook baru langsung pakai key benar (hindari ekstraksi 2×).
- `kepegawaian-fe-ktm3` **mem-blocks** `kepegawaian-fe-ulg9`, `-vlgw`, `-i7kv` — ekstraksi logic otomatis menipiskan `page.tsx` & mengecilkan file.
- Sisanya independen.

---

## Claim Order (urutan pengerjaan)

> Urutan di bawah dioptimalkan supaya (a) quick win dulu, (b) tidak ada file yang diedit dua kali,
> (c) dependensi terpenuhi. Klaim **satu issue per sesi**, tuntaskan sampai `git push`.

### 🥇 Wave 1 — Quick win & fondasi (paralel, saling independen)

- [x] **1. `kepegawaian-fe-8zo7`** — §8/A7 ganti `disabled={!canX}` → unmount (9 titik, 4 file)
  - Kenapa dulu: kecil, terisolasi, selesai dalam 1 sesi → hilangkan celah "UI-hide ≠ security".
  - Verifikasi: `grep -rn 'disabled={!can' src/app src/components` harus **0**; test RBAC hijau.

- [x] **2. `kepegawaian-fe-7t24`** — §5.1 migrasi ≥25 query key literal ke factory `src/hooks/keys/*`
  - Kenapa dulu: mem-blocks `kepegawaian-fe-ktm3`; murah & mekanis.
  - Verifikasi: tidak ada `queryKey: [...]` literal di luar `src/hooks/keys/`.

- [x] **3. `kepegawaian-fe-orx3`** — §1.1/A9 hapus `useMemo`/`useCallback` defensif + `<Context.Provider>`
  - Independen; bisa paralel dengan #1/#2.
  - Verifikasi: `grep -rn 'Context.Provider' src` → 0; test hijau; **tidak** mengubah perilaku.

- [x] **4. `kepegawaian-fe-t7a5`** — §4.1 ganti warna palet mentah → design token (opsional di Wave 1, prioritas P2)

### 🥈 Wave 2 — Core refactor (§2.3) — **hanya setelah `kepegawaian-fe-7t24` ✅**

- [x] **5. `kepegawaian-fe-ktm3`** — §2.3/§5.2 ekstrak 60 `useQuery`/`useMutation` dari 42 file `src/app/**` → `src/hooks/`
  - Pecah per-domain (batch kecil, tiap batch = 1 commit):
    - [x] Batch A — `kepegawaian/pendukung/*` + `kepegawaian/riwayat/*` (termasuk 11 `page.tsx`)
    - [x] Batch B — `cuti/*` (kuota, pengajuan, persetujuan)
    - [x] Batch C — `penggajian/*` (proses-gaji, verifikasi, persetujuan, tambahan, kpi, setup)
    - [x] Batch D — `sistem/*`, `profil/*`, `master/*`
  - Verifikasi tiap batch: `bunx tsc --noEmit` + `bun run test` + `bunx biome check` hijau.

### 🥉 Wave 3 — Turunan (setelah `kepegawaian-fe-ktm3` ✅)

- [x] **6. `kepegawaian-fe-ulg9`** — §10.1/A16 split 11 `page.tsx` → server wrapper + `*-client.tsx`
- [x] **7. `kepegawaian-fe-vlgw`** — §2.2 turunkan file di atas ceiling
- [x] **8. `kepegawaian-fe-i7kv`** — §11.1 unit test untuk hook hasil ekstraksi

> 6, 7, 8 boleh paralel **setelah** 5 selesai (file sudah stabil).

### 🏁 Wave 4 — Pembersihan (paralel, prioritas rendah)

- [x] **9. `kepegawaian-fe-mp1n`** — §2.5 konsolidasi Zod schema + bersihkan 16 warning Biome

---

## Per-Issue Checklist

### `kepegawaian-fe-8zo7` — §8/A7 unmount
- [x] Inventaris semua `disabled={!can*}` yang dipakai untuk gating permission (grep)
- [x] Ganti ke `{hasPermission(permissions, PERMISSION.X, roles) && <Button>}` (unmount)
- [x] Pastikan `disabled` yang **memang** untuk state lain (pending/loading) TIDAK diubah
- [x] Test: tombol hilang dari DOM saat permission tidak ada; build hijau

### `kepegawaian-fe-7t24` — §5.1 factory
- [x] Audit semua `src/hooks/keys/*` — pastikan tiap domain punya `all/lists/list/details/detail`
- [x] Tambah key yang belum ada (mis. `pegawai-search`, `sanksi-by-jenis-sp`, `level`, `biodata`)
- [x] Ganti 25+ literal array → `xxxKeys.*`
- [x] Test: tidak ada `queryKey: ["..."]` literal di luar `keys/`

### `kepegawaian-fe-ktm3` — §2.3/§5.2
- [x] Per file: identifikasi `useQuery`/`useMutation`/handler non-trivial
- [x] Angkat ke `src/hooks/use*.ts` (atau `src/hooks/<domain>/use*.ts`)
- [x] Komponen jadi tipis (presentasi saja), terima props/return hook
- [x] Hook ≤150 baris (§2.2); pecah bila >1 alasan untuk berubah
- [x] Gunakan `isPending` (bukan `isLoading`), `placeholderData: keepPreviousData` untuk pagination
- [x] `gcTime`/`staleTime` sesuai §5.3 (tabel 30s, dropdown 5m) — JANGAN Infinity

### `kepegawaian-fe-ulg9` — §10.1/A16
- [x] Untuk tiap `page.tsx`: pindahkan isi ke `page-client.tsx` / `<entity>-page-client.tsx`
- [x] `page.tsx` server tipis: `export default function Page() { return <XClient /> }`
- [x] JANGAN `'use client'` di `page.tsx`/`layout.tsx`
- [x] Guard RBAC tetap benar (server: `verifySession()`, client: `useAuth()`)

### `kepegawaian-fe-vlgw` — §2.2
- [x] `app-shell.tsx` (429) → pecah per tanggung jawab (nav/header/user-menu) bila >1 alasan berubah
- [x] `data-table.tsx` (361) → ekstrak cell/toolbar/pagination/empty-state bila >1 alasan berubah
- [x] Hook >150 → komposisi 2 hook
- [x] JANGAN pecah hanya demi angka (anti-fragmentasi §2.2); tulis 1 kalimat alasan perubahan

### `kepegawaian-fe-i7kv` — §11.1
- [x] Setiap hook baru punya `*.test.ts(x)` collocated
- [x] Test: success, error, invalidasi query, loading state
- [x] `bun run test` hijau; tidak ada assertion yang dilemahkan

### `kepegawaian-fe-t7a5` — §4.1
- [x] Tambah token semantik di `globals.css` (`@theme`) bila perlu
- [x] Ganti `bg-amber-500`, `text-rose-600`, `text-white` → token (`bg-warning`, `text-destructive`, dst.)
- [x] Cek kontras WCAG AA (§0 P3, audiens lansia) di light + dark

### `kepegawaian-fe-orx3` — §1.1/A9
- [x] Hapus `useMemo`/`useCallback` defensif; tulis ekspresi biasa
- [x] Ganti `<X.Provider value={v}>` → `<X value={v}>`
- [x] Dokumentasikan bila ada yang butuh manual memo karena performa terukur
- [x] Exempt: `components/ui/*` (generated)

### `kepegawaian-fe-mp1n` — §2.5 + §12.1
- [x] Buat `src/lib/validations/{auth,master,employee}.schema.ts` sesuai §2.5
- [x] Pindahkan `z.object` inline dari config/form-sheet → `lib/validations/`
- [x] Derive type via `z.infer`; JANGAN tulis interface terpisah (A15)
- [x] Bersihkan 16 warning Biome (7 non-null assertion, 6 unused param, 3 literal keys, 2 void, 1 unused import)
- [x] `bunx biome check` → 0 error **dan** 0 warning

---

## Definition of Done (epic `kepegawaian-fe-t6at`)

- [x] 9 issue anak closed
- [x] `grep -rn '"use client"' src/app --include=page.tsx` → 0
- [x] Tidak ada `useQuery`/`useMutation` inline di `src/app/**` (kecuali kasus yang didokumentasikan)
- [x] Tidak ada `queryKey: [...]` literal di luar `src/hooks/keys/`
- [x] Tidak ada `disabled={!can*}` untuk gating permission
- [x] Tidak ada warna palet Tailwind mentah (`*-500`, `*-600`, dst.) di komponen
- [x] `bunx biome check` 0 error / 0 warning
- [x] `bunx tsc --noEmit` 0 error
- [x] `bun run test` all green
- [x] `bun run build` clean
- [x] `npx gitnexus analyze` + `/graphify . --update` dijalankan
- [x] Epic `bd close kepegawaian-fe-t6at`

---

## Referensi

| Dokumen | Isi |
|---------|-----|
| `docs/design/coding-rules.md` | Aturan mengikat (§0–§13 + Appendix A) |
| `knowledge.md` §2, §8 | Mode Grilling/Coding, workflow & quality gate |
| `kepegawaian-fe-5tvj` | Epic audit coding-rules sebelumnya (closed) |
| `docs/claim-order-finished/CLAIM-ORDER-coding-rules-audit.md` | Precedent claim order audit |
| `docs/design/visual-foundation.md` | Token & aksesibilitas (rujukan §4.1) |
