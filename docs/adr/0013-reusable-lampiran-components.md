# 13. Reusable Lampiran Components — LampiranCard + LampiranUploadModal

Date: 2026-07-29
Status: Accepted

## Konteks

Lampiran (attachment) adalah fitur lintas-modul yang muncul di banyak tempat:

| Modul | Entity Ref | Endpoint Pattern |
|-------|-----------|------------------|
| Kepegawaian (riwayat mutasi) | `JenisSk` (`SK_MUTASI`, dll) | `/kepegawaian/lampiran/{ref}/{refId}` |
| Profil (pendidikan) | `JenisProfilUpdate` (`PROFIL_PENDIDIKAN`) | `/profil/pendidikan/lampiran/{id}` |
| Profil (keluarga) | `JenisProfilUpdate` (`PROFIL_KELUARGA`) | `/profil/keluarga/lampiran/{id}` |
| Profil (keahlian) | `JenisProfilUpdate` (`PROFIL_KEAHLIAN`) | `/profil/keahlian/lampiran/{id}` |
| Profil (pelatihan) | `JenisProfilUpdate` (`PROFIL_PELATIHAN`) | `/profil/pelatihan/lampiran/{id}` |
| Profil (pengalaman kerja) | `JenisProfilUpdate` (`PROFIL_PENGALAMAN_KERJA`) | `/profil/pengalaman-kerja/lampiran/{id}` |
| Profil (kartu identitas) | `JenisProfilUpdate` (`KARTU_IDENTITAS`) | `/profil/kartu-identitas/lampiran/{id}` |

Sebelum ADR ini, lampiran hanya diimplementasikan inline di `lampiran-card.tsx` khusus modul mutasi
(`src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/mutasi/lampiran-card.tsx`). Setiap modul lain
yang butuh lampiran harus menulis ulang kode yang identik — melanggar DRY.

Permintaan user: **buat komponen lampiran reusable** yang bisa dipakai modul mana pun dengan
perbedaan hanya pada `ref`, `refId`, dan pola URL endpoint.

## Keputusan

**Ekstrak dua shared primitives** dari kode inline `lampiran-card.tsx` mutasi:

### 1. `LampiranUploadModal` — upload form modal

Komponen minimal untuk upload file + keterangan.

```
src/components/lampiran-upload-modal.tsx
```

**Props:**

| Prop | Type | Default | Keterangan |
|------|------|---------|------------|
| `open` | `boolean` | — | Kontrol modal |
| `onOpenChange` | `(open) => void` | — | Close handler |
| `ref` | `string` | — | Entity ref type (e.g. `"SK_MUTASI"`) |
| `refId` | `string \| number` | — | Entity ref ID |
| `queryKey` | `readonly string[]` | — | Prefix query key TanStack Query |
| `uploadUrl` | `string` | — | URL POST upload (FormData) |
| `title` | `string` | `"Unggah Lampiran"` | Judul modal |

**Alur upload:**
1. File input + notes input (opsional)
2. POST FormData ke `uploadUrl` dengan fields: `ref`, `refId`, `fileName` (binary), `notes`
3. **Jangan** set `Content-Type` header — biarkan browser set multipart boundary (SPIKE issue 7eo5.5)
4. Sukses → `invalidateQueries({ queryKey: [...queryKey, ref, refId] })` → reset form → tutup modal
5. Error → toast error, form tetap (user bisa retry)

### 2. `LampiranCard` — full attachment management card

Komponen yang mencakup seluruh siklus lampiran: header + tabel + upload modal + viewer + delete.

```
src/components/lampiran-card.tsx
```

**Props:**

| Prop | Type | Default | Keterangan |
|------|------|---------|------------|
| `title` | `string` | `"Lampiran"` | Judul header card |
| `ref` | `string` | — | Entity ref type |
| `refId` | `string \| number` | — | Entity ref ID |
| `queryKey` | `readonly string[]` | — | Prefix query key (sama dengan upload modal) |
| `listUrl` | `string` | — | URL GET daftar lampiran |
| `uploadUrl` | `string` | — | URL POST upload (diteruskan ke upload modal) |
| `deleteUrl` | `(id) => string` | — | Builder URL DELETE |
| `viewUrl` | `(id) => string` | — | Builder URL view file |
| `itemLabel` | `string` | `"lampiran"` | Label untuk confirm delete |
| `hideUpload` | `boolean` | `false` | Sembunyikan tombol upload |

**Fitur dalam card:**
- **Header** — judul + tombol "Unggah" (bisa disembunyikan via `hideUpload`)
- **Tabel** — kolom No, File, Keterangan, Aksi (Lihat + Hapus)
- **Loading** — spinner saat fetch
- **Empty state** — "No Data" saat tidak ada lampiran
- **Upload modal** — `LampiranUploadModal` dengan `queryKey` yang sama
- **Viewer modal** — Base UI Dialog untuk pdf/image; non-pdf/image langsung download via `window.open`
- **Delete** — `ConfirmDeleteDialog` dengan error handling 409

### 3. `MutasiLampiranCard` — thin wrapper spesifik mutasi

File `lampiran-card.tsx` di direktori mutasi diubah menjadi thin wrapper yang memanggil
`LampiranCard` dengan konfigurasi endpoint kepegawaian:

```tsx
export function MutasiLampiranCard({ selectedRow }: Props) {
  // derive ref/refId dari selectedRow
  return (
    <LampiranCard
      title={`Lampiran — SK ${skLabel ?? ""}`}
      ref={ref}
      refId={refId}
      queryKey={["lampiran"]}
      listUrl={`/api/proxy/kepegawaian/lampiran/list/${ref}/${refId}`}
      uploadUrl="/api/proxy/kepegawaian/lampiran"
      deleteUrl={(id) => `/api/proxy/kepegawaian/lampiran/${ref}/${refId}/${id}`}
      viewUrl={(id) => `/api/proxy/kepegawaian/lampiran/file/${ref}/${id}`}
    />
  );
}
```

### Query Key Consistency

`LampiranCard` dan `LampiranUploadModal` menggunakan pattern query key yang sama:
`[...queryKey, ref, refId]`. Ini memastikan:

- `LampiranCard` fetch dengan `queryKey: [...queryKey, ref, refId]`
- `LampiranUploadModal` invalidate dengan `{ queryKey: [...queryKey, ref, refId] }`
- Caller cukup passing `queryKey={["lampiran"]}` — key final = `["lampiran", ref, refId]`

**WAJIB:** caller harus memberikan `queryKey` yang identik ke kedua komponen agar invalidasi
setelah upload bekerja.

### Desain API — URL-based, bukan magic routing

Komponen menerima URL eksplisit via props (`listUrl`, `uploadUrl`, `deleteUrl`, `viewUrl`).
Ini keputusan sengaja — bukan otomatis membangun URL dari `ref`/`refId` karena:

- Pattern endpoint lampiran berbeda antar modul:
  - Kepegawaian: `/kepegawaian/lampiran/{ref}/{refId}/{id}`
  - Profil: `/profil/{subModule}/lampiran/{id}`
- Abstraksi URL builder akan over-engineering untuk 2 pattern
- URL eksplisit = transparan, mudah di-debug, tanpa kejutan

**Trade-off:** lebih verbose di call-site, tapi lebih jelas.

### Item shape

Komponen menerima data dari endpoint list dengan shape minimal:

```ts
interface LampiranItem {
  id?: number | string;
  fileName?: string;
  mimeType?: string;
  notes?: string;
}
```

Tidak bergantung pada tipe spesifik (`LampiranSkQuery` / `LampiranProfilQuery`) — cukup
`LampiranItem` lokal yang mencakup field yang dipakai oleh komponen.

## Alternatif yang ditolak

- **Satu komponen `LampiranForm` all-in-one.** Ditoleransi di iterasi pertama, tapi direktif
  user memisahkan: form upload = modal, tabel = inline card. Dipisah jadi dua komponen.
- **URL builder otomatis dari `ref`.** Ditolak — over-engineering, pattern endpoint terlalu
  berbeda antar modul.
- **Props `queryKey` sebagai full key.** Ditolak — prefix + `ref` + `refId` memberi granularity
  cukup tanpa overlap antar entitas.
- **`next/image` untuk viewer.** Ditolak — URL dinamis dari proxy, tidak known at build time.
  Suppress `noImgElement` lint dengan `// biome-ignore`.

## Konsekuensi

**Positif.**
- DRY — semua modul cukup import `LampiranCard` dengan props minimal
- Upload form reusable — `LampiranUploadModal` bisa dipakai standalone
- Zero regression di mutasi — `MutasiLampiranCard` mempertahankan API `{ selectedRow }`
- Query key consistency di-enforce oleh design (prefix yang sama)

**Negatif / trade-off.**
- Call-site lebih verbose (4 URL props) — kompensasi dari fleksibilitas
- Tidak ada validasi bahwa `ref`/`refId` konsisten antara props dan URL — tanggung jawab caller
- Viewer modal tidak menggunakan Base UI `Dialog` secara penuh (langsung `window.open` untuk
  non-pdf/image) — YAGNI, ponytail

**Tinjau ulang jika:** muncul pattern endpoint lampiran ketiga yang berbeda secara fundamental;
atau kebutuhan validasi otomatis `ref`/`refId` di komponen.

## File terkait

- `src/components/lampiran-card.tsx` — komponen reusable baru
- `src/components/lampiran-upload-modal.tsx` — komponen reusable baru
- `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/mutasi/lampiran-card.tsx` — diubah jadi `MutasiLampiranCard` (thin wrapper)
- `src/app/(app)/kepegawaian/data/[pegawaiId]/riwayat/mutasi/page.tsx` — import `MutasiLampiranCard`
- `docs/design/forms.md` §10.6 — dokumentasi teknis
- `docs/design/architecture.md` §18 — shared primitives list
