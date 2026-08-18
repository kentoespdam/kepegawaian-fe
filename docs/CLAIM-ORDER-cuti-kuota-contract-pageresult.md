# Claim Order — Cuti: Migrasi Kontrak `GET /cuti/kuota` → PageResult + Grid Carry-Over

> **Konteks:** Backend `rewrite/master-cqrs` mengubah kontrak index kuota cuti — envelope
> `SingleResult` → `PageResult`, `data.additional` → `data.kuotaTahunSebelumnya`, kosong →
> 200 + page kosong. Dokumen kontrak: `docs/frontend/FE-CONTRACT-cuti-kuota-index.md`.
> Keputusan grill 2026-08-18: `docs/context/cuti.md` CU-3 (revisi) & CU-15, **ADR-0040 FE**
> (`docs/adr/0040-grid-kuota-carry-over-dua-tahun.md`).
> **Status:** spec sudah di-sync (`bun run spec:sync`) — tipe generated sudah baru.

## Konteks

| Item | Nilai |
|------|-------|
| Endpoint | `GET /cuti/kuota` (index) — envelope `PageResult`, `data.page` + `data.kuotaTahunSebelumnya` |
| Detail & sisa | `/{id}`, `/{pegawaiId}/{tahun}/sisa` — TIDAK berubah (SingleResult + 404) |
| Tipe generated | `src/types/cuti/kuota.ts` — `PageResultCutiKuotaPegawaiResponse = PageEnvelope<unknown>` (jangan dipakai; cast inline `as { data: CutiKuotaPegawaiResponse }`) |
| Tests terkait | `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/cuti/page.test.tsx`, `src/app/(app)/cuti/pengajuan/pengajuan-page-client.test.tsx` |

## Aturan (knowledge.md / coding-rules)

- **WAJIB** baca `docs/design/coding-rules.md` + aktifkan `/ponytail` sebelum menulis kode.
- Explore: graphify → gitnexus → grep (last resort). `gitnexus_impact` sebelum edit simbol.
- Tipe generated (`src/types/**`) **tidak diedit manual**.
- `bun run build` zero-error, `bunx biome check` bersih, `bun run test` hijau.
- Update graph (gitnexus analyze + graphify) sebelum commit; commit & push sesuai protokol.

## Urutan Kerja

### Step 1 — Halaman kuota `/cuti/kuota` (grid carry-over)

File: `src/app/(app)/cuti/kuota/kuota-page-client.tsx`

- [ ] Ganti `SingleResultCutiKuotaPegawaiResponse` (sudah tidak ada) → cast inline
      `as { data: CutiKuotaPegawaiResponse }` di queryFn.
- [ ] Join `kuotaTahunSebelumnya` by `pegawaiId`: `Map` dari `prev.pegawai?.id` → baris Y−1.
- [ ] Kolom baru (satu baris per pegawai, dari `page.content`):
      NIPAM, Nama, Status Pegawai (`labelStatus(pegawai.statusPegawai)`), Jabatan,
      Kuota/Terpakai/Sisa `{tahun}`, Kuota/Terpakai/Sisa `{tahun−1}`, Aksi (Edit/Hapus).
- [ ] Kuota = `kuota + kuotaTambahan`; Terpakai = `kuotaTerpakai`; Sisa = `sisaKuota` (apa adanya).
- [ ] Header dinamis: `Kuota ${tahun}` dst. Pegawai tanpa baris Y−1 → "—".
- [ ] Hapus kolom lama: No, Tahun, Tambahan, Expired.
- [ ] Toolbar (Nama/NIPAM/Tahun/Import/Tambah) & pagination tetap.

### Step 2 — Strip K-C5 (`pengajuan` & `riwayat/cuti`)

File:
- `src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx` (`KuotaStrip`)
- `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/cuti/page.tsx` (`KuotaStrip`)

- [ ] Ganti `[...page.content, ...additional]` → `page.content` saja (filter `pegawaiId`+`tahun`
      → ≤1 baris). Cari `row.tahun === tahun` di `page.content`.
- [ ] Hapus handling `isNotFound(error)` (index tak pernah 404 lagi) — `noRecord = !row` saja;
      pesan error fetch tetap "Gagal memuat kuota cuti.".
- [ ] Cast body: `as { data: CutiKuotaPegawaiResponse }` (sudah pola ini).

### Step 3 — Tests

- [ ] `riwayat/cuti/page.test.tsx`: mock kuota ganti `additional` → `kuotaTahunSebelumnya`
      (atau baris di `page.content` sesuai perilaku baru K-C5).
- [ ] `pengajuan-page-client.test.tsx`: mock `additional: []` → sesuaikan shape baru.
- [ ] Test 404 → "Data tidak ditemukan" di riwayat/cuti: **hapus/pindah** — index kuota tak 404
      lagi; pastikan test tetap hijau untuk jalur baru.
- [ ] Tambah/update test grid kuota bila ada (kolom baru, join Y−1, "—" saat kosong).

### Step 4 — Quality gates

- [ ] `bun run build` — zero error.
- [ ] `bunx biome check` — bersih.
- [ ] `bun run test` — hijau.
- [ ] Periksa hasil samping sync: `src/types/_shared.ts` & `src/types/system/users.ts` berubah
      (backend lebih baru) — pastikan tidak memecah kode; di luar scope → jangan perbaiki ad-hoc,
      buat issue baru bila perlu.

### Step 5 — Docs & ship

- [ ] Tandai checklist `docs/frontend/FE-CONTRACT-cuti-kuota-index.md` & MD ini.
- [ ] `bd close <id>` — complete issue.
- [ ] `git pull --rebase` → `bd dolt push` → `git push` → `git status` "up to date".

## Referensi

- `docs/frontend/FE-CONTRACT-cuti-kuota-index.md` — kontrak (bagian 6 = keputusan FE).
- `docs/context/cuti.md` — CU-3 (grid carry-over), CU-15 (kontrak PageResult), terminologi.
- `docs/adr/0040-grid-kuota-carry-over-dua-tahun.md` — ADR keputusan grid carry-over.
- `src/types/cuti/kuota.ts` — tipe generated baru.
- `src/lib/enum-labels.ts` — `labelStatus()` untuk kolom Status Pegawai.
