import { type EntityConfig, makeConfig, nameCol, nameField, simpleNameSchema } from "./_config-kit";

export const jenisSpConfig: EntityConfig = makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis SP", {
	searchFields: [
		{ name: "kode", label: "Kode" },
		{ name: "nama", label: "Nama" },
	],
});
