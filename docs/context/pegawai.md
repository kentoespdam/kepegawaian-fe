# Konteks modul: `pegawai`

> Delta modul. Baca [CONTEXT-MAP.md](../../CONTEXT-MAP.md) (inti bersama) dulu.

## Ringkas

Modul **resource** (bukan collection seperti `master`). Nama modul **adalah** resource-nya:
`pegawai`. Spec: [`docs/api/pegawai/api.json`](../api/pegawai/api.json) — 10 path, 46 schema.

| Sifat | Nilai |
|---|---|
| `type` (module.json) | `resource` |
| Prefix path | `/pegawai` (1-level; segmen setelah prefix = **action/sub-resource**, bukan entity) |
| Domain tipe | **1** domain `pegawai` → satu file `src/types/pegawai/pegawai.ts` |

Kontras dengan `master`: `master` = **collection** (`/master/{entity}/...`, 2-level, 22 entity → 22
domain). Karena `grade` (entity master) dan `list`/`batch`/`profil` (action pegawai) sama-sama segmen
non-param, bentuk **tak bisa dibedakan sintaksis** → dideklarasikan via `module.json`. Lihat
[GENERIC-EXTRACT-TRACKER.md](../api/GENERIC-EXTRACT-TRACKER.md) Q2.

## Path (10)

| Path | Method | Fungsi | Response type |
|---|---|---|---|
| `/pegawai` | GET, POST | list (paged), create | `PageEnvelope<PegawaiTableResponse>` (GET) · `Envelope<number>` (POST) |
| `/pegawai/{id}` | GET, PUT, DELETE | detail, update, hapus | `Envelope<PegawaiResponseDetail>` (GET) |
| `/pegawai/list` | GET | list ringkas | `Envelope<PegawaiListResponse[]>` |
| `/pegawai/batch` | POST | create massal | `Envelope<string>` |
| `/pegawai/batch-by-ids` | POST | ambil massal by ids | `Envelope<PegawaiListResponse[]>` |
| `/pegawai/{id}/profil` | PATCH | update sebagian profil | `Envelope<number>` |
| `/pegawai/{id}/gaji` | PATCH | update sebagian gaji | `Envelope<number>` |
| `/pegawai/{nipam}/nipam` | GET | cari by NIPAM | `Envelope<PegawaiResponse>` |
| `/pegawai/{id}/ringkasan` | GET | ringkasan pegawai | `Envelope<PegawaiResponseRingkasan>` |
| `/pegawai/{id}/session` | GET | data sesi ringkas (identity bridge) | `Envelope<PegawaiResponseSession>` |

> PATCH parsial (`/profil`, `/gaji`) & lookup by key non-id (`nipam`) — bentuk yang **tidak ada** di
> master. Tak mengubah strategi tipe (semua tetap domain `pegawai`), tapi dicatat agar layer service
> nanti tahu ada partial-update.

## Schema berbagi (lintas modul → `_shared.ts`)

`DeletedResult` · `JabatanMiniResponse` · `JenjangPendidikanResponse` · `LevelResponse` ·
`OrganisasiMiniResponse` · `PageableObject` · `SavedResultLong` · `SortObject` · `PegawaiResponse`
· `GolonganResponse` · `ProfesiMiniResponse` · `Page` · `PageEnvelope` · `PageQuery`

Generator menaruhnya di `src/types/_shared.ts` (root) otomatis via `placementOf` lintas-modul.

## Perubahan response (`v2` table vs detail)

Sejak update spec, endpoint `GET /pegawai` (paged table) mengembalikan **`PegawaiTableResponse`**
— tipe flat dengan ref ringkas via `RefMiniResponse` (`{id, nama}`), bukan objek penuh seperti
`PegawaiResponse`. Detail pegawai tetap via `GET /pegawai/{id}` → `PegawaiResponseDetail`.

| Tipe | Dipakai di |
|---|---|
| `PegawaiTableResponse` | `GET /pegawai` (tabel data pegawai) — kolom terpakai: NIPAM, Nama, Organisasi, Jabatan, Profesi, Golongan/Pangkat, Status Pegawai |
| `PegawaiResponseSession` | `GET /pegawai/{id}/session` (identity bridge ringan) |
| `PegawaiResponseDetail` | `GET /pegawai/{id}` (dashboard) |
| `PegawaiResponseRingkasan` | `GET /pegawai/{id}/ringkasan` |
| `PegawaiListResponse` | `GET /pegawai/list` (dropdown / autocomplete) |

## Status

- ✅ Tipe (`src/types/pegawai/pegawai.ts`) sudah di-generate via `extract-types.js`.
- ✅ `getPegawaiSession()` memanggil `GET /pegawai/{$id}` untuk identity bridge.
- ✅ Endpoint baru `/pegawai/{id}/session` — tipe `PegawaiResponseSession` siap untuk identity bridge ringan.
- ✅ Data Pegawai page (3 tab) mengonsumsi `/pegawai` (Aktif/Non-aktif) & `/profil/biodata` (Non-pegawai).
- ⏳ Tabel Data Pegawai masih menge-type kolom sebagai `PegawaiListResponse` & baca `golongan.golongan` (field mati di response baru) → kolom Golongan kosong senyap. Fix di **`kepegawaian-fe-p9g`**: swap ke `PegawaiTableResponse`, kolom Golongan/Pangkat = `pangkatGolongan` (string **sudah diformat BE**, FE tak merekonstruksi). Lihat [CLAIM-ORDER-data-pegawai-table.md](../CLAIM-ORDER-data-pegawai-table.md).
- ✅ Dashboard memakai data dari `PegawaiResponseDetail` (via `getPegawaiSession()`).
- ⏳ Edit profil/gaji via PATCH belum dipasang di Dashboard (rencana rilis berikutnya).
