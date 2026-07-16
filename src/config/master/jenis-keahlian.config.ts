import { type EntityConfig, makeConfig, nameCol, nameField, simpleNameSchema } from "./_config-kit";

export const jenisKeahlianConfig: EntityConfig = makeConfig(
	simpleNameSchema,
	[nameField],
	[nameCol],
	"Jenis Keahlian",
	{
		searchFields: [{ name: "nama", label: "Nama" }],
	},
);
