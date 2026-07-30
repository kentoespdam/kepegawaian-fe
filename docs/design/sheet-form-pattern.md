# Sheet Form Pattern — Section Grouping + Visual Hierarchy

> **Muat modul ini untuk:** membuat/merevisi form di Sheet (right drawer) yang rapi, konsisten,
> dan follow bestpractice UI/UX. Pattern ini tervalidasi di `kontrak-form-sheet.tsx` dan
> bisa diterapkan ke form lain (SK, Mutasi, dll.).

---

## 1. Struktur Sheet

```
┌──────────────────────────────┐
│ SheetHeader                  │  ← p-4 (otomatis dari shadcn)
│   SheetTitle                 │
├──────────────────────────────┤  ← <Separator />
│                              │
│  ┌─ form ─────────────────┐  │
│  │ SectionLabel            │  │
│  │ [fields...]             │  │
│  │ <Separator />           │  │
│  │ SectionLabel            │  │
│  │ [fields...]             │  │
│  │ <Separator />           │  │
│  │ SectionLabel            │  │
│  │ [fields...]             │  │
│  │ [footer: Batal + Simpan]│  │
│  └────────────────────────┘  │
│                              │
└──────────────────────────────┘
```

**Key points:**
- `<Separator />` antara `SheetHeader` dan `form` — visual break wajib
- Form wrapper: `className="px-4 sm:px-6 pb-4 space-y-3.5"` — responsive: 16px mobile, 24px desktop (Material Design)
- Section groupings dipisah `<Separator />` + `SectionLabel`
- `SheetContent` harus pakai `sm:max-w-xl overflow-y-auto` — lebar konsisten + scroll untuk form panjang

> **Catatan lebar:** `sm:max-w-xl` = 576px di viewport ≥640px. Ukuran ini membatasi form
> agar tidak terlalu lebar di desktop, sekaligus cukup legible untuk 2-kolom grid.

> **Rekonsiliasi dengan forms.md §10.3:** `forms.md` menetapkan "single column, label-on-top"
> dan "rejected: two-column". Pattern ini menggunakan **2-kolom grid HANYA untuk field bersaudara**
> yang maknanya berdekatan (NIPAM+Nama, tanggal mulai+selesai). Full multi-column layout
> tetap ditolak. 2-kolom grid = deviasi terkontrol, bukan pelanggaran.

---

## 2. Komponen

### 2.1 SectionLabel (inline, jangan extract kecuali dipakai ≥3 form)

```tsx
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}
```

**Kapan extract ke shared:** saat 3+ form sheets pakai pola yang sama. Saat ini cukup inline.

### 2.2 Separator

```tsx
import { Separator } from "@/components/ui/separator";
```

Gunakan `<Separator />` tanpa props — cukup satu baris.

---

## 3. Spacing Rules

| Context | Class | Keterangan |
|---------|-------|------------|
| Form wrapper | `space-y-3.5` | Gap antar field/section (14px) — compact tapi legible |
| Form top margin | ❌ tidak ada | `<Separator />` sudah handle gap dari header |
| Grid gap | `gap-3` | Antara kolom di grid (12px) |
| Section → field | `space-y-3.5` | Inherit dari form wrapper |
| Footer buttons | `pt-1` | Spacing tipis sebelum tombol aksi |
| Sheet padding | `px-4 sm:px-6 pb-4` | 16px mobile, 24px desktop — responsive, sesuai Material Design |

**JANGAN pakai `space-y-5`** (20px) — terlalu longgar untuk form密集. `space-y-3.5` sweet spot.

---

## 4. Grid Layout Patterns

### 4.1 Dua field bersaudara (NIPAM + Nama, Golongan + Gaji)

```tsx
<div className="grid grid-cols-2 gap-3">
  <FieldText label="Field 1" ... />
  <FieldText label="Field 2" ... />
</div>
```

### 4.2 Dua tanggal (Tgl. SK + Mulai) + Selesai full-width

```tsx
<div className="grid grid-cols-2 gap-3">
  <FieldText label="Tgl. SK" type="date" ... />
  <FieldText label="Mulai" type="date" ... />
</div>
<FieldText label="Selesai" type="date" ... />
```

**Mengapa bukan 3-col?** Sheet width `sm:max-w-xl` (576px) — 3 date pickers side-by-side terlalu padat.

### 4.3 Conditional field (Golongan)

```tsx
{showGolongan && (
  <FieldFk label="Golongan" ... />
)}
<FieldText label="Gaji Pokok" ... />  {/* full-width, bukan grid */}
```

**Rule:** Conditional field = full-width standalone, **JANGAN** dalam grid dengan placeholder `<div />`. Grid placeholder bikin layout "jump" saat field hide/show.

---

## 5. Conditional Field Pattern

### 5.1 Derived state

```tsx
const showGolongan = !editingId && watch("jenisKontrak") === "PENGANGKATAN";
```

### 5.2 Clear hidden field via useEffect (bukan inline setValue di render)

```tsx
useEffect(() => {
  if (!showGolongan) setValue("golonganId", "");
}, [showGolongan, setValue]);
```

**Anti-pattern:** `if (!showGolongan) setValue(...)` di dalam render body → React anti-pattern, bisa cause re-render loops.

### 5.3 Gate payload on submit

```tsx
if (showGolongan && values.golonganId) {
  payload.golonganId = Number(values.golonganId);
}
```

---

## 6. Zod Schema — Conditional Required

Saat field hidden di kondisi tertentu, buat optional di schema:

```tsx
const schema = z.object({
  // Required always
  jenisKontrak: z.string().min(1, "Jenis aksi wajib"),
  nipam: z.string().min(1, "NIPAM wajib"),
  
  // Conditional — optional in schema, required only in certain modes
  golonganId: z.string().optional(),
});
```

**Jangan** pakai `superRefine` untuk conditional required di form sederhana — cukup optional + gate di submit.

---

## 7. Template — Copy-Paste Ready

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FieldText, FieldSelect, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// ── Schema ──
const schema = z.object({
  field1: z.string().min(1, "Wajib"),
  field2: z.string().min(1, "Wajib"),
  field3: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

// ── Section label (inline) ──
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}

// ── Component ──
interface Props {
  editingId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExampleFormSheet({ editingId, isOpen, onClose }: Props) {
  const {
    setValue,
    watch,
    handleSubmit: rhfSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // ... fetch POST/PUT ...
      toast.success("Berhasil disimpan");
      onClose();
    } catch (e: unknown) {
      setError("root", {
        message: e instanceof Error ? e.message : "Terjadi kesalahan",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(v) => { if (!v) onClose(); }}>
      <SheetContent className="sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{editingId ? "Edit" : "Tambah"} Contoh</SheetTitle>
        </SheetHeader>

        <Separator />

        <form onSubmit={rhfSubmit(onSubmit)} className="px-4 sm:px-6 pb-4 space-y-3.5">
          {errors.root && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errors.root.message}
            </div>
          )}

          {/* ── Section 1 ── */}
          <SectionLabel>Data Utama</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            <FieldText label="Field 1" value={watch("field1")} onChange={(v) => setValue("field1", v)} required error={errors.field1?.message} />
            <FieldText label="Field 2" value={watch("field2")} onChange={(v) => setValue("field2", v)} required error={errors.field2?.message} />
          </div>

          <Separator />

          {/* ── Section 2 ── */}
          <SectionLabel>Detail</SectionLabel>
          <FieldText label="Field 3" value={watch("field3")} onChange={(v) => setValue("field3", v)} error={errors.field3?.message} />

          <Separator />

          {/* ── Section 3 ── */}
          <SectionLabel>Catatan</SectionLabel>
          <FieldTextarea label="Notes" value={watch("notes")} onChange={(v) => setValue("notes", v)} />

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Menyimpan..." : "Simpan"}</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
```

---

## 8. Checklist — Sebelum Ship Form Sheet

- [ ] `SheetContent` punya `sm:max-w-xl overflow-y-auto`
- [ ] `<Separator />` antara `SheetHeader` dan `form`
- [ ] Form wrapper punya `px-4 sm:px-6 pb-4 space-y-3.5` (responsive: 16px mobile, 24px desktop)
- [ ] Section grouping pakai `SectionLabel` + `<Separator />`
- [ ] Grid max 2 kolom (3-col hanya untuk 3+ field sejenis yang legible)
- [ ] Conditional field full-width, tanpa `<div />` placeholder di grid
- [ ] `useEffect` untuk clear hidden field (bukan inline `setValue` di render)
- [ ] Schema: field conditional = `.optional()`
- [ ] Footer: Batal (outline) kiri, Simpan (primary) kanan
- [ ] Submit button: `disabled={isSubmitting}` + label "Menyimpan..."
- [ ] Error inline di form (bukan toast)
- [ ] Aksesibilitas (visual-foundation §2): input ≥44px, font ≥16px, focus ring jelas

---

## 9. Anti-Patterns

| ❌ Jangan | ✅ Seharusnya |
|-----------|--------------|
| `space-y-5` (terlalu longgar) | `space-y-3.5` (compact, 14px) |
| 3-col grid untuk date pickers | 2-col + full-width (Sheet tidak cukup lebar) |
| `<div />` placeholder saat conditional field hidden | Full-width standalone fields |
| `setValue` inline di render body | `useEffect` dengan dependency |
| Field tanpa padding → nempel ke sheet edge | `px-4 sm:px-6 pb-4` pada form wrapper (responsive) |
| Header langsung ke form tanpa pemisah | `<Separator />` antara header dan form |
| Form fields semua flat tanpa grouping | `SectionLabel` + `<Separator />` untuk hierarki |
