# Claim Order — CU-21: Pengajuan Kuota Strip → Endpoint `/sisa`

> **Issue:** Ganti endpoint kuota strip di `/cuti/pengajuan` dari list ke dedicated `/sisa`.
> **ADR:** [ADR-0043](adr/0043-pengajuan-kuota-strip-endpoint-sisa.md)
> **Context:** [cuti.md](context/cuti.md) §CU-21

---

## Step-by-Step Implementation

### Step 1: Update `kuotaQuery` di `pengajuan-page-client.tsx`

Ganti `queryFn` dari fetch list endpoint ke fetch `/sisa`:

**Sebelum:**
```ts
const kuotaQuery = useQuery({
    queryKey: ["cuti-kuota", pegawaiId, tahun],
    queryFn: async () => {
        const qs = new URLSearchParams({ pegawaiId: String(pegawaiId), tahun: String(tahun) }).toString();
        const res = await fetch(`/api/proxy/cuti/kuota?${qs}`);
        throwIfNotOk(res, "Gagal memuat kuota cuti");
        const body = (await res.json()) as { data: CutiKuotaPegawaiResponse };
        return body.data;
    },
    enabled: pegawaiId != null,
    staleTime: 30_000,
});
```

**Sesudah:**
```ts
const kuotaQuery = useQuery({
    queryKey: ["cuti-kuota", pegawaiId, tahun],
    queryFn: async () => {
        const res = await fetch(`/api/proxy/cuti/kuota/${pegawaiId}/${tahun}/sisa`);
        throwIfNotOk(res, "Gagal memuat kuota cuti");
        const body = (await res.json()) as { data: CutiKuotaSisa };
        return body.data;
    },
    enabled: pegawaiId != null,
    staleTime: 30_000,
});
```

**Catatan:**
- Import type berubah: `CutiKuotaPegawaiResponse` → `CutiKuotaSisa` (sudah ada di `@/types/cuti/kuota`)
- Query key tetap `["cuti-kuota", pegawaiId, tahun]` — invalidation tetap work

---

### Step 2: Replace `KuotaStrip` component

Ganti seluruh component `KuotaStrip` — props berubah, kartu berubah dari 3→2.

**Props baru:**
```ts
function KuotaStrip({
    data,
    tahun,
    isPending,
    isError,
}: {
    data: CutiKuotaSisa | undefined;
    tahun: number;
    isPending: boolean;
    isError: boolean;
}) {
```

**Kartu baru (2 kartu):**
| Kartu | Sumber | Icon | Tone |
|-------|--------|------|------|
| Sisa Tahun Ini | `data?.sisaCutiTahunIni` | `StickyNoteMinus` | `text-warning bg-warning/10` |
| Sisa Tahun Lalu | `data?.sisaCutiTahunLalu` | `CalendarCheck` (carry-over) | `text-success bg-success/10` |

**Error handling:**
- `isError` → "Gagal memuat kuota cuti." (sama)
- `!data` (404 / no record) → "Belum ada kuota tahun ini." (sama)
- Value显示: `isError || !data ? "—" : c.value` (sama pattern)

**Skeleton:** tetap 2 skeleton cards (bukan 3).

---

### Step 3: Update import

Di `pengajuan-page-client.tsx`, ganti import type:
```ts
// Sebelum:
import type { CutiKuotaPegawaiResponse, CutiKuotaResponse } from "@/types/cuti/kuota";

// Sesudah:
import type { CutiKuotaSisa } from "@/types/cuti/kuota";
```

`CutiKuotaResponse` masih dipakai? **Tidak** — hapus dari import jika tidak dipakai di file lain.

---

### Step 4: Update `KuotaStrip` call site

```ts
// Sebelum:
<KuotaStrip data={kuotaQuery.data} tahun={tahun} isPending={kuotaQuery.isPending} isError={kuotaQuery.isError} />

// Sesudah: (sama — props names tidak berubah, hanya type internal)
<KuotaStrip data={kuotaQuery.data} tahun={tahun} isPending={kuotaQuery.isPending} isError={kuotaQuery.isError} />
```

Tidak ada perubahan di call site — type inference akan handle.

---

### Step 5: Verify

- [x] `bun run build` — zero error
- [x] `bun run test` — all green
- [x] `bunx biome check` — zero lint error
- [ ] Manual check: buka `/cuti/pengajuan` → strip tampil 2 kartu (Sisa Ini + Sisa Lalu)
- [ ] Manual check: ganti tahun → strip update
- [ ] Manual check: cancel pengajuan → strip invalidate & update

---

## Context & References

| Dokumen | Path |
|---------|------|
| ADR | `docs/adr/0043-pengajuan-kuota-strip-endpoint-sisa.md` |
| Context | `docs/context/cuti.md` §CU-21 |
| Type | `src/types/cuti/kuota.ts` → `CutiKuotaSisa` |
| Page | `src/app/(app)/cuti/pengajuan/pengajuan-page-client.tsx` |
| ADR-0040 (sebelumnya) | `docs/adr/0040-grid-kuota-carry-over-dua-tahun.md` |

---

## Dependency

Tidak ada dependency ke issue lain — ini perubahan standalone.
