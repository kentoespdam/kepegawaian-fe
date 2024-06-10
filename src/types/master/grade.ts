import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { Level } from "./level";

export interface Grade {
	id: number;
	level: Level;
	grade: number;
	tukin: number;
}

export const GradeForm = z.object({
	id: z.optional(z.number()),
	levelId: z.number().min(1, "Level is required"),
	grade: z.number().min(1, "Min Grade is 1"),
	tukin: z.number().min(50_000, "Min Tukin is 50.000"),
});

export type GradeForm = z.infer<typeof GradeForm>;

export const gradeTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "levelId", label: "Level", search: true, searchType: "level" },
	{ id: "grade", label: "Grade", search: true, searchType: "number" },
	{ id: "tukin", label: "Tukin" },
	{ id: "aksi", label: "Aksi" },
];
