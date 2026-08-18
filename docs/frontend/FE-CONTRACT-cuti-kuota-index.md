# FE Contract — `GET /cuti/kuota` (Index Kuota Cuti)

> Dokumen kontrak untuk tim **Frontend (Next.js)**: perubahan kontrak response `GET /cuti/kuota` — envelope, shape data, dan perilaku halaman kosong. **Aksi FE wajib** sebelum/bersamaan dengan rilis backend ini.

| Item | Nilai |
|------|-------|
| Branch | `rewrite/master-cqrs` |
| Tanggal | 2026-08-18 |
| ADR terkait | ADR-0040 backend `rewrite/master-cqrs` (deviasi index kuota — ada di repo backend, **tidak di repo FE**) · **ADR-0040 FE** ([0040-grid-kuota-carry-over-dua-tahun](../adr/0040-grid-kuota-carry-over-dua-tahun.md)) = keputusan FE atas kontrak ini · ADR-0014 backend (detail → 404, tidak ada di FE — ADR-0014 FE berjudul lain) |
| Ruang lingkup | Hanya `GET /cuti/kuota` (index). Detail `/{id}` & sisa `/{pegawaiId}/{tahun}/sisa` **tidak berubah** |

---

## Status Perubahan

| Perubahan | Status | Dampak FE |
|-----------|--------|-----------|
| Envelope index: `SingleResult` → **`PageResult`** | 🔧 **BERUBAH (breaking)** | Field `message` hilang; tambahan `timestamp` sudah ada di keduanya |
| Halaman kosong: **404 "Data not found!"** → **200 + empty page** | 🔧 **BERUBAH (breaking)** | Kode FE yang menganggap 404 = "tidak ada data" harus diganti: sekarang selalu 200, cek `data.page.content.length === 0` |
| Rename wire: `data.additional` → **`data.kuotaTahunSebelumnya`** | 🔧 **BERUBAH (breaking)** | Akses `data.additional` → `data.kuotaTahunSebelumnya` |
| `GET /cuti/kuota/{id}` & `/{pegawaiId}/{tahun}/sisa` | ✅ **TIDAK berubah** | Tetap `SingleResult`; 404 saat data tidak ada |

---

## 1. Envelope Baru

**Sebelumnya** (`SingleResult`):

```json
{
  "status": 200,
  "statusText": "OK",
  "errors": [],
  "message": "Data Found",
  "data": { "...": "..." },
  "timestamp": "2026-08-18 10:00:00"
}
```

**Sekarang** (`PageResult` — sama seperti semua endpoint list/page lain, mis. `/cuti/jenis`, `/cuti/pengajuan`):

```json
{
  "status": 200,
  "statusText": "OK",
  "data": { "...": "..." },
  "timestamp": "2026-08-18 10:00:00"
}
```

Perbedaan: **`message` dan `errors` tidak ada** di envelope index. Jangan bergantung pada `message` untuk status sukses — cukup cek `status === 200`.

## 2. Shape `data`

```jsonc
{
  "data": {
    "page": {
      "content": [ /* CutiKuotaResponse tahun berjalan (sesuai filter `tahun`, default tahun sekarang) */ ],
      "totalElements": 123,
      "totalPages": 7,
      "number": 0,
      "size": 20,
      "numberOfElements": 20,
      "first": true,
      "last": false
      // ... properti Page standard Spring
    },
    "kuotaTahunSebelumnya": [ /* rename dari `additional`: baris kuota tahun−1 utk pegawai di halaman ini */ ]
  }
}
```

- **`page`** — konten & metadata pagination (kontrak Page standard, tidak berubah).
- **`kuotaTahunSebelumnya`** (dulu `additional`) — daftar `CutiKuotaResponse` kuota **tahun sebelumnya** (tahun − 1) untuk pegawai yang sama dengan isi `page`. Bisa kosong. Dipakai untuk konteks carry-over di grid (sisa tahun lalu), **bukan** pengganti `sisaKuota` per baris.

## 3. Halaman Kosong — JANGAN cek 404

**Sebelumnya**: tidak ada data → **HTTP 404** `{ message: "Data not found!" }`.
**Sekarang**: tidak ada data → **HTTP 200** dengan page kosong:

```json
{
  "status": 200,
  "data": {
    "page": { "content": [], "totalElements": 0, "totalPages": 0, "number": 0, "size": 20, "first": true, "last": true },
    "kuotaTahunSebelumnya": []
  }
}
```

Perilaku FE yang benar: **selalu parse body** setelah `response.ok`, lalu cek `data.page.content.length`. Jangan treat 404 sebagai "data kosong".

## 4. Contoh Kode FE (Next.js)

```ts
// Di FE proyek ini, endpoint dipanggil lewat proxy: /api/proxy/cuti/kuota
// (JWT di-mint otomatis oleh proxy.ts — jangan set Authorization manual).
const res = await fetch(`/api/proxy/cuti/kuota?tahun=${tahun}`);
if (!res.ok) throw new Error(`HTTP ${res.status}`);

const body = (await res.json()) as { data: CutiKuotaPegawaiResponse }; // selalu aman: tidak ada lagi 204/404 untuk index
const { page, kuotaTahunSebelumnya } = body.data;
const rows = page.content; // [] saat kosong — bukan error
```

## 5. Checklist Aksi Tim FE

- [ ] Ganti akses `data.additional` → `data.kuotaTahunSebelumnya` (rename di typed interface / model).
- [ ] Hapus ketergantungan pada `message` ("Data Found"/"Data not found!") di halaman kuota — cek `status` saja.
- [ ] Ubah penanganan "tidak ada data": jangan lagi mengharap 404 — cek `data.page.content.length === 0` pada 200.
- [ ] Pastikan tipe envelope `PageResult` (tanpa `errors`/`message`) tidak dipakai kode bersama yang membutuhkan field tsb.
- [ ] Endpoint detail (`/{id}`, `/{pegawaiId}/{tahun}/sisa`) tetap `SingleResult` + 404 — jangan diubah.

## 6. Keputusan FE — hasil grill 2026-08-18 (status: DIKERJAKAN)

1. **Sync spec**: `bun run spec:sync` sudah dijalankan — `src/types/cuti/kuota.ts` sudah
   memakai `kuotaTahunSebelumnya` & `PageResultCutiKuotaPegawaiResponse`. Tipe generated,
   jangan diedit manual.
2. **Halaman kuota (`/cuti/kuota`)**: `kuotaTahunSebelumnya` **dipakai** untuk grid carry-over
   dua tahun (1 baris per pegawai: NIPAM, Nama, Status Pegawai, Jabatan, blok kolom Y, blok
   kolom Y−1, Aksi) — lihat `docs/context/cuti.md` CU-3/CU-15.
3. **K-C5** (strip 3 kartu di `pengajuan` & `riwayat/cuti`): pindah ke `page.content` saja
   (filter `pegawaiId`+`tahun`), hapus `additional` & handling `isNotFound`.
4. **Penting**: `additional` hilang total — pemakaian K-C5 yang memanggil endpoint yang sama
   (`/cuti/kuota?pegawaiId&tahun`) ikut terdampak walau di luar "ruang lingkup" dokumen ini.

Keputusan FE selengkapnya tercatat di **ADR-0040 FE** (`docs/adr/0040-grid-kuota-carry-over-dua-tahun.md`)
dan `docs/context/cuti.md` CU-3/CU-15.
