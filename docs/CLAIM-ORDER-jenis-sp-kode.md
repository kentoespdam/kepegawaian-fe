# Claim Order — Form jenis-SP kirim `kode` + `nama`

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.

**Bug.** Form input jenis-SP hanya mengirim `nama`. Kontrak API menerima **`kode` + `nama`**
(`JenisSpPostRequest`), jadi `kode` **diam-diam hilang** tiap create/update. Filter `kode` di
toolbar memfilter data yang form tak pernah bisa isi.

**Root cause.** `src/config/master/jenis-sp.config.ts` pakai `simpleNameSchema` + `[nameField]` +
`[nameCol]` — hanya `nama`. Kontrak (`src/types/master/jenis-sp.ts`) jelas `{ kode, nama }`.

**Keputusan terkunci (grill 2026-07-21):**

1. `kode` **wajib** — `kode` & `nama` keduanya `.min(1)` di Zod.
2. Perbaikan **inline** di `jenis-sp.config.ts`. **JANGAN** tambah primitive `kode*` ke `_config-kit`
   (belum ada consumer kedua — YAGNI). Pola acuan: `jabatan.config.ts`.
3. Aturan umum sudah dikunci di [`docs/design/coding-rules.md`](./design/coding-rules.md) **§8**:
   *`fields[]` wajib mencerminkan `*PostRequest`* (property `*Id` boleh via `fkSources[]`;
   `columns`/`searchFields` **tidak** dihitung sebagai input).

---

## Prasyarat (baca sebelum ngoding)

1. [`docs/design/coding-rules.md`](./design/coding-rules.md) **§8** (Form) — aturan cakupan field.
2. `src/types/master/jenis-sp.ts` — kontrak `JenisSpPostRequest` / `JenisSpQuery` (sumber kebenaran).
3. `src/config/master/jabatan.config.ts` — pola kolom `kode` + `nama` + typed `makeConfig<TQuery>`.
4. `src/config/master/_config-kit.ts` — `namaWajib`, `nameField`, `nameCol`, `makeConfig`.
5. ADR-0002 (RHF+Zod), ADR-0003 (generic entity config).
6. `gitnexus_impact` sebelum edit simbol; `gitnexus_detect_changes` sebelum commit. Index stale →
   `npx gitnexus analyze` dulu.

---

## Urutan claim

`bd ready` memunculkan issue yang blocker-nya tuntas. Kerjakan `2zb` dulu — `n0k` terbuka setelahnya
(pakai `2zb` sebagai contoh acuan).

### 1. `kepegawaian-fe-2zb` — Fix form jenis-SP: kirim `kode` + `nama` (BUG, P2)
**← depends on:** — (ready duluan)

Ubah **HANYA** `src/config/master/jenis-sp.config.ts`, inline:

- [x] `schema`: `z.object({ kode: z.string().min(1, "Kode wajib diisi"), nama: namaWajib })`.
      Import `namaWajib` dari `./_config-kit`. **Buang** `simpleNameSchema`.
- [x] `fields`: `[{ name: "kode", label: "Kode", required: true }, nameField]` — `kode` dulu.
- [x] `columns`: `[{ id: "kode", header: "Kode", sortable: true, cell: (item) => String(item.kode ?? "") }, nameCol]`.
- [x] Ketik: `EntityConfig<JenisSpQuery>` + `makeConfig<JenisSpQuery>(...)`, import `JenisSpQuery`
      dari `@/types/master/jenis-sp` (supaya `item.kode` ter-type).
- [x] `searchFields` tetap (`kode` + `nama`) — sekarang valid.
- [x] `kode` kosong → error **inline** "Kode wajib diisi" (bukan toast).
- [x] Verifikasi runtime: create → `GET list` bawa `kode`; edit → `kode` tersimpan; filter `kode` nemu baris.
- [x] Quality gate (`bunx biome check` + build) + `gitnexus_detect_changes` + `bd close`.

### 2. `kepegawaian-fe-n0k` — Audit semua master config vs `*PostRequest` (TASK, P2)
**← depends on:** `2zb`

Audit tiap `src/config/master/*.config.ts` terhadap `{Entity}PostRequest`-nya. **Tidak ada
perubahan kode produksi di task ini** — audit + filing bug issue baru saja.

- [x] Untuk tiap entity: catat property `*PostRequest`, cek tercakup di `fields[]` **atau**
      `fkSources[]` (`*Id`). `columns`/`searchFields` **tidak** dihitung.
- [x] Verifikasi manual kandidat drift (grep kasar → banyak false-positive dari FK di `fkSources`):
      `alasan-berhenti` (`notes`), `hari-libur` (`notes`), `jenjang-pendidikan`
      (`shortName`/`seq`/`isStatistik`), `profesi` (`detail`/`resiko`), `sanksi` (flags + `potTkk`),
      `organisasi` (`parentId`/`levelOrganisasi`/`shortName`).
- [x] Tiap drift **nyata** → buka bug issue `bd` terpisah (jangan gabung satu commit gemuk).
- [x] Bila nihil selain jenis-sp → tutup task dengan catatan itu.
      **Temuan: 7 drifts nyata di luar jenis-sp. 2 critical (profesi+sanksi), 1 high (jabatan).**
- [x] `bd close`.

#### Checklist tersimpan di `bd show <id>` — lihat notes tiap issue via `bd show` atau `bd update <id> --notes`. Di bawah ringkasan untuk pantauan cepat.

### 3. `kepegawaian-fe-1iz` — Fix form alasan-berhenti: tambah `notes` (BUG, P2)

- [ ] **schema:** Tambah `notes: z.string().optional()` — ganti dari `simpleNameSchema` ke `z.object({ nama: namaWajib, notes: z.string().optional() })`
- [ ] **fields:** Tambah `{ name: "notes", label: "Catatan", type: "textarea" }` setelah `nameField`
- [ ] **columns:** Pastikan kolom `notes` tampil di tabel (atau tambah jika belum)
- [ ] **Ketik:** `EntityConfig<AlasanBerhentiQuery>` + `makeConfig<AlasanBerhentiQuery>(...)`
- [ ] **searchFields:** Pertahankan (`nama`)
- [ ] **Error validasi:** inline di form, JANGAN toast
- [ ] **Quality gate:** `bunx biome check` + `npx tsc --noEmit`
- [ ] **`bd claim` + `bd close` — commit & push**

### 4. `kepegawaian-fe-ywb` — Fix form hari-libur: tambah `notes` (BUG, P2)

- [ ] **schema:** Tambah `notes: z.string().optional()` — schema saat ini `{tanggal, jenisLibur}` jadi `{tanggal, jenisLibur, notes}`
- [ ] **fields:** Tambah `{ name: "notes", label: "Catatan", type: "textarea" }` setelah `jenisLibur`
- [ ] **columns:** Pastikan kolom `notes` tampil (atau tambah)
- [ ] **Ketik:** `EntityConfig<HariLiburQuery>` + `makeConfig<HariLiburQuery>(...)`
- [ ] **searchFields:** Pertahankan (`tahun`, `bulan`, `jenisLibur`)
- [ ] **Error validasi:** inline di form, JANGAN toast
- [ ] **Quality gate:** `bunx biome check` + `npx tsc --noEmit`
- [ ] **`bd claim` + `bd close` — commit & push**

### 5. `kepegawaian-fe-57j` — Fix form jenjang-pendidikan: tambah `shortName`, `seq`, `isStatistik` (BUG, P2)

- [ ] **schema:** Ganti `simpleNameSchema` ke `z.object({ nama: namaWajib, shortName: z.string().optional(), seq: z.coerce.number().optional(), isStatistik: z.boolean().optional() })`
- [ ] **fields:** `[nameField, { name: "shortName", label: "Nama Singkat" }, { name: "seq", label: "Urutan", type: "number" }, { name: "isStatistik", label: "Statistik", type: "select", options: [{value:"true",label:"Ya"},{value:"false",label:"Tidak"}] }]`
- [ ] **columns:** Update — pastikan `shortName`, `seq`, `isStatistik` tampil di tabel
- [ ] **Ketik:** `EntityConfig<JenjangPendidikanResponse>` + `makeConfig<JenjangPendidikanResponse>(...)`
- [ ] **searchFields:** Pertahankan (`nama`)
- [ ] **Error validasi:** inline di form, JANGAN toast
- [ ] **Quality gate:** `bunx biome check` + `npx tsc --noEmit`
- [ ] **`bd claim` + `bd close` — commit & push**

### 6. `kepegawaian-fe-4vc` — Fix form jabatan: tambah `kode` + `levelId` (BUG, P2)

> **Pola identik dengan issue 2zb (jenis-sp).** `kode` required hilang dari fields; `levelId` tidak ada di fkSources.

- [ ] **schema:** Ganti `z.object({ nama: namaWajib })` ke `z.object({ kode: z.string().min(1,"Kode wajib diisi"), nama: namaWajib })`
- [ ] **fields:** `[{ name: "kode", label: "Kode", required: true }, nameField]`
- [ ] **columns:** Pertahankan (kode, nama, levelId, parentId, organisasiId sudah tampil)
- [ ] **fkSources:** Tambah `{ field: "levelId", entity: "level", label: "Level" }`
- [ ] **Ketik:** `EntityConfig<JabatanQuery>` + `makeConfig<JabatanQuery>(...)` — sudah typed
- [ ] **searchFields:** Pertahankan (`kode`, `nama`)
- [ ] **Error validasi:** inline di form, JANGAN toast
- [ ] **Quality gate:** `bunx biome check` + `npx tsc --noEmit`
- [ ] **`bd claim` + `bd close` — commit & push**

### 7. `kepegawaian-fe-qhn` — Fix form organisasi: tambah `kode`, `levelOrganisasi`, `shortName`, `category` (BUG, P2)

- [ ] **schema:** Ganti ke `z.object({ nama: namaWajib, kode: z.string().optional(), levelOrganisasi: z.coerce.number().optional(), shortName: z.string().optional(), category: z.string().optional() })`
- [ ] **fields:** `[nameField, { name: "kode", label: "Kode" }, { name: "levelOrganisasi", label: "Level Organisasi", type: "number" }, { name: "shortName", label: "Kode Kantor" }, { name: "category", label: "Kategori" }]`
- [ ] **columns:** Pertahankan (kode, nama, levelOrganisasi, parent, shortName, category sudah tampil)
- [ ] **Ketik:** `EntityConfig<OrganisasiQuery>` + `makeConfig<OrganisasiQuery>(...)` — sudah typed
- [ ] **searchFields:** Pertahankan (`kode`, `nama`, `category`)
- [ ] **Error validasi:** inline di form, JANGAN toast
- [ ] **Quality gate:** `bunx biome check` + `npx tsc --noEmit`
- [ ] **`bd claim` + `bd close` — commit & push**

### 8. `kepegawaian-fe-8y6` — Fix form profesi: tambah `nama`, `detail`, `resiko` — form kosong (BUG, P1)

> **KRITIS.** Schema `{}`, fields `[]` — FK dropdown (organisasi/jabatan/grade) via fkSources tetap jalan, tapi `nama`, `detail`, `resiko` (required!) tidak punya input.

- [ ] **schema:** Ganti `z.object({})` ke `z.object({ nama: namaWajib, detail: z.string().min(1,"Detail wajib diisi"), resiko: z.string().min(1,"Resiko wajib diisi") })`
- [ ] **fields:** `[{ name: "nama", label: "Nama", required: true }, { name: "detail", label: "Detail", type: "textarea", required: true }, { name: "resiko", label: "Resiko", type: "textarea", required: true }]`
- [ ] **columns:** Pertahankan — termasuk kolom badge APD & Alat Kerja
- [ ] **fkSources:** Pertahankan (`organisasiId`, `jabatanId`, `gradeId`)
- [ ] **Ketik:** `EntityConfig<ProfesiQuery>` + `makeConfig<ProfesiQuery>(...)` — sudah typed
- [ ] **container:** Tetap `"sheet"`
- [ ] **searchFields:** Pertahankan (`nama`)
- [ ] **Error validasi:** inline di form, JANGAN toast
- [ ] **Quality gate:** `bunx biome check` + `npx tsc --noEmit`
- [ ] **`bd claim` + `bd close` — commit & push**

### 9. `kepegawaian-fe-bjx` — Fix form sanksi: tambah `kode`, `keterangan`, semua boolean flag — form kosong (BUG, P1)

> **KRITIS.** Schema `{}`, fields `[]` — FK dropdown (jenisSpId) via fkSources jalan, tapi `kode` (req), `keterangan` (req), dan 8 boolean flags tidak punya input.

- [ ] **schema:** Ganti `z.object({})` ke `z.object({
  kode: z.string().min(1,"Kode wajib diisi"),
  keterangan: z.string().min(1,"Keterangan wajib diisi"),
  potTkk: z.boolean().optional(),
  jmlPotTkk: z.coerce.number().optional(),
  isPendingPangkat: z.boolean().optional(),
  isPendingGaji: z.boolean().optional(),
  isTurunPangkat: z.boolean().optional(),
  isTurunJabatan: z.boolean().optional(),
  isSuspension: z.boolean().optional(),
  isTerminateDh: z.boolean().optional(),
  isTerminateTh: z.boolean().optional()
})`
- [ ] **fields:** `[
  { name: "kode", label: "Kode", required: true },
  { name: "keterangan", label: "Keterangan", type: "textarea", required: true },
  { name: "potTkk", label: "Pot. Tkk", type: "select", options: [{value:"true",label:"Ya"},{value:"false",label:"Tidak"}] },
  { name: "jmlPotTkk", label: "Jml. Pot. Tkk", type: "number" },
  { name: "isPendingPangkat", label: "Penundaan Pangkat", type: "select", options: [...] },
  ...semua boolean flags sebagai select Ya/Tidak
]`
- [ ] **columns:** Pertahankan semua (kode, keterangan, jenisSp, potTkk, jmlPotTkk, semua is* flags)
- [ ] **fkSources:** Pertahankan (`jenisSpId`)
- [ ] **Ketik:** `EntityConfig<SanksiQuery>` + `makeConfig<SanksiQuery>(...)` — sudah typed
- [ ] **container:** Tetap `"sheet"`
- [ ] **searchFields:** Pertahankan (`kode`, `keterangan`)
- [ ] **Error validasi:** inline di form, JANGAN toast
- [ ] **Quality gate:** `bunx biome check` + `npx tsc --noEmit`
- [ ] **`bd claim` + `bd close` — commit & push**

---

## Batasan (JANGAN)

- **JANGAN** tambah `kodeField`/`kodeCol`/`kodeNamaSchema` ke `_config-kit.ts` — satu consumer, YAGNI.
  Bila audit `n0k` menemukan ≥2 entity kode+nama lain, angkat primitive **saat itu** (rule of three).
- **JANGAN** sentuh `extract-types.js` / file `*.ts` hasil generate — config hand-written, bukan generated.
- **JANGAN** sentuh `master-client.tsx` / `_config-kit.ts` untuk `2zb` — seam murni via config.
