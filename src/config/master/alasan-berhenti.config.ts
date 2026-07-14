import { type EntityConfig, makeConfig, nameCol, nameField, simpleNameSchema } from "./_config-kit";

export const alasanBerhentiConfig: EntityConfig = makeConfig(
	simpleNameSchema,
	[nameField],
	[nameCol],
	"Alasan Berhenti",
);
