# Form Engine — RHF + Zod via `<CrudForm>`

> **Muat modul ini untuk:** kerja form CRUD apa pun (Dialog/Sheet), `<CrudForm>`, validasi Zod,
> field sanksi/profesi, visual grammar form. Berisi §10 (termasuk heavy-form §10.4).
> **Sumber:** CONTEXT §Form engine/§CRUD form presentation/§Heavy-form + ADR 0002.

---

## 10. Form engine — RHF + Zod via `<CrudForm>` (ADR 0002, CONTEXT §Form engine / §CRUD form presentation)

Semua form CRUD Master = **RHF v7 + Zod** (`zodResolver`) via shadcn **`<Field />`**
(di v4 `<Field />` = lapisan markup a11y, terpisah dari state lib → kompatibel Base UI).

- **DRY:** satu primitive **`<CrudForm>`** pegang seluruh boilerplate RHF (wiring resolver,
  submit, pemetaan error backend, `isSubmitting`). Tiap entitas suplai **skema Zod + daftar field**.
- **KISS:** field sanksi (8 switch) & profesi (FK) = deskriptor field, bukan form khusus.
- **Alur:** skema Zod per-entitas → `zodResolver` → RHF `useForm` → markup `<Field>` →
  input/switch/combobox Base UI.
- Skema Zod = satu sumber kebenaran validasi client; **selaras** dengan
  `required`/`minLength`/`minimum` OpenAPI Backend tiap entitas.
- **⚠️ Batasan `<CrudForm>`:** Primitive ini berbasis `fields[]` flat — tidak mendukung
  **conditional sections** (sembunyikan/tampilkan grup field), **FK cascade** (filter child by parent),
  atau **`superRefine` kondisional** (validasi berubah by field value). Form dengan kebutuhan tersebut
  boleh menggunakan pola custom (contoh: `profesi/form.tsx`, `tambah-form.tsx`) — Field* renderer
  lokal + RHF langsung. Ini **deviasi sadar** dari aturan "pakai CrudForm", didokumentasikan di
  coding-rules §8 dan di CLAIM-ORDER masing-masing.

### 10.5 Struktur file form kompleks

Form kompleks (28+ field, conditional sections, FK cascade) WAJIB dipecah mengikuti §1 max ~120 baris:

| File | Isi |
|---|---|
| `schema.ts` | Zod schema + `superRefine` + `FormValues` type |
| `field-renderers.tsx` | Field* sub-komponen (FieldText, FieldSelect, FieldFk, dll) |
| `hooks.ts` | Custom hooks (useFkOptions, dll) |
| `constants.ts` | Enum options hand-authored *(opsional — hanya bila perlu)* |
| `{form-name}.tsx` | Komponen form utama + imports |

Pola ini mengikuti precedent `profesi/form.tsx` yang meletakkan semua logika di satu file karena
formnya lebih kecil (<20 field). Bila form melebihi ~200 baris, WAJIB terapkan struktur di atas
(atau subhimpunan file yang relevan — `constants.ts` hanya diperlukan untuk enum hand-authored
spesifik form).

### 10.1 Presentasi container — Dialog default, Sheet untuk form berat

- **Dialog** = mayoritas form pendek (2–6 field: golongan, level, dll) — cepat, tabel tetap terlihat.
- **Sheet** (right drawer, ~480px) = form berat (**sanksi** ~12 field, **profesi** 6+FK).
- Keduanya = `<CrudForm>` sama, container beda.

### 10.2 Aturan performa (WAJIB)

- Container di-mount **sekali di level halaman**; open-state + row aktif diangkat ke halaman
  (`editing` state) — **JANGAN** satu `<Dialog>`/`<Sheet>` per baris. Aksi baris hanya panggil
  `setEditing(row)`.
- Base UI Dialog/Sheet content **lazy by default** (tak di DOM sampai `open`; `keepMounted`
  default `false`, bukan `forceMount` Radix) → idle cost ≈ 0.
- FK dropdown `/list` fetch saat **form-open**, bukan saat render tabel → buka halaman Master =
  satu GET terpaginasi.

### 10.3 Visual grammar (TERKUNCI)

- **Single column, label-on-top** (jangan label inline kiri) — paling terbaca lansia, identik
  mobile/desktop.
- Field besar (aksesibilitas): tinggi input ≥44px, label ≥15px, focus ring jelas.
- **Footer aksi pinned:** sekunder **Batal** kiri, primer **Simpan** (Tirta Blue, teks putih)
  kanan; di Sheet berat footer **sticky** (Simpan selalu terjangkau).
- Submit → tombol loading (spinner + "Menyimpan…") + disable (cegah double-submit).
- **Error inline di dalam form** (Zod field error di bawah field; error submit-level di atas
  footer) — JANGAN toast untuk validasi.
- Rejected: two-column & horizontal-label (zigzag eye-path / pola mobile ganda).

### 10.6 Lampiran components — reusable attachment management

**Tambahan 2026-07-29.** Dua komponen shared primitive untuk lampiran/attachment:

| Komponen | File | Fungsi |
|----------|------|--------|
| `LampiranCard` | `src/components/lampiran-card.tsx` | Card dengan tabel lampiran + upload modal + viewer + delete |
| `LampiranUploadModal` | `src/components/lampiran-upload-modal.tsx` | Modal upload form (file + keterangan) |

#### LampiranCard — full attachment card

Komponen yang mencakup: header (judul + tombol Unggah), tabel daftar lampiran (No, File, Keterangan, Aksi), upload modal, viewer modal (pdf/image), dan confirm delete dialog.

```tsx
interface LampiranCardProps {
  title?: string;              // Judul header, default "Lampiran"
  ref: string;                  // Entity ref type (e.g. "SK_MUTASI", "PROFIL_PENDIDIKAN")
  refId: string | number;       // Entity ref ID
  queryKey: readonly string[];  // Query key prefix
  listUrl: string;              // GET daftar lampiran
  uploadUrl: string;            // POST upload (FormData)
  deleteUrl: (id) => string;    // Builder URL DELETE
  viewUrl: (id) => string;      // Builder URL view file
  itemLabel?: string;           // Label delete confirm, default "lampiran"
  hideUpload?: boolean;         // Sembunyikan tombol upload
}
```

Contoh pemakaian (modul kepegawaian):
```tsx
<LampiranCard
  title="Lampiran — SK Mutasi"
  ref="SK_MUTASI"
  refId={mutasiId}
  queryKey={["lampiran"]}
  listUrl={`/api/proxy/kepegawaian/lampiran/list/SK_MUTASI/${mutasiId}`}
  uploadUrl="/api/proxy/kepegawaian/lampiran"
  deleteUrl={(id) => `/api/proxy/kepegawaian/lampiran/SK_MUTASI/${mutasiId}/${id}`}
  viewUrl={(id) => `/api/proxy/kepegawaian/lampiran/file/SK_MUTASI/${id}`}
/>
```

**Aturan:**
- `queryKey` dipakai sebagai prefix — queryKey final = `[...queryKey, ref, refId]`. Pastikan `LampiranUploadModal` menerima `queryKey` yang sama agar invalidasi setelah upload bekerja.
- `listUrl` harus mengembalikan envelope `{ data: Array<{id, fileName, mimeType, notes}> }`.
- `viewUrl` hanya dipakai untuk pdf/image (render via iframe/img). Non-pdf/image langsung di-download via `window.open`.
- `uploadUrl` menerima POST FormData dengan fields: `ref`, `refId`, `fileName` (file binary), `notes` (opsional).
- **Jangan set Content-Type header** pada upload — biarkan browser set multipart boundary.

#### LampiranUploadModal — upload form modal

Komponen mandiri yang bisa dipakai tanpa `LampiranCard` bila hanya perlu upload:

```tsx
interface LampiranUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ref: string;
  refId: string | number;
  queryKey: readonly string[];
  uploadUrl: string;
  title?: string;  // default "Unggah Lampiran"
}
```

Setelah upload sukses: invalidate query → reset form → tutup modal.

**Query key consistency:** `LampiranCard` dan `LampiranUploadModal` sama-sama menggunakan `[...queryKey, ref, refId]` untuk fetch dan invalidasi. Pastikan `queryKey` yang diberikan ke kedua komponen identik.

### 10.3b-1 Enum field — label display via SelectValue render-prop

**Tambahan 2026-07-28.** Base UI `<SelectValue>` di shadcn (varian Base UI) tidak otomatis
menampilkan `children` dari `<SelectItem>` yang cocok — ia merender **raw value** yang sedang
terpilih. Berbeda dengan Radix UI.

**Fix:** Gunakan Base UI render-prop pattern pada `<SelectValue>`:
```tsx
<SelectValue placeholder={`Pilih ${field.label.toLowerCase()}`}>
  {(value: string | null) => {
    const opt = field.options?.find((o) => o.value === value);
    return opt?.label ?? value ?? "";
  }}
</SelectValue>
```
Ini memastikan trigger menampilkan **label** (e.g. `"Laki-laki"`) bukan value (`"LAKI_LAKI"`).

**API label vs value mismatch.** Bila endpoint API mengembalikan label display (e.g. `"Laki-laki"`)
bukan enum value (`"LAKI_LAKI"`), gunakan helper `enumValueFromLabel()` untuk konversi sebelum
memasukkan ke `defaultValues`:
```tsx
function enumValueFromLabel(
  label: string | undefined | null,
  options: readonly { value: string; label: string }[],
): string {
  if (!label) return "";
  return options.find((o) => o.label === label)?.value ?? label;
}
```

**Aturan:** Setiap field enum dari endpoint dashboard WAJIB pake `enumValueFromLabel()` sebelum
`defaultValues`. Saat ini diterapkan di `section-left-panel.tsx` untuk `jenisKelamin`, `agama`,
`statusKawin`.

### 10.3c FK field = `<FKCombobox>` searchable, enum = `<Select>` (grill 2026-07-21, epic `31p`)

FK dengan data panjang (organisasi, jabatan, grade) dirender sebagai **`<FKCombobox>`** —
CommandDialog + search (pola sama `fk-combobox-filter.tsx` di toolbar, tapi komponen **terpisah**:
form = nilai tunggal wajib, tanpa item "Semua"). **Enum** (`type:"select"` dengan `options`
**hard-coded di config**, mis. kategori/level) **tetap `<Select>`** — tak kena "pajak" buka dialog.

- **Beda FK vs enum ditentukan oleh asal `options`, bukan jumlahnya.** `useMasterTable.formFields`
  menandai field jadi `type:"combobox"` **saat meng-inject** options FK (`fkSources`/`treeField`).
  Enum yang sudah bawa `options` di config tak tersentuh → tetap `select`. **JANGAN** threshold
  `options.length` (angka ajaib).
- Search **client-side** (options sudah eager-loaded di `fkLookup`); server-search **defer** sampai
  `/list` terbukti berat.
- **Cascade** (mis. jabatan difilter organisasi di form profesi): FKCombobox `disabled` sampai
  parent terisi; reset child **hanya saat user mengubah** parent (bukan saat load edit); saat edit,
  nilai lama yang tak match filter **tetap ditampilkan** (jangan hapus diam-diam).

**Trigger & perilaku (polish, bug `w96`).** FKCombobox ≠ FKComboboxFilter (toolbar) — 3 aturan
form yang **tidak boleh** dicontek dari toolbar:

- **Trigger = tampak text input**, bukan tombol solid. Match `input.tsx`: `bg-transparent
  border-input` (placeholder `text-muted-foreground`), **jangan** biarkan fill `variant="outline"`
  Button — itu terkesan *disabled button*. Tetap `h-11` + `aria-invalid`.
- **Dialog punya close button** (`<CommandDialog showCloseButton>`) — user harus bisa menutup tanpa
  memilih opsi. Prop sudah ada di `command.tsx`; cukup diteruskan.
- **Tanpa toggle-off.** Klik item yang sudah terpilih → **tetap terpilih**, dialog tutup. Form =
  single-**required**; meng-uncheck jadi kosong itu bug. (Toggle-off hanya sah di *filter* toolbar
  yang bisa di-clear via "Semua".)

### 10.3c FK autoselect saat edit — defaultValues WAJIB scalar id string (bug `9x2`)

Combobox pre-select saat edit **hanya jalan bila `defaultValues` menyuplai id skalar yang
string-comparable dengan option `value`**. `<FKCombobox>` mencocokkan `String(o.value) === String(value)`
— jadi value harus id mentah (`"12"`), **bukan** nested object dan **bukan** `undefined`.

**Root cause bug `9x2`.** Response list/detail membawa FK sebagai **nested MiniResponse**
(`organisasi`, `jabatan`, `grade`, `level`, `parent`, `jenisSp` = `{id,nama}`); scalar `*Id` **hanya
ada** di `*SearchParams`/`*PostRequest`/`*PutRequest`, **tidak** di row list. Kalau `defaultValues`
mengoper row mentah apa adanya: nested object → `String({…})` = `"[object Object]"` (tak match), atau
scalar `*Id` absen → `undefined` (kosong). Text field terisi karena bukan FK. Komponen benar; ini
**caller data-shape**.

**Aturan (semua form ber-FK/tree).** Sebelum masuk `defaultValues`, normalkan tiap combobox field →
id skalar string:

```
String(editing[nestedKey]?.id ?? editing[field] ?? "") || undefined
```

- Peta nested key: `xxxId → xxx` (`organisasiId→organisasi`, `levelId→level`, `jabatanId→jabatan`,
  `gradeId→grade`, `jenisSpId→jenisSp`). Tree: **hati-hati asimetri** — `treeField:"parent"` (organisasi,
  object) vs `treeField:"parentId"` (jabatan, scalar). Baca `.id` bila objek, pakai apa adanya bila scalar.
- **Create mode** (`editing == null`) → semua combobox `undefined` (placeholder, tak ada yang ter-check).
- **Submit tak boleh regresi**: value combobox = string; saat kirim, coerce balik ke `*Id` number
  (`Number(v)||undefined`) — pola `profesi-form.tsx` `onChange` sudah benar.

**Tiga site fix** (lihat `9x2` & CLAIM-ORDER): (1) generic — derive `formDefaults` terpusat di
`useMasterTable`, alirkan ke `CrudForm defaultValues` (bukan `editing` mentah); (2) `profesiDefaults`;
(3) `sanksiDefaults`. **JANGAN** utak-atik `fk-combobox.tsx` — perbaikannya di sisi data, bukan komponen.

### 10.4 Heavy-form layout — labeled sections + switch list (CONTEXT §Heavy-form)

Dua entitas berat di **Sheet** (~480px), tersusun **labeled sections**, bukan dump field datar.

**`sanksi`** (3 core + 8 boolean + 1 conditional int):
- **Section "IDENTITAS"** → `kode`, `keterangan`, `jenisSpId` (combobox). **Required:** ketiganya.
- **Section "KONSEKUENSI SANKSI"** → 8 boolean sebagai **switch list** (Base UI Switch, satu
  efek kebijakan per baris), tiap-tiap **label bahasa manusia** (BUKAN nama field mentah):

  | Field | Label |
  |---|---|
  | `potTkk` | Potong TKK |
  | `isPendingPangkat` | Tunda kenaikan pangkat |
  | `isPendingGaji` | Tunda kenaikan gaji berkala |
  | `isTurunPangkat` | Turunkan pangkat |
  | `isTurunJabatan` | Turunkan jabatan |
  | `isSuspension` | Skorsing (suspension) |
  | `isTerminateDh` | PHK dengan hormat |
  | `isTerminateTh` | PHK tidak dengan hormat |

- **`jmlPotTkk` conditional** — tersembunyi sampai `potTkk` ON (tanpa field disabled mati di
  layout); muncul **indented** di bawah baris "Potong TKK". Kolom angka → `tabular-nums`.
- Semua flag default `false`.

**`profesi`** (grammar dua-section sama):
- **Section "IDENTITAS"** → `nama` + `organisasiId`/`jabatanId`/`gradeId` (combobox, semua FK opsional).
- **Section "DETAIL"** → `detail`, `resiko` sebagai `<textarea>` multi-line.
- **Required (Backend):** `nama`, `detail`, `resiko`.

**Aturan:** switch (bukan checkbox) untuk on/off independen; tiap flag berlabel manusia; kedua
form berat berbagi satu grammar (learn-once). Entitas sederhana tetap Dialog single-column
default — sectioning HANYA untuk dua ini.
