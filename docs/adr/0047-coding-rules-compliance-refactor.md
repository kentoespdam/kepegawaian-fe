# ADR-0047: Coding Rules Compliance Refactor

- **Status**: Accepted
- **Epic**: `kepegawaian-fe-t6at` (Coding Rules Gap Audit 2026-10-05)
- **Date**: 2026-10-05

## Context
A comprehensive gap audit (`kepegawaian-fe-t6at`) of the frontend codebase revealed several deviations from established coding rules, including state management leakage in Server Components (`"use client"` in `page.tsx`), fragmented data fetching logic, lack of centralized query key factories, direct DOM styling instead of semantic design tokens, and unvalidated payload forms.

## Decisions
1. **Zero `"use client"` in `page.tsx`**: All `page.tsx` files are strictly pure Server Components. Interactive logic, forms, dialogs, and client states have been extracted into dedicated `*-client.tsx` or feature components.
2. **Hook Extractions**: Re-usable data hooks and API integrations are strictly isolated into `src/hooks/<domain>/` (e.g. `kepegawaian`, `cuti`, `sistem`, `penggajian`, `profil`, `master`).
3. **Query Key Factories**: Centralized query keys to avoid cache collisions and stale query sync issues across React Query hooks.
4. **Semantic Design Tokens**: Standardized styling using semantic design tokens and design system primitives.
5. **Permission Gating via Unmounting**: Enforced strict permission-based conditional rendering and component unmounting over hidden states.
6. **Zod Validation Consolidation**: Consolidated form and DTO validations into `src/lib/validations/` (e.g., `auth.schema.ts`, `employee.schema.ts`, `master.schema.ts`).

## Consequences
- Clean separation of Server and Client components adhering to Next.js App Router best practices.
- Enhanced maintainability and modular testability across all feature domains.
- Standardized schema validation and improved type safety.
