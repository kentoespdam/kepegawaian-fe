import { type EntityConfig, makeConfig, nameCol, nameField, simpleNameSchema } from "./_config-kit";

export const levelConfig: EntityConfig = makeConfig(simpleNameSchema, [nameField], [nameCol], "Level", {
	searchFields: [{ name: "nama", label: "Nama" }],
});
