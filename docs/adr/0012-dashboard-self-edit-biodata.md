# 12. Dashboard Pegawai: edit biodata self-service (buka kunci READ-ONLY)

Date: 2026-07-27
Status: Accepted
Supersedes: sebagian [ADR-0011](0011-dashboard-two-panel-accordion.md) (baris "Read-only tetap; tak ada edit self-service") + §Page 1 [context/kepegawaian.md](../context/kepegawaian.md) label "(READ-ONLY)".

## Konteks

Dashboard Pegawai (ADR-0011, 2 panel + accordion) di-*ship* **read-only**: §Page 1 mengunci
"endpoint edit … **tidak** dipasang; menyusul setelah **RBAC self-service dirancang**". Alasan
penundaan waktu itu = menghindari alur approval `profil-update` + `PATCH /pegawai/{id}/profil`/`/gaji`
yang berat sebelum model RBAC jelas.

User kini minta fitur sempit: **tombol "Edit Profil" di accordion "Data Pribadi"** yang memanggil
`PATCH /profil/biodata/{id}` (`{id}` = `nik`). Tiga batasan dari user mempersempitnya:

1. **Self-edit saja** — "mengedit biodatanya sendiri (session login), tidak dapat mengedit biodata
   orang lain."
2. **NIK read-only** — "hanya admin yang bisa edit nik, karena nik ini berguna sebagai ID di BE."
3. **Pendidikan Terakhir dikecualikan** — "akan di-update melalui tambah pendidikan di menu
   kepegawaian nanti (belum dibuat)." Plus: **tampilkan Ibu Kandung & Telp** di read view.

## Keputusan

**Buka kunci READ-ONLY untuk satu endpoint saja: `PATCH /profil/biodata/{nik}` (biodata diri).**
Bukan membuka alur approval `profil-update` yang jadi alasan penundaan awal.

**Kenapa prasyarat "RBAC self-service dirancang" TIDAK lagi jadi blocker:** Dashboard **selalu**
ter-scope ke sesi login (`getPegawaiSession()` → `$id`/`nik` dari sesi Appwrite, ADR-0006). Mutasi
memakai `nik` **sesi**, bukan `nik` dari input user → secara desain tak mungkin mengedit biodata
orang lain. Identity-gate ini **menggantikan** kebutuhan RBAC berlapis untuk scope sempit ini. RBAC
tetap relevan bila nanti ada edit **lintas-pegawai** (HR mengedit pegawai lain) — itu di luar scope.

**7 keputusan terkunci (hasil grilling):**

1. **Self-edit, identity-gated, tanpa approval.** `nik` diambil dari sesi (prop `nik` yang sudah ada
   di `SectionLeftPanel`), bukan editable. Langsung `PATCH`, tak ada state approval.
2. **9 field editable** = tepat `BiodataPatchRequest`: `nama`, `alamat`, `jenisKelamin`,
   `tempatLahir`, `tanggalLahir`, `agama`, `statusKawin`, `ibuKandung`, `telp`.
3. **NIK read-only** — ditampilkan `disabled` di form (admin-only = ID BE). Bukan bagian
   `BiodataPatchRequest` → memang tak PATCHable.
4. **Pendidikan Terakhir dikecualikan** dari form (di-update via menu "tambah pendidikan" nanti).
   Tetap tampil read-only di read view (sudah ada).
5. **UI = Dialog + reuse `CrudForm`.** Bukan komponen form baru — `CrudForm` (react-hook-form +
   zodResolver) sudah dipakai 19 konsumen master.
6. **Mutasi = hook bespoke `useBiodataMutation(nik)`** — `api` client (`src/lib/api/client.ts`)
   `BASE = /api/proxy/master` → tak bisa layani `/profil/biodata`. Pola `useChangePassword.ts`:
   `useMutation` + raw `fetch` PATCH `/api/proxy/profil/biodata/${nik}`, error-envelope,
   `onSuccess` → `invalidateQueries({ queryKey: ["/api/proxy/profil/biodata", nik] })` + `toast` +
   tutup dialog. Optimistic update **ditolak** (YAGNI).
7. **Validasi zod: hanya `nama` wajib.** `telp` format-check bila diisi; sisanya optional.

**Alternatif yang ditolak:**

- *Alur approval `profil-update` + `PATCH /pegawai/{id}/profil`.* Ditolak — berat, itu justru yang
  ditunda ADR-0011; scope user jauh lebih sempit (biodata diri langsung).
- *Komponen form biodata baru.* Ditolak — `CrudForm` sudah cukup; hanya kurang satu tipe field.
- *Inline-edit per-field di read view.* Ditolak — dialog form lebih jelas batas "edit vs baca",
  konsisten dengan pola master.
- *Optimistic update.* Ditolak — YAGNI; invalidate + refetch cukup untuk 1 form kecil.

## Konsekuensi

**Positif.**
- Fitur yang diminta terkirim tanpa membangun RBAC/approval yang belum diperlukan.
- Reuse `CrudForm` → nol form baru; konsisten UX dengan halaman master.
- Aman by-design: `nik` sesi, tak bisa edit pegawai lain.

**Negatif / trade-off yang diterima.**
- **`CrudForm` disentuh** — perlu tambah `"date"` ke union `FormField.type` (untuk `tanggalLahir`).
  `CrudForm` = **CRITICAL (19 konsumen: seluruh page master + profesi)**. Mitigasi: perubahan
  **additive-only** — tambah anggota union + native `<input type="date">` (sudah diteruskan
  `<Input type={field.type ?? "text"}>`). **Cabang render existing tak diubah** → 19 konsumen
  preservasi perilaku. Pola sama dengan `bare` prop `DataTable` (ADR-0011 §round 4).
- **NIK admin-edit belum ada** — hanya read-only di form ini. Edit NIK oleh admin = fitur terpisah
  di luar scope.
- **Foto profil masih read-only** (ADR-0011) — alur upload tetap menyusul.

**Tinjau ulang jika:** muncul kebutuhan edit lintas-pegawai (HR) → butuh RBAC nyata; atau approval
`profil-update` di-hidupkan backend.

### Addendum 1 — Enum label/value mapping & SelectValue render-prop

**Tanggal:** 2026-07-28

**Masalah:** API endpoint `GET /profil/biodata/{nik}/dashboard` mengembalikan field enum
(`jenisKelamin`, `agama`, `statusKawin`) sebagai **label display** (e.g. `"Laki-laki"`), bukan
**enum value** (e.g. `"LAKI_LAKI"`). Akibatnya:
- Form `defaultValues` terisi label → `<Select>` tak bisa match value opsi → autofill rusak
- Submit tanpa mengubah pilihan → mengirim label ke BE → error

**Solusi:**

1. **Helper `enumValueFromLabel()`** di `section-left-panel.tsx` — reverse lookup label → enum value:
   ```tsx
   function enumValueFromLabel(label, options) {
     if (!label) return "";
     return options.find((o) => o.label === label)?.value ?? label;
   }
   ```
   Diterapkan di `defaultValues` untuk 3 field: `jenisKelamin`, `agama`, `statusKawin`.

2. **Fix Base UI `<SelectValue>` render-prop** di `crud-form.tsx` — gunakan children sebagai fungsi
   untuk menampilkan **label** dari opsi yang cocok, bukan raw value:
   ```tsx
   <SelectValue placeholder={`Pilih ${field.label.toLowerCase()}`}>
     {(value) => {
       const opt = field.options?.find((o) => o.value === value);
       return opt?.label ?? value ?? "";
     }}
   </SelectValue>
   ```

**Pelajaran:** API dashboard return label, bukan value. Setiap field enum dari endpoint dashboard
wajib pake `enumValueFromLabel()` sebelum masuk `defaultValues`.

### Addendum 2 — changedStatus guard pada Edit Profil

**Tanggal:** 2026-07-28

**Keputusan:** Saat `BiodataDashboardResponse.changedStatus === true`, tombol "Edit Profil"
**disembunyikan** (unmount). User tak bisa membuka dialog edit selama ada perubahan yang menunggu
persetujuan admin.

**Implementasi:** Tambah kondisi `!d.changedStatus` pada render tombol:
```tsx
{nik && !d.changedStatus && (
  <button onClick={() => setDialogOpen(true)}>Edit Profil</button>
)}
```

**Konsekuensi:**
- Positif: mencegah user membuat multiple pending changes yang tumpuk-tindih
- User tetap lihat badge "Menunggu" sebagai indikasi status
- Sesuai prinsip unmount-not-disable (lihat §Anti-Examples knowledge.md)

## File terkait

- `docs/context/kepegawaian.md` — §Page 1: label READ-ONLY → self-edit; catat 9 field + NIK
  read-only + Pendidikan dikecualikan + Ibu Kandung & Telp ditampilkan.
- `src/hooks/useBiodataMutation.ts` — hook bespoke baru (dibuat agen eksekusi).
- `src/components/crud-form.tsx` — tambah `"date"` ke union `FormField.type` (additive, CRITICAL —
  jangan ubah cabang render lama).
- `src/app/(app)/kepegawaian/dashboard/section-left-panel.tsx` — tombol "Edit Profil" + Dialog +
  `CrudForm`; tambah field Ibu Kandung & Telp ke read view; select enum dari `ENUMS`.

Delegasi implementasi: beads (epic `kepegawaian-fe-o1o`), Manager tak ngoding `src/`.
Blast diukur via `gitnexus_impact`: `CrudForm` = CRITICAL (mitigasi additive default-preserve);
`SectionLeftPanel` = LOW (hanya `DashboardClient`).
