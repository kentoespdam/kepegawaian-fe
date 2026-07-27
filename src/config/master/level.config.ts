import type { LevelPostRequest, LevelResponse } from "@/types/master/level";
import { type EntityConfig, makeConfig, nameCol, nameField, simpleNameSchema } from "./_config-kit";

export const levelConfig: EntityConfig<LevelResponse, LevelPostRequest> = makeConfig<LevelResponse, LevelPostRequest>(
	simpleNameSchema,
	[nameField],
	[nameCol],
	"Level",
	{ searchFields: [{ name: "nama", label: "Nama" }] },
);
