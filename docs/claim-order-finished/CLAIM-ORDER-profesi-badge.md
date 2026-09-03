# Claim Order — Badge APD & Alat Kerja inline di tabel Profesi

> Papan pantau **fitur tunggal** untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**,
> bukan file ini. File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.
> `bd ready` HANYA memunculkan issue yang blocker-nya tuntas — **selalu tanya `bd ready` dulu**.

**Fitur.** Di tabel `profesi`, `apd` & `alat-kerja` tampil sebagai **badge** per baris, dengan
**tambah (`+`) / edit / hapus (✕)** inline langsung di kolom. Bukan di dalam Sheet edit profesi.

**Desain terkunci** di [`docs/context/master.md`](./context/master.md)
§ *`apd` & `alat-kerja` — badge column inline di tabel `profesi`*. Baca itu sebelum ngoding.

---

## Prasyarat (baca sebelum ngoding)

1. [`docs/context/master.md`](./context/master.md) — desain fitur ini (WAJIB).
2. [`CONTEXT-MAP.md`](../CONTEXT-MAP.md) — konvensi lintas-modul (endpoint, useResource, RBAC, form).
3. [`docs/design/coding-rules.md`](./design/coding-rules.md) — aturan wajib (baris ≤120, logika ke `src/hooks/`).
4. ADR-0002 (pola RHF+Zod untuk form CRUD).
5. `node_modules/next/dist/docs/` untuk API Next.js. Prop UI → verifikasi ke **Base UI**.
6. `gitnexus_impact` sebelum edit simbol; `gitnexus_detect_changes` sebelum commit.
   Index stale → `npx gitnexus analyze` dulu.

---

## Urutan claim (strictly sequential — tiap issue butuh output sebelumnya)

`bd ready` hanya akan memunculkan **satu** issue pada satu waktu. Ikuti urutan ini.

### 1. `kepegawaian-fe-w6j` — RolesContext + `useRoles()` di AppShell
**← depends on:** — (ready duluan)

Fondasi gating client. `AppShell` (`src/components/app-shell.tsx`) sudah menghitung
`const roles = getRoles(user)` tapi belum expose ke subtree.

- [x] Bikin `RolesContext` (React context) + provider di `AppShell`, isi = `roles`.
- [x] Hook `useRoles()` yang baca context (throw/fallback aman bila di luar provider).
- [x] **JANGAN** prop-drill `roles` lewat `MasterPageClient`/config statis.
- [x] Quality gate + `bd close`.

### 2. `kepegawaian-fe-5o6` — Komponen `<BadgeManager>`
**← depends on:** `w6j`

Client component reusable. Props:
`{ entity: 'apd' | 'alat-kerja', profesiId: number, items: { id?: number; nama?: string }[] }`.

- [x] Render badge `<Badge>` (existing, `src/components/ui/badge.tsx`) berderet dari `items`.
- [x] Tiap badge: ikon **edit** + tombol **✕** hapus. Di ujung kolom: tombol **`+`** tambah.
- [x] **Tambah/edit = Dialog kecil** — 1 field `nama`, RHF+Zod (pola ADR-0002).
- [x] **Hapus = `<ConfirmDeleteDialog>`** existing (`"Hapus \"<nama>\"?"`). Bukan toast-undo, bukan senyap.
- [x] Mutasi via `useResource(entity)`:
      add `POST {profesiId, nama}`, edit `PUT /{id} {profesiId, nama}`, delete `DELETE /{id}`.
- [x] **onSuccess: `qc.invalidateQueries({ queryKey: ["profesi"] })`** (+ query entity sendiri) supaya
      baris & badge tabel refresh.
- [x] Gating: `useRoles()` + `can(roles, 'update', 'profesi')` untuk `+`/edit,
      `can(roles, 'delete', 'profesi')` untuk ✕.
- [x] Baris ≤120, logika non-presentasi ke hook bila perlu.
- [x] Quality gate + `bd close`.

### 3. `kepegawaian-fe-7mb` — Wire 2 kolom badge ke `profesi.config.ts`
**← depends on:** `5o6`

- [x] Tambah kolom `APD` & `Alat Kerja` di `src/config/master/profesi.config.ts`.
- [x] Tiap sel: `cell: (item) => <BadgeManager entity="apd" profesiId={item.id} items={item.apdList} />`
      (dan `alat-kerja` / `item.alatKerjaList`).
- [x] Rename `profesi.config.ts` → `.tsx` bila butuh JSX.
- [x] **`MasterPageClient` (`master-client.tsx`) TIDAK disentuh** — seam murni via config column `cell`
      (`src/components/data-table.tsx` sudah render `col.cell ? col.cell(item) : …`).
- [x] Quality gate + `bd close`.

### 4. `kepegawaian-fe-xq2` — Verifikasi runtime + smoke E2E
**← depends on:** `7mb`

- [x] **GATE ASUMSI:** konfirmasi runtime `GET /master/profesi` (list) benar bawa
      `apdList` + `alatKerjaList` per baris (cek network / log `api.list`).
      **Bila DTO ringan tanpa itu → STOP & flag ke manager** (buka issue baru).
      **JANGAN** bikin fallback detail-fetch per baris tanpa bukti (YAGNI).
- [x] Smoke: add / edit / hapus **apd** dari tabel; ulangi untuk **alat-kerja**; badge refresh tanpa reload.
- [x] Cek gating: user tanpa `update`/`delete` profesi tidak melihat `+`/edit/✕.
- [x] Quality gate (`bunx biome check`, build) lolos.
- [x] `bd close`.

---

## Definition of Done (tiap issue)

- [x] Sesuai desain di `docs/context/master.md` (bukan improvisasi).
- [x] Warna = token; tidak ada hex/`oklch()` literal.
- [x] Gate aksesibilitas lansia (kontras, ukuran teks/sentuh, ikon+teks — bukan warna-saja).
- [x] Baris ≤120; logika ke `src/hooks/`; RBAC via `can()` — tidak ada `role === 'admin'` hardcode.
- [x] `gitnexus_impact` sebelum edit, `gitnexus_detect_changes` sebelum commit.
- [x] Quality gate lolos; `bd close` + commit + **push**.

---

## Catatan asumsi kunci

Sumber data badge = **baris list itu sendiri** (`ProfesiDetail.apdList` / `alatKerjaList` di
`src/types/master/profesi.ts`). Sudah benar di **type-level**; WAJIB dikonfirmasi **runtime** di
`xq2` sebelum fitur dianggap tuntas. Tidak ada fetch per-baris kecuali terbukti perlu.
