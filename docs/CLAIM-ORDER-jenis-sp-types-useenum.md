# Claim Order — Sync jenis-sp types & fix useEnum bug

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Latar belakang.** Ada 2 perubahan:
1. **API response `jenis-sp`** untuk `GET` page & list bertambah: `JenisSpListResponse` sekarang punya `kode`, `JenisSpQuery` punya `sanksiList?: SanksiRow[]`, interface baru `SanksiRow`.
2. **Bug `useEnum`:** `api.listAll` menggunakan `handle<T>` yang sudah me-unwrap envelope (return `body.data`), tapi `useEnum` masih melakukan type-cast ke tipe envelope dan mengakses `.data` lagi — menghasilkan `undefined` karena data runtime sudah array (bukan object dengan properti `.data`). Ini menyebabkan `useEnum` selalu return `[]` untuk SEMUA entity.

**Keputusan terkunci:**

1. `src/types/master/jenis-sp.ts` WAJIB sync persis dengan `docs/api/master/types/jenis-sp.ts`.
2. `useEnum` WAJIB diubah: type cast langsung ke `T[]` (array), hapus akses `.data`.
3. JANGAN ubah `api` client (`handle<T>`) — pola unwrap sudah benar dan dipakai oleh semua pemanggil.

---

## Prasyarat (baca sebelum ngoding)

1. `src/types/master/jenis-sp.ts` — tipe existing yang perlu di-sync.
2. `docs/api/master/types/jenis-sp.ts` — sumber kebenaran (sudah di-update).
3. `src/hooks/useEnum.ts` — bug site.
4. `src/lib/api/client.ts` — `handle<T>` yang me-unwrap envelope.
5. `gitnexus_impact` sebelum edit simbol; `gitnexus_detect_changes` sebelum commit.

---

## Urutan claim

`bd ready` memunculkan issue yang blocker-nya tuntas. Kedua issue independen — bisa dikerjakan paralel.

### 1. `kepegawaian-fe-mjy` — Sync `src/types/master/jenis-sp.ts` dengan API response changes (TASK, P2)
**← depends on:** — (ready duluan)

- [x] Tambah `SanksiRow` interface (id, kode, keterangan)
- [x] Tambah `sanksiList?: SanksiRow[]` ke `JenisSpQuery`
- [x] Tambah `kode?: string` ke `JenisSpListResponse`
- [x] Typecheck lulus
- [x] `bd close`

### 2. `kepegawaian-fe-r9l` — Fix `useEnum` bug — akses `.data` pada data sudah di-unwrap (BUG, P2)
**← depends on:** — (ready duluan)

- [x] Ubah type cast di cabang `status-pegawai`: `ListResultStatusPegawaiResponse` → `StatusPegawaiResponse[]`, hapus `.data`
- [x] Ubah type cast di cabang `jenis-sp`: `ListResultJenisSpListResponse` → `JenisSpListResponse[]`, hapus `.data`
- [x] Ubah type cast di cabang default: `ListResultEnumOption` → `EnumOption[]`, hapus `.data`
- [x] Typecheck lulus
- [x] `bd close`

---

## Batasan (JANGAN)

- **JANGAN** ubah `api` client (`src/lib/api/client.ts`) — `handle<T>` sudah benar.
- **JANGAN** ubah file selain yang disebut di atas (scope creep).
- **JANGAN** ubah `docs/api/master/types/jenis-sp.ts` — itu sumber kebenaran hasil generate.
