# CLAIM-ORDER — Penggajian M4: Fase 01 Seting Komponen

> **Milestone 4 dari 7** untuk modul Penggajian. Tergantung M1+M3 (fondasi + list batch).
> Baca [`docs/context/penggajian.md`](context/penggajian.md) dulu.

## Tujuan

Implementasi **layout bersama batch** + **fase 01 Seting komponen Gaji** dalam batch berjalan.

## Step-by-step

### Step 1: Layout bersama `/penggajian/batch/[id]/layout.tsx`

| # | Aksi | File |
|---|---|---|
| 1a | Server component tipis + `getPegawaiSession()` + permission check | `src/app/(app)/penggajian/batch/[id]/layout.tsx` |
| 1b | `BatchContext` provider (wrap children) | pakai hook dari M1 |
| 1c | Header: badge periode + status + total pegawai + tanggal proses | inline di layout |
| 1d | Rail stepper vertikal (4 langkah) dengan step locking | `src/app/(app)/penggajian/batch/[id]/_components/stepper-rail.tsx` |

**Step locking logic**:
- Step enabled jika (status backend sesuai fase) AND (user punya permission fase tsb)
- Step disabled = greyed-out dengan tooltip ("Belum saatnya" / "Tidak memiliki akses")
- Step aktif di-highlight evergreen

### Step 2: Halaman fase 01 Seting (`/penggajian/batch/[id]/setup/page.tsx`)

| # | Aksi | File |
|---|---|---|
| 2a | Server tipis + permission check `penggajian.setup` | `src/app/(app)/penggajian/batch/[id]/setup/page.tsx` |
| 2b | Client `SetingSetupClient.tsx` | `src/app/(app)/penggajian/batch/[id]/setup/setting-client.tsx` |
| 2c | Hook `useBatchMasterPegawai(batchId, pegawaiId?)` | `src/hooks/penggajian/useBatchMasterPegawai.ts` |
| 2d | Hook `useUpdateKomponenPegawai()` | `src/hooks/penggajian/useUpdateKomponenPegawai.ts` |
| 2e | Tabel kiri: daftar pegawai dalam batch grouped-by-organisasi | inline di client |
| 2f | Panel kanan: rincian komponen per-pegawai | inline di client |
| 2g | Sheet/Modal edit komponen per-baris | `src/app/(app)/penggajian/batch/[id]/setup/edit-komponen-sheet.tsx` |
| 2h | Tests | `*.test.ts` |

> **State**: `?pegawaiId=N` di URL untuk sync selected employee.

## Backend Mapping

- `GET /penggajian/batch/master/pegawai/{pegawaiId}` — komponen per-pegawai
- `POST /penggajian/komponen` — tambah komponen
- `PUT /penggajian/komponen/{id}` — update komponen
- `DELETE /penggajian/komponen/{id}` — hapus komponen

## Build Order

Layout bersama → Stepper rail → Fase01 page → Sheet edit → Tests.

## Definition of Done

- [ ] Layout bersama render header info batch + rail stepper
- [ ] Step locking: step aktif = enabled, step lain = disabled sesuai status + permission
- [ ] Fase 01: klik baris pegawai → panel kanan update rincian
- [ ] Sheet edit komponen berfungsi (create/update/delete)
- [ ] Tests: hook + stepper rail logic
- [ ] Build & test green
- [ ] Commit: `feat(penggajian/batch/fase-01): layout + seting komponen`

## Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Layout fetch batch info → duplicate call dari fase lain | Context provider share sekali |
| Stepper rail di-redirect URL bentrok dengan searchParams | `<Link>` dengan `?pegawaiId=` tetap, step pakai route absolut |
| Step locking logic salah → user bisa loncat fase | Kombinasi 2 gate: backend status + permission; backend ultimate gate |

## Lanjut ke M5

Setelah M4 selesai, klaim M5: `docs/CLAIM-ORDER-penggajian-fase-02.md`.