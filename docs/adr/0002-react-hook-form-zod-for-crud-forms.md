# 2. React Hook Form + Zod (via shadcn `<Field />`) untuk semua form CRUD Master

Date: 2026-07-06
Status: Accepted

## Konteks

Modul Master punya 17 entitas CRUD. Tiap entitas butuh form create/update dengan
validasi. shadcn (di atas Base UI, bukan Radix, untuk proyek ini) mendokumentasikan
beberapa cara menangani form, dan pilihan ini akan menentukan bentuk **setiap file form**
di aplikasi — jadi mahal untuk dibalik setelah 17 form ditulis.

Kandidat yang dipertimbangkan (docs shadcn v4, diambil via context7):

1. **React Hook Form (RHF) v7 + Zod** (`zodResolver`) — default historis shadcn.
   Uncontrolled/ref-based, ~9kB, v7 stabil bertahun-tahun, komunitas & contoh sangat besar.
2. **TanStack Form + Zod** — lebih baru, controlled, framework-agnostic, typesafety sangat
   baik. API `<field.Field>`/`Subscribe` lebih verbose, komunitas & materi belajar lebih kecil.
3. **Native `<form>` + Server Actions** (React 19 `action`/`useActionState`) — ~0kB tapi
   dirty/error/UX state dirakit tangan; rawan bug untuk CRUD berulang.
4. **shadcn `<Field />` sendiri** — di v4 ini murni lapisan *markup* aksesibel (label/error/a11y),
   sudah dipisah dari state library; bukan engine, dipasangkan dengan #1 atau #2.

Kriteria penentu dari manajer proyek: **paling stabil / minim bug, ringan, dan mudah
diimplementasi oleh junior dev** — DRY sekaligus KISS.

## Keputusan

Pakai **React Hook Form v7 + Zod (`zodResolver`)**, dirender lewat komponen shadcn
**`<Field />`** (kompatibel Base UI). Terapkan lewat **satu primitive `<CrudForm>`** yang
memegang semua boilerplate RHF; tiap entitas hanya menyuplai **skema Zod + daftar field**.

Alur baku: skema Zod per-entitas → `zodResolver` → RHF `useForm` → markup `<Field>` →
input/switch/combobox Base UI.

## Konsekuensi

**Positif.**
- Permukaan bug paling kecil: RHF v7 = default shadcn bertahun-tahun, jalur sudah terpetakan.
- Ringan: uncontrolled/ref-based, re-render minimal, ~9kB + satu peer `@hookform/resolvers`.
- Junior-friendly: pola `useForm({ resolver: zodResolver(schema) })` + `handleSubmit` ada di
  hampir semua contoh/SO; produktif hari pertama.
- DRY/KISS: `<CrudForm>` generik + 17 skema tipis; form berat (sanksi 8 switch, profesi FK)
  jadi sekadar deskriptor field, bukan logika bespoke.
- Skema Zod = satu sumber kebenaran validasi client, diselaraskan dengan OpenAPI backend.

**Negatif / trade-off yang diterima.**
- **TanStack Form ditolak meski lebih modern** — semata karena kendala junior-dev; RHF punya
  jaring pengaman dokumentasi/contoh yang lebih dalam. Jika komposisi tim berubah ke senior
  yang menuntut typesafety maksimal, keputusan ini boleh ditinjau ulang.
- Terikat pada RHF sebagai peer dependency di seluruh form.

**Tinjau ulang jika:** shadcn mengubah engine form default, RHF v8 membawa breaking change
besar, atau kebutuhan typesafety melampaui yang bisa diberikan zodResolver dengan nyaman.
