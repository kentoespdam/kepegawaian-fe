<!-- ========================================================================
     knowledge.md — Auto-loaded oleh Freebuff saat sesi baru.
     Ini adalah SINGLE SOURCE OF TRUTH untuk konteks project.
     JANGAN duplikasi konten ke file MD lain.
     ======================================================================== -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Test Credentials

Login test/dev ada di `.env.local` (`TEST_EMAIL` / `TEST_PASSWORD`) — gitignored, tidak di-commit.
Server dev: `http://localhost:3000` (`bun run dev`).

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files
<!-- END BEADS INTEGRATION -->

**Triage labels:** `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wont-fix`.

---

## 1. Project Identity

| Item | Value |
|------|-------|
| Nama | `kepegawaian-fe` — Employee Management System Frontend |
| Entitas | Perumdam Tirta Satria |
| Type | Next.js App Router SPA (server + client components) |
| Stack | Next.js 16.2.10, React 19.2.4, TypeScript 5, Tailwind CSS v4 |
| UI kit | shadcn di atas Base UI (bukan Radix) |
| Form | React Hook Form v7 + Zod v4 (`zodResolver`) |
| Data fetching | TanStack Query v5 client-side via `/api/proxy/*` |
| Auth | Appwrite (session httpOnly) + JWT di-mint di `proxy.ts` |
| Backend | Spring Boot `http://192.168.1.211:8080` |
| Notifikasi | sonner (satu `<Toaster>`) |
| Ikon | lucide-react |
| Font | Inter, self-hosted via `next/font` |
| Linter/format | BiomeJS 2.2.0 |
| Package manager | Bun |
| Tema | Light + dark mode via `next-themes` |
| Compiler | React Compiler aktif (`babel-plugin-react-compiler`) |

---

## 2. Modes of Operation

Freebuff beroperasi dalam **2 mode**. Mode ditentukan oleh prompt pertama user:

| Mode | Role | Output | Kapan? |
|------|------|--------|--------|
| **🔍 Grilling** | 🧠 **Manager** — analisis, rencana, NO CODING | Beads issue (plan implementasi) + MD file (checklist claim order) | User minta review/analisis/desain/planning |
| **💻 Coding** | 🔧 **Engineer** — eksekusi issue sesuai aturan | Code changes + update MD file + commit & push | User minta implementasi / ngerjain issue |

### 🔍 Grilling Mode

> **Agent sebagai Manager.** Tidak menulis kode sama sekali.

1. Analisis domain/modul yang diminta — baca CONTEXT-MAP, ADR, docs terkait
2. Grilling → sharpen plan bareng user (tanya-jawab)
   - **Pola pertanyaan Claude Code:** Ajukan pertanyaan **satu per satu** (bukan sekaligus)
   - Berikan **1-3 rekomendasi** dengan penjelasan singkat
   - Tandai **1 saran terbaik** dengan label "(Recommended)"
   - Format: tabel opsi + rekomendasi di akhir
   - Tunggu konfirmasi user sebelum lanjut ke pertanyaan berikutnya
3. Buat **beads issue** (`bd create`) berisi:
   - Judul: `{modul}: {deskripsi singkat}`
   - Body: implementasi plan langkah per langkah
   - Label: sesuai triage
4. Buat **MD file** di `docs/` berisi:
   - Claim order checklist (step-by-step urutan ngerjain)
   - Referensi context/docs yang relevan
   - Dependency/urut-urutan
5. Jika grill **menghasilkan/mengubah file** (CONTEXT/ADR/Claim Order di `docs/` atau `.beads/issues.jsonl`):
   - `git add docs/ .beads/issues.jsonl`
   - `git commit -m "docs: {modul}: {deskripsi singkat}"`
   - `git pull --rebase`
   - `bd dolt push`
   - `git push`
   - `git status` — pastikan "up to date with origin"
   Jika tidak ada file yang dibuat (hanya analisis/tanya-jawab) → Done, tidak perlu push.

### 💻 Coding Mode

> **Agent sebagai Engineer.** Mengeksekusi issue yang sudah ada plan-nya.

1. **Baca MD file** terkait issue — baca **teliti & mendalam**, pahami claim order
2. **Baca CONTEXT files** — `CONTEXT-MAP.md`, `docs/context/{domain}.md`, ADR, dll. **JANGAN halu/tebak-nebak**
3. **WAJIB baca & ikuti `docs/design/coding-rules.md`** — aturan mengikat, bila konflik dengan kebiasaan default, aturan ini menang.
4. **Aktifkan `/ponytail`** — skill untuk memaksa solusi paling sederhana, minimal, YAGNI. **WAJIB** sebelum nulis kode.
5. **Aktifkan skill graphify** — pahami arsitektur & relasi via knowledge graph
6. **Kerjakan issue** — ikuti workflow coding di section 8
7. **Update MD file** — tandai step yang sudah selesai
8. **Close issue** — `bd close <id>`
9. **Commit & push** ke GitHub sebagai finalisasi

---

## 3. Build & Run

```bash
bun run dev               # Dev server (http://localhost:3000)
bun run build             # Production build
bun run start             # Start production server
bun run test              # Run all tests (vitest)
bun run test:watch        # Watch mode
bunx biome check          # Lint entire project
bunx biome check --write  # Auto-format
```

---

## 4. Architecture

### Stack Details

| Aspek | Keputusan |
|---|---|
| Framework | Next.js 16.2.10 App Router; `middleware.ts` → `proxy.ts` (Node runtime) |
| React | 19.2.4 (React Compiler aktif) |
| UI kit | shadcn di atas Base UI (`npx shadcn init -b base`) — BUKAN Radix |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, token OKLCH) |
| Form | React Hook Form v7 + Zod via shadcn `<Field />` → satu `<CrudForm>` |
| Data fetching | TanStack Query v5 client-side via `/api/proxy/*` |
| Auth | Appwrite session httpOnly + JWT di-mint di `proxy.ts` |
| Backend | Spring Boot `http://192.168.1.211:8080` (Bearer JWT) |
| Notifikasi | sonner (satu `<Toaster>`, bottom-right) |
| Ikon | lucide-react (aksi ≥20px, area sentuh ≥40px) |
| Font | Inter, self-hosted via `next/font` |
| Linter/format | BiomeJS 2.2.0 |

### Domain Modules

| Modul | Fungsi | Status |
|-------|--------|--------|
| `master/` | Data referensi (15 CRUD entities: golongan, grade, jabatan, organisasi, profesi, sanksi, level, dll.) | ✅ Lengkap |
| `kepegawaian/` | Dashboard Pegawai, Data Pegawai (3 tab), Terminasi (2 tab) | ✅ Lengkap |
| `cuti/` | Pengajuan & saldo cuti | ⏳ Belum |
| `penggajian/` | Payroll | ⏳ Belum |
| `laporan/` | Pelaporan/rekap | ⏳ Belum |
| `sistem/` | Manajemen role, pengaturan | ⏳ Belum |

### Layer Pattern

```
src/
├── app/             # Next.js App Router (page = server component by default)
│   └── (app)/       # Protected layout (sidebar + top bar)
│       ├── master/  # 15 CRUD pages per entity
│       ├── kepegawaian/  # Dashboard, Data, Terminasi
│       ├── profil/  # Profile page + change password
│       └── page.tsx # Welcome/dashboard landing
├── components/      # Shared UI primitives
│   ├── ui/          # shadcn/Base UI components
│   ├── data-table.tsx, crud-form.tsx  # Shared primitives
│   └── app-shell.tsx, providers.tsx   # App frame
├── hooks/           # Custom hooks (useResource, useMasterTable, useFkOptions…)
├── lib/             # Utilities, auth, API client
│   ├── auth/        # Appwrite session, JWT, permissions
│   ├── api/         # Typed fetch client
│   └── utils.ts, paging.ts
├── config/          # Entity configs (typed, per-entity)
├── types/           # Generated OpenAPI types
└── proxy.ts         # Next.js middleware (route guard + JWT mint + API rewrite)
```

### Code Patterns

| Aspect | Rule |
|--------|------|
| Pages | Server component tipis → client component `<MasterPageClient entity="…">` |
| Tables | `<DataTable>` + `<DataTableToolbar>` + `<DataTablePagination>` — shared, reused by all entities |
| Forms | Satu `<CrudForm>` + Zod schema per entity — DRY via shared primitive |
| Mutations | `useMutation` + `invalidateQueries` — no optimistic removal |
| Delete | `<ConfirmDeleteDialog>` — type `HAPUS` to enable, 409 inline |
| RBAC | `can(roles, action, entity)` — unmount (not disable) for unauthorized actions |
| Data fetching | Client TanStack Query via `/api/proxy/*` — `gcTime: 5min`, `staleTime: 30s` (tables) |
| Auth proxy | `proxy.ts` — route guard (page) + JWT mint (cold/hot path) + rewrite to backend |
| Identity | `session.$id` = `pegawaiId` → `getPegawaiSession()` (opt-in, ADR-0006) |
| Tree entities | Flat table + "Parent" column + parent picker disables subtree |
| Filter | Combobox-of-id via `/list` endpoint, URL searchParams as source of truth |
| State handling | `isPending` → skeleton; `isPlaceholderData` → dim; `isError` → inline retry |

### Domain Context (Lazy Read)

Start with `CONTEXT-MAP.md`, then pick relevant sub-context:

| If touching... | Read |
|----------------|------|
| Master module (data referensi) | `docs/context/master.md` — entity taxonomy, FK graph, tree entities |
| Kepegawaian module (data/terminasi, identitas) | `docs/context/kepegawaian.md` — tulang punggung: ringkas 4 page, identity bridge |
| Dashboard Pegawai (§Page 1) | `docs/context/kepegawaian-dashboard.md` — self-edit biodata, 2 panel + accordion |
| Konsol Riwayat per-pegawai (§Page 4) | `docs/context/kepegawaian-riwayat.md` — Keputusan 1–12 |
| Pegawai terminology | `docs/context/pegawai.md` — employee identity model |
| Cross-module decisions | `CONTEXT-MAP.md` — core glossary + resolved decisions |
| System-wide ADRs | `docs/adr/` — 12 ADRs (auth, form, shell, identity bridge, etc.) |

---

## 5. Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `APPWRITE_URL` | ✅ | Appwrite server URL |
| `APPWRITE_PROJECT_ID` | ✅ | Appwrite project ID |
| `APPWRITE_API_KEY` | ✅ | Appwrite API key |
| `BACKEND_URL` | ✅ | Spring Boot backend URL |
| `DEFAULT_EMAIL_DOMAIN` | ⚠️ | Default email domain (perumdamts.com) |

Lihat `env.example` untuk nilai default.

---

## 6. Common Tasks & Examples

### Add a new CRUD page (Master entity)

```
Config → Page (server) → Client uses MasterPageClient
```

1. Generate OpenAPI types via `docs/api/master/extract-types.js`
2. Buat config di `src/config/master/{entity}.config.ts` — define columns + Zod schema + toolbar
3. Buat page di `src/app/(app)/master/{entity}/page.tsx` — server component tipis, render `<MasterPageClient entity="…" />`
4. Daftarkan entity di `src/config/entities.ts` (entity list) + `src/config/master-entity-types.ts` (type map)
5. Verifikasi: `bun run build` — pastikan typed references valid

### Add a combobox FK filter

```tsx
// Di toolbar config, tinggal tambah: { id: "organisasiId", label: "Organisasi", entity: "organisasi" }
// FkComboboxFilter otomatis fetch /list, cache via queryKey
```

### Debug / test a hook

```bash
bun run test -- --run src/hooks/useResource.test.ts
bun run test -- --run src/lib/utils.test.ts
```

### Claim & ship an issue

```bash
bd update <id> --claim     # claim
# ... code changes ...
bun run build              # WAJIB: zero error sebelum lanjut
bd close <id>              # complete
git pull --rebase
bd dolt push
git push
```

---

## 7. Session Completion (Mandatory)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Update graphify & gitnexus** (WAJIB jika kode berubah):
   ```bash
   # Langkah WAJIB sebelum commit
   # /graphify . --update  adalah skill command, bukan shell — jalankan via skill graphify
   npx gitnexus analyze                        # re-index GitNexus
   npx gitnexus detect-changes -s unstaged -r kepegawaian-fe  # verifikasi scope
   ```
   **Graphify:** jalankan `/graphify . --update` via skill graphify (bukan shell CLI).
   Bila graphify CLI terinstall, alternatif: `graphify --update .`
   Jika `detect-changes` menunjukkan perubahan di modul tak terduga → tunda push & telaah.
3. **Run quality gates** (jika kode berubah) — `bunx biome check`, `bun run test`, `bun run build`
4. **Update issue status** - Close finished work, update in-progress items
5. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
6. **Clean up** - Clear stashes, prune remote branches
7. **Verify** - All changes committed AND pushed
8. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

### Pre-Ship Checklist

- [ ] `bun run test` — all green
- [ ] `bun run build` — clean build
- [ ] `bunx biome check` — zero lint errors
- [ ] `npx gitnexus analyze` — refresh GitNexus index
- [ ] `npx gitnexus detect-changes -s unstaged -r kepegawaian-fe` — scope sesuai
- [ ] `/graphify . --update` via skill — update knowledge graph
- [ ] No out-of-scope errors resolved ad-hoc
- [ ] `bd dolt push` + `git pull --rebase` + `git push` → verify "up to date with origin"

---

## 8. Workflow — Coding Mode Detail

> Flow ini berlaku **hanya saat Coding Mode** (section 2). Grilling Mode punya flow sendiri.

### Skill Wajib

1. **WAJIB baca & ikuti `docs/design/coding-rules.md`** — aturan mengikat yang berlaku untuk seluruh Coding Mode. Bila konflik dengan kebiasaan default, **coding-rules.md menang**.
2. **WAJIB aktifkan `/ponytail`** sebelum menulis kode — memaksa solusi paling sederhana, shortest path, YAGNI.
3. **WAJIB gunakan `graphify` & `gitnexus`** untuk eksplorasi kode — **prioritas: `graphify` → `gitnexus` → `grep`**. Grep hanya sebagai last resort.
4. **PAHAMI CONTEXT files** sebelum edit — `CONTEXT-MAP.md`, `docs/context/{domain}.md`, ADR terkait. Jangan tebak-nebak.

### Sequence

**Read MD → Read CONTEXT → `/ponytail` → Explore → Write → Test → Build → Update Graph → Update MD → Close → Ship**

| Step | Action |
|------|--------|
| **Read MD** | Baca MD file terkait issue — teliti & pahami claim order |
| **Read CONTEXT** | `CONTEXT-MAP.md`, `docs/context/{domain}.md`, ADR — **jangan tebak-nebak** |
| **Explore** | **Prioritas:** `graphify` (knowledge graph) → `gitnexus` (code intelligence: `query/impact/context`) → `grep` (last resort saja) |
| **Write** | Maks ~120 lines/file. Split if exceeded. Follow conventions: shared primitives di `components/`, typed config di `config/`. |
| **Test** | Unit tests **required** for new logic. `bun run test` |
| **Build** | **WAJIB** `bun run build` — pastikan zero error sebelum lanjut |
| **Update Graph** | `npx gitnexus analyze` (refresh GitNexus) + `/graphify --update` (update knowledge graph via skill) — pastikan graph sesuai perubahan terbaru |
| **Update MD** | Tandai step yang sudah selesai di MD file |
| **Close** | `bd close <id>` — complete issue |
| **Ship** | Commit `<type>: <description>`. `git pull --rebase` → `bd dolt push` → `git push` → verify "up to date". Build & Graph WAJIB up-to-date sebelum step ini. |

---

## 9. Anti-Examples (Do NOT Do)

| Anti-Pattern | Why |
|--------------|-----|
| ❌ Hardcode hex/`oklch(...)` colors inside components | Always use design tokens (`--primary`, `--muted-foreground`, etc.) via `@theme` / CSS variables |
| ❌ `Record<string, unknown>` for typed entities | Use `EntityConfig<TItem, TReq>` generics — typed config eliminates casts |
| ❌ Use Radix instead of Base UI | The project is init'd with `shadcn -b base`. Props differ (e.g. `keepMounted` ≠ `forceMount`). Always check Base UI docs. |
| ❌ One `<Dialog>`/`<Sheet>` per table row | Mount form container **once** at page level, pass `editing` state — never N dialogs for N rows |
| ❌ `gcTime: Infinity` or `staleTime: Infinity` | Memory leak hazard. Tables: `gcTime: 5min`, `staleTime: 30s`. `/list` combos: longer `staleTime`. |
| ❌ Toast for data-load failure | Use inline "Coba lagi" panel inside the table. Toasts are for **mutation results only**. |
| ❌ CSS-hide/disable for unauthorized actions | **Unmount** (`null`) — can't be re-enabled via inspect. Cleaner for elderly UI. |
| ❌ Optimistic removal (remove row before 200) | Always wait for backend 200. On 409, keep dialog open with inline reason. |
| ❌ `grep` before `graphify`/`gitnexus` | Prioritas explore: graphify → gitnexus → grep. Jangan grep dulu. |
| ❌ Rename symbols with find-and-replace | Use `gitnexus_rename` — understands call graph. |
| ❌ Skip `gitnexus_impact` before edit | Always check blast radius first — report to user. |
| ❌ `git add` per-file between edits | Batched `git add` at the end only. Defeats single-batch guarantee. |
| ❌ Amending broken commits | Policy: **never amend**. Always `fix()` commit. |
| ❌ Resolve out-of-scope errors inline | File **new issue** instead — don't fix unrelated problems ad-hoc. |

---

## 10. Commit Convention

```
<type>: <description>
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`, `perf`.

**Policy:** never amend. Broken commit → new `fix()` commit.

---

## 11. Skills — Available Skills

Full catalog: `.claude/skills/` (skill GitNexus berada di `.claude/skills/gitnexus/`). Key ones:

| Skill | Use Case |
|-------|----------|
| `graphify` | Knowledge graph — eksplorasi/cluster project secara visual |
| `gitnexus-*` | Code intelligence (6 skills: exploring, impact, debugging, refactoring, guide, CLI) |
| `shadcn` | Manage shadcn components, add/search/debug UI components |
| `frontend-design` | Visual design guidance, typography, intentional aesthetics |
| `ponytail` / `ponytail-audit` | Force simplest solution (YAGNI) / whole-repo over-engineering audit |
| `tdd` | Test-first development |
| `code-review` | Review changes vs coding standards + spec |
| `grill-me` / `grill-with-docs` | Stress-test plans + create ADRs |
| `diagnose` / `diagnosing-bugs` | Debug / regression |
| `prototype` | Throwaway experimental code |
| `handoff` | Compact session → handoff doc |
| `to-prd` / `to-issues` / `to-spec` | Convert conversation → PRD → issues / spec |
| `domain-modeling` | DDD ubiquitous language |
| `triage` | Move issues through state machine |
| `wayfinder` | Plan huge chunks of work as decision tickets |
| `implement` | Implement from spec/tickets |
| `teach` | Teach a new skill/concept |
| `research` | Investigate against high-trust primary sources |
| `caveman` | Ultra-compressed communication mode |

---

## 12. Exploration Priority — WAJIB 🚨

**Urutan menjelajahi kode: `graphify` → `gitnexus` → raw tools (`grep`/`cat`/`find`/`ls`) sebagai last resort.**

### Hierarki tool (dari prioritas tertinggi ke terendah)

| Urutan | Alat | Command | Kapan pakai |
|--------|------|---------|-------------|
| **1** | **graphify** | `graphify query "<pertanyaan>"` · `graphify path "<A>" "<B>"` · `graphify explain "<konsep>"` | **Selalu coba ini dulu** untuk pertanyaan arsitektur, relasi antar modul, atau saat tidak tahu harus mulai dari mana. Jauh lebih murah token daripada cat/grep file besar. |
| **2** | **gitnexus** | `gitnexus_query` · `gitnexus_impact` · `gitnexus_context` | Setelah tahu simbol yang relevan dari graphify: impact analysis, caller/callee graph, context 360° simbol, ganti nama aman. |
| **3** | **baca file langsung** | `view_file` / `cat` | **Boleh langsung** bila (a) nama file sudah diketahui pasti, (b) file kecil & spesifik, (c) graphify/gitnexus sudah memberi arah jelas. Bukan untuk eksplorasi acak. |
| **4** | **grep / find / ls** 🚫 | `grep` · `find` · `ls` | **HANYA last resort** bila graphify & gitnexus tidak menjawab — misal cari literal string, file config tanpa simbol, pola regex ad-hoc. **JANGAN mulai eksplorasi dengan grep** untuk paham kode tak dikenal. |

### Aturan praktis

- **"Saya tidak tahu arsitekturnya"** → `graphify query "<pertanyaan>"` atau `graphify explain "<konsep>"` DULU
- **"Saya tahu simbolnya, tapi tidak tahu dampaknya"** → `gitnexus_impact` + `gitnexus_context`
- **"Saya tahu nama filenya"** → `view_file` langsung (OK)
- **"Saya mau cari string literal/regex di seluruh codebase"** → `grep` (boleh, ini use-case valid)
- **❌ JANGAN:** `grep useQuery src/ -r` untuk "pahami bagaimana data fetching bekerja" — itu tugas graphify/gitnexus
- **"Ada runtime error di browser"** → `scripts/nextjs-mcp-call.sh get_errors` — langsung dapat source-mapped stack traces tanpa grep manual
- **"Mau verifikasi route structure"** → `scripts/nextjs-mcp-call.sh get_routes` — lebih cepat dari `find src/app`

---

## 13. Graphify — Knowledge Graph

Project ini sudah memiliki knowledge graph yang telah di-build di `graphify-out/`:

- **`graphify-out/graph.html`** — navigasi visual interaktif (buka di browser)
- **`graphify-out/graph.json`** — data graph mentah (nodes: 1.031, edges: 2.824)
- **`graphify-out/GRAPH_REPORT.md`** — laporan lengkap (god nodes, communities, gaps)

### Commands

| Perintah | Fungsi |
|----------|--------|
| `/graphify . --update` | Update graph setelah perubahan kode (inkremental — code-only tanpa LLM) |
| `/graphify query "<question>"` | Tanya graph tentang arsitektur / relasi antar modul |
| `graphify --update .` | CLI langsung (bila `graphify` terinstall) |
| `/graphify explain "<concept>"` | Penjelasan satu konsep + semua koneksinya |

**graphify berfungsi sebagai peta dari INPUT/spec/dokumen.** Sedangkan gitnexus (di bawah)
adalah peta dari KODE yang sudah ada. Keduanya saling melengkapi.

---

<!-- gitnexus:start -->
# 14. GitNexus — Code Intelligence

This project is indexed by GitNexus as **kepegawaian-fe** (3007 symbols, 5106 relationships, 153 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/kepegawaian-fe/context` | Codebase overview, check index freshness |
| `gitnexus://repo/kepegawaian-fe/clusters` | All functional areas |
| `gitnexus://repo/kepegawaian-fe/processes` | All execution flows |
| `gitnexus://repo/kepegawaian-fe/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

---

## 15. Next.js DevTools MCP

Next.js 16.2.10 ship MCP endpoint di `http://localhost:3000/_next/mcp` (otomatis aktif saat dev server running). Untuk memanggil MCP tools dari session ini, gunakan wrapper script di `scripts/nextjs-mcp-call.sh`:

### Quick Reference

```bash
# Dev server WAJIB running (port 3000)
scripts/nextjs-mcp-call.sh get_project_metadata          # Info project
scripts/nextjs-mcp-call.sh get_errors                     # Error diagnostics (build + runtime + source-mapped)
scripts/nextjs-mcp-call.sh get_routes                     # Semua routes (appRouter + pagesRouter)
scripts/nextjs-mcp-call.sh get_logs                       # Path ke log file
scripts/nextjs-mcp-call.sh get_server_action_by_id '{"actionId":"xxx"}'  # Cari Server Action
scripts/nextjs-mcp-call.sh get_page_metadata              # Metadata halaman dari browser session
```

### Kapan Pakai

- **Debug runtime errors** → `get_errors` — source-mapped stack traces, browser console errors
- **Cek routes** → `get_routes` — verifikasi route structure tanpa grep filesystem
- **Investigasi halaman** → `get_page_metadata` — apa yang contribute ke render saat ini
- **Server Actions** → `get_server_action_by_id` — trace action ID ke filename + export name

### HTTP Direct (tanpa wrapper)

```bash
curl -s -H "Accept: application/json, text/event-stream" \
     -H "Content-Type: application/json" \
     -X POST \
     -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_errors","arguments":{}}}' \
     http://localhost:3000/_next/mcp
```

### Status

| Komponen | Status |
|----------|--------|
| `next-devtools-mcp` (CLI MCP server) | ✅ Bisa dijalankan (v0.4.0, 4 tools) |
| Next.js dev server MCP endpoint | ✅ Aktif di port 3000 |
| Wrapper script | ✅ `scripts/nextjs-mcp-call.sh` |

---

## 16. Useful Links

- [Next.js 16 Docs](https://nextjs.org/docs) (⚠️ read `node_modules/next/dist/docs/` first — breaking changes)
- [Base UI React](https://base-ui.com/react) — component docs (bukan Radix!)
- [Tailwind CSS v4](https://tailwindcss.com/docs/installation)
- [TanStack Query v5](https://tanstack.com/query/v5)
- [React Hook Form v7](https://react-hook-form.com/)
- [Zod v4](https://zod.dev/)
- [BiomeJS](https://biomejs.dev/)
- [Appwrite Auth](https://appwrite.io/docs/products/auth)
- [shadcn/ui (Base UI)](https://ui.shadcn.com/)
- [Sonner Toast](https://sonner.emilkowal.ski/)
