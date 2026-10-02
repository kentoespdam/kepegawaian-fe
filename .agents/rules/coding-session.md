# Coding Session & Coding Rules Protocol

Protokol ini WAJIB dipatuhi oleh seluruh AI Agent (Root Agent & Sub-Agent Worker) selama sesi koding dan implementasi teknis di repositori ini. Seluruh panduan koding di sini berjalan berdampingan dan harus merujuk langsung pada dokumen panduan arsitektur utama: `docs/design/coding-rules.md`.

---

## 1. Alur & Mandatory Pre-Coding Gates

1. **Aktivasi Ponytail**:
   - WAJIB mengaktifkan skill `/ponytail` sebelum memodifikasi kode untuk memastikan solusi minimalis, efisien, anti-bloat, dan bebas over-engineering.
2. **Issue Tracker (Beads Issue)**:
   - Setiap pekerjaan WAJIB bersumber dari dan dieksekusi melalui `beads issue`.
   - Jika masuk ke sesi koding tanpa issue aktif, agen WAJIB membuat issue baru terlebih dahulu sebagai task tracker sebelum koding dimulai (`bd create`).
   - Claim task sebelum eksekusi (`bd update <id> --claim`).
3. **Deep Reading & Code Understanding (GitNexus / Graphify)**:
   - WAJIB membaca issue secara mendalam.
   - WAJIB memastikan pemahaman arsitektur dan blast radius perubahan dengan mengeksekusi skill `gitnexus` (`gitnexus_impact`, `gitnexus_query`) dan/atau `graphify` (`graphify query`, `graphify path`, `graphify-out/`).
4. **Sinkronisasi Checklist Claim Order**:
   - Jika task bersumber dari file markdown checklist claim order, agen WAJIB meng-update checklist pada file MD tersebut sebelum mematikan atau menutup issue (`bd close <id>`).
5. **Unit Test Wajib & Passed**:
   - WAJIB selalu membuat atau memastikan ketersediaan Unit Test (Vitest + Testing Library) untuk setiap fitur/perubahan sebagai indikator keberhasilan dan sarana debugging.
   - Unit test WAJIB berstatus PASSED (`bun run test`) sebelum pekerjaan dianggap selesai.
6. **Finalisasi & Git Push (Native Git)**:
   - Pekerjaan diakhiri dengan pre-ship verification (`bun run test`, `bun run build`, `bunx biome check`).
   - Eksekusi commit dan push ke GitHub WAJIB dilakukan HANYA menggunakan native git (`git add`, `git commit`, `git pull --rebase`, `git push`), TANPA menggunakan `dolt` (`bd dolt push` dilarang/ditiadakan).

---

## 2. Best Practices Stack Teknologi

### 2.1 Next.js 16 (App Router)
- **Async Params/Headers**: `params`, `searchParams`, `cookies()`, dan `headers()` bernilai asynchronous (`Promise`) dan WAJIB di-`await`.
- **Caching & Data Fetching**: Gunakan React Server Components (RSC) untuk fetching data publik dengan direktif `use cache`. Konten dinamis dibungkus dengan `<Suspense fallback={<Skeleton />}>`.
- **Proxy**: Routing middleware menggunakan `proxy.ts` (Node runtime), bukan `middleware.ts`.

### 2.2 React 19 & React Compiler
- **Otomatis Memoization**: Dilarang menggunakan `useMemo`, `useCallback`, atau `React.memo` secara defensif; compiler mengoptimasi secara otomatis.
- **Ref Sebagai Prop**: Dilarang menggunakan `React.forwardRef`; gunakan `ref` sebagai prop langsung pada komponen.
- **Form & Actions**: Gunakan Server Actions dan React 19 `useTransition` / `useActionState` untuk penanganan mutasi data.
- **Immutability**: Dilarang mutasi state langsung (`array.push()`); gunakan struktur immutable (`[...array, item]`).
- **Context**: Gunakan `<Context value={v}>` langsung tanpa `<Context.Provider>`.

### 2.3 Tailwind CSS
- Menggunakan pendekatan CSS-first `@theme` (Tailwind v4 token OKLCH di `globals.css`).
- Dilarang keras menggunakan inline styles (`style={{ ... }}`). Seluruh styling wajib via Tailwind utility classes.

### 2.4 Shadcn UI
- Komponen Shadcn UI di `src/components/ui/*` diperlakukan sebagai UI primitives murni (pure presentation).
- Dilarang menempatkan API calls atau business logic kompleks langsung di dalam komponen UI primitive.
- Gunakan komposisi komponen untuk kebutuhan fitur spesifik.

### 2.5 TanStack React Query (v5)
- Gunakan TanStack Query untuk interaksi client-side, dynamic data, cache invalidation, dan optimistic updates.
- Terapkan Query Key Factory pattern untuk konsistensi query keys.
- Integrasikan mutasi data dengan Server Actions dan optimistik UI via React 19 transitions.
