import { type EntityConfig, makeConfig, nameCol, nameField, simpleNameSchema } from "./_config-kit";

export const jenisPelatihanConfig: EntityConfig = makeConfig(
	simpleNameSchema,
	[nameField],
	[nameCol],
	"Jenis Pelatihan",
);
