import { type EntityConfig, makeConfig, nameCol, nameField, simpleNameSchema } from "./_config-kit";

export const jenjangPendidikanConfig: EntityConfig = makeConfig(
	simpleNameSchema,
	[nameField],
	[nameCol],
	"Jenjang Pendidikan",
);
