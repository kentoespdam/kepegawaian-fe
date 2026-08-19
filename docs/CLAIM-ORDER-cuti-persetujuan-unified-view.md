# Claim Order — CU-20: Unifikasi View Persetujuan Cuti

**ADR:** ADR-0042
**Issue:** CU-20

---

## Overview

Unifikasi halaman persetujuan cuti dari dua route terpisah (`/cuti/persetujuan` + `/cuti/persetujuan/riwayat`) menjadi satu halaman dengan dropdown `readWriteStatus` filter.

---

## Claim Order Checklist

### Step 1 — Update `persetujuan-page-client.tsx`

**File:** `src/app/(app)/cuti/persetujuan/persetujuan-page-client.tsx`

- [ ] Hapus `STATUS_OPTIONS` constant (filter approvalStatus tidak dipakai)
- [ ] Hapus type `PersetujuanView` dan prop `view`
- [ ] Hapus `statusParam` dari search params parsing
- [ ] Hapus `onStatusChange` handler
- [ ] Update `hasActive` — hanya `tahun !== CURRENT_YEAR`
- [ ] Tambah `readWriteStatusParam` dari search params (`sp.get("readWriteStatus")`)
- [ ] Tambah `rwHasActive` — `readWriteStatusParam && readWriteStatusParam !== "WRITE"` (WRITE adalah default, tidak perlu tampilkan Reset)
- [ ] Tambah `onReadWriteStatusChange` handler
- [ ] Update query:
  - Hapus `view` dari queryKey
  - Tambah `readWriteStatusParam` ke queryKey
  - Selalu kirim `readWriteStatus` param ke backend (default `WRITE` jika tidak ada)
  - Hapus logic `if (view === "menunggu") params.approvalCutiStatus = ...`
- [ ] Hapus client-side filtering logic (baris `rows = view === "riwayat" ? ... : ...`)
- [ ] Update toolbar:
  - Hapus Select untuk approvalStatus
  - Tambah Select untuk readWriteStatus: "Belum Diproses" (WRITE), "Sudah Diproses" (READ) + placeholder "Semua"
- [ ] Update `hasActive` — gabungkan `tahun !== CURRENT_YEAR` + `readWriteStatusParam !== "WRITE"` (WRITE = default, bukan active filter)
- [ ] Update `onReset` — reset semua params ke default
- [ ] Update `emptyMessage` — "Tidak ada pengajuan yang menunggu persetujuan Anda" (static, tanpa view conditional)

### Step 2 — Redirect riwayat route

**File:** `src/app/(app)/cuti/persetujuan/riwayat/page.tsx`

- [ ] Ganti isi file jadi redirect ke `/cuti/persetujuan`
- [ ] Gunakan `redirect()` dari `next/navigation` atau `<meta httpEquiv="refresh">` — pilih yang sesuai pola project

### Step 3 — Update tests

**File:** `src/app/(app)/cuti/persetujuan/persetujuan-page-client.test.tsx`

- [ ] Update `renderClient()` — hapus param `view`, sesuaikan Props
- [ ] Update test 1 (approve flow):
  - Pastikan request mengandung `readWriteStatus=WRITE` (default)
  - Hapus assertion tentang `approvalCutiStatus=PENDING`
- [ ] Update test 2 (riwayat flow) — ganti jadi test "readWriteStatus=READ":
  - Render dengan `readWriteStatus=READ` di search params
  - Pastikan request mengandung `readWriteStatus=READ`
- [ ] Tambah test baru: "default view tanpa readWriteStatus param kirimkan WRITE"
- [ ] Tambah test baru: "readWriteStatus dropdown berubah, query refetch dengan param baru"
- [ ] Jalankan `bun run test` — pastikan semua hijau

### Step 4 — Update docs

- [ ] Update `docs/context/cuti.md` — ganti deskripsi halaman persetujuan (satu halaman dengan dropdown)
- [ ] Update `CONTEXT-MAP.md` jika ada referensi ke dual view

### Step 5 — Quality gates

- [ ] `bunx biome check` — zero lint errors
- [ ] `bun run test` — all green
- [ ] `bun run build` — clean build

### Step 6 — Ship

- [ ] Commit: `feat(cuti): CU-20 unifikasi view persetujuan — readWriteStatus filter, hapus dual view`
- [ ] `git pull --rebase`
- [ ] `git push`

---

## Dependencies

- Backend sudah support `readWriteStatus` di `GET /cuti/pengajuan/approval` ✅
- Tidak ada dependency baru

## Risks

- **Low:** Redirect `/cuti/persetujuan/riwayat` — user yang bookmark route lama akan di-redirect
- **Low:** Default `WRITE` — jika user biasa melihat riwayat, harus ganti dropdown manual
