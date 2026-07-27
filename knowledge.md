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

## Session Completion

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
<!-- END BEADS INTEGRATION -->

## Exploration Priority — WAJIB 🚨

**Urutan menjelajahi kode: `graphify` → `gitnexus` → `grep` (fallback).**

| Urutan | Alat | Kapan pakai |
|--------|------|-------------|
| **1** | **graphify** | onboarding modul baru, memahami arsitektur & relasi domain level-tinggi. Buka `graphify-out/graph.html` untuk navigasi visual, atau `/graphify query "<q>"` untuk tanya graph. |
| **2** | **gitnexus** | impact analysis (`gitnexus_impact`), cari flow (`gitnexus_query`), context 360° simbol (`gitnexus_context`), ganti nama simbol (`gitnexus_rename`). |
| **3** | **grep** 🚫 | **HANYA fallback** bila graphify & gitnexus tidak menjawab — misal cari literal string, file config tanpa simbol, atau pola regex ad-hoc. Jangan mulai dengan grep untuk paham kode tak dikenal. |

---

## Graphify — Knowledge Graph

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
# GitNexus — Code Intelligence

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
