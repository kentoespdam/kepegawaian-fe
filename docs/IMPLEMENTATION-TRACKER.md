# Implementation Tracker — Round 1 (Auth + Master)

> Papan pantau untuk **agen implementer**. Sumber kebenaran status = **beads (`bd`)**, bukan file ini.
> File ini = **urutan claim** + **checklist manual** biar mudah dibaca sekilas. Jangan pakai
> TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.
> `bd ready` HANYA memunculkan issue yang blocker-nya sudah tuntas — **selalu tanya `bd ready` dulu**.

---

## Prasyarat tiap agen (baca sebelum ngoding)

1. [`docs/design/coding-rules.md`](./design/coding-rules.md) — aturan wajib.
2. [`docs/design/visual-foundation.md`](./design/visual-foundation.md) — token & gate aksesibilitas.
3. Modul domain yang relevan (peta di [`DESIGN.md`](../DESIGN.md)).
4. `node_modules/next/dist/docs/` untuk API Next.js yang dipakai. Prop UI → verifikasi ke **Base UI**.

---

## Urutan claim (wave — ikuti dari atas)

Dependency sudah dikunci di `bd`; wave di bawah = konsekuensi graph itu. Dalam satu wave, issue
bisa dikerjakan **paralel** oleh beberapa agen.

### Wave 0 — Fondasi tunggal (blocker semua)
| ✓ | ID | Issue | Catatan |
|---|---|---|---|
| [x] | `kepegawaian-fe-831` | Scaffold proyek + tooling | Bun, Biome 120, Tailwind v4, struktur folder + `src/hooks/` |

### Wave 1 — Fondasi inti (← Scaffold) ✅
| ✓ | ID | Issue | Catatan |
|---|---|---|---|
| [x] | `kepegawaian-fe-43s` | Visual foundation / tema | token OKLCH, `globals.css`, Inter |
| [x] | `kepegawaian-fe-i0l` | `proxy.ts` | **paling ketat** — try/catch fail-safe, Node runtime, ADR 0001 |
| [x] | `kepegawaian-fe-374` | DAL `verifySession()` | gate render, `cache()` |
| [x] | `kepegawaian-fe-shl` | Sonner `<Toaster>` | satu global, bottom-right |

### Wave 2 — Lapis di atas fondasi ✅
| ✓ | ID | Issue | ← depends on |
|---|---|---|---|
| [x] | `kepegawaian-fe-5tp` | RBAC `can()` + `<Can>` | DAL |
| [x] | `kepegawaian-fe-g79` | API client + `useResource` | proxy.ts |

### Wave 3 — Shared primitives + Auth pages ✅
| ✓ | ID | Issue | ← depends on |
|---|---|---|---|
| [x] | `kepegawaian-fe-z55` | `<DataTable>` | API client, tema |
| [x] | `kepegawaian-fe-xhe` | `<CrudForm>` | API client, tema |
| [x] | `kepegawaian-fe-fzg` | `<ConfirmDeleteDialog>` | API client, sonner |
| [x] | `kepegawaian-fe-9j9` | App shell (sidebar/top bar/landing) | tema, RBAC, DAL |
| [x] | `kepegawaian-fe-2l1` | Login page | proxy.ts, tema, DAL |
| [x] | `kepegawaian-fe-5r4` | Profil page | DAL, `<CrudForm>`, sonner |

### Wave 4 — Master entities (← DataTable, CrudForm, ConfirmDeleteDialog, RBAC, App shell)

Semua Master butuh 5 primitive di atas. **Urutan internal karena FK** (kerjakan yang jadi sumber
`/list` lebih dulu supaya bisa dites end-to-end):

**4a. Master tanpa FK (boleh langsung, paralel):** ✅
| ✓ | ID | Entitas |
|---|---|---|
| [x] | `kepegawaian-fe-cf5` | Golongan |
| [x] | `kepegawaian-fe-rts` | Level |
| [x] | `kepegawaian-fe-435` | Jenjang Pendidikan |
| [x] | `kepegawaian-fe-6bg` | Jenis Keahlian |
| [x] | `kepegawaian-fe-fsl` | Jenis Kitas |
| [x] | `kepegawaian-fe-6s8` | Jenis Pelatihan |
| [x] | `kepegawaian-fe-pvl` | Jenis SP |
| [x] | `kepegawaian-fe-6hx` | Alasan Berhenti |
| [x] | `kepegawaian-fe-dsm` | Hari Libur |
| [x] | `kepegawaian-fe-scn` | Rumah Dinas |
| [x] | `kepegawaian-fe-9ve` | Organisasi (tree, `parentId`) |
| [x] | `kepegawaian-fe-4t3` | Jabatan (tree, `parentId`) |

**4b. Master ber-FK (kerjakan setelah sumber FK-nya ada):** ✅
| ✓ | ID | Entitas | FK → (kerjakan dulu) |
|---|---|---|---|
| [x] | `kepegawaian-fe-ecm` | Grade | Level (`rts`) |
| [x] | `kepegawaian-fe-rs3` | Sanksi (heavy-form) | Jenis SP (`pvl`) |
| [x] | `kepegawaian-fe-bro` | Profesi (heavy-form) | Organisasi (`9ve`), Jabatan (`4t3`), Grade (`ecm`) |
| [x] | `kepegawaian-fe-cj7` | APD | Profesi (`bro`) |
| [x] | `kepegawaian-fe-e1v` | Alat Kerja | Profesi (`bro`) |

> FK di 4b sudah dikunci sebagai dependency `bd` (mis. `bro` blocked sampai `9ve`,`4t3`,`ecm` close),
> jadi `bd ready` otomatis menahannya. Ikuti `bd ready` — jangan asal ambil dari tabel ini.

---

## Wave 5 — Badge column APD & Alat Kerja inline di tabel Profesi

Fitur: di tabel `profesi`, `apd` & `alat-kerja` tampil sebagai **badge** per baris, dengan
**tambah (`+`) / edit / hapus (✕)** inline. Desain terkunci di
[`docs/context/master.md`](./context/master.md) §`apd & alat-kerja — badge column inline`.
**Rantai strictly sequential** (tiap issue butuh output issue sebelumnya) — `bd ready` hanya
akan memunculkan satu per satu.

| ✓ | ID | Issue | ← depends on | Catatan |
|---|---|---|---|---|
| [x] | `kepegawaian-fe-w6j` | RolesContext + `useRoles()` di AppShell | — | Fondasi gating client. `src/hooks/useRoles.tsx` + pembungkus `<RolesProvider>` di AppShell. |
| [ ] | `kepegawaian-fe-5o6` | Komponen `<BadgeManager>` | `w6j` | Client component reusable. Props `{ entity: 'apd'\|'alat-kerja', profesiId: number, items: {id?,nama?}[] }`. Badge `<Badge>` existing berderet, tiap badge ikon edit + ✕; trailing `+`. Add/edit = Dialog kecil (1 field `nama`, RHF+Zod pola ADR-0002). Hapus = `<ConfirmDeleteDialog>` existing. Mutasi `useResource(entity)`: add `POST {profesiId,nama}`, edit `PUT /{id} {profesiId,nama}`, delete `DELETE /{id}`. **onSuccess invalidate `["profesi"]`** (+ query entity sendiri). Gating: `useRoles()` + `can(roles,'update','profesi')` utk `+`/edit, `can(roles,'delete','profesi')` utk ✕. |
| [ ] | `kepegawaian-fe-7mb` | Wire 2 kolom badge ke `profesi.config.ts` | `5o6` | Tambah kolom `APD` & `Alat Kerja`, tiap sel `cell:(item)=><BadgeManager entity=… profesiId={item.id} items={item.apdList\|item.alatKerjaList} />`. Rename `profesi.config.ts`→`.tsx` bila perlu JSX. **`MasterPageClient` TIDAK disentuh** (seam murni via config column `cell`). |
| [ ] | `kepegawaian-fe-xq2` | Verifikasi runtime + smoke E2E | `7mb` | **GATE ASUMSI:** konfirmasi `GET /master/profesi` (list) benar bawa `apdList`+`alatKerjaList` per baris. Bila DTO ringan tanpa itu → **STOP & flag**, JANGAN bikin fallback detail-fetch per baris (YAGNI). Smoke: add/edit/hapus apd & alat-kerja dari tabel, badge refresh tanpa reload. Cek gating profesi. Quality gate lolos. |

> Asumsi kunci yang divalidasi di `xq2`: list profesi membawa dua array badge. Sudah benar
> di **type-level** (`ProfesiDetail.apdList`/`alatKerjaList` di `src/types/master/profesi.ts`),
> WAJIB dikonfirmasi runtime sebelum dianggap tuntas.

---

## Definition of Done per issue (checklist agen)

- [ ] Sesuai spec modul DESIGN terkait (bukan improvisasi / "AI slop").
- [ ] Semua warna = token; tidak ada hex/`oklch()` literal di komponen.
- [ ] Gate aksesibilitas lansia lolos (kontras, ukuran teks/sentuh, ikon+teks, bukan warna-saja).
- [ ] Logika diangkat ke `src/hooks/` (komponen = presentasi). Baris ≤120.
- [ ] RBAC via `can()`/`<Can>` — tidak ada `role === 'admin'` hardcode.
- [ ] `gitnexus_impact` dijalankan sebelum edit simbol; `gitnexus_detect_changes` sebelum commit.
- [ ] Quality gate lolos: `bunx biome check`, build.
- [ ] `bd close <id>` + commit + **push**.

---

## Snapshot graph (per pembuatan file)

- Total issue Round 1: **30** (13 fondasi/primitive/auth + 17 Master). **+4** di Wave 5
  (badge APD/Alat Kerja): `w6j → 5o6 → 7mb → xq2`.
- Dependency: **Ketat & lengkap** — `bd ready` = single source urutan.
- Round 1 selesai; Wave 5 ready: **hanya `kepegawaian-fe-w6j` (RolesContext)** — sisanya blocked berantai.

> Cek terkini kapan pun: `bd ready`, `bd blocked`, `bd stats`, `bd show <id>`.
