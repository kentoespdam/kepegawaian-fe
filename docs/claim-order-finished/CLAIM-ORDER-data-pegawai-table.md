# Claim Order — Data Pegawai: konsumsi `PegawaiTableResponse` baru

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**,
> bukan file ini. File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Masalah.** `GET /pegawai` sekarang mengembalikan `PageEnvelope<PegawaiTableResponse>`
(shape flat baru). Tapi `data-pegawai-client.tsx` masih menge-type kolom sebagai
`PegawaiListResponse` dan membaca `i.golongan?.golongan` — field yang **sudah tidak ada**
di response baru → kolom "Golongan" render **kosong senyap**. `organisasi?.nama` &
`jabatan?.nama` masih jalan (keduanya `RefMiniResponse {id,nama}`).

**Perubahan bersifat bedah — SATU file:** `src/app/(app)/kepegawaian/data/data-pegawai-client.tsx`.
Hanya `pegawaiColumns` (baris 17–23) + import type (baris 8). Sisanya jangan disentuh.

## Keputusan desain (hasil grill — dikunci)

1. **Kolom Aktif/Non-aktif (7):** NIPAM · Nama · Organisasi · Jabatan · Profesi · Golongan/Pangkat · Status Pegawai.
2. **Golongan/Pangkat = `pangkatGolongan` apa adanya.** BE **sudah** memformat string ini
   (mis. `C.3 - Staf Tk.I`). FE **tidak** merekonstruksi — tak ada field golongan/pangkat
   terpisah di `PegawaiTableResponse`. Format salah = perbaikan sisi BE, bukan FE.
3. **Status Pegawai:** render `statusPegawai` sebagai **raw string** (mis. `PEGAWAI`).
   Tanpa mapping label / badge (bisa ditambah nanti bila perlu).
4. **Sortable:** `nipam` + `nama` saja — **sama seperti sebelumnya**. Kolom relasional
   (organisasi/jabatan/profesi nested) & `pangkatGolongan`/status **tidak** sortable
   (kontrak sort BE tak menjamin key nested).
5. **Row-click → detail:** **OUT OF SCOPE.** Task ini murni menampilkan response tabel.
   Bila diinginkan, file issue follow-up terpisah.
6. **Tab Non-pegawai (biodata):** **tidak berubah** — tetap `biodataColumns` + endpoint `/profil/biodata`.

## Prasyarat (baca sebelum ngoding)

1. [`docs/design/coding-rules.md`](./design/coding-rules.md) — aturan wajib (baris ≤120).
2. `src/app/(app)/kepegawaian/data/data-pegawai-client.tsx` — file yang diubah.
3. `src/types/pegawai/pegawai.ts` — `PegawaiTableResponse` (sudah di-generate, JANGAN diedit).
4. `src/lib/paging.ts` — seam `fromPage`/`toApiParams` (JANGAN diubah).

## Urutan claim

### 1. `kepegawaian-fe-p9g` — konsumsi `PegawaiTableResponse` di tabel Data Pegawai
**← depends on:** — (ready duluan)

- [x] `gitnexus_impact({target:"DataPegawaiClient", direction:"upstream"})` sebelum edit.
- [x] Ganti import baris 8: `PegawaiListResponse` → `PegawaiTableResponse`.
- [x] `pegawaiColumns` (tipe cell → `PegawaiTableResponse`):
  - [x] `nipam` — `String(i.nipam ?? "")` · `sortable: true, primary: true`
  - [x] `nama` — `String(i.nama ?? "")` · `sortable: true`
  - [x] `organisasi` — `String(i.organisasi?.nama ?? "")`
  - [x] `jabatan` — `String(i.jabatan?.nama ?? "")`
  - [x] `profesi` — `String(i.profesi?.nama ?? "")` **(kolom baru)**
  - [x] `golongan` → **Golongan/Pangkat** — `String(i.pangkatGolongan ?? "")` (ganti `i.golongan?.golongan` yang mati)
  - [x] `statusPegawai` — `String(i.statusPegawai ?? "")` **(kolom baru)**
- [x] Hapus semua referensi `i.golongan?.golongan`.
- [x] **JANGAN** sentuh: `paging.ts`, `biodataColumns`, `TABS`, blok fetch/`useQuery`, `types/pegawai/pegawai.ts`.
- [x] `gitnexus_detect_changes()` sebelum commit (harus hanya 1 file).
- [x] Quality gate: `bun run tsc --noEmit` + `bunx biome check`.
- [ ] `bd close kepegawaian-fe-p9g` — commit & push.

## Definition of Done

- [x] Kolom Golongan/Pangkat terisi dari `pangkatGolongan` (bukan kosong).
- [x] Tak ada lagi `i.golongan?.golongan` di file.
- [x] Hanya `data-pegawai-client.tsx` berubah.
- [x] `tsc --noEmit` & `biome check` lolos.
- [x] Tab Non-pegawai tak tersentuh.

## Invarian yang tak boleh dilanggar

- **Tipe generated** (`src/types/pegawai/pegawai.ts`) TIDAK diedit manual.
- **`paging.ts`** TIDAK berubah — 0-based↔1-based seam sudah benar.
- **Kontrak sort** TIDAK diperluas — `nipam`+`nama` saja.
- **`biodataColumns` / tab Non-pegawai** TIDAK berubah.
