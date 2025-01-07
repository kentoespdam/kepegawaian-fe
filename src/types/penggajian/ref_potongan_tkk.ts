import type { Golongan } from "@_types/master/golongan";
import type { Level } from "@_types/master/level";
import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface RefPotonganTkk {
	id: number;
	statusPegawai: string;
	level: Level;
	golongan: Golongan;
	nominal: number;
}

export const RefPotonganTkkSchema = z.object({
	id: z.number(),
	statusPegawai: z.string().min(1, "Status Pegawai Required"),
	levelId: z.number(),
	golonganId: z.number(),
	nominal: z.number(),
});

export type RefPotonganTkkSchema = z.infer<typeof RefPotonganTkkSchema>;

export const refPotonganTkkTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "statusPegawai", label: "Status Pegawai", search: true },
	{ id: "levelId", label: "Level", search: true, searchType: "level" },
	{ id: "golonganId", label: "Golongan", search: true },
	{ id: "nominal", label: "Nominal" },
];
