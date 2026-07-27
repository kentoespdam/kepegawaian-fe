import { z } from "zod";
import { rupiah } from "@/lib/utils";
import type { GradePostRequest, GradeQuery } from "@/types/master/grade";
import { type EntityConfig, makeConfig } from "./_config-kit";

export const gradeConfig: EntityConfig<GradeQuery, GradePostRequest> = makeConfig<GradeQuery, GradePostRequest>(
	z.object({
		grade: z.coerce.number().min(1, "Grade wajib diisi"),
		tukin: z.coerce.number().min(100000, "Tukin minimal 100.000"),
		levelId: z.coerce.number(),
	}),
	[
		{ name: "grade", label: "Grade", type: "number", required: true },
		{ name: "tukin", label: "Tukin", type: "number", required: true },
		{ name: "levelId", label: "Level", type: "select", required: true },
	],
	[
		{ id: "grade", header: "Grade", sortable: true, primary: true, cell: (item) => `Grade ${item.grade}` },
		{ id: "level", header: "Level", cell: (item) => item.level?.nama ?? "-" },
		{ id: "tunkin", header: "Tunkin", align: "right", sortable: true, cell: (item) => rupiah(item.tukin) },
	],
	"Grade",
	{
		fkSources: [{ field: "levelId", entity: "level", label: "Level" }],
		searchFields: [{ name: "grade", label: "Grade", type: "number" }],
	},
);
