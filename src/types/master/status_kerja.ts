import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface StatusKerja {
  id: number;
  nama: string;
}

export const StatusKerjaSchema = z.object({
  id: z.number(),
  nama: z.string({
    required_error: "Nama wajib diisi",
  }),
});

export const statusKerjaTableColumns: CustomColumnDef[] = [
  {
    id: "urut",
    label: "No",
  },
  {
    id: "nama",
    label: "Nama",
    search: true,
    searchType: "text",
  },
  {
    id: "aksi",
    label: "Aksi",
  },
];
