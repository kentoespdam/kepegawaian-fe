import type { JenisTunjangan } from "@_types/enums/jenis_tunjangan";
import type { Golongan } from "@_types/master/golongan";
import type { Level } from "@_types/master/level";
import { optional, z } from "zod";
import type { CustomColumnDef } from "..";

export interface Tunjangan {
	id: number;
	jenisTunjangan: JenisTunjangan;
	level: Level;
	golongan?: Golongan;
	nominal: number;
}

export const TunjanganSchema = z.object({
	id: z.number(),
	jenisTunjangan: z.string(),
	levelId: z.number().optional(),
	golonganId: z.number().optional(),
	nominal: z.number(),
});

export type TunjanganSchema = z.infer<typeof TunjanganSchema>;

export const tunjanganTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{
		id: "jenisTunjangan",
		label: "Jenis",
		search: true,
		searchType: "jenisTunjangan",
	},
	{ id: "levelId", label: "Level", search: true, searchType: "level" },
	{ id: "golonganId", label: "Golongan" },
	{ id: "nominal", label: "Nominal" },
];
