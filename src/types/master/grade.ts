import { z } from "zod";
import type { CustomColumnDef } from "..";
import type { Level } from "./level";

export interface Grade {
	id: number;
	level: Level;
	grade: number;
	tukin: number;
}

export const GradeSchema = z.object({
	id: z.number(),
	levelId: z.number().min(1, "Level is required"),
	grade: z.number().min(1, "Min Grade is 1"),
	tukin: z.number().min(50_000, "Min Tukin is 50.000"),
});

export const gradeTableColumns: CustomColumnDef[] = [
	{ id: "urut", label: "No" },
	{ id: "levelId", label: "Level", search: true, searchType: "level" },
	{ id: "grade", label: "Grade", search: true, searchType: "number" },
	{ id: "tukin", label: "Tukin" },
	{ id: "aksi", label: "Aksi" },
];

export const findGradeValue = (list: Grade[], id: number | string) => {
	const cari = list.find((row) => row.id === Number(id));
	if (!cari) return { id: 0, level: { nama: "" }, grade: 0, tukin: 0 };
	return cari;
};
