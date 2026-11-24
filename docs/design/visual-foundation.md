# Fondasi Visual — Palet, Aksesibilitas, Tipografi

> **Muat modul ini untuk:** SETIAP pekerjaan UI (komponen, halaman, styling). Ini fondasi
> yang dipakai hampir semua task. Berisi §1 (palet/token), §2 (checklist aksesibilitas), §3 (tipografi).
> **Sumber:** CONTEXT §Theming/§Palette/§Accessibility/§Typography + `docs/design/color-rationale.md` §3–§4.
> Nilai OKLCH = **baseline**, boleh di-fine-tune saat implementasi **ASAL lolos gate kontras (§2)**.

---

## 1. Palet & token tema (`src/app/globals.css`)

Semua warna = **token OKLCH** via `@theme` + variabel shadcn. **Dilarang** hex/`oklch(...)`
literal di dalam komponen. Light dan dark mode aktif lewat `next-themes`; nilai tema berada di
`:root` dan `.dark {}` agar perubahan palet tidak memerlukan edit komponen.

**Struktur 60:30:10 "A-refined"** (dioptimalkan ±70% pengguna lansia — lihat `color-rationale.md` dan keputusan palet Evergreen):
- **60% kanvas** → `--background` off-white hangat.
- **30% struktur** → kartu terang, `--muted` dan `--secondary` bertingkat, border serta outline input yang terlihat.
- **10% aksen** → Evergreen `--primary` untuk aksi utama dan fokus; pilihan tabel memakai tint Evergreen.

### 1.1 Token tema (light) — Evergreen dengan surface yang dibedakan

| Token | OKLCH | Peran |
|---|---|---|
| `--background` | `oklch(0.94 0.008 85)` | Kanvas hangat |
| `--foreground` | `oklch(0.22 0.01 260)` | Teks utama — target AAA ≥7:1 |
| `--card` | `oklch(0.995 0.004 85)` | Kartu/panel terang di atas kanvas |
| `--card-foreground` | `oklch(0.22 0.01 260)` | Teks di atas card |
| `--popover` | `oklch(0.995 0.004 85)` | Popover/combobox/menu |
| `--popover-foreground` | `oklch(0.22 0.01 260)` | Teks popover |
| `--muted` | `oklch(0.95 0.01 85)` | Header tabel dan panel tenang |
| `--muted-foreground` | `oklch(0.38 0.01 260)` | Teks sekunder — ≥4.5:1 di semua permukaan |
| `--secondary` | `oklch(0.91 0.012 85)` | Tombol sekunder (Batal), terlihat beda dari card |
| `--secondary-foreground` | `oklch(0.22 0.01 260)` | Teks tombol sekunder |
| `--border` | `oklch(0.8 0.012 85)` | Garis tabel dan pemisah |
| `--input` | `oklch(0.6 0.012 85)` | Batas input yang terbaca sebelum fokus |
| `--ring` | `oklch(0.48 0.09 158)` | Focus ring Evergreen |
| `--primary` | `oklch(0.48 0.09 158)` | **Evergreen** — aksi utama |
| `--primary-foreground` | `oklch(0.99 0.008 95)` | Teks di atas tombol utama |
| `--destructive` | `oklch(0.52 0.20 25)` | Merah (bahaya/hapus) |
| `--destructive-foreground` | `oklch(0.99 0.008 85)` | Teks di atas merah |
| `--success` | `oklch(0.52 0.1 195)` | Teal untuk status berhasil, terpisah dari Evergreen |
| `--success-foreground` | `oklch(0.99 0.008 85)` | Teks di atas teal |
| `--warning` | `oklch(0.68 0.15 75)` | Amber (peringatan) |
| `--warning-foreground` | `oklch(0.22 0.01 260)` | Teks gelap di atas amber |
| `--accent` | `oklch(0.91 0.01 85)` | Hover netral |
| `--accent-foreground` | `oklch(0.22 0.01 260)` | Teks hover |
| `--row-stripe` | `oklch(0.965 0.006 85)` | Zebra netral |
| `--row-hover` | `oklch(0.925 0.012 85)` | Hover baris |
| `--row-selected` | `oklch(0.89 0.035 158)` | Baris terpilih dengan tint Evergreen |
| `--radius` | `0.5rem` | Radius dasar |

Tema gelap memakai langkah surface yang sama: kanvas `oklch(0.13 0.01 160)`, card `0.22`, popover `0.25`, secondary `0.29`, muted `0.26`; border `0.38`, input `0.56`, dan teks sekunder `0.73`. Nilai light/dark lengkap berada di `src/app/globals.css`.

> **Aturan semantik (WCAG SC 1.4.1):** JANGAN bergantung pada sumbu biru↔hijau (rusak di mata
> lansia). Setiap status/severity SELALU disertai **ikon + teks/label**, bukan hanya warna.

### 1.2 Struktur tema `globals.css`

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

.dark {
  /* pasangan token dark aktif; lihat src/app/globals.css */
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

### 3.1 Family & weights

- **Satu family: Inter**, self-hosted via `next/font` (nol request eksternal ke Google saat
  runtime). `display: swap` + fallback metrics → nol layout-shift.
- **Berat terbatas:** `400` body, `500` label, `600` heading/tombol. **Dilarang ≤300.**
- **Angka tabular WAJIB di tabel** (`tabular-nums` / `font-feature-settings: "tnum"`) untuk
  kolom angka (potong TKK %, level) → digit rata vertikal.
- **Satu family saja** (bukan pasangan heading+body) — lebih ringan, konsisten, anti-slop.
- Dipasang di root layout via variabel font `--font-sans`, dikonsumsi `@theme`.

### 3.2 Skala ukuran (type scale)

Ditetapkan berdasarkan riset keterbacaan usia 35+ (presbyopia) dan WCAG SC 1.4.12.
Populasi ±70% lansia → ukuran minimal **16px untuk body** (Q5 grill 2026-07-16).

| Token Tailwind v4 | Ukuran | Line-height | Penggunaan |
|---|---|---|---|
| `text-xs` | 0.75rem (12px) | 1.333 (16px) | Metadata, badge, help text kecil |
| `text-sm` | 1rem (16px) | 1.5 (24px) | **Body text** — paragraf, label, sel tabel, tombol |
| `text-base` | 1rem (16px) | 1.5 (24px) | Judul dialog/sheet, card title — sama dgn body (heading via weight, bukan ukuran) |

> **Catatan:** `text-sm` di Tailwind v4 default 0.875rem (14px). Token `@theme` di `globals.css`
> menimpa menjadi 1rem (16px) sesuai keputusan grill. `text-xs` tetap 0.75rem karena hanya
> dipakai untuk metadata kecil yang tidak dominan.

### 3.3 Line-length (max-width konten)

- **Body teks prosa:** ≤ **75ch** (WCAG SC 1.4.12, riset Baymard).
- **Tabel & form:** tidak dibatasi (lebar natural container) — line-length hanya untuk paragraf
  bacaan, bukan data grid.

### 3.4 Letter-spacing

- **Normal body:** `normal` (0).
- **All-caps label/header:** `tracking-wider` (0.05em) untuk mempertahankan keterbacaan huruf
  kapital — hanya di kolom header tabel, section divider.

### 3.5 Token semantik `@theme`

Semua ukuran font di atas dideklarasikan sebagai token `--text-*` di `@theme inline`
`globals.css`. Komponen menggunakan **Tailwind utility class** (`text-sm`, `text-xs`, dll.),
**bukan** value hardcoded. Body menggunakan `--text-body`:

```css
@theme inline {
  --text-xs: 0.75rem;
  --text-sm: 1rem;
  --text-base: 1rem;
  --text-body: 1rem;
  --leading-body: 1.6;
}

@layer base {
  body {
    font-size: var(--text-body);
    line-height: var(--leading-body);
  }
}
```

### 3.6 Gate verifikasi

- **Nol hardcoded `font-size`** di komponen — hanya via Tailwind utility atau token CSS.
- **Nol `text-[..px]`** utility inline di shared stack (data-table, crud-form, dll.).
- Body `font-size` ≠ 15px.
- Tabular-nums di kolom angka tabel.
