# Riwayat Navigation Rail — Optimasi Tampilan

## Claim Order Checklist

### Step 1: ✅ Header dinamis
- [x] `usePathname()` untuk deteksi halaman aktif
- [x] Judul berubah: "Riwayat Mutasi — [NIPAM] ([Nama])" atau "Riwayat Surat Keputusan — ..."
- [x] Fallback: "Riwayat Pegawai — ..." jika path tak dikenal

### Step 2: ✅ Ikon + active left border accent
- [x] Tambah `lucide-react` icons tiap item rail
- [x] Active state: left border accent (2px `bg-primary` dengan `rounded-r`)
- [x] Scale animation on active: `scale-y-0` → `scale-y-100` (150ms)
- [x] `bg-accent` saat aktif + `hover:bg-accent/50` untuk item aktif

### Step 3: ✅ Disabled items graceful
- [x] Ganti `cursor-not-allowed` jadi `pointer-events-none` + `opacity-40`
- [x] Badge "Segera" (outline, amber)
- [x] Tooltip "Fitur akan hadir" via `title` attribute

### Step 4: ✅ Card polish
- [x] Padding: `p-3` → `p-4`
- [x] Section label dengan separator (`border-b border-border`)
- [x] Gap antar item: `gap-0.5`

### Step 5: ✅ Micro-interactions
- [x] Hover: `transition-colors duration-150`
- [x] Active border animation: `transition-transform duration-150`
- [x] Disabled items tetap konsisten

### Step 6: ✅ Typecheck & build
- [x] `bun run build` — zero error ✅
- [x] `bunx biome check` — zero lint error ✅

### Step 7: ✅ Commit & push
- [x] `git commit -m "feat: optimasi navigation rail riwayat"`
- [x] `git push` ✅

---

## Referensi

- Layout file: `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx`
- Design tokens: `docs/design/visual-foundation.md`
- Sidebar pattern: `src/components/app-shell.tsx`
- Research: modern dashboard sidebar navigation patterns
