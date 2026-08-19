# ADR-0043 — Pengajuan Kuota Strip: Ganti Endpoint ke `/sisa`

**Tanggal:** 2026-08-19
**Status:** Accepted

---

## Konteks

Halaman `/cuti/pengajuan` menampilkan strip 3 kartu (Kuota Total, Diambil, Sisa) yang
bersumber dari `GET /cuti/kuota?pegawaiId&tahun` (list endpoint). Strip ini membaca
`page.content` → find baris tahun terpilih → ambil `kuota+kuotaTambahan`, `kuotaTerpakai`,
`sisaKuota` (K-C5 di ADR-0040).

Backend menyediakan dedicated endpoint `GET /cuti/kuota/{pegawaiId}/{tahun}/sisa` yang
mengembalikan `{ sisaCutiTahunIni, sisaCutiTahunLalu }` — dirancang khusus untuk
menampilkan sisa kuota tanpa perlu fetch data lengkap.

**Masalah:** fetch list endpoint untuk strip adalah over-fetch — data yang dibutuhkan
hanya sisa, tapi response mengembalikan seluruh `CutiKuotaPegawaiResponse` (page +
kuotaTahunSebelumnya). Dedicated endpoint lebih ringan dan memiliki semantic yang jelas.

**Alternatif yang dipertimbangkan:**

1. **Pertahankan list endpoint** — backward compatible, tapi over-fetch.
2. **Ganti ke `/sisa`** — dedicated, ringan, tapi mengubah response shape & kartu yang ditampilkan.
3. **Fetch keduanya** — list untuk kuota/diambil + `/sisa` untuk sisa — lebih lambat, dua fetch.

---

## Keputusan

### Endpoint

Ganti `kuotaQuery` di `pengajuan-page-client.tsx` dari:

```
GET /cuti/kuota?pegawaiId&tahun
→ CutiKuotaPegawaiResponse (page.content + kuotaTahunSebelumnya)
```

menjadi:

```
GET /cuti/kuota/{pegawaiId}/{tahun}/sisa
→ SingleResultCutiKuotaSisa { sisaCutiTahunIni, sisaCutiTahunLalu }
```

### Tampilan Strip

Strip berubah dari **3 kartu** menjadi **2 kartu**:

| Kartu | Sumber | Icon |
|-------|--------|------|
| Sisa Tahun Ini | `sisaCutiTahunIni` | `StickyNoteMinus` |
| Sisa Tahun Lalu (Carry-over) | `sisaCutiTahunLalu` | `CalendarCheck` (carry-over) |

- **sisaCutiTahunIni**: sisa kuota tahun yang dipilih.
- **sisaCutiTahunLalu**: carry-over dari tahun lalu (sisa kuota tahun sebelumnya yang
  masih bisa dipakai). **Bukan** gabungan total.

### Error Handling

- **404** (belum ada kuota tahun ini): tampilkan "—" di kedua kartu + pesan
  "Belum ada kuota tahun ini" — konsisten dengan CU-13 (state handling).
- **Network error**: tampilkan "Gagal memuat kuota cuti." — pola yang sama.

### Query Key & Invalidation

- Query key tetap `["cuti-kuota", pegawaiId, tahun]` — prefix match dengan
  invalidation di page `/cuti/kuota` tetap work (data konsisten cross-tab).
- `cancelMutation.onSuccess` invalidate `["cuti-kuota"]` — tetap berlaku.

---

## Alasan

1. **Semantic yang benar.** Pengajuan page hanya perlu menampilkan sisa kuota — dedicated
   endpoint memberikan tepat apa yang dibutuhkan tanpa data berlebih.
2. **Ringan.** Response `CutiKuotaSisa` jauh lebih kecil dari `CutiKuotaPegawaiResponse`
   (page + kuotaTahunSebelumnya array).
3. **Carry-over visibility.** Dengan menampilkan "Sisa Tahun Lalu" sebagai kartu terpisah,
   user mendapat konteks carry-over tanpa perlu fetch grid kuota.
4. **Konsisten dengan ADR-0040.** ADR-0040 menyatakan endpoint `/sisa` "tidak memadai"
   untuk grid kuota (butuh kuota/kuotaTerpakai), tapi untuk strip pengajuan yang hanya
   menampilkan sisa — endpoint ini tepat.

---

## Konsekuensi

- **Kartu "Kuota Total" dan "Diambil" dihapus** dari strip pengajuan. User tidak lagi
  melihat total kuota dan terpakai di halaman ini — hanya sisa.
- **Kartu "Sisa Tahun Lalu" ditambahkan** — memberikan konteks carry-over yang sebelumnya
  tidak ada di strip.
- **Query response type berubah** dari `CutiKuotaPegawaiResponse` ke `CutiKuotaSisa`.
  Type sudah ada di `src/types/cuti/kuota.ts` (generated).
- **404 harus ditangani** — list endpoint selalu 200, tapi `/sisa` bisa 404. Handling
  inline (bukan toast) sesuai CU-13.
- **KuotaStrip component props berubah** — dari `data: CutiKuotaPegawaiResponse | undefined`
  ke `data: CutiKuotaSisa | undefined`. Komponen internal di-replace.
