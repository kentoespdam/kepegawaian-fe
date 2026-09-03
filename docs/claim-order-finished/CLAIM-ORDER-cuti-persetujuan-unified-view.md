# Claim Order — CU-20: Unifikasi View Persetujuan Cuti

**ADR:** ADR-0042
**Issue:** CU-20

---

## Overview

Unifikasi halaman persetujuan cuti dari dua route terpisah menjadi satu halaman dengan dua dropdown filter: `approvalCutiStatus` (wajib) + `readWriteStatus` (opsional).

---

## Claim Order Checklist

### Step 1 — Update `persetujuan-page-client.tsx`

**File:** `src/app/(app)/cuti/persetujuan/persetujuan-page-client.tsx`

- [x] Hapus type `PersetujuanView` dan prop `view`
- [x] Tambah `STATUS_OPTIONS` (5 opsi tanpa "Semua")
- [x] Tambah `RW_OPTIONS` (WRITE/READ)
- [x] `statusParam` dari search params, default `PENDING`
- [x] `readWriteStatus` dari search params, validasi WRITE/READ
- [x] `hasActive` gabungan tahun + status + readWriteStatus
- [x] `onStatusChange` — hapus param jika PENDING (default)
- [x] `onRwChange` — set/clear param
- [x] Query: selalu kirim `approvalCutiStatus`, opsional `readWriteStatus`
- [x] Hapus client-side filtering
- [x] Toolbar: 3 Select (Tahun, Status Approval, Status Proses)
- [x] Label resolve manual untuk SelectValue display

### Step 2 — Redirect riwayat route

**File:** `src/app/(app)/cuti/persetujuan/riwayat/page.tsx`

- [x] Redirect ke `/cuti/persetujuan?readWriteStatus=READ`

### Step 3 — Update tests

**File:** `src/app/(app)/cuti/persetujuan/persetujuan-page-client.test.tsx`

- [x] Default: `approvalCutiStatus=PENDING` dikirim
- [x] Custom status: `approvalCutiStatus=APPROVED` dikirim
- [x] readWriteStatus=READ: dikirim + approvalCutiStatus=PENDING
- [x] Approve flow: POST berhasil

### Step 4 — Update docs

- [x] `docs/adr/0042` — revisi: approvalCutiStatus wajib
- [x] `docs/context/cuti.md` — update deskripsi halaman

### Step 5 — Quality gates

- [x] `bunx biome check` — zero lint errors
- [x] `bun run test` — all green (4/4)
- [x] `tsc --noEmit` — zero type errors

### Step 6 — Ship

- [x] Commits pushed
