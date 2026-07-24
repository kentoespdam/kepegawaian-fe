# Coding Rules — Kepegawaian FE

Aturan dasar yang **WAJIB** dipatuhi setiap agen/kontributor saat menulis kode di repo ini.
Baca file ini **lebih dulu**, lalu muat modul desain relevan dari [DESIGN.md](../../DESIGN.md).
Aturan di sini bersifat mengikat — bila konflik dengan kebiasaan default Anda, **aturan ini menang**.

---

## 0. Prinsip

- **NO AI SLOP.** Kode & UI ringkas, jujur, minim bug. Jangan tambah statistik/count/widget/ilustrasi
  karangan. Jangan over-engineer. Bila ragu → opsi paling sederhana yang lolos spec.
- **KISS + DRY via shared primitives**, bukan engine config-driven raksasa (lihat architecture §18).
- **Aksesibilitas = syarat fungsional**, bukan nice-to-have (±70% pengguna lansia). Gate di
  visual-foundation §2 berlaku ke SETIAP komponen.
- **Bahasa UI = Bahasa Indonesia.** Label bahasa manusia, bukan nama field mentah.
- **Pahami project DULU via `gitnexus` & `graphify`, baru koding.** Sebelum menyentuh kode, WAJIB
  bangun pemahaman struktur/aliran nyata dari **peta kode**, bukan tebakan: `gitnexus_query`/
  `gitnexus_context` untuk menemukan execution flow, caller/callee, dan blast radius simbol yang akan
  disentuh; `graphify` untuk memetakan input/dokumen jadi knowledge graph saat konteksnya lebih luas
  dari satu simbol. **DILARANG grep buta / baca file acak** sebagai cara pertama memahami kode —
  gitnexus/graphify lebih dulu, grep hanya pelengkap. Ini prasyarat "plan dulu" di bawah.
- **Plan dulu, baru implementasi.** Sebelum menulis kode: `bd show <id>` → **pahami kode via
  `gitnexus`/`graphify`** (lihat baris di atas & §11) → baca modul DESIGN relevan → **fetch docs
  terbaru via context7** (API/prop/best-practice, jangan andalkan ingatan) → susun rencana singkat
  (file yang disentuh, primitive yang dipakai, urutan langkah). Baru koding. **JANGAN** langsung
  ngetik dari asumsi — asumsi basi = bug diam & rework.
- **Buat rencana sebelum benar-benar mengerjakan.** Untuk tugas non-trivial, WAJIB susun rencana tertulis
  (masuk *plan mode* / tulis di `--design` atau `--notes` issue `bd`) **lalu sampaikan & minta konfirmasi
  ke pengguna sebelum mengeksekusi**. Baru mulai koding setelah rencana disepakati. Perubahan sepele
  (typo, satu baris, rename lokal) boleh langsung — sisanya: rencana dulu, eksekusi belakangan.

---

## 1. Struktur & kualitas kode

- **Max ~120 baris per file.** Bila 1 file melebihi batas ini, WAJIB **pecah jadi beberapa file/komponen**
  (angkat sub-komponen, ekstrak logika ke hook `src/hooks/`, tipe ke `src/types/`) — jangan biarkan jadi
  file raksasa. Sejalan dengan "satu file = satu tanggung jawab".
- **DRY** — jangan duplikasi logika. Ekstrak pola berulang jadi shared primitive / helper / hook
  (lihat architecture §18: `<DataTable>`, `<CrudForm>`, `<ConfirmDeleteDialog>`, `<Can>`,
  `useResource`). Duplikasi hanya boleh di glue tipis per-entitas, TAK PERNAH di logika
  table/fetch/CRUD/auth.
- **KISS** — pilih solusi paling sederhana yang memenuhi spec. Hindari abstraksi prematur; abstraksi
  muncul dari duplikasi nyata (rule of three), bukan diantisipasi.
- **Pisahkan logic dari komponen → `src/hooks/`.** Komponen fokus ke presentasi/markup; semua logika
  (fetching, mutation, state turunan, event handler non-trivial, kalkulasi) diangkat ke custom hook
  di `src/hooks/` (mis. `useGolonganTable`, `useCrudForm`, `useAuthSession`). Komponen memanggil hook
  → mudah dites, dipakai ulang, dan dibaca. Hindari blok logika gemuk inline di dalam JSX component.
- **Pisahkan `type`/`interface` → `src/types/`.** Definisi tipe bersama (model entitas, DTO, response
  API, props lintas-komponen) diletakkan di `src/types/` (mis. `src/types/golongan.ts`), lalu di-import
  di tempat pakai. Komponen/hook fokus ke logika, bukan deklarasi tipe gemuk inline. Pengecualian:
  tipe lokal sepele yang hanya dipakai di satu file (mis. props kecil satu komponen) boleh tetap inline.
- Satu file = satu tanggung jawab jelas; file kecil & fokus lebih baik daripada file raksasa.

---

## 2. Framework & versi (baca sebelum menulis)

- **"This is NOT the Next.js you know."** Next.js **16.2.10** punya breaking changes. **WAJIB baca
  `node_modules/next/dist/docs/`** untuk API/konvensi yang Anda pakai sebelum menulis kode Next.js.
  Heed deprecation notices.
- Middleware = **`proxy.ts`** (bukan `middleware.ts`), **Node runtime**, `export default function proxy()`.
- React **19.2.4** dengan **React Compiler aktif** (`babel-plugin-react-compiler`) — JANGAN
  micro-optimize manual (`useMemo`/`useCallback` defensif) yang sudah ditangani compiler.
- **`gitnexus` & `graphify` untuk memahami struktur/aliran project DULU** (§0 & §11) —
  sebelum menyentuh kode, bukan setelah kepentok.
- **WAJIB `context7` sebelum pakai library apa pun** — ambil **source & best-practice terbaru** untuk
  dokumentasi library/framework/API/CLI (React, Next, Tailwind, TanStack, Appwrite, RHF, Zod, dll).
  Data internal/ingatan bisa **basi**; context7 > web search. Alur: `resolve-library-id` → `query-docs`
  → **koding hanya berdasarkan docs yang di-fetch**, bukan asumsi. Ini bagian dari "plan dulu" (§0).

---

## 3. UI kit — Base UI, BUKAN Radix

- shadcn di-init dengan **Base UI** (`npx shadcn init -b base`). **WAJIB verifikasi setiap prop ke
  docs Base UI**, bukan Radix. Nama prop berbeda (mis. **`keepMounted` default `false`** vs Radix
  `forceMount`). Salah asumsi Radix = bug diam.
- **Tambah komponen shadcn = WAJIB lewat CLI** (`npx shadcn add <komponen>`), **JANGAN** tulis file
  komponen manual sendiri. CLI menarik versi resmi dari registry Base UI (prop/struktur benar,
  konsisten). Setelah `add`, kustomisasi seperlunya di file hasil generate — bukan bikin dari nol.
- Dialog/Sheet content **lazy by default** — manfaatkan (jangan paksa mount).

---

## 4. Styling & tema

- **Semua warna = token** (`bg-background`, `text-foreground`, `text-muted-foreground`, dst).
  **DILARANG** hex atau `oklch(...)` literal di dalam komponen.
- Token & skeleton `globals.css` = visual-foundation §1. Ganti seluruh isi `globals.css` default
  Next dengan skeleton `@theme` + token §1.1.
- **Jangan** bergantung warna saja untuk status (WCAG SC 1.4.1) — selalu **ikon + teks**.
- Dark mode = light-only rilis 1; `.dark {}` di-scaffold kosong. Jangan bangun toggle tema.
- Tipografi: **Inter** self-hosted `next/font`, berat 400/500/600 saja (**dilarang ≤300**),
  `tabular-nums` di kolom angka tabel.

---

## 5. Data & state

- Fetch data = **TanStack Query v5** via `/api/proxy/*` (data-fetching §5). Tabel = `useQuery`;
  CRUD = `useMutation` + `invalidateQueries`. `queryKey` bawa searchParams. Logika query/mutation
  diangkat ke hook di `src/hooks/` (§1), bukan inline di komponen.
- **Memory guardrails (WAJIB):** `gcTime` default 5 menit; `staleTime` ~30s tabel / ~5min `/list`.
  **DILARANG** `gcTime: Infinity`; **DILARANG** simpan array baris besar di `useState`/Context.
- **URL = sumber kebenaran state tabel** (page/size/sort/filter-id), bukan state komponen.
- **Tanpa optimistic removal** pada delete — baris hilang hanya setelah 200.

---

## 6. Auth & keamanan (paling ketat)

- **`proxy.ts` = single point of failure semua trafik API.** Review & test paling ketat. WAJIB:
  `try/catch` fail-safe (redirect `/login`, **jangan** throw 500); pin **Node runtime**; **hapus
  cookie `token` saat logout** (cegah replay); refresh buffer ~30s + mint `duration: 3600`.
- **Defense in depth 3 lapis:** `proxy.ts` (gate data) → DAL `verifySession()` (gate render) → RBAC
  `can()` server-side. **UI unmount = kenyamanan, BUKAN batas keamanan** — jangan andalkan.
- Kontrak status: **401** = sesi hilang → toast + `/login?next=`; **403** = forbidden page (JANGAN
  bounce login); **409** = inline di dialog. Detail: auth-proxy §4.
- JWT hidup di cookie httpOnly + secure + sameSite, short-lived.

---

## 7. RBAC

- **TIDAK PERNAH** hardcode `role === 'admin'`. Selalu lewat `can(roles, action, entity)` +
  `<Can action entity>`. Sumber peran = Appwrite Labels via `getRoles()`.
- Akses ditolak di UI = **unmount (`return null`)**, **BUKAN** disable/CSS-hide. Aturan unmount
  terkunci di rbac §9.

---

## 8. Form

- **Default: `<CrudForm>`** — Semua form CRUD Master sederhana pakai **RHF v7 + Zod** (`zodResolver`)
  via satu primitive **`<CrudForm>`** (forms §10). Suplai skema Zod + daftar field — jangan bikin
  boilerplate RHF per-entitas.
- **Deviasi: form kompleks boleh pola custom** bila punya **conditional sections**, **FK cascade**,
  atau **`superRefine` kondisional** — `<CrudForm>` berbasis `fields[]` flat tidak mendukungnya.
  Ikuti pola `profesi/form.tsx` / `tambah-form.tsx` (Field* renderer lokal + RHF langsung).
  **Deviasi sadar** — tetap patuhi §1 (max ~120 baris). Lihat `forms.md §10.5` untuk struktur file.
- Skema Zod **selaras** dengan `required`/`minLength`/`minimum` OpenAPI Backend.
- **`fields[]` WAJIB mencerminkan `{Entity}PostRequest`/`PutRequest`.** Setiap property di
  interface request (`src/types/master/{entity}.ts`) HARUS punya input — lewat entri `fields[]`,
  **atau** entri `fkSources[]` untuk property `*Id` (dropdown FK = input-nya). Property yang hanya
  muncul di `columns`/`searchFields` **TIDAK** dihitung tercakup — itu display/filter, bukan input.
  Field yang kurang = data diam-diam hilang saat submit (mis. bug `jenis-sp`: `kode` ada di
  `searchFields` tapi tak ada di `fields[]`, jadi form cuma kirim `nama`). `*PostRequest` hand-written
  = sumber kebenaran field; jangan andalkan `simpleNameSchema`/`nameField` bila request > `nama`.
- Error validasi = **inline di form**, JANGAN toast. Single-column label-on-top; input ≥44px.

---

## 9. Notifikasi

- Toast (**sonner**, satu `<Toaster>` bottom-right) HANYA untuk **hasil mutation**. Muat-data gagal
  = panel inline "Coba lagi", **bukan** toast. Detail: notifications §16.

---

## 10. Issue tracking — beads (bd), BUKAN TodoWrite

- Gunakan **`bd`** untuk SEMUA task tracking. **DILARANG** TodoWrite/TaskCreate/markdown TODO list.
- Buat issue **sebelum** menulis kode; `bd update <id> --claim` saat mulai; `bd close` saat selesai.
- Priority **0–4 / P0–P4** (0=kritis, 2=medium, 4=backlog) — BUKAN high/medium/low.
- **JANGAN** `bd edit` (memblokir di $EDITOR). Update via `--title/--description/--notes/--design`.
- Pengetahuan persisten = **`bd remember`**, BUKAN MEMORY.md. Cari via `bd memories <keyword>`.

---

## 11. Pahami project DULU — GitNexus + graphify (WAJIB)

**Urutan wajib sebelum koding (§0):** `gitnexus` (peta kode: flow, caller/callee, impact) →
bila konteks lebih luas dari satu simbol, `graphify` (knowledge graph dari spec/dokumen/input) →
baru `context7` (docs library) → baru plan → baru koding. Grep buta = pelengkap terakhir, **bukan**
langkah pertama memahami kode.

### graphify — knowledge graph (untuk pemahaman berskala luas)

Skill global `graphify` (trigger **`/graphify`**) mengubah **input apa pun** (spec OpenAPI, dokumen
desain, kumpulan file) jadi knowledge graph — memetakan entitas & relasinya saat cakupan pemahaman
lebih besar dari yang bisa dijawab `gitnexus_context` satu simbol. Pakai saat: onboarding modul/spec
baru (mis. `docs/api/*/api.json`), memetakan keterhubungan lintas-domain, atau menyiapkan rencana
refactor besar. Output di `graphify-out/`. **gitnexus = peta KODE yang sudah ada; graphify = peta dari
INPUT/spec/dokumen.** Keduanya mendahului koding, saling melengkapi.

### GitNexus MCP tools (format panggilan, TIDAK pakai `--repo`)

MCP tools `gitnexus_impact`, `gitnexus_detect_changes`, `gitnexus_query`, `gitnexus_context`,
`gitnexus_rename` tersedia via **MCP server** (stdio). Tidak perlu argumen `--repo` — server
sudah tahu repo aktif. Format:

```
gitnexus_impact({target: "symbolName", direction: "upstream"})
gitnexus_detect_changes()
gitnexus_query({query: "concept"})
gitnexus_context({name: "symbolName"})
gitnexus_rename({oldName: "x", newName: "y"})
```

### CLI (fallback — WAJIB `-r kepegawaian-fe`)

Bila MCP tools tidak tersedia, pakai CLI. **Semua command butuh `-r kepegawaian-fe`**
atau error "repo not found".

| Tujuan | CLI |
|--------|-----|
| **Impact analysis** (sebelum edit) | `npx gitnexus impact <target> -d upstream -r kepegawaian-fe` |
| **Detect changes** (sebelum commit) | `npx gitnexus detect-changes -s unstaged -r kepegawaian-fe` |
| **Query** (cari flow) | `npx gitnexus query "<query>" -r kepegawaian-fe` |
| **Context** (360° simbol) | `npx gitnexus context <name> -r kepegawaian-fe` |
| **List repos** | `npx gitnexus list` |
| **Re-index** | `npx gitnexus analyze` (tidak perlu `-r`, sudah auto-detect CWD) |

> **`gitnexus rename`** tidak punya CLI equivalent — hanya lewat MCP.
> Jangan pakai `--target`, `--query`, `--name` — itu opsi tidak dikenal di CLI.

### Aturan

- **Sebelum mengedit** fungsi/class/method: impact analysis → laporkan blast radius.
  **Peringatkan** bila risk HIGH/CRITICAL sebelum lanjut.
- **Sebelum commit:** `detect-changes` untuk verifikasi scope perubahan.
- **Eksplorasi:** `query`/`context` alih-alih grep buta.
- **Rename simbol:** pakai `gitnexus_rename` (MCP), **JANGAN** find-and-replace.
- **Index stale?** `npx gitnexus analyze` dulu.

---

## 12. Tooling

- Package manager = **Bun**. Linter/formatter = **BiomeJS 2.2.0** (`bunx biome check`).
- Jalankan quality gate (lint/build/test) sebelum menutup issue bila kode berubah.

---

## 13. Session close (MANDATORY — kerja belum selesai sampai `git push` sukses)

**Sebelum commit & push, update checklist dulu:**
- **Update `docs/*.md`** — centang `[x]` issue/wave yang selesai, sinkron dengan
  status `bd` (jangan biarkan tracker basi vs `bd ready`/`bd list`).
- **Update checklist Definition of Done** issue terkait — pastikan semua item tercentang sebelum
  `bd close`.

```bash
git pull --rebase
bd dolt push
git push
git status   # HARUS "up to date with origin"
```

- **JANGAN** berhenti sebelum push. **JANGAN** bilang "siap push kalau Anda mau" — YOU push.
- File issue untuk sisa kerja, update status issue, bersihkan stash, lalu hand-off konteks.
