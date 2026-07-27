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
- **Pahami sebelum edit — urutan eksplorasi WAJIB: `graphify` → `gitnexus` → `grep` (fallback).**
  graphify untuk pemahaman arsitektur level-tinggi & relasi domain (output di `graphify-out/`).
  gitnexus untuk pelacakan simbol, impact analysis, & query flow kode. **`grep` HANYA sebagai
  fallback** — graphify/gitnexus dulu, baru grep. Larangan "grep buta" tetap berlaku.
- `gitnexus impact` **WAJIB** bila target edit: (a) **fan-in ≥2** (di-import ≥2 modul), **atau**
  (b) di **permukaan kritis**: `proxy.ts`, DAL/`verifySession`, `can()`/RBAC, shared primitive
  (`<DataTable>`/`<CrudForm>`/`<Can>`/dst), `src/hooks/*`. Di situ, bangun pemahaman caller/callee &
  blast radius dari **peta kode**, bukan tebakan. **Di bawah ambang** (edit 1-file lokal, config glue,
  typo, rename lokal): baca file langsung + graphify/gitnexus tetap dianjurkan untuk orientasi
  singkat, tapi boleh langsung ke kode bila perubahan sepele — ADR-0007 melindungi efisiensi agen.
- **Plan dulu, baru implementasi.** Alur persiapan: `bd show <id>` → **pahami kode** (via `gitnexus`
  bila edit memicu ambang blast-radius di atas & §11; selain itu baca file langsung) → baca modul
  DESIGN relevan → **fetch docs terbaru via context7** (API/prop/best-practice, jangan andalkan
  ingatan). **JANGAN** ngetik dari asumsi — asumsi basi = bug diam & rework. **Dua sumbu keputusan
  yang TERPISAH**, jangan dicampur:
  - **Rencana tertulis + konfirmasi user (sumbu: seberapa besar tugasnya).** Tugas **non-trivial** →
    WAJIB rencana tertulis (masuk *plan mode* / `bd --design`/`--notes`) → **sampaikan & minta
    konfirmasi pengguna** → baru eksekusi. Perubahan **sepele** (typo, satu baris, rename lokal) →
    boleh langsung, tanpa plan tertulis.
  - **Impact analysis (sumbu: seberapa jauh dampaknya — ADR-0009).** fan-in ≥2 atau permukaan kritis
    → `gitnexus impact` WAJIB, terlepas dari besar tugas. Contoh: edit **1 baris di `proxy.ts`** =
    sepele secara usaha (boleh skip plan tertulis) **tapi** blast-radius tinggi → impact **tetap wajib**.

---

## 1. Struktur & kualitas kode

- **Ukuran file = trigger tinjauan, BUKAN hard gate** (ADR-0007). Ambang di bawah adalah lampu kuning
  *"berhenti & lihat"*, bukan perintah pecah. Bila file lewat ambang **tapi kohesif satu tanggung jawab**
  (mis. form 27 field, shared primitive `<DataTable>`) → **biarkan**. Pecah HANYA bila ada **>1 alasan
  untuk berubah** (SRP: fetch vs render vs tipe), lalu angkat sub-komponen / hook `src/hooks/` / tipe
  `src/types/`. Ambang per-kategori:
  - `components/ui/*` (generated) → **exempt total** (§3 larang edit manual)
  - `src/types/*` (DTO) → **exempt** (soft ~400) · `src/config/*` → **exempt** (soft ~200) — deklaratif
  - shared primitive → **~250** (konsolidasi DRY sengaja besar, §18) · komponen → **~180** · hook/lib → **~120** (di sini baris = logika)
- **Anti-fragmentasi (mengikat).** DILARANG pecah file hanya demi mengejar angka. Memotong satu unit
  kohesif jadi 2+ file yang selalu diedit bareng **menaikkan biaya konteks AI agent** (lebih banyak
  `Read`, import graph lebih dalam) tanpa gain keterbacaan. Fragmentasi = anti-pola, sama buruknya
  dengan file raksasa yang campur tanggung jawab.
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
  **Deviasi sadar** — patuhi ambang komponen §1 (~180, trigger tinjauan bukan gate; ADR-0007) &
  anti-fragmentasi: form kohesif banyak-field TIDAK dipecah demi angka. Lihat `forms.md §10.5`.
- Skema Zod **selaras** dengan `required`/`minLength`/`minimum` OpenAPI Backend.
- **`fields[]` WAJIB mencerminkan `{Entity}PostRequest`/`PutRequest`.** Setiap property di
  interface request (`src/types/master/{entity}.ts`) HARUS punya input — lewat entri `fields[]`,
  **atau** entri `fkSources[]` untuk property `*Id` (dropdown FK = input-nya). Property yang hanya
  muncul di `columns`/`searchFields` **TIDAK** dihitung tercakup — itu display/filter, bukan input.
  Field yang kurang = data diam-diam hilang saat submit (mis. bug `jenis-sp`: `kode` ada di
  `searchFields` tapi tak ada di `fields[]`, jadi form cuma kirim `nama`). `*PostRequest` hand-written
  = sumber kebenaran field; jangan andalkan `simpleNameSchema`/`nameField` bila request > `nama`.
  **Ditegakkan compiler, bukan audit manual (ADR-0008).** `makeConfig<TQuery, TReq>` mewajibkan
  `TReq` (mis. `makeConfig<SanksiQuery, SanksiPostRequest>(...)`); coverage-set
  `{fields[].name} ∪ {fkSources[].field}` HARUS superset dari keys **required** `TReq` — kurang satu
  required → `tsc` error. Property **optional** `TReq` boleh tak punya input. Grep-statis tak andal
  (`fields` = arg posisional `makeConfig`, bukan key), jadi enforcement pindah ke tipe.
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

## 11. Pahami project DULU — Graphify → GitNexus → grep (fallback)

**Urutan eksplorasi WAJIB: `graphify` → `gitnexus` → `grep` (fallback).**
graphify untuk pemahaman arsitektur level-tinggi, relasi domain, & komunitas kode (lihat output
di `graphify-out/graph.html`). gitnexus untuk pelacakan simbol, impact analysis, query flow,
& context 360° simbol. **`grep` HANYA sebagai fallback** bila graphify & gitnexus tidak mencukupi
(mis. cari literal string, file config tanpa simbol, atau pola regex ad-hoc).

**Diskalakan berdasarkan blast-radius (ADR-0009):** bila edit memicu ambang WAJIB (fan-in ≥2
atau permukaan kritis) → `gitnexus impact` (flow, caller/callee, blast radius) dulu. Selain itu →
graphify/gitnexus tetap dianjurkan untuk orientasi singkat, lalu baca file langsung. `context7`
tetap wajib sebelum pakai library apa pun (§2).

### graphify — knowledge graph (untuk pemahaman berskala luas)

Skill global `graphify` (trigger **`/graphify`**) mengubah **input apa pun** (spec OpenAPI, dokumen
desain, kumpulan file) jadi knowledge graph — memetakan entitas & relasinya saat cakupan pemahaman
lebih besar dari yang bisa dijawab `gitnexus_context` satu simbol. Pakai saat: onboarding modul/spec
baru (mis. `docs/api/*/api.json`), memetakan keterhubungan lintas-domain, atau menyiapkan rencana
refactor besar. Output di `graphify-out/`. **gitnexus = peta KODE yang sudah ada; graphify = peta dari
INPUT/spec/dokumen.** Keduanya mendahului koding, saling melengkapi.

**Update (`--update`):** Jalankan `/graphify . --update` setelah perubahan kode untuk re-ekstraksi
inkremental (hanya file baru/berubah + update graph tanpa LLM untuk code-only). Atau gunakan
`graphify hook install` untuk post-commit hook otomatis (AST-only, tanpa LLM).

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

- **Sebelum mengedit** fungsi/class/method yang **fan-in ≥2 atau di permukaan kritis** (ADR-0009):
  impact analysis → laporkan blast radius. **Peringatkan** bila risk HIGH/CRITICAL sebelum lanjut.
  Edit lokal di bawah ambang: tak wajib.
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

**Sebelum commit & push, update knowledge graph & index kode:**
1. **Update graphify knowledge graph** — jalankan `/graphify . --update` (via skill graphify)
   agar graph mencerminkan perubahan kode terbaru (inkremental, code-only = tanpa LLM).
2. **Update GitNexus index** — `npx gitnexus analyze` agar perubahan simbol & flow tercermin
   di index (auto-detect CWD, tidak perlu `-r`).
3. **Detect changes GitNexus** — `gitnexus_detect_changes()` (MCP) atau CLI
   `npx gitnexus detect-changes -s unstaged -r kepegawaian-fe` untuk verifikasi scope perubahan.

**Update checklist dokumentasi:**
- **Update `docs/*.md`** — centang `[x]` issue/wave yang selesai, sinkron dengan
  status `bd` (jangan biarkan tracker basi vs `bd ready`/`bd list`).
- **Update checklist Definition of Done** issue terkait — pastikan semua item tercentang sebelum
  `bd close`.

```bash
# 1. Update graphify knowledge graph
/graphify . --update
# 2. Update GitNexus index & detect changes
npx gitnexus analyze
npx gitnexus detect-changes -s unstaged -r kepegawaian-fe
# 3. Push
cd /mnt/DATA/html/kepegawaian-fe
git pull --rebase
bd dolt push
git push
git status   # HARUS "up to date with origin"
```

- **JANGAN** berhenti sebelum push. **JANGAN** bilang "siap push kalau Anda mau" — YOU push.
- File issue untuk sisa kerja, update status issue, bersihkan stash, lalu hand-off konteks.

> **Catatan:** `/graphify . --update` adalah perintah di skill graphify (bukan CLI shell).
> Bila graphify CLI (`graphify`) terinstall via pip, bisa juga langsung:
> `graphify --update .` atau pasang post-commit hook: `graphify hook install`.
