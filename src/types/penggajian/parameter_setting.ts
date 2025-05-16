import { z } from "zod";
import type { CustomColumnDef } from "..";

export interface ParameterSetting {
	id: number;
	kode: string;
	nominal: number;
}

export const ParameterSettingSchema = z.object({
	id: z.number(),
	kode: z.string(),
	nominal: z.number(),
});

export type ParameterSettingSchema = z.infer<typeof ParameterSettingSchema>;

export const parameterSettingTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "aksi", label: "Aksi" },
	{ id: "kode", label: "Kode", search: true, searchType: "text" },
	{ id: "nominal", label: "Nominal" },
];
