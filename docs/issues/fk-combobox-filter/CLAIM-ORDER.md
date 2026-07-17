# FK Combobox Filter — Claim Order & Monitoring

> Issues: ~~`kepegawaian-fe-ao5`~~ · ~~`kepegawaian-fe-p76`~~ · `kepegawaian-fe-3td` — 🟡 **2/3 CLOSED** (QA tersisa)
> Peran: manager grill → keputusan dikunci → **agent lain** yang eksekusi (bukan diri sendiri).
> Sumber keputusan: riset codebase + context7 2026-07-17. `bd graph kepegawaian-fe-ao5 --compact` untuk lihat dependency chain.

## Ringkasan

Mengganti plain HTML `<select>` di `DataTableToolbar` dengan `FKComboboxFilter` baru berbasis `CommandDialog` shadcn — semua filter FK di toolbar menjadi **searchable**. Scope: 1 file baru, 1 file dimodifikasi, 0 dependensi baru, 0 breaking change.

## Claim order (kerjakan berurutan — tiap langkah blok langkah berikut)

- [x] **[1] `kepegawaian-fe-ao5`** — Buat komponen `FKComboboxFilter`
  - **File:** `src/components/fk-combobox-filter.tsx` (NEW)
  - **Props:** `label: string`, `options: {value,label}[]`, `value?: string`, `onChange: (v: string|undefined) => void`
  - **Behavior:** trigger button (tampil label terpilih / "Semua {label}") → klik → buka `CommandDialog` → `CommandInput` auto-filter via cmdk → pilih → tutup + panggil `onChange`. Toggle off jika klik item aktif.
  - **Penting:** gunakan `data-checked={opt.value === value}` pada `CommandItem` (bukan `<Check />` manual — built-in CheckIcon di command.tsx sudah handle). Tambahkan item "Semua {label}" dengan `value=""` sebagai reset.
  - **Gate:** render tanpa error, TypeScript bersih (`tsc --noEmit`), build tidak rusak. Siap di-import oleh ao kepegawaian-fe-p76.

- [x] **[2] `kepegawaian-fe-p76`** — Ganti `<select>` di `DataTableToolbar` dengan `FKComboboxFilter`
  - **File:** `src/components/data-table-toolbar.tsx` (MODIFY)
  - **Ubah:** hapus blok `<select>` (12 baris), ganti dengan `<FKComboboxFilter key={fk.field} label={fk.label} options={fkOptions?.[fk.field] ?? []} value={values[fk.field]} onChange={(v) => onFilterChange?.(fk.field, v)} />`
  - **Tambah import:** `import { FKComboboxFilter } from "@/components/fk-combobox-filter";`
  - **JANGAN ubah:** `DataTableToolbarProps` interface tetap identik — `fkSources`, `fkOptions`, `values`, `onFilterChange` tidak berubah. Semua `src/config/master/*.config.ts` tidak disentuh.
  - **Gate:** `tsc --noEmit` hijau, filter Grade/Profesi/Alat Kerja/Sanksi masih muncul di toolbar (tidak kosong).

- [ ] **[3] `kepegawaian-fe-3td`** — QA & Regresi: verifikasi FKComboboxFilter di semua entitas
  - **Tidak ada perubahan kode** — browser QA saja.
  - **Entitas:** Grade (Level), Profesi (3 FK), Alat Kerja (Profesi), Sanksi (Jenis SP + 2 text input)
  - **Skenario wajib:**
    - Klik trigger → CommandDialog terbuka, judul benar, CommandInput auto-focus
    - Ketik → opsi terfilter; ketik tidak cocok → `CommandEmpty` muncul
    - Pilih opsi → dialog tutup, trigger tampil label, URL berubah `?{field}Id={value}`, tabel refresh
    - Klik "Semua {label}" → filter reset, URL bersih
    - Reload dengan URL `?levelId=42` → trigger tampil label opsi (bukan "Semua Level")
    - Klik opsi aktif → toggle off, kembali ke "Semua {label}"
    - Profesi (3 FK): filter independen, tidak overflow horizontal; mobile ≤375px stack vertikal
    - Keyboard: Tab, Enter/Space, ↑↓, Esc
    - Dark mode: trigger, dialog, item tampil benar
    - `role="combobox"` + `aria-expanded` terpasang, focus ring jelas
  - **Gate:** nol console error, semua skenario pass. Tulis laporan QA sebagai `bd comment kepegawaian-fe-3td "..."` sebelum close.

## File yang terlibat

| File | Tipe | Issue |
|------|------|-------|
| `src/components/fk-combobox-filter.tsx` | **NEW** | ao5 |
| `src/components/data-table-toolbar.tsx` | MODIFY | p76 |
| `src/components/ui/command.tsx` | READ-ONLY | — |
| `src/config/master/*.config.ts` | READ-ONLY | — |

## Referensi teknis

**`CommandDialog` API** (sudah ada, `src/components/ui/command.tsx`):
```tsx
<CommandDialog open={open} onOpenChange={setOpen} title="Pilih Level" description="...">
  <CommandInput placeholder="Cari level..." />
  <CommandList>
    <CommandEmpty>Tidak ada hasil untuk pencarian ini.</CommandEmpty>
    <CommandGroup>
      <CommandItem value="" data-checked={!value} onSelect={() => handleSelect("")}>Semua Level</CommandItem>
      {options.map((o) => (
        <CommandItem key={o.value} value={o.value} data-checked={o.value === value} onSelect={handleSelect}>
          {o.label}
        </CommandItem>
      ))}
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

**Catatan cmdk v1:** `onSelect` menerima `value` prop langsung (bukan teks konten). Client-side filtering built-in — tidak perlu `shouldFilter={false}`.

## Keputusan arsitektur

| Keputusan | Alasan |
|-----------|--------|
| `CommandDialog` (bukan Popover) | User minta ini; Popover belum ada di repo; zero install baru |
| File baru `fk-combobox-filter.tsx` (bukan inline) | Reusable, testable, satu seam satu concern |
| API `DataTableToolbar` tidak berubah | Backward-compat total; semua entity configs tidak tersentuh |
| Client-side filter (`cmdk` default) | Payload `/list` kecil + sudah di-cache; sesuai `### DataTable filtering` CONTEXT-MAP |
| `data-checked` (bukan `<Check />` manual) | Hormati pola existing `command.tsx`; hindari duplikasi ikon |

## Deferred

- Popover-anchored combobox (inline dropdown tanpa modal) — lebih UX-halus tapi perlu install Popover; bisa jadi follow-up jika CommandDialog terasa terlalu modal-heavy
