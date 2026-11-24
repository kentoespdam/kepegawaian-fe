<!--
  File ini adalah STUB — semua konteks project ada di `knowledge.md`.
  @AGENTS.md di prompt akan load konten dari knowledge.md via @knowledge.md.
  GitNexus info sudah termuat di knowledge.md §14 — jangan duplikasi di sini.
-->
@knowledge.md
> `GEMINI.md` berisi routing khusus Antigravity dan bukan sumber konfigurasi Codex.

## Codex UI Routing

Untuk routing UI di Codex, pilih model berdasarkan jenis pekerjaan; jangan otomatis menyerahkan seluruh task frontend ke `website_ui`/Astra.

| Situasi | Rute |
|---|---|
| Koreksi warna, spacing, padding, atau detail visual lokal | Luna langsung |
| Dashboard/halaman baru dari komponen dan design system existing | `website_ui`/Sol membuat spesifikasi → Root atau Luna mengimplementasikan |
| UI interaktif kompleks yang perlu iterasi rapat terhadap kode dan screenshot | Sol mengerjakan desain sekaligus coding |
| Visual direction atau design system premium | Astra desain saja bila Sol tidak memadai |
| Koreksi detail setelah implementasi | Luna lebih dulu, Sol bila perlu |
| Masalah frontend yang menyentuh arsitektur sistem atau mandatory trigger lain | `deep_reasoner` |

### Handoff desain saja

Untuk task desain yang tidak memerlukan iterasi langsung terhadap implementasi, Root mengirim satu brief kepada `website_ui` yang mencakup tujuan, batasan, file/komponen relevan, dan design system. Designer boleh membaca file secara terarah tanpa mengubahnya. Designer mengembalikan satu spesifikasi implementasi yang cukup konkret untuk dikerjakan tanpa tebakan: file/komponen sasaran, struktur/layout, perilaku dan state interaksi, responsivitas, token/style, serta kriteria penerimaan. Jika konteks penting tidak tersedia, designer meminta klarifikasi yang spesifik.

Instruksi “jangan edit file” pada agent desain adalah aturan perilaku, bukan pembatasan sandbox. Root tetap bertanggung jawab memberi ruang lingkup yang jelas dan memastikan implementasi dilakukan oleh Root atau Luna setelah spesifikasi siap. Hindari handoff berulang antara designer dan implementer; kecualikan ini bila UI memang membutuhkan iterasi kode/screenshot secara langsung.

Gunakan Astra untuk desain saja hanya ketika tingkat visual premium yang diminta belum tercapai dengan Sol. Jika nama/model agent yang direkomendasikan tidak tersedia, gunakan rute terdekat dengan biaya lebih rendah dan jangan mengarang kemampuan agent.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **kepegawaian-fe** (6727 symbols, 12052 relationships, 300 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

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
