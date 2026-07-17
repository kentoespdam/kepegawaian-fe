# Issue #02 — Ganti `<select>` di `DataTableToolbar` dengan `FKComboboxFilter`

**Area:** `src/components/data-table-toolbar.tsx` (edit)  
**Blok:** Bergantung pada Issue #01 (harus selesai lebih dulu)  
**Estimasi:** ~30 menit  
**Label:** `refactor`, `toolbar`, `ponytail`

---

## Konteks

Setelah `FKComboboxFilter` siap (Issue #01), langkah ini mengganti rendering `<select>` HTML di `DataTableToolbar` dengan komponen baru tersebut. API publik toolbar **tidak berubah** — ini adalah internal swap murni.

## File yang Diubah

| File | Tipe perubahan |
|------|---------------|
| `src/components/data-table-toolbar.tsx` | MODIFY |

Tidak ada file lain yang diubah. Semua entity configs (`grade.config.ts`, `profesi.config.ts`, dll.) tetap tidak tersentuh — mereka tetap menyuplai `fkSources` dan `fkOptions` dengan cara yang sama.

## Perubahan yang Dibutuhkan

### Tambah import

```tsx
import { FKComboboxFilter } from "@/components/fk-combobox-filter";
```

### Ganti blok `<select>`

**Sebelum:**
```tsx
{fkSources?.map((fk) => (
  <select
    key={fk.field}
    value={values[fk.field] ?? ""}
    onChange={(e) => onFilterChange?.(fk.field, e.target.value || undefined)}
    className="h-11 max-w-50 rounded-lg border border-input bg-transparent pl-3 pr-8 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
  >
    <option value="">Semua {fk.label}</option>
    {(fkOptions?.[fk.field] ?? []).map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
))}
```

**Sesudah:**
```tsx
{fkSources?.map((fk) => (
  <FKComboboxFilter
    key={fk.field}
    label={fk.label}
    options={fkOptions?.[fk.field] ?? []}
    value={values[fk.field]}
    onChange={(v) => onFilterChange?.(fk.field, v)}
  />
))}
```

> **Diff bersih:** hapus 12 baris `<select>`, tambah 8 baris `<FKComboboxFilter>`. Net -4 baris. Tidak ada logika baru.

## Props DataTableToolbar — Tidak Ada Perubahan

Interface `DataTableToolbarProps` tetap identik:
```ts
fkSources?: FKSource[]
fkOptions?: Record<string, { value: string; label: string }[]>
values?: Record<string, string>
onFilterChange?: (name: string, value: string | undefined) => void
```

Tidak ada breaking change untuk entitas manapun yang menggunakan `DataTableToolbar`.

## Checklist Pengerjaan

- [x] Issue #01 sudah selesai (komponen `FKComboboxFilter` tersedia)
- [x] Tambah import `FKComboboxFilter` di `data-table-toolbar.tsx`
- [x] Ganti blok `<select>` dengan `<FKComboboxFilter>`
- [x] Pastikan props mapping benar: `label`, `options`, `value`, `onChange`
- [x] Hapus CSS class lama `<select>` (tidak diperlukan lagi)
- [x] `DataTableToolbarProps` interface tidak diubah
- [x] Tidak ada import tak terpakai tertinggal
- [x] TypeScript bersih (`tsc --noEmit`)

## Verifikasi Manual

Setelah selesai, cek di browser untuk minimal 3 entitas berikut:

| Entitas | Filter FK | Yang perlu dicek |
|---------|-----------|------------------|
| **Grade** | Level (1 filter) | Trigger tampil "Semua Level", CommandDialog terbuka, bisa search, pilih item → URL berubah `?levelId=X` |
| **Profesi** | Organisasi + Jabatan + Grade (3 filter) | Tiga trigger button tampil berdampingan tanpa overflow |
| **Alat Kerja** | Profesi (1 filter, tanpa searchField) | Toolbar hanya tampil 1 filter button |
| **Sanksi** | Jenis SP (1 filter + 2 text inputs) | Combobox dan text input hidup berdampingan |

## Kriteria Selesai (DoD)

- Build bersih (`tsc --noEmit`, tidak ada error TypeScript)
- Tidak ada regresi: entitas yang sebelumnya bekerja tetap bekerja
- Filter FK dari URL tetap terbaca dan ditampilkan dengan benar di trigger button (reload halaman dengan `?levelId=42` → button tampil "Level X", bukan "Semua Level")
- Paginasi reset ke page 1 saat filter diubah (sudah ditangani oleh `onFilterChange` yang ada — tidak perlu logika baru)
