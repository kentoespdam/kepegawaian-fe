# Coding Rules — Kepegawaian FE

Aturan dasar yang **WAJIB** dipatuhi setiap kontributor saat menulis kode di repo ini.
Baca file ini **lebih dulu**, lalu muat modul desain relevan dari [DESIGN.md](../../DESIGN.md).
Aturan di sini bersifat mengikat — bila konflik dengan kebiasaan default, **aturan ini menang**.

> **Cakupan dokumen ini:** aturan **kode**. Workflow agen (graphify, gitnexus, beads, session
> close) ada di [`knowledge.md`](../../knowledge.md) dan [`AGENTS.md`](../../AGENTS.md).

---

## 0. Prinsip

| # | Prinsip | Penjelasan |
|---|---------|------------|
| P1 | **NO AI SLOP** | Kode & UI ringkas, jujur, minim bug. Jangan tambah statistik/widget/ilustrasi karangan. Bila ragu → opsi paling sederhana yang lolos spec. |
| P2 | **KISS + DRY** | Solusi paling sederhana yang memenuhi spec. Abstraksi muncul dari duplikasi nyata (rule of three), bukan diantisipasi. DRY via shared primitives, bukan engine config-driven raksasa (architecture §18). |
| P3 | **Aksesibilitas = syarat fungsional** | ±70% pengguna lansia. Gate di visual-foundation §2 berlaku ke SETIAP komponen: touch target ≥44px, body ≥16px, WCAG AA kontras. |
| P4 | **Bahasa UI = Indonesia** | Label bahasa manusia, bukan nama field mentah. |
| P5 | **Plan dulu, baru implementasi** | Pahami kode → baca modul DESIGN relevan → fetch docs terbaru (`context7`) → baru koding. Asumsi basi = bug diam & rework. |
| P6 | **Immutability of generated code** | File `src/components/ui/*` dan `src/types/` (DTO generated) = vendor code. JANGAN edit manual. |

---

## 1. Stack & Versi (baca sebelum menulis)

| Layer | Teknologi | Catatan Kritis |
|-------|-----------|----------------|
| Framework | **Next.js 16.2.10** App Router | **BUKAN** Next.js yang Anda hafal. WAJIB baca `node_modules/next/dist/docs/` untuk API/konvensi yang dipakai. Heed deprecation notices. |
| Runtime | **React 19.2.4** + **React Compiler** (`babel-plugin-react-compiler`) | JANGAN micro-optimize manual — lihat §1.1 |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`, token OKLCH) | Tanpa `tailwind.config.js` — semua via `globals.css` |
| UI Kit | **shadcn** di atas **Base UI** (`npx shadcn init -b base`) | **BUKAN Radix** — prop berbeda (§3) |
| Form | **React Hook Form v7** + **Zod v4** (`@hookform/resolvers`) | `zodResolver(schema as never)` untuk Zod v4 |
| Data | **TanStack Query v5** client-side via `/api/proxy/*` | Query key factory pattern (§5.1) |
| Auth | **Appwrite** session httpOnly + JWT di-mint di `proxy.ts` | Defense-in-depth 3 lapis (§7) |
| Notifikasi | **sonner** (satu `<Toaster>` bottom-right) | Mutation-only (§9) |
| Ikon | **lucide-react** | Aksi ≥20px, area sentuh ≥40px |
| Font | **Inter** self-hosted via `next/font` | Berat 400/500/600 saja (≤300 DILARANG) |
| Linter | **BiomeJS 2.2.0** | `bunx biome check` — pengganti ESLint + Prettier |
| Package | **Bun** | `bun install`, `bun run`, `bunx` |
| Test | **Vitest** + **Testing Library** | `bun run test` |

### 1.1. React 19 + React Compiler — Aturan Khusus

React Compiler **otomatis memoize** ekspresi, JSX, dan identitas fungsi. Implikasinya:

```tsx
// ❌ SALAH — micro-optimize manual yang compiler sudah tangani
const columns = useMemo(() => buildColumns(entity), [entity]);
const handleClick = useCallback(() => doSomething(id), [id]);
const MemoizedTable = React.memo(DataTable);

// ✅ BENAR — tulis biasa, compiler yang optimasi
const columns = buildColumns(entity);
const handleClick = () => doSomething(id);
<DataTable columns={columns} onClick={handleClick} />
```

**Aturan wajib React 19:**

- **JANGAN** `useMemo`/`useCallback`/`React.memo` defensif — hanya bila ada masalah performa **terukur** yang compiler tidak bisa tangani.
- **JANGAN** `React.forwardRef` — di React 19, `ref` adalah prop biasa.
- **JANGAN** mutasi state/props langsung (`array.push()`) — gunakan immutable (`[...array, item]`). Mutasi merusak dependency graph compiler.
- **JANGAN** `useEffect` untuk kalkulasi derived state — hitung inline, compiler yang memoize.
- **GUNAKAN** `use(Promise | Context)` untuk baca context/promise kondisional.
- **GUNAKAN** `<Context value={v}>` langsung, bukan `<Context.Provider value={v}>`.

### 1.2. Next.js 16 — Breaking Changes

```tsx
// ❌ SALAH — akses params/searchParams sinkron (Next.js <15 style)
export default function Page({ params, searchParams }) {
  const id = params.id;  // ⚠️ Error di Next.js 16
}

// ✅ BENAR — params & searchParams adalah Promise, WAJIB di-await
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ entity: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { entity } = await params;
  const { page, q } = await searchParams;
  return <EntityClient entity={entity} initialPage={page} query={q} />;
}
```

- **`proxy.ts`** (bukan `middleware.ts`) — `export default function proxy()`, **Node runtime**.
- **`cookies()`** dan **`headers()`** = async, WAJIB `await`.
- **Streaming:** bungkus konten dinamis di `<Suspense fallback={<Skeleton />}>` untuk partial prerendering.
- **Lazy load** library berat (PDF viewer, chart) via `next/dynamic` dengan `ssr: false`.

---

## 2. Struktur Kode & Organisasi File

### 2.1. Arsitektur Direktori

```
src/
├── app/                    # Next.js App Router — page = server component by default
│   ├── (app)/              # Route group: halaman terautentikasi (sidebar + top bar)
│   │   ├── master/         # CRUD pages per entity
│   │   ├── kepegawaian/    # Dashboard, Data, Terminasi
│   │   └── page.tsx        # Landing/dashboard
│   ├── (auth)/             # Route group: halaman publik
│   │   └── login/page.tsx
│   ├── api/proxy/          # API route handler
│   ├── globals.css         # Tailwind v4 entrypoint + @theme tokens
│   └── layout.tsx          # Root layout + Providers + Toaster
├── components/
│   ├── ui/                 # shadcn/Base UI generated (IMMUTABLE — §3)
│   └── *.tsx               # Shared primitives (DataTable, CrudForm, ConfirmDeleteDialog)
├── hooks/                  # SEMUA custom hooks — logic WAJIB di sini (§2.3)
├── lib/                    # Utilities, auth, API client
│   ├── auth/               # Appwrite session, JWT, permissions
│   ├── api/                # Typed fetch client
│   ├── validations/        # Zod schemas (per-domain)
│   └── query-client.ts     # Global QueryClient defaults
├── config/                 # Entity configs (typed, per-entity)
├── types/                  # TypeScript types (per-domain)
└── proxy.ts                # Next.js 16 network proxy (route guard + JWT)
```

### 2.2. Budget Ukuran File

Ukuran file = **trigger tinjauan, BUKAN hard gate** (ADR-0007). Ambang di bawah adalah lampu kuning
*"berhenti & lihat"*, bukan perintah pecah. Bila file lewat ambang **tapi kohesif satu tanggung jawab**
(mis. form 27 field, shared primitive `<DataTable>`) → **biarkan**.

| Kategori | Optimal | Hard Ceiling | Catatan |
|----------|---------|-------------|---------|
| `components/ui/*` | — | **Exempt total** | Generated, jangan edit (§3) |
| `src/types/*` (DTO) | — | **Exempt** | Generated / deklaratif |
| `src/config/*` | — | **Exempt** (soft ~200) | Deklaratif |
| **Shared primitive** | ~200 | ~250 | Konsolidasi DRY sengaja besar |
| **Komponen** (`.tsx`) | 150–250 | **300** | Di atas 300 = atomic rewrite (2–3× lebih mahal) |
| **Hook** (`use*.ts`) | 75–150 | **150** | Hook >150 = ≥2 perilaku yang harus dikomposisi |
| **Lib/util** (`.ts`) | 100–200 | **250** | Domain-grouped, bukan monolith |
| **Types** hand-written | 50–150 | **200** | Pisah per-domain bila >150 |

Pecah file **HANYA bila ada >1 alasan untuk berubah** (SRP: fetch vs render vs tipe). **DILARANG
pecah file hanya demi mengejar angka** — memotong satu unit kohesif jadi 2+ file yang selalu diedit
bareng **menaikkan biaya konteks** tanpa gain keterbacaan (anti-fragmentasi).

### 2.3. Separasi Logic & Presentasi (WAJIB)

**Komponen fokus presentasi/markup. SEMUA logic di `src/hooks/` sebagai file terpisah.**

```tsx
// ❌ SALAH — logic fetch/mutation inline di komponen
export function GolonganPage() {
  const { data } = useQuery({
    queryKey: ["golongan"],
    queryFn: () => fetch("/api/proxy/master/golongan").then(r => r.json()),
  });
  const mutation = useMutation({
    mutationFn: (id: number) => fetch(`/api/proxy/master/golongan/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["golongan"] }),
  });
  return <DataTable data={data} onDelete={mutation.mutate} />;
}

// ✅ BENAR — logic di hook terpisah
// src/hooks/useGolonganTable.ts
export function useGolonganTable() {
  const { data } = useQuery({
    queryKey: golonganKeys.list(filters),
    queryFn: () => apiClient.get("/master/golongan", filters),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/master/golongan/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: golonganKeys.lists() }),
  });
  return { data, onDelete: deleteMutation.mutate, isDeleting: deleteMutation.isPending };
}

// src/app/(app)/master/golongan/page.tsx — komponen tipis, hanya render
export function GolonganPage() {
  const { data, onDelete, isDeleting } = useGolonganTable();
  return <DataTable data={data} onDelete={onDelete} isDeleting={isDeleting} />;
}
```

**Checklist sebelum commit:** bila ada `useQuery`/`useMutation`/`useState` yang berisi business logic
atau handler non-trivial di komponen → **angkat ke hook dulu**.

### 2.4. Organisasi Types

Definisi tipe bersama (model entitas, DTO, response API, props lintas-komponen) di `src/types/`
(per-domain: `src/types/master/golongan.ts`). Pengecualian: tipe lokal sepele yang hanya
dipakai di satu file boleh tetap inline.

### 2.5. Organisasi Zod Schemas

```
src/lib/validations/
├── auth.schema.ts          # Login, change-password
├── master.schema.ts        # Shared master schemas
└── employee.schema.ts      # Employee-specific schemas
```

Schema = **single source of truth** untuk tipe form. Derive TypeScript type via `z.infer<typeof schema>`.

---

## 3. UI Kit — shadcn + Base UI

### 3.1. Aturan Inti

- shadcn di-init dengan **Base UI** (`npx shadcn init -b base`). **WAJIB verifikasi setiap prop ke
  docs Base UI**, bukan Radix. Nama prop berbeda:

  | Base UI | Radix (JANGAN pakai) |
  |---------|---------------------|
  | `keepMounted` (default `false`) | `forceMount` |
  | `data-open` / `data-closed` | `data-state="open"` / `"closed"` |
  | Lazy render by default | Needs `forceMount` to persist |

- **Tambah komponen = WAJIB lewat CLI:** `npx shadcn add <komponen>`. JANGAN tulis file manual.
- **DILARANG edit file di `src/components/ui/*`.** `npx shadcn add`/update **menimpa** file itu →
  kustomisasi manual hilang. Perlakukan seperti vendor code.

### 3.2. Kustomisasi yang Benar

```tsx
// ❌ SALAH — edit langsung src/components/ui/button.tsx
// File ini akan ditimpa saat `npx shadcn add button`

// ✅ BENAR — override via className dari call-site
<Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Hapus
</Button>

// ✅ BENAR — target elemen internal via data-slot
<Dialog className="**:data-[slot=overlay]:bg-black/60">
  ...
</Dialog>

// ✅ BENAR — wrapper tipis di src/components/ (LUAR ui/) untuk pattern berulang
// src/components/delete-button.tsx
export function DeleteButton(props: ButtonProps) {
  return (
    <Button
      variant="destructive"
      size="sm"
      className={cn("gap-1.5", props.className)}
      {...props}
    />
  );
}
```

### 3.3. Dialog/Sheet

- Content **lazy by default** — manfaatkan (jangan paksa mount).
- Mount form container **SEKALI** di level page, pass `editing` state — **JANGAN** N dialog untuk N baris.

---

## 4. Styling & Design Token

### 4.1. Token System

**Semua warna = token.** DILARANG hex atau `oklch(...)` literal di dalam komponen.

```tsx
// ❌ SALAH
<div className="bg-[#1e293b] text-[oklch(0.98_0_0)]">

// ✅ BENAR
<div className="bg-background text-foreground">
<div className="bg-primary text-primary-foreground">
<div className="text-muted-foreground border-border">
```

### 4.2. CSS Architecture

Token & skeleton di `globals.css` = visual-foundation §1. Gunakan `@theme` block Tailwind v4:

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* ... semua token warna di sini */
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.35 0.12 250);
  /* ... nilai OKLCH di sini */
}
```

### 4.3. Aturan Aksesibilitas Visual

- **Jangan** bergantung warna saja untuk status (WCAG SC 1.4.1) — selalu **ikon + teks**.
- Dark mode via `next-themes` sudah aktif (toggle di user-menu). Biarkan — tidak perlu ubah.
- Tipografi: **Inter** self-hosted, berat **400/500/600** saja (**dilarang ≤300**).
- `tabular-nums` di kolom angka tabel.
- Touch target ≥ **44px** untuk elemen interaktif.

---

## 5. Data Fetching & State Management

### 5.1. Query Key Factory (WAJIB)

Gunakan factory object untuk query keys — konsisten, type-safe, invalidasi granular:

```ts
// src/hooks/keys/master-keys.ts
export const masterKeys = {
  all: (entity: string) => [entity] as const,
  lists: (entity: string) => [...masterKeys.all(entity), "list"] as const,
  list: (entity: string, filters: Record<string, unknown>) =>
    [...masterKeys.lists(entity), filters] as const,
  details: (entity: string) => [...masterKeys.all(entity), "detail"] as const,
  detail: (entity: string, id: number) =>
    [...masterKeys.details(entity), id] as const,
};
```

### 5.2. TanStack Query Conventions

- Fetch data via `/api/proxy/*` (data-fetching §5). Tabel = `useQuery`; CRUD = `useMutation` +
  `invalidateQueries`.
- Logika query/mutation diangkat ke hook di `src/hooks/` (§2.3), BUKAN inline di komponen.
- Gunakan `isPending` (bukan `isLoading` — deprecated di v5) untuk mutation loading state.
- `placeholderData: keepPreviousData` untuk pagination agar tidak ada layout shift.

### 5.3. Memory Guardrails (WAJIB)

| Parameter | Nilai | Rationale |
|-----------|-------|-----------|
| `gcTime` | Default **5 menit** (300.000ms) | Cegah memory leak |
| `staleTime` | ~**30s** (tabel) / ~**5 menit** (`/list` dropdown) | Fresh enough untuk data interaktif |
| `gcTime: Infinity` | **DILARANG** | Memory leak — data tidak pernah di-GC |
| `staleTime: Infinity` | **DILARANG** | Data tidak pernah refetch |

```ts
// ❌ SALAH — memory leak
useQuery({
  queryKey: ["employees"],
  queryFn: fetchEmployees,
  gcTime: Infinity,
  staleTime: Infinity,
});

// ✅ BENAR
useQuery({
  queryKey: employeeKeys.list(filters),
  queryFn: () => apiClient.get("/employees", filters),
  staleTime: 30_000,
  // gcTime: default 5 menit — biarkan default
});
```

### 5.4. State Management Rules

- **URL = sumber kebenaran state tabel** (page/size/sort/filter-id), bukan state komponen.
- **JANGAN** copy `data` dari TanStack Query ke `useState` — double state, stale sync bugs.
- **JANGAN** simpan array baris besar di `useState`/Context.
- **Tanpa optimistic removal** pada delete — baris hilang hanya setelah 200 OK.

### 5.5. Loading & Error States

```tsx
// Pattern WAJIB untuk setiap query consumer
if (isPending) return <Skeleton />;
if (isPlaceholderData) return <DataTable className="opacity-60" />;
if (isError) return <InlineRetry onRetry={refetch} />;
return <DataTable data={data} />;
```

---

## 6. Form & Validasi

### 6.1. Default: `<CrudForm>` + `makeConfig`

Semua form CRUD sederhana pakai **RHF v7 + Zod** (`zodResolver`) via satu primitive
**`<CrudForm>`** (forms §10). Suplai skema Zod + daftar field — jangan bikin boilerplate RHF
per-entitas.

```ts
// src/config/master/golongan.config.ts
export const golonganConfig = makeConfig<GolonganQuery, GolonganPostRequest>({
  entity: "golongan",
  columns: [...],
  fields: [
    { name: "nama", label: "Nama Golongan", type: "text" },
    { name: "kode", label: "Kode", type: "text" },
  ],
  schema: golonganSchema,
});
```

### 6.2. Field Coverage Enforcement (ADR-0008)

`makeConfig<TQuery, TReq>` mewajibkan coverage-set `{fields[].name} ∪ {fkSources[].field}`
HARUS superset dari keys **required** `TReq`. Kurang satu required → `tsc` error.

```ts
// ❌ SALAH — 'kode' missing dari fields = tsc error
makeConfig<SanksiQuery, SanksiPostRequest>({
  fields: [{ name: "nama", ... }],  // 'kode' hilang!
  // TypeScript error: Property 'kode' is missing
});

// ✅ BENAR — semua required field tercakup
makeConfig<SanksiQuery, SanksiPostRequest>({
  fields: [
    { name: "nama", ... },
    { name: "kode", ... },
  ],
});
```

### 6.3. Form Kompleks (Deviasi Sadar)

Form dengan **conditional sections**, **FK cascade**, atau **`superRefine` kondisional** boleh
pola custom — `<CrudForm>` berbasis `fields[]` flat tidak mendukungnya. Ikuti pola `profesi/form.tsx`
(Field* renderer lokal + RHF langsung). Patuhi ambang komponen §2.2 & anti-fragmentasi.

### 6.4. Zod Schema Rules

```ts
// Schema = single source of truth
import { z } from "zod";

export const employeeSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi").max(100),
  nip: z.string().min(8, "NIP minimal 8 digit"),
  jabatanId: z.number({ required_error: "Jabatan wajib dipilih" }),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
});

// Derive type — JANGAN tulis interface terpisah
export type EmployeeFormValues = z.infer<typeof employeeSchema>;
```

- Skema Zod **selaras** dengan `required`/`minLength`/`minimum` OpenAPI Backend.
- Resolver: `zodResolver(schema as never)` — cast diperlukan untuk Zod v4 + RHF compatibility.
- **`defaultValues` WAJIB** lengkap — hindari warning uncontrolled→controlled.

### 6.5. Error & UX Rules

- Error validasi = **inline di form**, JANGAN toast.
- Single-column label-on-top layout.
- Input height ≥ **44px** (touch target aksesibilitas).
- Gunakan `aria-invalid` dan `aria-describedby` untuk accessible error messages.

---

## 7. Auth & Keamanan

### 7.1. Defense-in-Depth (3 Lapis — WAJIB)

```
┌─────────────┐     ┌──────────────────┐     ┌───────────────────┐
│  proxy.ts   │ →   │  DAL             │ →   │  RBAC             │
│  Gate Data  │     │  verifySession() │     │  hasPermission()  │
│  (Network)  │     │  Gate Render     │     │  Server-side      │
└─────────────┘     └──────────────────┘     └───────────────────┘
```

**UI unmount = kenyamanan, BUKAN batas keamanan** — jangan andalkan.

### 7.2. `proxy.ts` (Single Point of Failure)

Review & test paling ketat. WAJIB:
- `try/catch` fail-safe (redirect `/login`, **jangan** throw 500)
- Pin **Node runtime**
- **Hapus cookie `token` saat logout** (cegah replay)
- Refresh buffer ~30s + mint `duration: 3600`

### 7.3. Kontrak Status HTTP

| Status | Aksi | Detail |
|--------|------|--------|
| **401** | Sesi hilang → toast + redirect `/login?next=` | BUKAN 403 |
| **403** | Forbidden page — JANGAN bounce ke login | Tampilkan "Akses Ditolak" |
| **409** | Conflict — inline di dialog | Jangan tutup dialog, tampilkan alasan |

### 7.4. JWT & Session

- JWT hidup di cookie `httpOnly` + `secure` + `sameSite`, short-lived.
- Cookie sesi Appwrite: `a_session_<projectId>` (primary) + `_legacy` fallback.
- Dibaca via `readSession()`. BUKAN `mail_session`.

---

## 8. RBAC

- **TIDAK PERNAH** hardcode `role === 'admin'`. Selalu lewat
  `hasPermission(permissions, PERMISSION.X, roles?)`.
- **Sumber kebenaran = `getAccountSession()`** (`GET /account/me`) → `{ roles, permissions }`.
  Server component: `verifySession()` + `getAccountSession()`; client: `useAuth()`.
- Role `ADMIN` lolos otomatis (shortcut di `hasPermission` — dual-mode BE). `permissions` bisa
  kosong untuk ADMIN — jangan hardcode ekspektasi sebaliknya.
- Akses ditolak di UI = **unmount (`return null`)**, **BUKAN** disable/CSS-hide.

```tsx
// ❌ SALAH — CSS hide
<Button disabled={!canEdit} className={!canEdit ? "hidden" : ""}>Edit</Button>

// ✅ BENAR — unmount total
{hasPermission(permissions, PERMISSION.EDIT) && <Button>Edit</Button>}
```

---

## 9. Notifikasi & Error Handling

### 9.1. Toast (sonner)

- Satu `<Toaster />` di root layout, `position="bottom-right"`, `richColors`, `closeButton`.
- Toast **HANYA** untuk **hasil mutation** (create/update/delete).

```ts
// ✅ Mutation success/error
toast.success("Data berhasil disimpan");
toast.error("Gagal menghapus data");

// ✅ toast.promise untuk lifecycle otomatis
toast.promise(updateEmployee(data), {
  loading: "Menyimpan data pegawai...",
  success: "Data pegawai berhasil diperbarui",
  error: (err) => err.message || "Gagal menyimpan data pegawai",
});
```

### 9.2. Error Non-Toast

| Skenario | Handling | Implementasi |
|----------|----------|-------------|
| Data load gagal | **Inline retry** | `<InlineRetry onRetry={refetch} />` di dalam tabel |
| Form validasi gagal | **Inline per-field** | RHF `formState.errors` di bawah input |
| 401 unauthorized | **Redirect** | `router.push("/login?next=...")` + toast |
| 409 conflict (delete) | **Inline di dialog** | Dialog tetap terbuka, tampilkan alasan |

---

## 10. Performance

### 10.1. Server vs Client Components

```tsx
// ✅ Page = Server Component tipis, data di-pass ke Client Component
// src/app/(app)/master/golongan/page.tsx
export default async function GolonganPage() {
  return <GolonganClient />;  // Client component handles interactivity
}
```

- **Server Component by default.** Tandai `'use client'` hanya bila butuh hooks/browser API/event handlers.
- **JANGAN** `'use client'` di `page.tsx` atau `layout.tsx` — konversi seluruh subtree ke client bundle.

### 10.2. Lazy Loading

```tsx
// Heavy components: PDF viewer, charts, dsb
const PdfViewer = dynamic(() => import("@/components/pdf-viewer"), {
  ssr: false,
  loading: () => <Skeleton className="h-[600px]" />,
});
```

### 10.3. Suspense Boundaries

```tsx
// Wrap dynamic content untuk streaming/PPR
<Suspense fallback={<TableSkeleton />}>
  <EmployeeTable />
</Suspense>
```

### 10.4. Font Optimization

```tsx
// src/app/layout.tsx — self-hosted, no CLS
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});
```

---

## 11. Testing

### 11.1. Konvensi

- Test runner: **Vitest** + **Testing Library** (`@testing-library/react`, `@testing-library/user-event`).
- File test: `*.test.ts` / `*.test.tsx` — collocated dengan file yang ditest, atau di `__tests__/`.
- **Unit test WAJIB** untuk logic baru di hooks/lib.

### 11.2. Pattern

```ts
// ✅ Test hook logic
import { renderHook, waitFor } from "@testing-library/react";

test("useGolonganTable returns data", async () => {
  const { result } = renderHook(() => useGolonganTable(), { wrapper: QueryWrapper });
  await waitFor(() => expect(result.current.data).toBeDefined());
});

// ✅ Test component rendering
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("delete button triggers confirmation", async () => {
  render(<DataTable data={mockData} />);
  await userEvent.click(screen.getByRole("button", { name: /hapus/i }));
  expect(screen.getByText("Ketik HAPUS")).toBeInTheDocument();
});
```

### 11.3. Quality Gate

```bash
bun run test              # WAJIB hijau sebelum push
bun run build             # WAJIB zero error
bunx biome check          # WAJIB zero lint error
```

---

## 12. Tooling & Quality Gate

### 12.1. BiomeJS 2.2

- **Satu tool** pengganti ESLint + Prettier — linting + formatting + import sorting.
- Config di `biome.json`: tab indent, width 120, `organizeImports: "on"`.
- `src/components/ui/` excluded dari linting (generated code).

```bash
bunx biome check          # Lint seluruh project
bunx biome check --write  # Auto-format + fix
```

### 12.2. Import Organization

BiomeJS otomatis mengatur import. Urutan konvensi:

```tsx
// 1. React/Next.js
import { useState } from "react";
import Link from "next/link";

// 2. Third-party libraries
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// 3. Internal — absolute imports via @/
import { DataTable } from "@/components/data-table";
import { useGolonganTable } from "@/hooks/useGolonganTable";
import { cn } from "@/lib/utils";
import type { GolonganQuery } from "@/types/master/golongan";
```

### 12.3. Pre-Ship Checklist

- [ ] `bun run test` — all green
- [ ] `bun run build` — clean build, zero error
- [ ] `bunx biome check` — zero lint errors
- [ ] No out-of-scope errors resolved ad-hoc (file new issue instead)

---

## 13. Git & Commit Convention

### 13.1. Format

```
<type>: <deskripsi>
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`, `perf`.

### 13.2. Rules & Safety Guardrails

- **Never amend.** Commit rusak → `fix:` commit baru.
- **Batched `git add`** di akhir saja — JANGAN `git add` per-file di antara edit.
- **Resolve out-of-scope errors** → file **new issue**, jangan fix ad-hoc inline.
- **Git Stash & Safe Reset (WAJIB):**
  - **DILARANG** `git restore .`, `git reset --hard`, atau `git clean -fd` tanpa melakukan **`git stash push -m "descriptive-label"`** terlebih dahulu.
  - Sebelum `git pull --rebase` atau switch branch saat ada uncommitted changes: wajib `git stash` agar pekerjaan lokal/kontributor lain tidak hilang atau tertimpa.
  - Untuk melihat riwayat simpanan: `git stash list`.
  - Jika perlu memulihkan perubahan: `git stash pop` (atau `git stash apply`).
  - Jangan jalankan `git stash drop` atau `git stash clear` kecuali yakin 100% stash tersebut tidak dibutuhkan lagi.

---

## Appendix A: Anti-Patterns (Larangan Lengkap)

| # | Anti-Pattern | Mengapa Salah | Yang Benar |
|---|-------------|---------------|------------|
| A1 | Hardcode hex/`oklch(...)` di komponen | Tidak konsisten, sulit maintain | Token: `bg-primary`, `text-foreground` |
| A2 | `Record<string, unknown>` untuk entity | Hilang type safety | `EntityConfig<TItem, TReq>` generics |
| A3 | Pakai Radix API (`asChild`, `forceMount`) | Project pakai Base UI | Verifikasi ke docs Base UI |
| A4 | Satu `<Dialog>` per baris tabel | N dialog = memory waste | Mount container sekali, pass `editing` state |
| A5 | `gcTime: Infinity` / `staleTime: Infinity` | Memory leak | `gcTime: 5min`, `staleTime: 30s` |
| A6 | Toast untuk data-load failure | Mengganggu, tidak actionable | Inline retry panel |
| A7 | CSS-hide/disable untuk unauthorized | Bisa di-enable via inspect | Unmount (`return null`) |
| A8 | Optimistic removal (hapus baris sebelum 200) | 409 bisa terjadi | Tunggu 200 OK |
| A9 | `useMemo`/`useCallback` defensif | React Compiler sudah handle | Tulis biasa |
| A10 | `React.forwardRef` | Obsolete di React 19 | `ref` sebagai prop biasa |
| A11 | Copy query data ke `useState` | Double state, stale sync | Pakai `data` langsung dari `useQuery` |
| A12 | Edit file `src/components/ui/*` | Akan ditimpa `npx shadcn add` | Override via `className` / wrapper |
| A13 | `useEffect` untuk derived state | Unnecessary re-render | Hitung inline, compiler memoize |
| A14 | Akses `params`/`searchParams` sinkron | Breaking di Next.js 16 | `await params`, `await searchParams` |
| A15 | Tulis interface + Zod schema terpisah | Duplikasi, out-of-sync | `z.infer<typeof schema>` saja |
| A16 | `'use client'` di page.tsx/layout.tsx | Konversi seluruh subtree ke client | Buat client component terpisah |
| A17 | Amending broken commits | Riwayat hilang | `fix:` commit baru |
| A18 | Resolve out-of-scope errors inline | Scope creep | File new issue |
| A19 | `git add` per-file di antara edit | Defeats batch guarantee | Batched `git add` di akhir |
| A20 | Font weight ≤300 | Sulit dibaca pengguna lansia | 400/500/600 saja |
| A21 | `git restore .` / `git reset --hard` tanpa `git stash` | Menghapus perubahan lokal orang lain / diri sendiri yang belum di-commit secara permanen | `git stash push -m "label"` sebelum restore/reset |
