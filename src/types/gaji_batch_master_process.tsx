import type { CustomColumnDef } from "."
import type { JenisGaji } from "./enums/jenis_gaji"

export interface GajiBatchMasterProses {
    id: number
    kode: string
    nama: string
    nilai: number
    jenisGaji: string
}

export const gajiBatchMasterProsesColumns: CustomColumnDef[] = [
    { id: "id", label: "" },
    { id: "nama", label: "Komponen Gaji" },
    { id: "nilai", label: "Jumlah" },
]

export const gajiBatchMasterProsesKomponenColumns: CustomColumnDef[] = [
    { id: "id", label: "" },
    { id: "kode", label: "Aksi" },
    { id: "nama", label: "Komponen Gaji" },
    { id: "nilai", label: "Jumlah" },
]