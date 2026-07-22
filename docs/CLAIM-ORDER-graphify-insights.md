# Claim Order — Graphify Insights: Auth Middleware, UI Split, & Isolated Nodes

> Papan pantau untuk agen implementer. Sumber kebenaran status = **beads (`bd`)**,
> bukan file ini. File ini = **urutan claim** + **checklist** biar mudah dibaca sekilas.
> Jangan pakai TodoWrite/markdown lain untuk tracking — pakai `bd`.
>
> Alur per issue: `bd show <id>` → `bd update <id> --claim` → kerja → quality gate → `bd close <id>`.
> `bd ready` HANYA memunculkan issue yang blocker-nya tuntas — **selalu tanya `bd ready` dulu**.

**Sumber.** Graphify knowledge graph dari `src/` — 546 nodes, 1,561 edges, 26 komunitas.
Tiga area improvement teridentifikasi dari graph analysis.

**Keputusan desain (grill):**

1. **Middleware auth:** verifySession pindah dari AppLayout ke middleware.ts — gate lebih awal di request lifecycle, 1 titik proteksi untuk semua protected routes.
2. **Split UI Components:** Community dengan kohesi 0.056 (terendah) — 60 node campuran shell, form, config, metadata. Split jadi modul lebih terfokus.
3. **Audit isolated nodes:** 128 node degree ≤1, mayoritas false positive, tapi useEnum (degree 0) perlu dicek apakah dead code.

---

## Prasyarat (baca sebelum ngoding)

1. [`docs/design/coding-rules.md`](./design/coding-rules.md) — aturan wajib (baris ≤120).
2. `src/app/(app)/layout.tsx` — AppLayout dengan verifySession inline.
3. `src/lib/auth/verifySession.ts` — DAL verify session yang akan dipindah/dipertahankan.
4. `src/middleware.ts` — jika belum ada, perlu dibuat.
5. `src/hooks/useEnum.ts` — hook yang perlu diaudit.
6. `graphify-out/GRAPH_REPORT.md` — laporan graph lengkap.

---

## Urutan claim (strictly sequential)

`bd ready` hanya memunculkan satu issue pada satu waktu. Ikuti urutan ini.

### 1. `kepegawaian-fe-xpd` — Pindah verifySession dari AppLayout ke Next.js middleware
**← depends on:** — (ready duluan)

AppLayout (`src/app/(app)/layout.tsx`) saat ini langsung memanggil verifySession() setiap render.
Pindahkan session check ke middleware Next.js untuk gate di awal request lifecycle.

- [ ] **Analisis:**
  - [ ] Cek apakah middleware.ts sudah ada. Jika belum, buat `src/middleware.ts`
  - [ ] Identifikasi route mana saja yang perlu diproteksi (semua `/(app)/*`, kecuali `/login` dan `/api/proxy/*`)
  - [ ] Lihat kode verifySession() untuk tahu apa yang perlu dipanggil dari middleware
  - [ ] Baca proxy.ts untuk paham auth flow Appwrite cookie

- [ ] **Implementasi middleware:**
  - [ ] Buat/src/middleware.ts dengan `matcher` untuk route terproteksi
  - [ ] Implementasi session check di middleware: baca cookie, verify ke Appwrite
  - [ ] Redirect ke `/login` jika session invalid, lanjutkan jika valid
  - [ ] Set cookie token untuk proxy (sama seperti yang dilakukan verifySession saat ini)

- [ ] **Update AppLayout:**
  - [ ] Hapus pemanggilan verifySession() dari AppLayout (session sudah di-gate middleware)
  - [ ] Pertahankan verifySession sebagai DAL opsional untuk fetch user profile jika diperlukan

- [ ] **Testing:**
  - [ ] Login flow masih berfungsi
  - [ ] Protected route redirect ke /login jika tidak login
  - [ ] Setelah login, redirect ke halaman yang diminta
  - [ ] Logout menghapus session

- [ ] Quality gate: `tsc --noEmit` + `bunx biome check`
- [ ] `bd claim` + `bd close` — commit & push

### 2. `kepegawaian-fe-epb` — Split UI Components Base (kohesi 0.056)
**← depends on:** `xpd` (opsional — bisa independen)

UI Components Base (60 nodes, kohesi 0.056) mencampur shell layout, entity form modal,
app config, dan komponen UI primitif. Kohesi rendah menandakan node-node di sini tidak saling terkoneksi
— mereka hanya terikat oleh `cn()` utility yang di-import semua komponen shadcn/ui.

- [ ] **Analisis current structure:**
  - [ ] `src/components/` — 51 app-level components (DataTable, CrudForm, FKCombobox, dll)
  - [ ] `src/components/ui/` — 131 shadcn primitives (Button, Card, Dialog, dll)
  - [ ] `src/app/(app)/layout.tsx` — AppLayout
  - [ ] `src/components/app-shell.tsx` — AppShell, sidebar, topbar

- [ ] **Split ke modul terpisah oleh function:**
  - [ ] `src/components/app-shell/` — AppLayout, AppShell, sidebar, topbar, breadcrumb
  - [ ] `src/components/entity-form/` — EntityFormModal, generic dialog/sheet untuk CRUD
  - [ ] `src/lib/app-config.ts` — MODULES, MODULE_ENTITY_MAP, routing constants (dari komponen, pindah ke lib)
  - [ ] `src/components/ui/` tetap — shadcn primitives sudah terpisah dengan baik

- [ ] **Code changes per modul:**
  - [ ] Pindahkan AppShell ke `src/components/app-shell/`
  - [ ] Pindahkan EntityFormModal ke `src/components/entity-form/`
  - [ ] Ekstrak MODULES & MODULE_ENTITY_MAP ke `src/lib/app-config.ts`
  - [ ] Update semua import yang referencing lokasi lama
  - [ ] Hapus file asli setelah semua import diperbarui

- [ ] **Testing:**
  - [ ] App shell masih render dengan benar (sidebar, topbar, breadcrumb)
  - [ ] Entity CRUD form masih bisa create/edit
  - [ ] Routing/navigasi masih berfungsi
  - [ ] Tidak ada broken imports

- [ ] Quality gate: `tsc --noEmit` + `bunx biome check` + `bun run build`
- [ ] `bd claim` + `bd close` — commit & push

### 3. `kepegawaian-fe-1o1` — Audit isolated nodes: useEnum & 7 komponen mencurigakan
**← depends on:** — (ready duluan)

128 isolated nodes (degree ≤1) dari 546 total. Mayoritas (120) false positive — type declarations, props interfaces, entry points.
Namun 8 node perlu diverifikasi, terutama useEnum (degree 0).

- [ ] **Audit useEnum (prioritas tertinggi):**
  - [ ] `grep -r "useEnum" src/` — cari semua referensi hook
  - [ ] Jika 0 reference: konfirmasi dead code, hapus `src/hooks/useEnum.ts`
  - [ ] Jika ada reference: cek apakah hook masih fungsional atau sudah digantikan oleh useQuery langsung
  - [ ] Update beads issue dengan hasil audit

- [ ] **Audit komponen lain (prioritas sedang):**
  - [ ] Cek `ADR-0001` — dokumentasi, tidak perlu tindakan
  - [ ] Cek `NOTE: api.listAll...` — komentar di hooks, hapus jika sudah tidak relevan
  - [ ] Cek `HttpStatusText`, `Envelope` — utility types, pertahankan
  - [ ] Cek `PageParams`, `PageView` — utility types untuk paging, pertahankan
  - [ ] Cek `ProfesiFormProps` — props interface untuk 1 komponen, normal

- [ ] **Testing:**
  - [ ] Jika useEnum dihapus: `tsc --noEmit` tidak error
  - [ ] Semua import yang referencing useEnum sudah diperbarui (jika ada)

- [ ] Quality gate: `tsc --noEmit` + `bunx biome check`
- [ ] `bd claim` + `bd close` — commit & push

---

## Definition of Done (tiap issue)

- [ ] Sesuai desain yang sudah digrill (bukan improvisasi).
- [ ] Baris ≤120; logika hook via `useMemo`/state lokal.
- [ ] `gitnexus_impact` sebelum edit, `gitnexus_detect_changes` sebelum commit.
- [ ] Quality gate lolos (`bunx biome check`, `bun run tsc --noEmit`, `bun run build`).
- [ ] `bd close` + commit + push.

---

## Invarian yang tak boleh dilanggar

- **`src/lib/auth/verifySession.ts`** tetap ada sebagai DAL untuk fetch user profile — hanya pemanggilnya yang berubah.
- **`proxy.ts`** TIDAK berubah — middleware cukup baca cookie yang sama.
- **`graphify-out/`** TIDAK disentuh — output read-only dari graphify pipeline.
- **shadcn primitives** (`src/components/ui/`) TIDAK direfaktor — split hanya level app-components.
- **Tipe generated** (`src/types/master/`) TIDAK disentuh dalam issue ini.
