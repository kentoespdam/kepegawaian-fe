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

**Bug issues filed (7 drifts):**
| ID | Entity | Severity |
|---|---|---|
| `kepegawaian-fe-1iz` | alasan-berhenti — `notes` | P2 |
| `kepegawaian-fe-ywb` | hari-libur — `notes` | P2 |
| `kepegawaian-fe-57j` | jenjang-pendidikan — `shortName`, `seq`, `isStatistik` | P2 |
| `kepegawaian-fe-4vc` | jabatan — `kode` (req), `levelId` | P2 |
| `kepegawaian-fe-qhn` | organisasi — `kode`, `levelOrganisasi`, `shortName`, `category` | P2 |
| `kepegawaian-fe-8y6` | profesi — `nama`, `detail`, `resiko` (form kosong) | P1 |
| `kepegawaian-fe-bjx` | sanksi — `kode`, `keterangan`, semua boolean (form kosong) | P1 |

---

## Batasan (JANGAN)

- **JANGAN** tambah `kodeField`/`kodeCol`/`kodeNamaSchema` ke `_config-kit.ts` — satu consumer, YAGNI.
  Bila audit `n0k` menemukan ≥2 entity kode+nama lain, angkat primitive **saat itu** (rule of three).
- **JANGAN** sentuh `extract-types.js` / file `*.ts` hasil generate — config hand-written, bukan generated.
- **JANGAN** sentuh `master-client.tsx` / `_config-kit.ts` untuk `2zb` — seam murni via config.
