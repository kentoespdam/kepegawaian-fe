import { type EntityConfig, makeConfig, nameCol, nameField, simpleNameSchema } from "./_config-kit";

export const jenisKitasConfig: EntityConfig = makeConfig(simpleNameSchema, [nameField], [nameCol], "Jenis Kitas");
