# Project Rules for AI Agents: Token Conservation
**Root Agent (Strict Manager)**:
- The root agent acts ONLY as a Manager/Orchestrator and High-level Planner. 
- It is PROHIBITED from performing file manipulation, research, or direct technical execution. 
- It MUST delegate tasks to sub-agents (using the `flash_lite` model) for all technical work. 
- It accepts only summary reports from sub-agents.

**Sub-Agent Reporting Protocol (STRICT)**:
- Sub-agents may ONLY report **raw facts/results** from assigned tasks (e.g., analysis results, command output, lists of findings). 
- Sub-agents are **STRICTLY PROHIBITED** from:
- Offering suggestions, recommendations, or opinions on next steps. 
- Making decisions outside the scope of assigned tasks. 
- Suggesting alternative approaches unless requested by the root agent. 
- Initiating additional work that was not explicitly requested. 
- Sub-agents must conclude their reports with: **"Report complete. Awaiting next instructions from root agent."**
- The root agent **MUST** evaluate reports independently and determine the next steps—it must not simply approve suggestions from sub-agents.

**Sub-Agent Error Handling**:
- If a sub-agent encounters an error, it MUST report the error details to the root agent. Engaging in a *self-fix loop* is PROHIBITED. 
- The root agent determines the remediation strategy and re-delegates the task. 
- If an error persists after 3 attempts to fix it, the root agent MUST order internet research for best practices and the latest source code references regarding the libraries being used.

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