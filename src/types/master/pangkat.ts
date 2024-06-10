import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface Pangkat {
	id: number;
	nama: string;
}

export const pangkatTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "nama", label: "Nama" },
	{ id: "aksi", label: "Aksi" },
];
