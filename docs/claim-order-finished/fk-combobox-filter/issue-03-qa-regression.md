# Issue #03 — QA & Regresi: Verifikasi Seluruh Entitas

**Area:** Browser QA — tidak ada perubahan kode  
**Blok:** Bergantung pada Issue #01 + #02 (harus keduanya selesai)  
**Estimasi:** ~30 menit  
**Label:** `qa`, `regression`, `accessibility`

---

## Konteks

Setelah `FKComboboxFilter` diintegrasikan ke `DataTableToolbar`, issue ini memastikan bahwa seluruh entitas CRUD yang punya filter FK berjalan dengan benar, tidak ada regresi UX, dan komponen memenuhi standar aksesibilitas proyek (lihat `CONTEXT-MAP.md ### Accessibility & contrast`).

## Daftar Entitas dengan FK Filter

Berdasarkan konfigurasi di `src/config/master/`:

| Entitas | FK Filter(s) | Search Field(s) |
|---------|-------------|-----------------|
| Grade | `levelId` (Level) | `grade` (number) |
| Profesi | `organisasiId`, `jabatanId`, `gradeId` | `nama` |
| Sanksi | `jenisSpId` (Jenis SP) | `kode`, `keterangan` |
| Alat Kerja | `profesiId` (Profesi) | — |

> Entitas **tanpa** FK filter (golongan, jabatan, level, dll.) tidak perlu diverifikasi di sini — toolbar mereka tidak berubah.

## Checklist QA per Skenario

### A. Fungsionalitas Dasar

- [ ] **Klik trigger button** → CommandDialog terbuka dengan judul benar
- [ ] **CommandInput aktif otomatis** saat dialog terbuka (focus)
- [ ] **Ketik teks** → opsi terfilter secara real-time
- [ ] **Ketik teks yang tidak cocok** → `CommandEmpty` tampil
- [ ] **Pilih opsi** → dialog tertutup, trigger button tampil label opsi terpilih
- [ ] **URL berubah** → `?{field}Id={value}` setelah pilih (contoh: `?levelId=3`)
- [ ] **Tabel ter-refresh** dengan data terfilter
- [ ] **Klik "Semua {label}"** → filter dihapus, URL bersih, tabel kembali ke semua data

### B. State Persistence

- [ ] **Reload halaman** dengan URL `?levelId=42` → trigger button tampil label opsi yang benar (bukan "Semua Level")
- [ ] **Kembali (browser back/forward)** → filter state terjaga

### C. Toggle Off

- [ ] **Klik opsi yang sudah aktif** → filter dihapus (toggle off), button kembali ke "Semua {label}"

### D. Multi-Filter (Profesi — 3 FK)

- [ ] Tiga trigger button tampil berdampingan, tidak overflow secara horizontal
- [ ] Setiap filter independen: pilih Organisasi tidak mereset filter Jabatan
- [ ] Di mobile (≤375px viewport): filter-filter stack secara vertikal (sudah ditangani oleh `flex-wrap` di toolbar)

### E. Aksesibilitas

- [ ] Trigger button memiliki `role="combobox"` dan `aria-expanded`
- [ ] Keyboard: Tab ke trigger, Enter/Space → buka dialog, ↑↓ navigasi item, Enter pilih, Esc tutup
- [ ] Focus ring jelas pada trigger button (standar `### Accessibility & contrast`)
- [ ] Judul dialog tersedia di sr-only untuk screen reader

### F. Dark Mode

- [ ] Trigger button, CommandDialog, CommandInput, dan CommandItem tampil dengan benar di dark mode
- [ ] Kontras teks opsi terpilih ≥ 4.5:1 (token `--muted-foreground` / `--foreground`)

### G. Regresi Umum

- [ ] **Text search fields** (DebouncedInput) tetap berfungsi normal — tidak terpengaruh
- [ ] **Tombol "Tambah"** di kanan toolbar tetap di posisi benar
- [ ] **Paginasi reset ke page 1** saat filter FK diubah
- [ ] **`isPlaceholderData` spinner** di toolbar muncul saat filter berubah dan data sedang di-fetch

## Kriteria Selesai (DoD)

- Semua skenario A–G di atas **pass**
- Tidak ada console error
- Tidak ada TypeScript error (`tsc --noEmit`)
- Screenshot/catatan anomali (jika ada) dilampirkan ke issue ini sebelum ditutup

## Template Laporan QA

```
## Hasil QA — [tanggal]

### ✅ Pass
- [list skenario yang pass]

### ❌ Fail / Anomali
- [skenario] — [deskripsi masalah] — [screenshot jika ada]

### Catatan
- [catatan tambahan]
```
