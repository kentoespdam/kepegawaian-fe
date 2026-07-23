# Konteks modul: `pegawai`

> Delta modul. Baca [CONTEXT-MAP.md](../../CONTEXT-MAP.md) (inti bersama) dulu.

## Ringkas

Modul **resource** (bukan collection seperti `master`). Nama modul **adalah** resource-nya:
`pegawai`. Spec: [`docs/api/pegawai/api.json`](../api/pegawai/api.json) — 9 path, 41 schema.

| Sifat | Nilai |
|---|---|
| `type` (module.json) | `resource` |
| Prefix path | `/pegawai` (1-level; segmen setelah prefix = **action/sub-resource**, bukan entity) |
| Domain tipe | **1** domain `pegawai` → satu file `src/types/pegawai/pegawai.ts` |

Kontras dengan `master`: `master` = **collection** (`/master/{entity}/...`, 2-level, 22 entity → 22
domain). Karena `grade` (entity master) dan `list`/`batch`/`profil` (action pegawai) sama-sama segmen
non-param, bentuk **tak bisa dibedakan sintaksis** → dideklarasikan via `module.json`. Lihat
[GENERIC-EXTRACT-TRACKER.md](../api/GENERIC-EXTRACT-TRACKER.md) Q2.

## Path (9)

| Path | Method | Fungsi |
|---|---|---|
| `/pegawai` | GET, POST | list (paged), create |
| `/pegawai/{id}` | GET, PUT, DELETE | detail, update, hapus |
| `/pegawai/list` | GET | list ringkas |
| `/pegawai/batch` | POST | create massal |
| `/pegawai/batch-by-ids` | POST | ambil massal by ids |
| `/pegawai/{id}/profil` | PATCH | update sebagian profil |
| `/pegawai/{id}/gaji` | PATCH | update sebagian gaji |
| `/pegawai/{nipam}/nipam` | GET | cari by NIPAM |
| `/pegawai/{id}/ringkasan` | GET | ringkasan pegawai |

> PATCH parsial (`/profil`, `/gaji`) & lookup by key non-id (`nipam`) — bentuk yang **tidak ada** di
> master. Tak mengubah strategi tipe (semua tetap domain `pegawai`), tapi dicatat agar layer service
> nanti tahu ada partial-update.

## Schema berbagi dengan `master` (identik byte-for-byte → `_shared.ts`)

`DeletedResult` · `JabatanMiniResponse` · `JenjangPendidikanResponse` · `LevelResponse` ·
`OrganisasiMiniResponse` · `PageableObject` · `SavedResultLong` · `SortObject`

Generator baru menaruhnya di `src/types/_shared.ts` (root) otomatis via `placementOf` lintas-modul —
bukan diduplikasi ke `src/types/pegawai/`.

## Status

- ✅ Tipe (`src/types/pegawai/pegawai.ts`) sudah di-generate via `extract-types.js`.
- ✅ `getPegawaiSession()` memanggil `GET /pegawai/{$id}` untuk identity bridge.
- ✅ Data Pegawai page (3 tab) mengonsumsi `/pegawai` (Aktif/Non-aktif) & `/profil/biodata` (Non-pegawai).
- ✅ Dashboard memakai data dari `PegawaiResponseDetail` (via `getPegawaiSession()`).
- ⏳ Edit profil/gaji via PATCH belum dipasang di Dashboard (rencana rilis berikutnya).
