# Project Rules for AI Agents: Token Conservation

## LLM Routing — Mandatory Classification

Root agent WAJIB mengklasifikasikan SETIAP task ke salah satu tier berikut SEBELUM bertindak. DILARANG skip klasifikasi.

| Tier | Trigger | Model | Role Name |
|---|---|---|---|
| `[LITE]` | Baca/tulis file, jalankan command, ekstrak log, script repetitif, I/O | `flash_lite` | Lite Worker |
| `[PRO]` | Desain arsitektur, migrasi framework, debug algoritma kompleks, evaluasi keamanan, refactoring strategis | `pro` (atau `inherit` jika root=Sonnet) | Pro Reasoner |
| `[DIRECT]` | Pertanyaan trivial yang bisa dijawab 1–2 kalimat | root (inline) | — |

### Routing Rules (WAJIB diikuti)

1. **[DIRECT]**: Jawab langsung. Zero subagent spawn. Zero basa-basi — setiap token harus mengandung informasi.
2. **[LITE]**: Cek `manage_subagents(Action="list")` dulu. Jika ada Lite Worker idle → `send_message` (reuse). Jika tidak ada / killed → `invoke_subagent` model `flash_lite`, role `"Lite Worker"`.
3. **[PRO]**: DILARANG menjawab sendiri. Cek `manage_subagents(Action="list")` dulu. Jika ada Pro Reasoner idle → `send_message` (reuse). Jika tidak ada / killed → `invoke_subagent` model `pro`, role `"Pro Reasoner"`. Root HANYA membaca blok `<<<DISPATCH>>>` dari output Pro — reasoning di luar blok diabaikan.
4. **Task Ambiguous** ([LITE] + [PRO]): Split sequential — [LITE] ekstraksi dulu, hasil di-forward via ARTIFACT path ke [PRO]. Root tidak membaca konten file.
5. **Subagent reuse wajib**: Spawn baru HANYA jika subagent killed atau context penuh. Multiple Lite Workers diizinkan untuk task paralel. Maksimal 1 Pro Reasoner per sesi.

### DISPATCH Format (Pro → Root)

Pro Reasoner WAJIB mengakhiri setiap output dengan blok ini:

```
<<<DISPATCH>>>
TIER: LITE | DIRECT
TUGAS: [instruksi spesifik untuk worker atau root]
ARTIFACT: [absolute path file/scratchpad, atau NONE]
<<<END_DISPATCH>>>
```

Root agent HANYA membaca konten antara `<<<DISPATCH>>>` dan `<<<END_DISPATCH>>>`. Semua reasoning di atas blok ini diabaikan.

### Error Handling dalam Routing

- Lite Worker gagal → lapor ke root. Root retry max 3x. Setelah 3x gagal → eskalasi ke Pro Reasoner untuk root cause analysis. Setelah Pro → jika masih gagal → riset internet.
- Pro Reasoner DILARANG melakukan self-fix loop. Semua perbaikan via root.

**Context Caching & Prefix Stability Optimization**:
- **Static Prefix**: Use a standard prefix template for every sub-agent instruction. 
- **Dynamic Suffix**: Place variable parameters (files, targets) at the end of the prompt (suffix). 
- **Lean Payload**: Avoid passing conversation history; provide only the relevant instruction payload. 
 
**Token & Efficiency**:
- **Concise Communication**: Get straight to the point; no fluff. 
- **Targeted Modifications**: Use `replace_file_content` (micro-diffs). 
- **Selective Reading**: Read only the relevant parts of the file. 
- **Quiet Commands**: Use flags to minimize terminal output (`-q`, `head`, `grep`).

**Mandatory Pre-Coding Gates**:
- **Ponytail**: MUST load the `/ponytail` skill before modifying code. 
- **Coding Session**: MUST follow the protocol in `.agents/rules/coding-session.md`.
- **Grilling Session**: For Q&A sessions (`/grill-me` or `grilling`), MUST follow the protocol in `.agents/rules/grilling-session.md`.
- **Issue Tracking (Beads/bd)**: Claim tasks (`bd update <id> --claim`), close tasks (`bd close <id>`). Creating manual to-do lists is PROHIBITED. 
- **GitNexus First**: MUST use `gitnexus_impact` & `gitnexus_query` before exploration or modification. When executing `npx gitnexus` commands, always use the repo `kepegawaian-fe` (e.g., `npx gitnexus query "<symbol>" --repo kepegawaian-fe`) except `npx gitnexus analyze`. 
- **Sandbox Policy**: MUST use `BypassSandbox: true` for all `git` and `bd` commands.

**File Size & Modularity (Token Conservation)**:
- Target: 150 – 250 LOC per file. 
- Hard Ceiling: Max 300 LOC. MUST modularize if approaching the limit.

**JavaScript/TypeScript Toolchain (Bun)**:
- MUST use `bun` (`bun run dev`, `bun run build`, `bun run test`, `bun add`, `bunx biome check`, `bunx biome check --write`).

**Session Completion & Checklist**:
- Run pre-ship verification: `bun run test`, `bun run build`, `bunx biome check`.
- Run `npx gitnexus analyze` and `gitnexus_detect_changes()` (or `npx gitnexus detect-changes -s unstaged -r kepegawaian-fe`).
- Update knowledge graph: run `graphify update .` if code changed.
- Sync issue tracking and git: `bd dolt push`, `git pull --rebase` && `git push` (MUST use `BypassSandbox: true`). 
- Refer to `knowledge.md` (§7.1 Pre-Ship Checklist) & `docs/design/coding-rules.md` for detailed standards.