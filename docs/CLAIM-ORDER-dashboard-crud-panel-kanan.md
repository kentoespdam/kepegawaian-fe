# CLAIM-ORDER: Dashboard Panel Kanan — CRUD Self-Service (5 Entitas Profil)

> ADR: [ADR-0039](adr/0039-dashboard-panel-kanan-crud-self-service.md)
> Konteks: [kepegawaian-dashboard.md](context/kepegawaian-dashboard.md)
> FE Contract: [FE-CONTRACT-profil-update-rbac.md](FE-CONTRACT-profil-update-rbac.md) §5.1

## Tujuan

Membuka CRUD self-service di panel kanan Dashboard Pegawai untuk 5 entitas profil:
**Keluarga, Pendidikan, Pengalaman Kerja, Keahlian, Pelatihan**.

Semua perubahan via self-endpoint (`/profil/{entity}/...`) — selalu masuk approval queue (`changedStatus=true`).

---

## Dependency Sebelum Mulai

- [x] Baca **ADR-0039** (keputusan arsitektur) — wajib sebelum koding
- [x] Baca **FE-CONTRACT-profil-update-rbac.md §5.1** — kontrak endpoint self vs admin
- [x] Baca **coding-rules.md** — aturan mengikat
- [x] Aktifkan `/ponytail` — paksa solusi paling sederhana (YAGNI)
- [x] `npx gitnexus analyze` — pastikan index fresh

---

## Claim Order

### Step 0 — Explorasi & Impact Analysis (WAJIB sebelum edit kode)

- [x] `gitnexus_impact({ target: "SectionConf", direction: "upstream" })` — blast radius LOW (2 file upstream: dashboard-client, page)
- [x] `gitnexus_impact({ target: "SectionRightPanel", direction: "upstream" })` — blast radius LOW (dashboard-client → page)
- [x] `gitnexus_context({ name: "useSelfBiodataMutation" })` — pola mutation self-service dipelajari
- [x] Baca `src/components/confirm-delete-dialog.tsx` — props ConfirmDeleteDialog dipahami
- [x] Baca `src/components/crud-form.tsx` — props CrudForm + FormField type dipahami
- [x] Baca `src/hooks/useSelfBiodataMutation.ts` — template hook mutation self-service dipahami

---

### Step 1 — Buat 5 Config File per Entity ✅

Buat di `src/config/profil/`:

#### 1a. `keluarga.config.ts` ✅

- [x] Import types dari `@/types/profil/keluarga` + `@/types/_shared`
- [x] Buat `keluargaFormSchema` (Zod): wajib `nama`, `jenisKelamin`, `agama`, `hubunganKeluarga`, `tempatLahir`, `tanggalLahir`, `tanggungan`, `statusKawin` (boolean) — sisanya optional
- [x] Buat `keluargaFormFields: FormField[]` — field definitions untuk CrudForm
- [x] Export `keluargaMutationUrl` helper: `{ post: '/api/proxy/profil/keluarga', put: (id) => '/api/proxy/profil/keluarga/{id}', delete: (id) => '/api/proxy/profil/keluarga/{id}' }`
- [x] **Catatan biodataId**: setiap POST request wajib menyertakan `biodataId` (NIK) dari sesi — inject di mutation hook, **tidak** dari input user form
- [x] Export `keluargaCrudConfig` (label, schema, fields, fkSources, defaultValues) — dipakai `SectionConf.crudConfig`

#### 1b. `pendidikan.config.ts` ✅

- [x] Buat `pendidikanFormSchema` (Zod): wajib `institusi`; optional jenjangPendidikanId, jurusan, kota, tahunMasuk, tahunLulus, gpa, isLulus, isLatest, gelarDepan, gelarBelakang
- [x] Buat `pendidikanFormFields: FormField[]`
- [x] Export `pendidikanMutationUrl` helpers
- [x] **Catatan**: `jenjangPendidikanId` pakai FK combobox ke `/master/jenjang-pendidikan/list` — **endpoint tersedia** (types: `ListResultJenjangPendidikanResponse`)
- [x] Export `pendidikanCrudConfig`

#### 1c. `pengalaman-kerja.config.ts` ✅

- [x] Buat `pengalamanKerjaFormSchema` (Zod): wajib `namaPerusahaan`; optional typePerusahaan, jabatan, lokasi, tahunMasuk, tahunKeluar, notes
- [x] Buat `pengalamanKerjaFormFields: FormField[]`
- [x] Export mutation URL helpers
- [x] Export `pengalamanKerjaCrudConfig`

#### 1d. `keahlian.config.ts` ✅

- [x] Buat `keahlianFormSchema` (Zod): wajib `institusi`, `kualifikasi` (TingkatKemampuan enum); optional keahlianId, sertifikasi, tahun, masaBerlaku
- [x] Buat `keahlianFormFields: FormField[]`
- [x] Export mutation URL helpers
- [x] **Catatan**: `kualifikasi` = enum `TingkatKemampuan` (`KURANG | BAIK | CUKUP` di `_shared.ts`) — options list dibuat inline di config
- [x] Export `keahlianCrudConfig`

#### 1e. `pelatihan.config.ts` ✅

- [x] Buat `pelatihanFormSchema` (Zod): wajib `nama`, `lembaga`, `tanggalMulai`, `tanggalSelesai`, `nilai`; optional jenisPelatihanId, lulus, ikatanDinas, tanggalAkhirIkatan, notes
- [x] Buat `pelatihanFormFields: FormField[]`
- [x] Export mutation URL helpers
- [x] Export `pelatihanCrudConfig`

---

### Step 2 — Tambah Mutation Hooks ✅

Buat di `src/hooks/`:

- [x] `useSelfKeluargaMutation.ts` — POST/PUT/DELETE `/api/proxy/profil/keluarga`
- [x] `useSelfPendidikanMutation.ts` — POST/PUT/DELETE `/api/proxy/profil/pendidikan`
- [x] `useSelfPengalamanKerjaMutation.ts` — POST/PUT/DELETE `/api/proxy/profil/pengalaman-kerja`
- [x] `useSelfKeahlianMutation.ts` — POST/PUT/DELETE `/api/proxy/profil/keahlian`
- [x] `useSelfPelatihanMutation.ts` — POST/PUT/DELETE `/api/proxy/profil/pelatihan`

**Pola tiap hook** (ponytail — sesimpel mungkin):
- [x] Minimal: createMutation, updateMutation, deleteMutation
- [x] onSuccess: invalidateQueries([queryKey section]) + toast sukses
- [x] biodataId di-inject dari prop/parameter hook (dari sesi — BUKAN dari form user)
- [x] **Implementasi**: 5 file hook tipis di atas satu core `useSelfProfilMutation` (DRY — duplikasi hanya glue tipis per-entitas, sesuai coding-rules). Core menangani fetch + unwrap envelope + extract error (RFC-7807/`message`/`errors`). Error ditampilkan **inline di form** (catch `mutateAsync` → `CrudForm.error` / `ConfirmDeleteDialog.error`), bukan toast — konsisten pola biodata (section-left-panel) & coding-rules §8.

---

### Step 3 — Extend SectionConf + Update section-right-panel.tsx ✅

- [x] Tambah optional field `crudConfig` ke `SectionConf` (interface `CrudConfig`: label, formSchema, formFields, fkSources, defaultValues)
- [x] Update `SECTIONS[]`: tambah `crudConfig` ke 5 section editable (keluarga, pendidikan, pengalaman-kerja, keahlian, pelatihan). 5 section riwayat tetap tanpa `crudConfig`.
- [x] Di render tiap section:
  - [x] Bila `crudConfig` ada: tombol **"Tambah"** di atas DataTable (ADR #9), dan kolom **Aksi** (Edit + Hapus) per-row
  - [x] **Guard per-row**: bila `row.changedStatus` truthy → tombol Edit & Hapus di-unmount, tampil badge "Menunggu" (ikon Clock) di baris
  - [x] Badge "Menunggu" di header section bila ada ≥1 row dengan `changedStatus` truthy (data page yang sedang tampil — known limitation #1)
- [x] Mount satu Dialog per section (di-mount sekali di `SectionCrudSlot`, pass `editing` state)
- [x] Mount satu ConfirmDeleteDialog per section (di-mount sekali, pass `deleting` state)
- [x] Ekstrak `SectionCrudSlot` ke `src/app/(app)/kepegawaian/dashboard/section-crud-slot.tsx` (file right-panel tetap ~410 baris)
- [x] FK combobox: options di-fetch via `useFkOptions` di parent (`jenjang-pendidikan`, `jenis-keahlian`, `jenis-pelatihan` — semua `/list` tersedia), di-merge ke field `type: "combobox"`

---

### Step 4 — Validasi & Quality Gates

- [x] `bun run build` — zero TypeScript error
- [x] `bunx biome check` — zero lint error
- [x] `bun run test` — 156 tests hijau (termasuk 11 test baru `src/config/profil/profil-configs.test.ts` — transform schema + defaultValues)
- [ ] Manual test di browser (dev server) — **belum dijalankan** (butuh sesi login + backend):
  - [ ] Tambah data keluarga → muncul di tabel + badge "Menunggu" pada row baru
  - [ ] Edit data pending → tombol Edit hilang (guard)
  - [ ] Hapus data pending → tombol Hapus hilang (guard)
  - [ ] Delete non-pending → ConfirmDeleteDialog muncul, perlu ketik HAPUS
  - [ ] Tambah pada section lain (pendidikan, pengalaman, keahlian, pelatihan)
  - [ ] 5 section riwayat (mutasi, SK, kontrak, penggajian, SP) tetap read-only

---

### Step 5 — Update Docs & Graph

- [x] Update `docs/context/kepegawaian-dashboard.md` — tambah catatan CRUD per-section di §Panel KANAN
- [x] `npx gitnexus analyze` — re-index
- [x] `npx gitnexus detect-changes -s unstaged -r kepegawaian-fe` — verifikasi scope
- [x] `/graphify . --update` — update knowledge graph

---

### Step 6 — Close & Ship

- [ ] `bd close <issue-id>` — (isi: lihat `.beads/issues.jsonl` / `bd ready`)
- [x] `git add docs/ src/`
- [ ] `git commit -m "feat: dashboard panel kanan CRUD self-service 5 entitas profil"`
- [ ] `git pull --rebase`
- [ ] `bd dolt push`
- [ ] `git push`
- [ ] `git status` — pastikan "up to date with origin"

---

## Catatan Implementasi Penting

### biodataId — Inject dari Sesi, BUKAN Form

Semua `POST` request ke `/profil/{entity}` membutuhkan `biodataId` (= NIK). Field ini **tidak** ditampilkan di form dan **tidak** dari input user — di-inject dari prop `nik` yang sudah diteruskan ke `SectionRightPanel`. Pattern: hook mutation menerima `nik` sebagai parameter (spread `{ ...data, biodataId: nik }` di core `useSelfProfilMutation`).

### changedStatus Per-Row — Verifikasi Tipe

Field `changedStatus` di response row profil bertipe `string | byte` (bukan `boolean`). Dari tipe yang ada:
- `KeluargaQuery.changedStatus?: boolean`
- `KeahlianQuery.changedStatus?: string` (byte)
- `PengalamanKerjaQuery.changedStatus?: string` (byte)

Guard: gunakan `Boolean(row.changedStatus)` atau `!!row.changedStatus` — truthy = ada pending.

### FK Combobox — Jenjang Pendidikan (TERSEDIA)

`pendidikan.config.ts` butuh FK picker untuk `jenjangPendidikanId`. Endpoint `GET /master/jenjang-pendidikan/list` **tersedia** (`ListResultJenjangPendidikanResponse`) — combobox dipakai. Begitu juga `jenis-keahlian/list` (keahlianId) dan `jenis-pelatihan/list` (jenisPelatihanId).

### Enum TingkatKemampuan — Keahlian

Field `kualifikasi` di `KeahlianPostRequest` bertipe `TingkatKemampuan` enum (`KURANG | BAIK | CUKUP`). Options list dibuat inline di `keahlian.config.ts`.

### Section-Right-Panel Size Guard

CRUD diekstrak ke `src/app/(app)/kepegawaian/dashboard/section-crud-slot.tsx` (render DataTable + tombol Tambah + kolom Aksi + Dialog + ConfirmDeleteDialog per section). `section-right-panel.tsx` tetap ~410 baris — di bawah ambang 600.

---

## Known Limitations (Catat, Jangan Fix Sekarang)

1. **Approval queue read per-section** belum bisa dideteksi secara akurat dari tabel — `changedStatus` hanya per-row dari list, bukan aggregated status section. Badge "Menunggu" di header = ada ≥1 row pending di page yang sedang tampil (query section lazy — badge baru terlihat saat section dibuka/data ter-cache).
2. **Foto profil** tetap read-only (ADR-0011 — upload menyusul).
3. **Lampiran per-entitas** (upload file) ditunda — endpoint ada (`POST /profil/{entity}/lampiran`) tapi out-of-scope iterasi ini.
4. ~~FK jenjang pendidikan~~ — ✅ **terkonfirmasi tersedia** (`/master/jenjang-pendidikan/list`), combobox dipakai.
5. **`pendidikanId` & `nik` keluarga** (opsional di `ProfilKeluargaPostRequest`) tidak punya input di form — FK master-nya tidak jelas/tidak ditampilkan; optional property boleh tanpa input (coding-rules §8).
6. **`changedStatus` byte string** (`"0"`/`"1"`) jika BE mengirim string non-kosong untuk nilai 0 → badge "Menunggu" false-positive. Guard `Boolean()` mengikuti instruksi CLAIM-ORDER; validasi nilai aktual saat manual test.
