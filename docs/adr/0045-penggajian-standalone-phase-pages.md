# Penggajian: Standalone Phase Pages with Period-Based Filtering

The batch workflow phases (01-04) were previously nested under `/penggajian/batch/[id]/`, requiring a batch ID to access. We decided to make them standalone pages at `/penggajian/proses-gaji`, `/penggajian/verifikasi`, `/penggajian/tambahan`, `/penggajian/persetujuan` with year+month combobox filters instead.

## Context

The original design used batch ID-based routing: users first selected a batch from a list page, then navigated to phase sub-pages. This created a dependency on batch ID and required the batch detail layout (header + rail stepper) to maintain context.

The new design aligns with the sidebar menu structure where all4 phases are visible as top-level items. Users expect to click "02. Verifikasi" and immediately see data, not first select a batch.

## Decision

**Standalone pages with period-based filtering:**
- Each phase page has year+month combobox filters (except Proses Gaji which uses text search + status)
- Backend looks up batch by period (year+month) instead of by ID
- Batch info displayed at top of each phase page when batch exists
- Empty state shown when no batch exists for selected period

**Sidebar structure:**
- Two collapsible sub-groups: "Setting" (gear icon) and "Proses Batch" (list icon)
- Both default to expanded (elderly-first principle)
- Menu labels match the approved design: "Setting Komponen Gaji", "01. Proses Gaji Bulanan", etc.

## Considered Options

1. **Keep batch ID routing** — Users select batch first, then navigate to phases. Maintains direct batch access but adds friction.
2. **Hybrid approach** — Keep batch list page, add standalone pages that redirect to batch URL after period selection. More complex, maintains backward compatibility.
3. **Standalone with period filter** (chosen) — Simplest user experience, aligns with sidebar structure, backend handles batch lookup.

## Consequences

**Positive:**
- Simpler navigation — users go directly to the phase they need
- Aligns sidebar menu with actual page structure
- Reduces cognitive load (no batch selection step)
- Backend centralizes batch lookup logic

**Negative:**
- Backend must support period-based batch lookup (new endpoint or parameter)
- Existing batch list page and detail layout must be removed
- Direct batch URL access lost (acceptable — users don't share batch URLs)

**Neutral:**
- RBAC structure unchanged (per-phase permissions)
- Batch creation remains on Proses Gaji page only
- Proses Ulang behavior unchanged (backend decides rollback target)
