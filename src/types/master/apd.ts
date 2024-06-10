import { z } from "zod";
import type { CustomColumnDef } from "..";
import { ProfesiMini } from "./profesi";

export interface ApdMini {
	id: number;
	nama: string;
	profesi: ProfesiMini;
}

export interface Apd extends ApdMini {}

export const ApdForm = z.object({
	id: z.number(),
	nama: z.string({ required_error: "Apd is required" }),
	profesiId: z.number().min(1, "Profesi is required"),
});

export const apdTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "profesiId", label: "Profesi", search: true, searchType: "profesi" },
	{ id: "nama", label: "Apd", search: true, searchType: "text" },
	{ id: "aksi", label: "Aksi" },
];
