# Riwayat Navigation Rail — Optimasi Tampilan

## Claim Order Checklist

### Step 1: ✅ Header dinamis
- [ ] `usePathname()` untuk deteksi halaman aktif
- [ ] Judul berubah: "Riwayat Mutasi — [NIPAM] ([Nama])" atau "Riwayat Surat Keputusan — ..."
- [ ] Fallback: "Riwayat Pegawai — ..." jika path tak dikenal

### Step 2: ✅ Ikon + active left border accent
- [ ] Tambah `lucide-react` icons tiap item rail
- [ ] Active state: left border accent (3px `bg-primary` dengan `rounded-r`)
- [ ] Scale animation on active: `scale-y-0` → `scale-y-100` (150ms)
- [ ] `bg-accent` saat aktif + `hover:bg-accent/50` untuk item aktif

### Step 3: ✅ Disabled items graceful
- [ ] Ganti `cursor-not-allowed` jadi `pointer-events-none` + `opacity-40`
- [ ] Badge "Segera" (outline, amber)
- [ ] Tooltip "Fitur akan hadir" via `title` attribute

### Step 4: ✅ Card polish
- [ ] Padding: `p-3` → `p-4`
- [ ] Section label dengan separator (`border-b border-border`)
- [ ] Gap antar item: `gap-0.5`

### Step 5: ✅ Micro-interactions
- [ ] Hover: `transition-colors duration-150`
- [ ] Active border animation: `transition-transform duration-150`
- [ ] Disabled items tetap konsisten

### Step 6: ✅ Typecheck & build
- [ ] `bun run build` — zero error
- [ ] `bunx biome check` — zero lint error

### Step 7: ✅ Commit & push
- [ ] `git add docs/ src/`
- [ ] `git commit -m "feat: optimasi navigation rail riwayat"`
- [ ] `git pull --rebase && bd dolt push && git push`

---

## Referensi

- Layout file: `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/layout.tsx`
- Design tokens: `docs/design/visual-foundation.md`
- Sidebar pattern: `src/components/app-shell.tsx`
- Research: modern dashboard sidebar navigation patterns
