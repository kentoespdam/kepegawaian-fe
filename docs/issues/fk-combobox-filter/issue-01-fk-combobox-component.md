# Issue #01 — Buat Komponen `FKComboboxFilter`

**Area:** `src/components/fk-combobox-filter.tsx` (file baru)  
**Blok:** Atomic — tidak bergantung pada issue lain  
**Estimasi:** ~60 menit  
**Label:** `component`, `shadcn`, `ponytail`

---

## Konteks

DataTable toolbar saat ini menggunakan plain HTML `<select>` untuk filter FK (foreign key). Tidak ada kemampuan search/ketik-untuk-filter. Tugas ini membangun komponen pengganti yang searchable menggunakan `CommandDialog` shadcn yang sudah terinstall.

## Referensi Codebase

| File | Keterangan |
|------|------------|
| `src/components/ui/command.tsx` | ✅ Sudah ada — `CommandDialog`, `CommandInput`, `CommandList`, `CommandItem`, `CommandEmpty` |
| `src/components/ui/dialog.tsx` | ✅ Sudah ada — dipakai di dalam `CommandDialog` |
| `src/components/ui/button.tsx` | ✅ Sudah ada — untuk trigger button |
| `src/components/data-table-toolbar.tsx` | Target integrasi (issue #02) |

## Spesifikasi Komponen

### File target
```
src/components/fk-combobox-filter.tsx
```

### Props interface

```ts
interface FKComboboxFilterProps {
  /** Label yang ditampilkan di trigger dan header dialog */
  label: string;
  /** Daftar opsi dari fkOptions */
  options: { value: string; label: string }[];
  /** Nilai terpilih saat ini (id dari URL) — undefined/empty = "Semua" */
  value?: string;
  /** Dipanggil saat user memilih opsi */
  onChange: (value: string | undefined) => void;
}
```

### Behavior yang diharapkan

1. **Trigger button** — tampilkan teks `{label terpilih}` atau `Semua {label}` jika kosong. Gunakan ikon `ChevronsUpDown` di kanan.
2. **Klik trigger → buka `CommandDialog`** — judul dialog: `"Pilih {label}"`, description: `"Ketik untuk mencari..."` (sr-only).
3. **`CommandInput`** — `placeholder="Cari {label}..."` — built-in filtering oleh `cmdk` (client-side, cukup untuk opsi `/list`).
4. **`CommandList`** berisi:
   - Satu `CommandItem` value="" label="Semua {label}" (reset filter)
   - Satu `CommandItem` per opsi
5. **`CommandItem` yang terpilih** — tandai dengan `data-checked={value === opt.value}` agar built-in `CheckIcon` muncul (tidak perlu `<Check />` manual).
6. **onSelect** — panggil `onChange(selectedValue || undefined)`, lalu tutup dialog. Jika user memilih value yang sudah aktif → reset (toggle off → `onChange(undefined)`).
7. **`CommandEmpty`** — tampilkan `"Tidak ada hasil untuk pencarian ini."`.

### Sketsa implementasi

```tsx
"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface FKComboboxFilterProps {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string | undefined) => void;
}

export function FKComboboxFilter({ label, options, value, onChange }: FKComboboxFilterProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  function handleSelect(selected: string) {
    // Toggle off jika sama
    onChange(selected === value || selected === "" ? undefined : selected);
    setOpen(false);
  }

  return (
    <>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="h-11 min-w-[160px] max-w-[220px] justify-between font-normal text-sm"
        onClick={() => setOpen(true)}
      >
        <span className="truncate">{selectedLabel ?? `Semua ${label}`}</span>
        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={`Pilih ${label}`}
        description={`Ketik untuk mencari ${label.toLowerCase()}...`}
      >
        <CommandInput placeholder={`Cari ${label.toLowerCase()}...`} />
        <CommandList>
          <CommandEmpty>Tidak ada hasil untuk pencarian ini.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              value=""
              data-checked={!value}
              onSelect={() => handleSelect("")}
            >
              Semua {label}
            </CommandItem>
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                value={opt.value}
                data-checked={opt.value === value}
                onSelect={handleSelect}
              >
                {opt.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
```

> **Ponytail note:** Tidak perlu `<Check />` manual — `CommandItem` di repo ini sudah punya built-in `CheckIcon` yang muncul via `data-checked`. Tidak perlu install Popover. Tidak perlu state tambahan.

## Checklist Pengerjaan

- [ ] Buat file `src/components/fk-combobox-filter.tsx`
- [ ] Props interface sesuai spesifikasi di atas
- [ ] Trigger button: tampil label terpilih / fallback "Semua {label}"
- [ ] CommandDialog terbuka saat trigger diklik
- [ ] CommandInput dengan placeholder yang benar
- [ ] CommandItem "Semua {label}" sebagai opsi reset
- [ ] Semua opsi tampil dari `props.options`
- [ ] `data-checked` terpasang pada item aktif (built-in CheckIcon muncul)
- [ ] `onSelect` toggle off jika item yang sama diklik ulang
- [ ] `CommandEmpty` tampil jika pencarian tidak cocok
- [ ] Dialog tertutup setelah pilih
- [ ] TypeScript: tidak ada `any`, tidak ada error
- [ ] Tidak ada dependensi baru (hanya gunakan yang sudah ada)

## Kriteria Selesai (DoD)

- File `src/components/fk-combobox-filter.tsx` ada dan di-export dengan benar
- `FKComboboxFilter` dapat di-render tanpa error di halaman mana pun
- Build `next build` / `tsc --noEmit` tetap bersih
- Issue #02 dapat langsung menggunakan komponen ini
