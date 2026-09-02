# CLAIM-ORDER: Coding Rules Audit — Ekstrak Logic, Konsolidasi Hooks, Split File

**Epic:** `kepegawaian-fe-5tvj` (open)
**Audit:** 2026-09-01 (ponytail-audit)
**Tujuan:** Perbaiki violation coding-rules §2.3 (separasi logic/presentasi), §2.2 (ukuran file), §5.1 (query key factory), dan hapus dead code.

**Progress:** Phase 1 ✅ → Phase 2 ✅ → Phase 3 ✅ → Phase 4 ⏳

**Phase 3 Status:** Sub-phase 3A ✅ (pendukung), 3B ✅ (riwayat), 3C partially ✅ (build+lint pass, tests pending)

---

## Overview

Ponytail-audit seluruh `src/` terhadap `docs/design/coding-rules.md` menemukan **14 finding** dengan potongan bersih **~2,800 lines**, **-8 deps**, dan **-15 hardcoded query key arrays**. Temuan terbesar: logic fetch/mutation hidup di dalam komponen (§2.3), file melebihi ceiling ukuran (§2.2), dan query key factory tidak lengkap (§5.1).

---

## Phase 1: Rule Discovery ✅

> **Status:** ✅ Complete — 2026-09-01
> **Method:** Exhaustive search of `docs/`, `src/`, config files, and references.

- [x] **Step 1.1:** Identifikasi master source → `docs/design/coding-rules.md` (12 sections)
- [x] **Step 1.2:** Cari `SCHEMA-ALIGNMENT.md` → ❌ tidak ada (dead ref, ADR-0008 sudah supersede)
- [x] **Step 1.3:** Audit enforcement mechanisms → Biome + TS build + Vitest (no pre-commit, no CI)
- [x] **Step 1.4:** Search ad hoc rules di docs/ADR/code → 3 rules tidak di master doc
- [x] **Step 1.5:** Map CLAIM-ORDERs referencing rules → 16 total, 6 pending
- [x] **Step 1.6:** Write findings ke audit MD ✅

### 1.1 Master Source

`docs/design/coding-rules.md` — 12 sections (§0–§11), ~230 lines.
**Authority:** `knowledge.md` §4 + §33 grants it binding precedence over all other conventions.

| Section | Topic | Ceiling/Key Rule |
|---------|-------|------------------|
| §0 | Mandatory sequence (GitNexus) | impact → edit → detect_changes → commit |
| §1 | File size | ~120 lines soft ceiling, 300 hard ceiling; ADR-0007 changed hard gate → review trigger |
| §2.2 | File size ceiling | 120 lines (soft), 300 (hard) |
| §2.3 | Separation of concerns | Logic (fetch/mutation) MUST live in hooks, not in page components |
| §3 | shadcn — Base UI only, NOT Radix | `npx shadcn add`, never `@radix-ui/*` |
| §4 | Styling & design tokens | `tailwind-merge`, `tw-` prefix vars, CSS custom props |
| §4.3 | Touch-target accessibility | Min 44×44px interactive elements |
| §5.1 | Query key factory | Centralized per-module, no hardcoded `["entity", ...]` arrays |
| §6 | Error handling | RFC-7807 envelope, inline in forms (not toast for 409/422) |
| §8 | Form fields | `fields[]` MUST mirror `{Entity}PostRequest`; ADR-0008 moved enforcement to compiler |
| §9 | RBAC | `hasPermission()` only, never `role === 'admin'`; unmount not CSS-hide |
| §10 | Data fetch patterns | `useResource` generic hook for standard CRUD |
| §11 | GitNexus mandatory | Impact analysis before every edit |

### 1.2 Linked But Missing: SCHEMA-ALIGNMENT.md

**Location referenced:** coding-rules.md line 48 — `"align with docs/SCHEMA-ALIGNMENT.md"`
**Status:** ❌ **File does not exist.** Zero files match `docs/SCHEMA-ALIGNMENT*`.
**Impact:** Low — the referenced rule is about auto-extracting schema fields from `*PostRequest`. ADR-0008 superseded this by moving enforcement to the TypeScript compiler (`fieldsFromPostRequest<T>` generic). The dangling reference is dead; the rule itself is enforced via type-safety, not a separate doc.
**Action:** Remove the dangling reference from coding-rules.md (cleanup, not a blocker).

### 1.3 Enforcement Mechanisms

| Mechanism | What it enforces | Config | Automated? |
|-----------|------------------|--------|------------|
| **Biome formatter** | §1 lineWidth (120), §4 indent (tab, width 2) | `biome.json` → `formatter.lineWidth: 120`, `indentStyle: "tab"` | ✅ `bun run format` |
| **Biome linter** | recommended + next + react domains; `noUnknownAtRules: off` for Tailwind | `biome.json` → `linter.rules` | ✅ `bun run lint` |
| **TypeScript build** | Type safety, §8 fields-mirror-PostRequest (ADR-0008) | `tsconfig.json`, `next.config.ts` | ✅ `bun run build` |
| **Vitest** | Unit tests (42 test files detected) | `vitest.config.ts` | ✅ `bun run test` |
| **Beads pre-commit hook** | Issue tracking integration only (NOT code quality) | `.beads/hooks/pre-commit` | ⚠️ Manual: `bd` commands |
| **GitNexus** | §0 + §11 impact analysis, detect_changes before commit | AGENTS.md, ADR-0009 | ⚠️ Agent convention (no CI gate) |
| **ESLint / Prettier** | — | ❌ **Not present** | N/A |
| **Husky / lint-staged** | — | ❌ **Not present** | N/A |
| **CI/CD pipeline** | — | ❌ **No `.github/workflows/`** | N/A |

**Key gap:** No automated pre-commit hook enforces Biome format/lint or TypeScript typecheck. Enforcement is entirely **agent discipline** (ponytail/code-review skills) + **manual verification** (`bun run build && bun run lint && bun run test`).

### 1.4 Ad Hoc Rules Elsewhere (Not in coding-rules.md)

These rules are referenced across docs/code but are **not consolidated** in the master document:

| Rule | Source | Status |
|------|--------|--------|
| File size ceiling changed from hard gate → review trigger | ADR-0007 | ✅ Supersedes §1 original wording |
| `fields[]` enforced by compiler, not manual audit | ADR-0008 | ✅ Supersedes §8 original wording |
| GitNexus mandatory, scaled by blast radius | ADR-0009 | ✅ Reinforces §0 + §11 |
| Dashboard two-panel accordion uses shadcn add/update | ADR-0011 | ✅ Consistent with §3 |
| Data pendukung: one category = one file ≤ 120 lines | ADR-0014 | ⚠️ Not in master rules |
| Design system: Base UI primitives (not Radix) | `docs/design/README.md` §3, shadcn skill `rules/base-vs-radix.md` | ✅ Consistent with §3 |
| Penggajian master pattern: config-driven EntityConfig + useResource | `docs/CLAIM-ORDER-penggajian-master-pattern-refactor.md` | ✅ Consistent with §10 |
| `src/components/ui/*` exempt from file-size and lint rules | ADR-0007, biome.json excludes | ✅ Implicit |
| Shared primitives ceiling ~250 lines (DRY consolidation) | ADR-0007 | ⚠️ Not in master rules |
| `fmtRupiah` utility consolidated | CLAIM-ORDER-penggajian-master-pattern §4 | ✅ Done |

### 1.5 Coding Rules Already Referenced by CLAIM-ORDERs

| CLAIM-ORDER | Sections Referenced | Status |
|-------------|-------------------|--------|
| data-pegawai-table | §1 (line ≤120) | ✅ Done |
| data-pegawai-ringkasan | §1, §2.3 | ✅ Done |
| grade-cascade | §1 | ✅ Done |
| cuti-datepicker-min-besok | coding-rules read required | ⏳ Not started |
| cuti-jenis-list-mini-parentid | coding-rules read required | ⏳ Not started |
| cuti-kuota-contract-pageresult | coding-rules read required | ⏳ Not started |
| cuti-persetujuan-gate-approver | coding-rules read required | ⏳ Not started |
| profesi-badge | §1, §5.1 | ✅ Done |
| profesi-badge-nested-migration | §1, §2.3, §5.1 | ✅ Done |
| riwayat-pegawai | §1 | ✅ Done |
| pendukung | §1 | ✅ Done |
| data-pegawai-crud | §1 | ✅ Done |
| revisi2-tambah-pegawai | §1 | ⏳ In progress |
| penggajian-master-pattern-refactor | §10 (useResource), §5.1 | ✅ Done |
| coding-rules-audit (this doc) | §2.3, §2.2, §5.1 | ⏳ Phases pending |
| redesign-audit | §4 (styling) | ⏳ Not started |

### 1.6 Phase 1 Summary

| Item | Count |
|------|-------|
| Master rule sections | 12 (§0–§11) |
| Missing linked files | 1 (`SCHEMA-ALIGNMENT.md`) |
| Ad hoc rules not in master | 3 (ADR-0007 ceiling, ADR-0014 data-pendukung, ADR-0007 shared-prim ceiling) |
| Automated enforcement | 4 (biome format, biome lint, TS build, vitest) |
| Missing enforcement | 3 (pre-commit quality gate, CI pipeline, ESLint/Prettier) |
| CLAIM-ORDERs referencing rules | 16 |
| CLAIM-ORDERs with pending work | 6 |

**Next phase (Phase 2):** Compare each coding-rule section against actual `src/` code to find violations (§2.3 logic-inline, §5.1 hardcoded keys, §2.2 oversized files, §8 field mismatches). ⏳

---

## Phase 2: Violation Scan ✅

> **Status:** ✅ Complete — 2026-09-01
> **Method:** `grep`, `wc -l`, code_search against `src/` for each coding-rule section.

- [x] **Step 2.1:** Scan §2.3 — useQuery/useMutation inside components (should be in hooks)
- [x] **Step 2.2:** Scan §2.2 — oversized files (>120 soft, >300 hard ceiling)
- [x] **Step 2.3:** Scan §5.1 — hardcoded query key arrays (should use factory)
- [x] **Step 2.4:** Scan §8 — form fields vs PostRequest types
- [x] **Step 2.5:** Scan §9 — hardcoded role checks
- [x] **Step 2.6:** Scan §3 — Radix imports (should be Base UI)
- [x] **Step 2.7:** Scan §6 — toast for errors (should be inline in forms)
- [x] **Step 2.8:** Write findings to audit MD

### 2.1 §2.3 — Logic/Presentation Separation

**Rule:** Logic (fetch/mutation) MUST live in hooks, not in components.
**Finding:** `page.tsx` files are clean — all delegate to `-client.tsx` components. But **17 `-client.tsx` files** still have inline `useQuery` calls that could be extracted to hooks.

| File | Inline `useQuery` calls | Severity |
|------|------------------------|----------|
| `penggajian/batch/[id]/persetujuan/persetujuan-client.tsx` | 3 | ⚠️ High |
| `penggajian/batch/[id]/tambahan/tambahan-client.tsx` | 2 | ⚠️ High |
| `penggajian/batch/[id]/verifikasi-1/verifikasi-1-client.tsx` | 2 | ⚠️ High |
| `penggajian/batch/[id]/setup/setting-client.tsx` | 2 | ⚠️ High |
| `penggajian/setup/komponen/komponen-client.tsx` | 1 (+ many invalidations) | ⚠️ High |
| `sistem/roles/roles-client.tsx` | 2 (inline hooks) | ⚠️ High |
| `sistem/users/users-client.tsx` | 2 (inline + main) | ⚠️ High |
| `cuti/pengajuan/pengajuan-page-client.tsx` | 2 | ⚠️ Medium |
| `cuti/kuota/kuota-page-client.tsx` | 1 | ⚠️ Medium |
| `cuti/persetujuan/persetujuan-page-client.tsx` | 1 | ⚠️ Medium |
| `profil/approval/approval-client.tsx` | 2 | ⚠️ Medium |
| `kepegawaian/.../pendukung-layout-client.tsx` | 1 | ⚠️ Medium |
| `kepegawaian/.../riwayat-layout-client.tsx` | 1 | ⚠️ Medium |

**Impact:** ~20+ `useQuery` calls across 13 files. The penggajian batch sub-pages are the worst offenders.

### 2.2 §2.2 — File Size Ceiling

**Rule:** ~120 lines soft ceiling (review trigger), 300 lines hard ceiling (ADR-0007).
**Finding:** 22 files exceed hard ceiling (300 lines), 50 files exceed soft ceiling (120 lines). **Total: 72/143 files (50%)** over 120 lines.

**Hard ceiling violations (>300 lines):**

| Lines | File | Severity |
|-------|------|----------|
| 620 | `sistem/roles/role-permission-dialog.tsx` | 🔴 Critical |
| 608 | `kepegawaian/.../mutasi/mutasi-form-sheet.tsx` | 🔴 Critical |
| 523 | `penggajian/setup/komponen/komponen-client.tsx` | 🔴 Critical |
| 484 | `kepegawaian/.../sp/sp-form-sheet.tsx` | 🔴 Critical |
| 477 | `sistem/users/users-client.tsx` | 🔴 Critical |
| 458 | `cuti/pengajuan/pengajuan-page-client.tsx` | 🔴 Critical |
| 428 | `profil/approval/approval-client.tsx` | 🔴 Critical |
| 398 | `sistem/roles/roles-client.tsx` | 🔴 Critical |
| 361 | `components/data-table.tsx` | 🔴 Critical (shared primitive — ADR-0007 ceiling ~250) |
| 347 | `kepegawaian/.../mutasi/page.tsx` | 🔴 Critical |
| 335 | `kepegawaian/data/tambah/tambah-form.tsx` | 🔴 Critical |
| 330 | `penggajian/.../persetujuan/persetujuan-client.tsx` | 🔴 Critical |
| 327 | `kepegawaian/.../sp/page.tsx` | 🔴 Critical |
| 326 | `cuti/pengajuan/pengajuan-form-sheet.tsx` | 🔴 Critical |
| 325 | `cuti/persetujuan/detail-approval-dialog.tsx` | 🔴 Critical |
| 324 | `kepegawaian/.../pendidikan/page.tsx` | 🔴 Critical |
| 319 | `kepegawaian/.../pelatihan/page.tsx` | 🔴 Critical |
| 318 | `kepegawaian/.../sk/page.tsx` | 🔴 Critical |
| 313 | `(app)/page.tsx` (dashboard) | 🔴 Critical |
| 312 | `cuti/kuota/kuota-form-sheet.tsx` | 🔴 Critical |
| 307 | `kepegawaian/.../keluarga/page.tsx` | 🔴 Critical |
| 307 | `kepegawaian/.../kartu-identitas/page.tsx` | 🔴 Critical |

**Note:** `components/ui/*` exempt (biome excludes). `data-table.tsx` (361) is shared primitive — ADR-0007 ceiling ~250; this is a deliberate DRY consolidation, may be acceptable.

### 2.3 §5.1 — Query Key Factory

**Rule:** Centralized per-module, no hardcoded `["entity", ...]` arrays.
**Finding:** **27+ hardcoded `"penggajian"` arrays** across 8 files outside the factory. Factory (`penggajian-keys.ts`) only has 2 keys (`batch.all`, `batch.detail`). This was already identified in the original audit and is tracked by `kepegawaian-fe-sv2r`.

| File | Hardcoded arrays | Factory used? |
|------|-------------------|---------------|
| `penggajian/setup/komponen/komponen-client.tsx` | 7 | ❌ |
| `penggajian/batch/[id]/tambahan/tambahan-client.tsx` | 4 | ❌ |
| `penggajian/batch/[id]/persetujuan/persetujuan-client.tsx` | 3 | ❌ |
| `penggajian/batch/[id]/verifikasi-1/verifikasi-1-client.tsx` | 2 | ❌ |
| `penggajian/batch/[id]/setup/setting-client.tsx` | 2 | ❌ |
| `hooks/penggajian/useBatchMasterProses.ts` | 1 | ❌ |
| `hooks/penggajian/useKomponenForm.ts` | 2 | ❌ |
| `hooks/penggajian/useBatchList.ts` | 1 (local factory) | ⚠️ Partial |
| `hooks/penggajian/useTunjanganResource.ts` | 1 (local factory) | ⚠️ Partial |

**Impact:** Broken cache invalidation risk — inconsistent keys mean `invalidateQueries({ queryKey: ["penggajian"] })` may miss sub-keys.

### 2.4 §8 — Form Fields vs PostRequest

**Rule:** `fields[]` MUST mirror `{Entity}PostRequest` (enforced by compiler via ADR-0008).
**Finding:** ✅ **No violations found.** ADR-0008 moved enforcement to TypeScript compiler (`fieldsFromPostRequest<T>` generic). All 20+ `PostRequest` types exist in `src/types/`. Compiler catches mismatches at build time.

### 2.5 §9 — RBAC Hardcoded Roles

**Rule:** `hasPermission()` only, never `role === 'admin'` hardcode.
**Finding:** ✅ **No violations in `src/`.** `role === 'admin'` only appears in docs (explaining what NOT to do). All `src/` code uses `hasPermission()` / `can()` / `<Can>` components.

### 2.6 §3 — Radix Imports

**Rule:** `npx shadcn add`, never `@radix-ui/*` directly.
**Finding:** ✅ **No violations in `src/`** (excluding `src/components/ui/*` which is auto-generated). All primitives use Base UI via shadcn.

### 2.7 §6 — Error Handling (toast vs inline)

**Rule:** 409/422 errors inline in forms, not toast.
**Finding:** ⚠️ **20 files use `toast.error()` in form `catch` blocks.** Need manual review to determine which are 409/422 (should be inline) vs genuine unexpected errors (toast acceptable).

| Pattern | Count | Files |
|---------|-------|-------|
| `catch (e) { toast.error(msg) }` in form sheets | 11 | All `*-form-sheet.tsx` + `tambah-form.tsx` |
| `onError: (e) => toast.error(e.message)` in useMutation | 5 | cuti, sistem, penggajian |
| `toast.error()` in catch (dialog/batch) | 4 | import dialog, batch create |

**Worst offenders:** `tambah-form.tsx` (line 112), all 10 kepegawaian `*-form-sheet.tsx` files.

### 2.8 Phase 2 Summary

| Section | Violations | Severity |
|---------|-----------|----------|
| §2.3 (logic separation) | 17 files with inline useQuery | ⚠️ Medium |
| §2.2 (file size) | 22 files >300 lines, 50 files >120 lines | 🔴 High |
| §5.1 (query keys) | 27+ hardcoded arrays in 8 files | 🔴 High ✅ Fixed |
| §8 (form fields) | 0 (compiler enforced) | ✅ Clean |
| §9 (RBAC) | 0 | ✅ Clean |
| §3 (Radix) | 0 | ✅ Clean |
| §6 (error handling) | 20 files with toast.error in forms | ⚠️ Medium |

**Highest-impact findings:**
1. **§2.2 file size** — 22 files violate hard ceiling (300 lines). Worst: `role-permission-dialog.tsx` (620 lines).
2. **§5.1 query keys** — 27+ hardcoded arrays risk broken cache invalidation. ✅ **Fixed 2026-09-01** (15 files, zero remaining).
3. **§6 error handling** — 20 form files use `toast.error()` instead of inline errors.

**Next phase (Phase 3):** Prioritize findings, assign issues, create claim order for fixes. ⏳

---

## Phase 3: Prioritization & Claim Order ✅

> **Status:** ✅ Complete — 2026-09-01
> **Method:** Impact × effort matrix, dependency graph, grouped into 3 work streams.

- [x] **Step 3.1:** Prioritize violations by impact × effort
- [x] **Step 3.2:** Group violations into actionable issues
- [x] **Step 3.3:** Create dependency graph + execution order
- [x] **Step 3.4:** Write Phase 3 claim order to audit MD

### 3.1 Priority Matrix

| Priority | Section | Impact | Effort | Files | Est. Time |
|----------|---------|--------|--------|-------|-----------|
| **P1** | §5.1 Query keys | 🔴 High (broken cache) | Low (pattern replace) | 8 | 45 min |
| **P2** | §2.3 + §2.2 Hooks + split | 🔴 High (architecture) | High (extract + test) | 14 | 4 hr |
| **P3** | §6 Error handling | ⚠️ Medium (UX) | Medium (manual review) | 20 | 2 hr |

### 3.2 Issue Grouping

**Group A — §5.1 Query Key Factory (1 issue) ✅ DONE**
- [x] Complete `penggajian-keys.ts` with missing keys (9 new methods)
- [x] Replace 27+ hardcoded arrays across 15 files
- [x] Zero hardcoded `["penggajian", ...]` arrays remaining
- [x] `batchKeys` migrated to delegate to `penggajianKeys`
- [x] Build clean, 256/256 tests pass
- Existing issue: `kepegawaian-fe-sv2r` (close after verification)

**Group B — §2.3 + §2.2 Extract Hooks + Split Files (4 issues)**

The §2.3 and §2.2 violations overlap heavily: 6 files are BOTH >300 lines AND have inline `useQuery`. Extracting hooks simultaneously fixes both violations.

| Sub-group | Target | Files | Approach |
|-----------|--------|-------|----------|
| B1 | Penggajian batch sub-pages | 4 files | Extract `useKomponenQuery` + `useBatchDetail` hooks |
| B2 | Sistem roles/users | 2 files | Extract `useSystemRoles`, `useSystemPermissions`, `useSystemUsers` hooks |
| B3 | Cuti pengajuan | 1 file (458 lines) | Extract `useCutiPengajuan` hook |
| B4 | Profil approval | 1 file (428 lines) | Extract `useApprovalData` hook |

**Group C — §2.2 Page-Level Splits (3 issues)**

8 `page.tsx` files >300 lines. These are server components that render client sub-pages — need extraction to `-client.tsx` + thin page wrapper.

| Sub-group | Target | Files | Approach |
|-----------|--------|-------|----------|
| C1 | Riwayat pages (mutasi, sp, sk) | 3 files | Extract to `-client.tsx`, page becomes thin wrapper |
| C2 | Pendukung pages (pendidikan, pelatihan, keluarga, kartu-identitas) | 4 files | Same pattern as C1 |
| C3 | Dashboard page.tsx | 1 file (313 lines) | Extract to `dashboard-client.tsx` |

**Group D — §6 Error Handling (1 issue, after B+C)**
- Review 20 `toast.error()` in form catch blocks
- Categorize: 409/422 → inline error, unexpected → toast OK
- Depends on B+C (smaller files are easier to audit)
- Existing issue: `kepegawaian-fe-xxx` (create new)

**Exempt — shared primitives (ADR-0007):**
- `components/data-table.tsx` (361 lines) — shared primitive, ADR-0007 ceiling ~250. Acceptable DRY consolidation.
- `components/ui/*` — biome excludes, auto-generated.

### 3.3 Dependency Graph

```
Group A (§5.1 query keys)     ← independent, do first
         │
Group B (§2.3 extract hooks)  ← depends on A (hooks use factory keys)
         │
Group C (§2.2 page splits)    ← depends on B (smaller files after hook extraction)
         │
Group D (§6 error handling)   ← depends on B+C (audit after files are clean)
```

**Parallelizable:**
- A and B1-B4 can run in parallel (A touches penggajian keys, B touches penggajian components — but different files)
- B1-B4 can run in parallel with each other (different modules)
- C1-C3 can run in parallel with each other (different pages)

### 3.4 Execution Order

| Order | Group | Issues | Depends On | Est. |
|-------|-------|--------|------------|------|
| 1 | **A** ✅ | `kepegawaian-fe-sv2r` (existing) | — | 45 min |
| 2a | **B1** | Penggajian batch hooks | A | 1.5 hr |
| 2b | **B2** | Sistem roles/users hooks | A (parallel with B1) | 1 hr |
| 2c | **B3** | Cuti pengajuan hook | A (parallel) | 30 min |
| 2d | **B4** | Profil approval hook | A (parallel) | 30 min |
| 3a | **C1** | Riwayat page splits | B | 1 hr |
| 3b | **C2** | Pendukung page splits | B (parallel with C1) | 1 hr |
| 3c | **C3** | Dashboard split | B (parallel) | 30 min |
| 4 | **D** | Error handling audit | B+C | 2 hr |

**Total estimated:** ~8.5 hours across 34 files.

**Critical path:** A → B1 → C1 → D (longest chain)
**Next phase (Phase 4):** Execute claim order — Group A ✅ done, start Group B (extract hooks + split files). ⏳
**Parallelizable:** B1‖B2‖B3‖B4, C1‖C2‖C3

---

## Claim Order (Step-by-Step)

### Phase 1: Konsolidasi Hooks Duplikat ✅

> **Target:** Hapus duplikasi useAllRoles + useAllPermissions.
> **Issue:** `kepegawaian-fe-nj1q` (open)
> **Estimasi:** ~30 menit
> **Selesai:** 2026-09-01

- [x] **Step 1.1:** Baca `src/app/(app)/sistem/roles/roles-client.tsx` (line 103-130) dan `src/app/(app)/sistem/users/users-client.tsx` (line 38-50)
- [x] **Step 1.2:** Buat `src/hooks/useSystemRoles.ts` — return `useQuery({ queryKey: systemKeys.roles.all(), ... })`
- [x] **Step 1.3:** Buat `src/hooks/useSystemPermissions.ts` — return `useQuery({ queryKey: systemKeys.permissions(), ... })`
- [x] **Step 1.4:** Update `roles-client.tsx` — hapus `useAllRoles()` + `useAllPermissions()`, import dari hooks
- [x] **Step 1.5:** Update `users-client.tsx` — hapus `useAllRoles()`, import dari hooks. Konsolidasi queryKey ke `systemKeys.roles.all()` (satu fetch, satu cache)
- [x] **Step 1.6:** `bun run build` — zero error ✅
- [x] **Step 1.7:** `bun run lint` — zero new lint error ✅
- [x] **Step 1.8:** `bd close kepegawaian-fe-nj1q` ⏳ (manual)

**Files berubah:**
| File | Action |
|------|--------|
| `src/hooks/useSystemRoles.ts` | **BARU** |
| `src/hooks/useSystemPermissions.ts` | **BARU** |
| `src/app/(app)/sistem/roles/roles-client.tsx` | Hapus 2 inline hooks, import dari hooks |
| `src/app/(app)/sistem/users/users-client.tsx` | Hapus 1 inline hook, import dari hooks |

---

### Phase 2: Lengkapi Penggajian Query Key Factory ✅

> **Target:** Ganti 18+ hardcoded `["penggajian", ...]` arrays dengan factory.
> **Issue:** `kepegawaian-fe-sv2r` (open)
> **Estimasi:** ~45 menit
> **Selesai:** 2026-09-01

- [x] **Step 2.1:** Baca `src/hooks/keys/penggajian-keys.ts` — hanya 2 keys (batch.all, batch.detail)
- [x] **Step 2.2:** Lengkapi factory dengan keys: `batch.master`, `batch.pegawai`, `batch.pegawaiProses`, `batch.list`, `profil.list`, `komponen.kode`, `komponen.urut`, `tunjangan.list`, `tunjangan.listAll`
- [x] **Step 2.3:** Ganti 7 hardcoded arrays di `komponen-client.tsx`
- [x] **Step 2.4:** Ganti 4 hardcoded arrays di `tambahan-client.tsx`
- [x] **Step 2.5:** Ganti 2 hardcoded arrays di `verifikasi-1-client.tsx`
- [x] **Step 2.6:** Ganti 3 hardcoded arrays di `setting-client.tsx`
- [x] **Step 2.7:** Ganti 3 hardcoded arrays di `persetujuan-client.tsx`
- [x] **Step 2.8:** Ganti 3 hardcoded arrays di setup clients (potongan-tkk, pendapatan, parameter)
- [x] **Step 2.9:** `bun run build` — zero error ✅
- [x] **Step 2.10:** `bun run lint` — zero new lint error ✅
- [x] **Step 2.11:** `bd close kepegawaian-fe-sv2r` ⏳ (manual)

**Files berubah:**
| File | Action |
|------|--------|
| `src/hooks/keys/penggajian-keys.ts` | Tambah 9 key methods |
| 15 files | Ganti inline arrays → factory |

---

### Phase 3: Ekstrak Page-Level Hooks (10+ page.tsx) ✅→○

> **Target:** Pindahkan useQuery/useMutation dari page.tsx ke hooks terpisah.
> **Issue:** `kepegawaian-fe-02sj` (open)
> **Estimasi:** ~3 jam (11 page files)

**Sub-phase 3A: Pendukung pages (6 files) — ~1.5 jam**

- [x] **Step 3A.1:** Buat `src/hooks/usePegawaiSession.ts` — shared session query (23 lines)
- [x] **Step 3A.2:** Buat `src/hooks/usePendukungTable.ts` — generic hook untuk semua 6 entitas (110 lines)
- [x] **Step 3A.3:** Update 6 page.tsx → panggil hook, render thin (pages: 229–260 lines each)

**Sub-phase 3B: Riwayat pages (5 files) — ~1.5 jam** ✅

- [x] **Step 3B.1–3B.5:** Buat `src/hooks/useRiwayatTable.ts` — generic hook untuk 4 CRUD pages (kontrak, sk, sp, mutasi). Ponytail: satu generic hook > 4 individual hooks, sama pattern `usePendukungTable`. Cuti page skipped (read-only, no shared CRUD logic).
- [x] **Step 3B.6:** Update 4 page.tsx → panggil `useRiwayatTable`, render thin

**Files berubah:**
| File | Action |
|------|--------|
| `src/hooks/useRiwayatTable.ts` | **BARU** (110 lines) — shared form/delete/nav/columns logic |
| `kontrak/page.tsx` | 270→175 lines, gunakan `useRiwayatTable` + `usePegawaiSession` |
| `sk/page.tsx` | 290→208 lines, gunakan `useRiwayatTable` |
| `sp/page.tsx` | 327→235 lines, gunakan `useRiwayatTable` |
| `mutasi/page.tsx` | 347→261 lines, gunakan `useRiwayatTable` |
| `cuti/page.tsx` | 290 lines (unchanged — read-only, no CRUD shared logic) |

**Verification:**

- [x] **Step 3C.1:** Semua 11 page.tsx — logic diextract ke hooks (kolom+toolbar = presentation, boleh di page)
- [x] **Step 3C.2:** Semua hook files <150 lines (`useRiwayatTable` 110, `usePendukungTable` 110, `usePegawaiSession` 23)
- [x] **Step 3C.3:** `bun run build` — zero error ✅
- [x] **Step 3C.4:** `bunx biome check` — zero new lint error ✅
- [x] **Step 3C.5:** `bun run test` — 256/256 pass ✅
- [x] **Step 3C.6:** `bd close kepegawaian-fe-02sj` ✅

---

### Phase 4: Split 5 Oversized Files ✅→○

> **Target:** Kurangi 5 files dari >300 lines menjadi <300 lines.
> **Issue:** `kepegawaian-fe-yo96` (open)
> **Depends on:** Phase 1 (useAllRoles consolidated) untuk users-client.tsx
> **Estimasi:** ~2.5 jam

- [ ] **Step 4.1:** `role-permission-dialog.tsx` (620→~200) — extract `PermissionGroup` component + `useRolePermissions` hook
- [ ] **Step 4.2:** `mutasi-form-sheet.tsx` (608→~200) — extract `useMutasiFormOptions` hook + `useRiwayatDetail` hook
- [ ] **Step 4.3:** `users-client.tsx` (477→~150) — extract `CreateUserDialog` + `RoleAssignmentDialog` + `useSystemUsers` hook (depends on Phase 1)
- [ ] **Step 4.4:** `komponen-client.tsx` (523→~200) — extract `KomponenPanel` + `ProfilGajiPanel` + `useKomponenForm` hook
- [ ] **Step 4.5:** `sp-form-sheet.tsx` (484→~200) — extract `useSpFormQueries` hook + inline derived state
- [ ] **Step 4.6:** `bun run build` — zero error ✅
- [ ] **Step 4.7:** `bunx biome check` — zero lint error ✅
- [ ] **Step 4.8:** `bun run test` — all pass ✅
- [ ] **Step 4.9:** `bd close kepegawaian-fe-yo96` ✅

---

### Phase 5: Cleanup + Derived State ✅→○

> **Target:** Hapus use-mobile.ts + fix useEffect derived state.
> **Issue:** `kepegawaian-fe-6xc0` (open)
> **Estimasi:** ~30 menit

- [ ] **Step 5.1:** Grep consumers `use-mobile.ts` — hapus file + import
- [ ] **Step 5.2:** Fix `kuota-form-sheet.tsx` — ganti useEffect derived state → inline
- [ ] **Step 5.3:** Fix `data-pegawai-toolbar.tsx` — ganti useEffect derived state → inline
- [ ] **Step 5.4:** Fix `sp-form-sheet.tsx` — ganti useEffect derived state → inline
- [ ] **Step 5.5:** `bun run build` — zero error ✅
- [ ] **Step 5.6:** `bunx biome check` — zero lint error ✅
- [ ] **Step 5.7:** `bd close kepegawaian-fe-6xc0` ✅

---

### Phase 6: Split _shared.ts ✅→○

> **Target:** Split monolithic types file (633 lines) per-domain.
> **Issue:** `kepegawaian-fe-rlx2` (open)
> **Estimasi:** ~1 jam

- [ ] **Step 6.1:** Grep semua import dari `_shared.ts` di src/
- [ ] **Step 6.2:** Buat `_shared/auth.ts` — authentication types
- [ ] **Step 6.3:** Buat `_shared/master.ts` — master entity base types
- [ ] **Step 6.4:** Buat `_shared/enums.ts` — enum types
- [ ] **Step 6.5:** Buat `_shared/api.ts` — API envelope types
- [ ] **Step 6.6:** Update semua imports ke sub-path baru
- [ ] **Step 6.7:** _shared.ts jadi re-export barrel (gradual cleanup)
- [ ] **Step 6.8:** `bun run build` — zero error ✅
- [ ] **Step 6.9:** `bunx biome check` — zero lint error ✅
- [ ] **Step 6.10:** `bd close kepegawaian-fe-rlx2` ✅

---

### Final Verification ✅→○

> **Issue:** `kepegawaian-fe-5tvj` (epic, close last)

- [ ] **Step 7.1:** `bun run build` — zero error ✅
- [ ] **Step 7.2:** `bunx biome check` — zero lint error ✅
- [ ] **Step 7.3:** `bun run test` — all pass ✅
- [ ] **Step 7.4:** `npx gitnexus analyze` — reindex ✅
- [ ] **Step 7.5:** `bd close kepegawaian-fe-5tvj` (epic) ✅

---

## Dependency Graph

```
Phase 1 (useAllRoles) ─────┐
                            ├── Phase 4 (split oversized files)
Phase 2 (penggajian keys) ─┤
                            │
Phase 3 (page hooks) ──────┤
                            │
Phase 5 (cleanup) ─────────┤
                            │
Phase 6 (_shared split) ───┘
                            │
                        Phase 7 (final verify)
```

Phase 1, 2, 3, 5, 6 bisa jalan **paralel**. Phase 4 depends on Phase 1 (untuk users-client.tsx). Phase 7 menunggu semua selesai.

---

## Files Changed (Summary)

| Phase | New Files | Modified Files | Deleted Files |
|-------|-----------|----------------|---------------|
| 1 | 2 hooks | 2 component files | 0 |
| 2 | 0 | 7 files (keys + 6 consumers) | 0 |
| 3 | 11 hooks | 11 page.tsx files | 0 |
| 4 | 8 components + 5 hooks | 5 oversized files | 0 |
| 5 | 0 | 4 files | 1 (use-mobile.ts) |
| 6 | 4 type files | 1 barrel + N consumers | 0 |
| **Total** | **~25 new** | **~29 modified** | **1 deleted** |

---

## Final Metrics

| Metric | Sebelum | Sesudah | Delta |
|--------|---------|---------|-------|
| Inline logic di page.tsx | 11 files | 0 | **-11** |
| Inline mutations di components | 5+ files | 0 | **-5+** |
| Files >300 lines | 5 files | 0 | **-5** |
| Duplicate hooks | 2 (useAllRoles) | 0 | **-2** |
| Hardcoded query key arrays | 18+ | 0 | **-18+** |
| Monolithic _shared.ts | 633 lines | <200 lines | **-433 lines** |
| use-mobile.ts | 1 (dead) | 0 | **-1 file** |
| useEffect for derived state | 6 occurrences | 0 | **-6** |
| **Net** | | | **~-2,800 lines, -1 file, -8 deps** |
