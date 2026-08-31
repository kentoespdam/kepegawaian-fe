# CLAIM-ORDER — Penggajian M1: Fondasi

> **Milestone 1 dari 7** untuk modul Penggajian. Baca [`docs/context/penggajian.md`](context/penggajian.md) dulu.

## Tujuan

Bangun fondasi modul sebelum nulis kode UI:
- ADR-0016: keputusan arsitektur (2 sub-grup sidebar + RBAC granular per fase + state machine)
- Tambah permission baru ke central map (`src/app/(app)/sistem/roles/permission-config.ts`)
- Sidebar: daftarkan 2 grup **Setup** + **Proses Batch** di `app-shell.tsx` (item belum render di release 1; muncul setelah entity wired)
- Hook `useBatchInfo(id)` — fetch `GET /batch/{id}` sekali di layout, share via React Context
- Types re-verify: `src/types/penggajian/*` (sudah generated)

## Step-by-step

| # | Aksi | File / Referensi |
|---|---|---|
| 1 | Buat ADR-0016 | `docs/adr/0016-penggajian-sub-modul-rbac-workflow.md` |
| 2 | Tambah 4 permission ke map | `src/app/(app)/sistem/roles/permission-config.ts` — `penggajian.setup`, `penggajian.verify1`, `penggajian.tambahan`, `penggajian.approve` |
| 3 | Tambah 2 grup sidebar | `src/components/app-shell.tsx` — `SETUP_GROUP` (5 item) + `PROSES_BATCH_GROUP` (1 item) |
| 4 | Hook `useBatchInfo` | `src/hooks/useBatchInfo.ts` — TanStack Query `GET /penggajian/batch/{id}` |
| 5 | Context provider `BatchContext` | `src/hooks/BatchContext.tsx` — share `data` ke layout children |
| 6 | Test hook + context | `src/hooks/useBatchInfo.test.ts` |
| 7 | Update CONTEXT-MAP entry | `CONTEXT-MAP.md` baris "Penggajian" — tandai ✅ grilling selesai |
| 8 | Quality gates | `bun run test`, `bunx biome check`, `bun run build` |

## Build Order

ADR-0016 dulu → permission map → sidebar group → hook/context → tests.

## Definition of Done

- [x] ADR-0016 merged — `docs/adr/0016-penggajian-sub-modul-rbac-workflow.md`
- [x] 4 permission baru ada di `permission-config.ts` — SETUP, VERIFY1, TAMBAHAN, APPROVE
- [x] 2 grup sidebar terdaftar — SETUP (5 item) + PROSES BATCH (1 item)
- [x] `useBatchInfo` + `BatchContext` tested — `src/hooks/useBatchInfo.test.tsx`
- [x] Build & test green (209 tests pass)
- [x] Commit: `chore(penggajian): fondasi ADR + RBAC + sidebar group`

## Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Sidebar group muncul walau entity belum ada (empty state jelek) | Render group hanya jika minimal1 sub-item visible |
| Permission key bentrok dengan modul lain | Prefix konsisten `penggajian.*` |
| Context provider bocor ke child lain | Wrap hanya di layout batch (`(app)/penggajian/batch/[id]/layout.tsx`) |

## Lanjut ke M2

Setelah M1 selesai, klaim M2: `docs/CLAIM-ORDER-penggajian-setup-master.md`.