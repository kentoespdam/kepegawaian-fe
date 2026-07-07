# Fondasi Visual — Palet, Aksesibilitas, Tipografi

> **Muat modul ini untuk:** SETIAP pekerjaan UI (komponen, halaman, styling). Ini fondasi
> yang dipakai hampir semua task. Berisi §1 (palet/token), §2 (checklist aksesibilitas), §3 (tipografi).
> **Sumber:** CONTEXT §Theming/§Palette/§Accessibility/§Typography + `docs/color-rationale.md` §3–§4.
> Nilai OKLCH = **baseline**, boleh di-fine-tune saat implementasi **ASAL lolos gate kontras (§2)**.

---

## 1. Palet & token tema (`src/app/globals.css`)

Semua warna = **token OKLCH** via `@theme` + variabel shadcn. **Dilarang** hex/`oklch(...)`
literal di dalam komponen. Menambah dark mode nanti = isi satu blok `.dark {}` + pasang
`next-themes`, **nol perubahan komponen** (CONTEXT §Theming).

**Struktur 60:30:10 "A-refined"** (dioptimalkan ±70% pengguna lansia — lihat `color-rationale.md`):
- **60% kanvas** → `--background` off-white hangat.
- **30% struktur** → `--card/--muted/--secondary` netral hangat; `--border` dinaikkan kontrasnya.
- **10% aksen** → Tirta Blue `--primary` hanya di tombol primer, item aktif, focus ring.

### 1.1 Token baseline (light) — nilai terkunci CONTEXT §Palette + color-rationale §4

| Token | OKLCH | Peran |
|---|---|---|
| `--background` | `oklch(0.99 0.008 85)` | Kanvas 60%, off-white hangat (anti-silau) |
| `--foreground` | `oklch(0.22 0.01 260)` | Teks utama — target AAA ≥7:1 |
| `--card` | `oklch(0.965 0.006 85)` | Permukaan kartu/panel (30%) |
| `--card-foreground` | `oklch(0.22 0.01 260)` | Teks di atas card |
| `--popover` | `oklch(0.99 0.008 85)` | Popover/combobox/menu |
| `--popover-foreground` | `oklch(0.22 0.01 260)` | Teks popover |
| `--muted` | `oklch(0.965 0.006 85)` | Latar muted (header tabel, zebra) |
| `--muted-foreground` | `oklch(0.42 0.01 260)` | Teks sekunder — ≥4.5:1 di SEMUA permukaan (termasuk zebra/hover) |
| `--secondary` | `oklch(0.965 0.006 85)` | Tombol sekunder (Batal) |
| `--secondary-foreground` | `oklch(0.22 0.01 260)` | Teks tombol sekunder |
| `--border` | `oklch(0.86 0.008 85)` | Garis tabel/pemisah — sengaja dinaikkan (hindari pastel-samar) |
| `--input` | `oklch(0.86 0.008 85)` | Border input |
| `--ring` | `oklch(0.55 0.13 235)` | Focus ring = Tirta Blue |
| `--primary` | `oklch(0.55 0.13 235)` | **Tirta Blue** — aksen 10% |
| `--primary-foreground` | `oklch(0.99 0.008 85)` | Teks putih di atas tombol biru |
| `--destructive` | `oklch(0.52 0.20 25)` | Merah (bahaya/hapus) |
| `--destructive-foreground` | `oklch(0.99 0.008 85)` | Teks di atas merah |
| `--success` | `oklch(0.50 0.15 150)` | Hijau (digeser gelap+jenuh agar tak tertukar dengan biru) |
| `--success-foreground` | `oklch(0.99 0.008 85)` | Teks di atas hijau |
| `--warning` | `oklch(0.68 0.15 75)` | Amber (peringatan) |
| `--warning-foreground` | `oklch(0.22 0.01 260)` | Teks gelap di atas amber |
| `--accent` | `oklch(0.965 0.006 85)` | Hover item menu/list |
| `--accent-foreground` | `oklch(0.22 0.01 260)` | Teks hover |
| `--radius` | `0.5rem` | Radius dasar |

> **Aturan semantik (WCAG SC 1.4.1):** JANGAN bergantung pada sumbu biru↔hijau (rusak di mata
> lansia). Setiap status/severity SELALU disertai **ikon + teks/label**, bukan hanya warna.

### 1.2 Skeleton struktur file `globals.css`

```
@import "tailwindcss";

@theme {
  /* map --color-* → var(--token) untuk background, foreground, card, popover,
     muted, secondary, border, input, ring, primary, destructive, success,
     warning, accent (+ pasangan -foreground); --radius; --font-sans */
}

:root {
  /* semua token light dari tabel §1.1 */
}

/* Dark-ready scaffold — SENGAJA KOSONG di rilis 1 (diisi saat dark mode ditambah) */
.dark {
  /* TODO: nilai dark — nol perubahan komponen saat diisi */
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; font-family: var(--font-sans); }
}
```

> **CATATAN:** `globals.css` saat ini masih boilerplate Next default (Geist, `#fff/#171717`).
> Task implementasi WAJIB mengganti seluruh isinya dengan skeleton di atas + token §1.1.

---

## 2. Checklist aksesibilitas (WAJIB dicek per komponen) — CONTEXT §Accessibility

Populasi ±70% lansia → keterbacaan = **syarat fungsional**. Gate ini berlaku ke SEMUA komponen.

- [ ] **Kontras teks utama ≥ 7:1** (AAA) di atas latarnya.
- [ ] **Kontras teks sekunder/muted ≥ 4.5:1** — verifikasi `--muted-foreground` di atas
      `--background`, `--card`, baris zebra, DAN baris hover (bukan hanya latar polos).
- [ ] **Tirta Blue TIDAK dipakai untuk teks tubuh kecil** di atas putih (hanya aksen/aksi).
- [ ] **Font tubuh ≥ 15–16px** (jangan 12–13px).
- [ ] **Tinggi baris tabel & tombol ≥ 44px** area klik.
- [ ] **Ikon aksi ≥ 20px** dengan padding → area sentuh ≥ 40px.
- [ ] **Status/severity + ikon/teks**, tidak mengandalkan warna saja (SC 1.4.1).
- [ ] **Focus ring tebal & kontras** di SETIAP kontrol interaktif — jangan dihilangkan.
- [ ] **Berat font ≥ 400** — dilarang thin/light (≤300).
- [ ] **Verifikasi di viewport ~375px** (acceptance criterion tiap layar).

---

## 3. Tipografi — CONTEXT §Typography

- **Satu family: Inter**, self-hosted via `next/font` (nol request eksternal ke Google saat
  runtime). `display: swap` + fallback metrics → nol layout-shift.
- **Berat terbatas:** `400` body, `500` label, `600` heading/tombol. **Dilarang ≤300.**
- **Angka tabular WAJIB di tabel** (`tabular-nums` / `font-feature-settings: "tnum"`) untuk
  kolom angka (potong TKK %, level) → digit rata vertikal.
- **Satu family saja** (bukan pasangan heading+body) — lebih ringan, konsisten, anti-slop.
- Dipasang di root layout via variabel font `--font-sans`, dikonsumsi `@theme`.
