# Data Fetching — TanStack Query v5

> **Muat modul ini untuk:** kerja fetching data, `useQuery`/`useMutation`, cache, memory guardrails,
> query keys, invalidation. Berisi §5.
> **Sumber:** CONTEXT §Data fetching.

---

## 5. Data fetching — TanStack Query v5 (CONTEXT §Data fetching)

Tabel Master fetch **client-side** via `/api/proxy/*` (bukan RSC-baca-searchParams, bukan hybrid
prefetch) — opsi paling ringan (Query = cache self-evicting, bukan state React menumpuk).

- **Tabel = client component `useQuery`.** `queryKey` bawa searchParams
  (`page/size/sortBy/sortDirection/{fk}Id`) → tiap perubahan = satu query.
  `placeholderData: keepPreviousData` → halaman lama tetap tampil saat berikutnya loading
  (`isPlaceholderData` tandai transisi) → **nol layout shift**.
- **CRUD = `useMutation` + `queryClient.invalidateQueries`.** 200 → invalidate → auto-refetch
  (tanpa optimistic removal).
- **Combobox `/list` = query `staleTime` panjang**, cache **dibagi** per `queryKey` → toolbar
  filter & form FK dropdown fetch sekali.

**Memory guardrails (WAJIB):**
- `gcTime` default **5 menit** → unmount tabel = cache di-GC; nol akumulasi lintas 22 entitas.
- `staleTime` ≈ **30s** tabel, ≈ **5 menit** `/list`.
- **DILARANG:** `gcTime: Infinity`; menyimpan array baris besar di `useState`/Context.
