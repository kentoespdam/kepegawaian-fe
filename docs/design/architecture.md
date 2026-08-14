# Arsitektur — Stack, Endpoint, Build Strategy, Base UI

> **Muat modul ini untuk:** orientasi awal (stack terkunci), daftar/konvensi endpoint & taxonomy
> entitas, strategi struktur file Master, catatan Base UI vs Radix, peta ketertelusuran ke sumber.
> Berisi §0 (stack), §17 (endpoint & taxonomy), §18 (build strategy), §19 (Base UI), Lampiran.
> **Sumber:** CONTEXT §Endpoint conventions/§Entity taxonomy/§Master build strategy/§UI component base.

---

## 0. Stack terkunci

| Aspek | Keputusan |
|---|---|
| Framework | Next.js **16.2.10** (App Router; middleware = `proxy.ts`, Node runtime) |
| React | **19.2.4** (React Compiler aktif — `babel-plugin-react-compiler`) |
| UI kit | **shadcn di atas Base UI** (`npx shadcn init -b base`) — BUKAN Radix |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`, token OKLCH) |
| Form | **React Hook Form v7 + Zod** (`zodResolver`) via shadcn `<Field />` → satu `<CrudForm>` (ADR 0002) |
| Data fetching | **TanStack Query v5** client-side via `/api/proxy/*` |
| Auth | **Appwrite** (session httpOnly) + JWT di-mint di `proxy.ts` (ADR 0001) |
| Backend | Spring Boot `http://192.168.1.211:8080` (terima Bearer JWT, tak menerbitkan) |
| Notifikasi | **sonner** (satu `<Toaster>`, bottom-right) |
| Ikon | **lucide** (aksi ≥20px, area sentuh ≥40px) |
| Font | **Inter**, self-hosted via `next/font` |
| Linter/format | **BiomeJS** 2.2.0 |
| Package manager | **Bun** |
| Tema rilis 1 | **Light-only**, tanpa toggle; semua warna = token dark-ready |

> ⚠️ **"This is NOT the Next.js you know"** — baca `node_modules/next/dist/docs/` sebelum menulis
> kode Next.js. `middleware.ts` → `proxy.ts` (Node runtime, `export default function proxy()`).

---

## 17. Endpoint conventions (CONTEXT §Endpoint conventions)

Semua lewat prefix `/api/proxy/*` (di-rewrite `proxy.ts` dengan `Bearer`). Seragam lintas CRUD:

| Method | Path | Guna |
|---|---|---|
| GET | `/master/{entity}` | Paginated+filtered: `page`, `size` (1..100), `sortBy`, `sortDirection` (asc\|desc), + filter per-field |
| GET | `/master/{entity}/list` | Unpaginated, untuk dropdown/combobox |
| GET | `/master/{entity}/{id}` | Detail |
| POST | `/master/{entity}` | Create |
| PUT | `/master/{entity}/{id}` | Update |
| DELETE | `/master/{entity}/{id}` | Delete |

**Entitas CRUD (17):** golongan, grade, jabatan, organisasi, profesi, sanksi, level,
jenjang-pendidikan, jenis-keahlian, jenis-kitas, jenis-pelatihan, jenis-sp, alasan-berhenti,
alat-kerja, apd, hari-libur, rumah-dinas.
**Reference lists (5, read-only, TANPA halaman Master rilis 1):** jenis-kontrak, jenis-mutasi,
jenis-sk, status-kerja, status-pegawai — dikonsumsi hanya sebagai sumber `/list` modul lain.
**FK-dependent:** profesi→(organisasi,jabatan,grade); grade→level; apd/alat-kerja→profesi;
sanksi→jenis-sp. **Tree:** organisasi, jabatan (`parentId`).

---

## 18. Strategi build Master — bespoke files di atas shared primitives (CONTEXT §Master build strategy)

Tiap entitas punya file konkret sendiri (page, columns, form) → beda tampilan per-entitas mudah &
terbaca — BUKAN satu engine config-driven. DRY dipaksa lewat **shared primitives** yang tiap
entitas compose: `<DataTable>` (+ toolbar + pagination), `<CrudForm>`, `<ConfirmDeleteDialog>`,
`<LampiranCard>`, `<LampiranUploadModal>`, hook `useResource`/proxy, helper API client
bertipe. Duplikasi hanya di glue tipis per-entitas — tak pernah di logika table/fetch/CRUD.

---

## 19. UI component base — Base UI, bukan Radix (CONTEXT §UI component base)

shadcn di-init dengan **Base UI** (`npx shadcn init -b base`). Agen WAJIB verifikasi prop ke docs
**Base UI**, bukan Radix (nama prop beda, mis. **`keepMounted` vs `forceMount`**). Semua `shadcn add`
tarik dari registry Base UI.

---

## Lampiran — peta ketertelusuran (§ → sumber → file split)

| § | Sumber | File modul |
|---|---|---|
| §0 Stack | CONTEXT §0 | architecture.md |
| §1 Palet/token | CONTEXT §Theming/§Palette + color-rationale §4 | visual-foundation.md |
| §2 Aksesibilitas | CONTEXT §Accessibility + color-rationale §3 | visual-foundation.md |
| §3 Tipografi | CONTEXT §Typography | visual-foundation.md |
| §4 Auth/proxy | CONTEXT §Identity bridge/§Route protection/§Session expiry/§Auth scope + ADR 0001 | auth-proxy.md |
| §5 Data fetching | CONTEXT §Data fetching | data-fetching.md |
| §6 App shell | CONTEXT §App shell | app-shell.md |
| §7 Layar daftar | CONTEXT §List-screen/§Table states/§DataTable filtering | list-and-tables.md |
| §8 Delete UX | CONTEXT §Delete UX | list-and-tables.md |
| §9 RBAC | CONTEXT §RBAC | rbac.md |
| §10 Form engine | CONTEXT §Form engine/§CRUD form presentation/§Heavy-form + ADR 0002 | forms.md |
| §11 Tree | CONTEXT §Tree entities/§Parent picker | list-and-tables.md |
| §12 Top bar | CONTEXT §Top bar | app-shell.md |
| §13 Landing | CONTEXT §Dashboard landing | app-shell.md |
| §14 Login | CONTEXT §Login page | login-and-profile.md |
| §15 Profil | CONTEXT §Profile page | login-and-profile.md |
| §16 Notifikasi | CONTEXT §Notifications | notifications.md |
| §17 Endpoint | CONTEXT §Endpoint conventions/§Entity taxonomy | architecture.md |
| §18 Build strategy | CONTEXT §Master build strategy | architecture.md |
| §19 Base UI | CONTEXT §UI component base | architecture.md |
