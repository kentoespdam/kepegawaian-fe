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

- [ ] Baca **ADR-0039** (keputusan arsitektur) — wajib sebelum koding
- [ ] Baca **FE-CONTRACT-profil-update-rbac.md §5.1** — kontrak endpoint self vs admin
- [ ] Baca **coding-rules.md** — aturan mengikat
- [ ] Aktifkan `/ponytail` — paksa solusi paling sederhana (YAGNI)
- [ ] `npx gitnexus analyze` — pastikan index fresh

---

## Claim Order

### Step 0 — Explorasi & Impact Analysis (WAJIB sebelum edit kode)

- [ ] `gitnexus_impact({ target: "SectionConf", direction: "upstream" })` — blast radius SectionConf
- [ ] `gitnexus_impact({ target: "SectionRightPanel", direction: "upstream" })` — blast radius komponen
- [ ] `gitnexus_context({ name: "useSelfBiodataMutation" })` — pelajari pola mutation self-service yang sudah ada
- [ ] Baca `src/components/confirm-delete-dialog.tsx` — pahami props ConfirmDeleteDialog
- [ ] Baca `src/components/crud-form.tsx` — pahami props CrudForm + FormField type
- [ ] Baca `src/hooks/useSelfBiodataMutation.ts` — template hook mutation self-service

---

### Step 1 — Buat 5 Config File per Entity

Buat di `src/config/profil/`:

#### 1a. `keluarga.config.ts`

- [ ] Import types dari `@/types/profil/keluarga` + `@/types/_shared`
- [ ] Buat `keluargaFormSchema` (Zod): wajib `nama`, `jenisKelamin`, `agama`, `hubunganKeluarga`, `tempatLahir`, `tanggalLahir`, `tanggungan`, `statusKawin` (boolean) — sisanya optional
- [ ] Buat `keluargaFormFields: FormField[]` — field definitions untuk CrudForm
- [ ] Export `keluargaMutationUrl` helper: `{ post: '/api/proxy/profil/keluarga', put: (id) => '/api/proxy/profil/keluarga/{id}', delete: (id) => '/api/proxy/profil/keluarga/{id}' }`
- [ ] **Catatan biodataId**: setiap POST request wajib menyertakan `biodataId` (NIK) dari sesi — inject di mutation hook, **tidak** dari input user form

#### 1b. `pendidikan.config.ts`

- [ ] Buat `pendidikanFormSchema` (Zod): wajib `institusi`; optional jenjangPendidikanId, jurusan, kota, tahunMasuk, tahunLulus, gpa, isLulus, isLatest, gelarDepan, gelarBelakang
- [ ] Buat `pendidikanFormFields: FormField[]`
- [ ] Export `pendidikanMutationUrl` helpers
- [ ] **Catatan**: `jenjangPendidikanId` butuh FK combobox ke `/master/jenjang-pendidikan/list` (cek apakah endpoint tersedia)

#### 1c. `pengalaman-kerja.config.ts`

- [ ] Buat `pengalamanKerjaFormSchema` (Zod): wajib `namaPerusahaan`; optional typePerusahaan, jabatan, lokasi, tahunMasuk, tahunKeluar, notes
- [ ] Buat `pengalamanKerjaFormFields: FormField[]`
- [ ] Export mutation URL helpers

#### 1d. `keahlian.config.ts`

- [ ] Buat `keahlianFormSchema` (Zod): wajib `institusi`, `kualifikasi` (TingkatKemampuan enum); optional keahlianId, sertifikasi, tahun, masaBerlaku
- [ ] Buat `keahlianFormFields: FormField[]`
- [ ] Export mutation URL helpers
- [ ] **Catatan**: `kualifikasi` = enum `TingkatKemampuan` — cek nilai di `_shared.ts`, buat options list

#### 1e. `pelatihan.config.ts`

- [ ] Buat `pelatihanFormSchema` (Zod): wajib `nama`, `lembaga`, `tanggalMulai`, `tanggalSelesai`, `nilai`; optional jenisPelatihanId, lulus, ikatanDinas, tanggalAkhirIkatan, notes
- [ ] Buat `pelatihanFormFields: FormField[]`
- [ ] Export mutation URL helpers

---

### Step 2 — Tambah Mutation Hooks (5 hooks, pola useSelfBiodataMutation)

Buat di `src/hooks/`:

- [ ] `useSelfKeluargaMutation.ts` — POST/PUT/DELETE `/api/proxy/profil/keluarga`
- [ ] `useSelfPendidikanMutation.ts` — POST/PUT/DELETE `/api/proxy/profil/pendidikan`
- [ ] `useSelfPengalamanKerjaMutation.ts` — POST/PUT/DELETE `/api/proxy/profil/pengalaman-kerja`
- [ ] `useSelfKeahlianMutation.ts` — POST/PUT/DELETE `/api/proxy/profil/keahlian`
- [ ] `useSelfPelatihanMutation.ts` — POST/PUT/DELETE `/api/proxy/profil/pelatihan`

**Pola tiap hook** (ponytail — sesimpel mungkin):
```ts
// Minimal: createMutation, updateMutation, deleteMutation
// onSuccess: invalidateQueries([queryKey section]) + toast sukses
// onError: toast error dari response envelope
// biodataId di-inject dari prop/parameter hook (dari sesi — BUKAN dari form user)
```

---

### Step 3 — Extend SectionConf + Update section-right-panel.tsx

> ⚠️ Cek ADR-0007 (file-size-as-review-trigger) — right-panel sudah ~410 baris. Bila setelah step ini >600 baris, pertimbangkan ekstrak ke sub-komponen.

- [ ] Tambah optional field `crudConfig` ke `SectionConf`:
  ```ts
  interface CrudConfig {
    formFields: FormField[];
    schema: ZodSchema;
    postMutation: () => UseMutationResult; // tambah
    putMutation: () => UseMutationResult;  // edit
    deleteMutation: () => UseMutationResult; // hapus
    defaultValues: (row: Record<string, unknown>) => Record<string, unknown>; // populate edit form
  }
  interface SectionConf {
    // ... existing fields
    crudConfig?: CrudConfig; // null/undefined = read-only
  }
  ```
- [ ] Update `SECTIONS[]`: tambah `crudConfig` ke 5 section editable (keluarga, pendidikan, pengalaman-kerja, keahlian, pelatihan). 5 section riwayat tetap tanpa `crudConfig`.
- [ ] Di render tiap section:
  - Bila `crudConfig` ada: tambah tombol **"Tambah"** di header AccordionTrigger (atau di atas DataTable), dan kolom **aksi** (Edit + Hapus) per-row
  - **Guard per-row**: bila `row.changedStatus` truthy → unmount tombol Edit & Hapus, tampilkan icon clock/badge "Pending" di baris tersebut
  - Badge "Menunggu" di header section bila ada ≥1 row dengan `changedStatus` truthy
- [ ] Mount satu Dialog per section (di-mount sekali, pass `editingRow` state)
- [ ] Mount satu ConfirmDeleteDialog per section (di-mount sekali, pass `deletingRow` state)

---

### Step 4 — Validasi & Quality Gates

- [ ] `bun run build` — zero TypeScript error
- [ ] `bunx biome check` — zero lint error
- [ ] Manual test di browser (dev server):
  - [ ] Tambah data keluarga → muncul di tabel + badge "Menunggu" pada row baru
  - [ ] Edit data pending → tombol Edit hilang (guard)
  - [ ] Hapus data pending → tombol Hapus hilang (guard)
  - [ ] Delete non-pending → ConfirmDeleteDialog muncul, perlu ketik HAPUS
  - [ ] Tambah pada section lain (pendidikan, pengalaman, keahlian, pelatihan)
  - [ ] 5 section riwayat (mutasi, SK, kontrak, penggajian, SP) tetap read-only

---

### Step 5 — Update Docs & Graph

- [ ] Update `docs/context/kepegawaian-dashboard.md` — tambah catatan CRUD per-section di §Panel KANAN
- [ ] `npx gitnexus analyze` — re-index
- [ ] `npx gitnexus detect-changes -s unstaged -r kepegawaian-fe` — verifikasi scope
- [ ] `/graphify . --update` — update knowledge graph

---

### Step 6 — Close & Ship

- [ ] `bd close <issue-id>`
- [ ] `git add docs/ src/`
- [ ] `git commit -m "feat: dashboard panel kanan CRUD self-service 5 entitas profil"`
- [ ] `git pull --rebase`
- [ ] `bd dolt push`
- [ ] `git push`
- [ ] `git status` — pastikan "up to date with origin"

---

## Catatan Implementasi Penting

### biodataId — Inject dari Sesi, BUKAN Form

Semua `POST` request ke `/profil/{entity}` membutuhkan `biodataId` (= NIK). Field ini **tidak** ditampilkan di form dan **tidak** dari input user — di-inject dari prop `nik` yang sudah diteruskan ke `SectionRightPanel`. Pattern: hook mutation menerima `nik` sebagai parameter.

### changedStatus Per-Row — Verifikasi Tipe

Field `changedStatus` di response row profil bertipe `string | byte` (bukan `boolean`). Dari tipe yang ada:
- `KeluargaQuery.changedStatus?: boolean`
- `KeahlianQuery.changedStatus?: string` (byte)
- `PengalamanKerjaQuery.changedStatus?: string` (byte)

Guard: gunakan `Boolean(row.changedStatus)` atau `!!row.changedStatus` — truthy = ada pending.

### FK Combobox — Jenjang Pendidikan

`pendidikan.config.ts` butuh FK picker untuk `jenjangPendidikanId`. Cek apakah endpoint `GET /master/jenjang-pendidikan/list` tersedia. Bila belum → gunakan text input sementara + catat sebagai known-limitation.

### Enum TingkatKemampuan — Keahlian

Field `kualifikasi` di `KeahlianPostRequest` bertipe `TingkatKemampuan` enum. Cari definisi di `_shared.ts` dan buat options list untuk select field.

### Section-Right-Panel Size Guard

Bila setelah CRUD ditambah file >600 baris → ekstrak `SectionCrudSlot` komponen terpisah ke `src/app/(app)/kepegawaian/dashboard/section-crud-slot.tsx` (render Dialog + form per section).

---

## Known Limitations (Catat, Jangan Fix Sekarang)

1. **Approval queue read per-section** belum bisa dideteksi secara akurat dari tabel — `changedStatus` hanya per-row dari list, bukan aggregated status section. Badge "Menunggu" di header = ada ≥1 row pending di page yang sedang tampil.
2. **Foto profil** tetap read-only (ADR-0011 — upload menyusul).
3. **Lampiran per-entitas** (upload file) ditunda — endpoint ada (`POST /profil/{entity}/lampiran`) tapi out-of-scope iterasi ini.
4. **FK jenjang pendidikan** — mungkin perlu konfirmasi endpoint `/master/jenjang-pendidikan/list` tersedia sebelum implementasi combobox.
